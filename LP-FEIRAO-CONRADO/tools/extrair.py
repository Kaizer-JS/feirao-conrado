"""
Extração de assets — LP Feirão Conrado (v2)

Nenhuma imagem é gerada por IA. Todas saem do material oficial do cliente:
  ../EMPREENDIMENTOS/*.pdf ......... renders em alta resolução embutidos nos books
  ../EMPRESAS PARCEIRAS/*.png ...... logos oficiais das construtoras e bancos
  ../MATERIAL DE APOIO/*.pdf ....... painel do estande (logo Minha Casa Minha Vida)
  ../LOGO/*.png .................... marca Conrado e selo do Feirão

Uso:  python tools/extrair.py
Requer: pip install pymupdf pillow
"""
import io
import os

import fitz
from PIL import Image, ImageChops

Image.MAX_IMAGE_PIXELS = None

AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEM = os.path.dirname(AQUI)

BOOKS = os.path.join(ORIGEM, "EMPREENDIMENTOS")
LOGOS_PARCEIROS = os.path.join(ORIGEM, "EMPRESAS PARCEIRAS")
APOIO = os.path.join(ORIGEM, "MATERIAL DE APOIO")
MARCA = os.path.join(ORIGEM, "LOGO")

SAIDA_IMG = os.path.join(AQUI, "assets", "img")
SAIDA_MARCA = os.path.join(AQUI, "assets", "marca")
SAIDA_PARCEIROS = os.path.join(AQUI, "assets", "parceiros")
SAIDA_BOOKS = os.path.join(AQUI, "assets", "books")

JPEG = dict(format="JPEG", quality=85, optimize=True, progressive=True)

PDF = {
    "veneza-prime": "Book Oficial - Veneza Prime.pdf",
    "vila-santiago": "Book Oficial - Vila Santiago.pdf",
    "parque-dos-monarcas": "PARQUE DOS MONARCAS.pdf",
}

# (nome de saída, xref da imagem embutida) — seleção v2: fachada + lazer + interior
GALERIAS = {
    "veneza-prime": [("01", 278), ("02", 405), ("03", 326), ("04", 480)],
    "vila-santiago": [("01", 142), ("02", 154), ("03", 214), ("04", 144)],
    "parque-dos-monarcas": [("01", 95), ("02", 99), ("03", 103), ("04", 115)],
}

HERO = ("veneza-prime", 173)          # casal com a chave do apartamento — Book Veneza Prime, pág. 5
HERO_LARGO = ("veneza-prime", 190)    # casal na varanda ao pôr do sol — usado no og-image
RECORTE_MCMV = (0.033, 0.874, 0.258, 0.972)

PARCEIROS = {
    "tenda": "Design sem nome (3).png",
    "mrv": "4.png",
    "direcional": "2.png",
    "lmarquezzo": "4 (2).png",
    "sertenge": "1.png",
    "pejota": "7.png",
    "santana": "8 (2).png",
    "singcred": "9.png",
    "caixa": "8.png",
}


# ─────────────────────────────────────────────────────────────────── utilidades
def aparar(im, tol=12):
    """Remove bordas transparentes e/ou brancas ao redor da arte."""
    im = im.convert("RGBA")
    alfa = im.getchannel("A")
    caixa_a = alfa.point(lambda p: 255 if p > 8 else 0).getbbox()

    rgb = Image.new("RGB", im.size, (255, 255, 255))
    rgb.paste(im, mask=alfa)
    dif = ImageChops.difference(rgb, Image.new("RGB", im.size, (255, 255, 255)))
    caixa_b = dif.convert("L").point(lambda p: 255 if p > tol else 0).getbbox()

    caixas = [c for c in (caixa_a, caixa_b) if c]
    if not caixas:
        return im
    c = (max(x[0] for x in caixas), max(x[1] for x in caixas),
         min(x[2] for x in caixas), min(x[3] for x in caixas))
    return im.crop(c if c[2] > c[0] and c[3] > c[1] else caixas[0])


def branco_para_alfa(im, limite=238):
    im = im.convert("RGBA")
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if r >= limite and g >= limite and b >= limite:
                px[x, y] = (r, g, b, 0)
    return im


def caber(im, larg, alt):
    escala = min(larg / im.width, alt / im.height, 1.0)
    if escala < 1.0:
        im = im.resize((round(im.width * escala), round(im.height * escala)), Image.LANCZOS)
    return im


def cobrir(im, larg, alt, foco=0.42):
    """object-fit: cover, sem ampliar além da resolução original."""
    escala = min(im.width / larg, im.height / alt)
    cl, ca = round(larg * escala), round(alt * escala)
    esq = (im.width - cl) // 2
    topo = int((im.height - ca) * foco)
    im = im.crop((esq, topo, esq + cl, topo + ca))
    return im.resize((larg, alt), Image.LANCZOS) if im.width > larg else im


def imagem_do_pdf(caminho, xref):
    doc = fitz.open(caminho)
    dados = doc.extract_image(xref)["image"]
    doc.close()
    return Image.open(io.BytesIO(dados)).convert("RGB")


def salvar(im, caminho, larg, alt, foco=0.42):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    cobrir(im, larg, alt, foco).save(caminho, **JPEG)
    print(f"  {os.path.relpath(caminho, AQUI)}  {os.path.getsize(caminho) // 1024} KB")


# ─────────────────────────────────────────────────────────────────────── etapas
def galerias():
    print("\n[1/5] Galerias dos empreendimentos")
    for slug, itens in GALERIAS.items():
        pdf = os.path.join(BOOKS, PDF[slug])
        for nome, xref in itens:
            im = imagem_do_pdf(pdf, xref)
            salvar(im, os.path.join(SAIDA_IMG, slug, f"{nome}.jpg"), 1400, 1000)
        # capa quadrada para o card do mobile
        im = imagem_do_pdf(pdf, itens[0][1])
        salvar(im, os.path.join(SAIDA_IMG, slug, "capa.jpg"), 1000, 1250)


def hero():
    print("\n[2/5] Hero")
    im = imagem_do_pdf(os.path.join(BOOKS, PDF[HERO[0]]), HERO[1])
    salvar(im, os.path.join(SAIDA_IMG, "hero-pessoas.jpg"), 760, 900, foco=0.10)
    salvar(im, os.path.join(SAIDA_IMG, "hero-pessoas-mobile.jpg"), 760, 620, foco=0.05)


def parceiros():
    print("\n[3/5] Logos das construtoras e parceiros")
    os.makedirs(SAIDA_PARCEIROS, exist_ok=True)
    for slug, arquivo in PARCEIROS.items():
        im = caber(aparar(Image.open(os.path.join(LOGOS_PARCEIROS, arquivo))), 460, 150)
        destino = os.path.join(SAIDA_PARCEIROS, f"{slug}.png")
        im.save(destino, optimize=True)
        print(f"  {os.path.relpath(destino, AQUI)}  {im.width}x{im.height}")

    doc = fitz.open(os.path.join(APOIO, "130X115 - LADO ESQUERDO DA TV.pdf"))
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(2, 2))
    pagina = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()
    x1, y1, x2, y2 = RECORTE_MCMV
    recorte = pagina.crop((int(x1 * pagina.width), int(y1 * pagina.height),
                           int(x2 * pagina.width), int(y2 * pagina.height)))
    recorte = caber(aparar(branco_para_alfa(recorte)), 460, 150)
    destino = os.path.join(SAIDA_PARCEIROS, "mcmv.png")
    recorte.save(destino, optimize=True)
    print(f"  {os.path.relpath(destino, AQUI)}  {recorte.width}x{recorte.height}")


def parceiros_mono():
    """Versões brancas das logos para a esteira do hero.

    Não dá para usar filter:invert no CSS: as logos que vêm com fundo branco
    chapado viram um retângulo sólido. Aqui o branco vira transparência antes
    de recolorir a arte de branco.
    """
    print("\n[3b/5] Logos monocromáticas para a esteira")
    destino_dir = os.path.join(SAIDA_PARCEIROS, "mono")
    os.makedirs(destino_dir, exist_ok=True)

    for arquivo in sorted(os.listdir(SAIDA_PARCEIROS)):
        if not arquivo.endswith(".png"):
            continue
        im = branco_para_alfa(Image.open(os.path.join(SAIDA_PARCEIROS, arquivo)), limite=232)
        im = aparar(im)
        branco = Image.new("RGBA", im.size, (255, 255, 255, 0))
        branco.putalpha(im.getchannel("A"))
        branco = Image.composite(Image.new("RGBA", im.size, (255, 255, 255, 255)),
                                 Image.new("RGBA", im.size, (255, 255, 255, 0)),
                                 im.getchannel("A"))
        caber(branco, 460, 150).save(os.path.join(destino_dir, arquivo), optimize=True)
        print(f"  assets/parceiros/mono/{arquivo}")


def marca():
    print("\n[4/5] Marca, selo, favicon e og-image")
    os.makedirs(SAIDA_MARCA, exist_ok=True)

    conrado = caber(aparar(Image.open(os.path.join(MARCA, "Design sem nome (2).png"))), 760, 460)
    conrado.save(os.path.join(SAIDA_MARCA, "conrado.png"), optimize=True)

    selo = caber(aparar(Image.open(
        os.path.join(MARCA, "LOGO FEIRÃO FUNDO TRANPARENTE", "Design sem nome (1).png"))), 1100, 1100)
    selo.save(os.path.join(SAIDA_MARCA, "selo-feirao.png"), optimize=True)
    print(f"  assets/marca/conrado.png  {conrado.width}x{conrado.height}")
    print(f"  assets/marca/selo-feirao.png  {selo.width}x{selo.height}")

    for nome, lado in (("favicon.png", 64), ("apple-touch-icon.png", 180)):
        base = Image.new("RGBA", (lado, lado), (20, 17, 13, 255))
        m = selo.copy()
        m.thumbnail((int(lado * 0.78), int(lado * 0.78)), Image.LANCZOS)
        base.alpha_composite(m, ((lado - m.width) // 2, (lado - m.height) // 2))
        base.save(os.path.join(AQUI, "assets", nome))
        print(f"  assets/{nome}  {lado}x{lado}")

    foto = imagem_do_pdf(os.path.join(BOOKS, PDF[HERO_LARGO[0]]), HERO_LARGO[1])
    og = cobrir(foto, 1200, 630, foco=0.30).convert("RGBA")
    og.alpha_composite(Image.new("RGBA", og.size, (20, 17, 13, 125)))
    m = selo.copy()
    m.thumbnail((320, 320), Image.LANCZOS)
    og.alpha_composite(m, ((1200 - m.width) // 2, (630 - m.height) // 2))
    destino = os.path.join(SAIDA_IMG, "og-image.jpg")
    og.convert("RGB").save(destino, **JPEG)
    print(f"  assets/img/og-image.jpg  {os.path.getsize(destino) // 1024} KB")


def books():
    print("\n[5/5] Books em PDF para download")
    os.makedirs(SAIDA_BOOKS, exist_ok=True)
    import shutil
    for slug, arquivo in PDF.items():
        destino = os.path.join(SAIDA_BOOKS, f"{slug}.pdf")
        shutil.copyfile(os.path.join(BOOKS, arquivo), destino)
        print(f"  assets/books/{slug}.pdf  {os.path.getsize(destino) // 1024} KB")


if __name__ == "__main__":
    galerias()
    hero()
    parceiros()
    parceiros_mono()
    marca()
    books()
    print("\nAssets prontos.")
