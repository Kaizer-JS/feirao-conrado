"""
Pipeline de assets do Feirão Conrado.

Gera TODAS as imagens do site a partir do material oficial:
  - EMPREENDIMENTOS/*.pdf .......... imagens embutidas em alta resolução (fachada, lazer, hero)
  - EMPRESAS PARCEIRAS/*.png ....... logos oficiais das construtoras/bancos
  - MATERIAL DE APOIO/*.pdf ........ painéis do estande (logo Minha Casa Minha Vida)
  - LOGO/*.png ..................... marca Conrado e selo do Feirão

Nada é gerado por IA: cada arquivo de saída tem origem rastreável no material do cliente.

Uso:  python tools/build_assets.py
"""
import os
import shutil

import fitz  # PyMuPDF
from PIL import Image, ImageChops

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_BOOKS = os.path.join(ROOT, "EMPREENDIMENTOS")
SRC_PARTNERS = os.path.join(ROOT, "EMPRESAS PARCEIRAS")
SRC_APOIO = os.path.join(ROOT, "MATERIAL DE APOIO")
SRC_LOGO = os.path.join(ROOT, "LOGO")

OUT_IMG = os.path.join(ROOT, "assets", "img")
OUT_LOGO = os.path.join(ROOT, "assets", "logos")
OUT_PARTNERS = os.path.join(OUT_LOGO, "partners")
OUT_BOOKS = os.path.join(ROOT, "assets", "books")

JPEG = dict(format="JPEG", quality=84, optimize=True, progressive=True)


# --------------------------------------------------------------------------- utils
def ensure_dirs():
    for d in (OUT_IMG, OUT_LOGO, OUT_PARTNERS, OUT_BOOKS):
        os.makedirs(d, exist_ok=True)


def trim(im, tol=12):
    """Remove bordas transparentes e/ou brancas ao redor da arte."""
    im = im.convert("RGBA")
    alpha = im.getchannel("A")
    bbox_a = alpha.point(lambda p: 255 if p > 8 else 0).getbbox()

    rgb = Image.new("RGB", im.size, (255, 255, 255))
    rgb.paste(im, mask=alpha)
    diff = ImageChops.difference(rgb, Image.new("RGB", im.size, (255, 255, 255)))
    bbox_w = diff.convert("L").point(lambda p: 255 if p > tol else 0).getbbox()

    boxes = [b for b in (bbox_a, bbox_w) if b]
    if not boxes:
        return im
    box = (max(b[0] for b in boxes), max(b[1] for b in boxes),
           min(b[2] for b in boxes), min(b[3] for b in boxes))
    if box[2] <= box[0] or box[3] <= box[1]:
        box = boxes[0]
    return im.crop(box)


def white_to_alpha(im, thr=238):
    """Converte fundo branco em transparência (para logos recortadas de PDF)."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r >= thr and g >= thr and b >= thr:
                px[x, y] = (r, g, b, 0)
    return im


def fit_box(im, box_w, box_h):
    """Escala mantendo proporção para caber na caixa (sem ampliar além de 1x)."""
    scale = min(box_w / im.width, box_h / im.height, 1.0)
    if scale < 1.0:
        im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))),
                       Image.LANCZOS)
    return im


def cover(im, target_w, target_h):
    """Recorte central tipo object-fit: cover, sem ampliar acima da resolução original."""
    scale = min(im.width / target_w, im.height / target_h)
    crop_w, crop_h = round(target_w * scale), round(target_h * scale)
    left = (im.width - crop_w) // 2
    top = int((im.height - crop_h) * 0.42)  # levemente acima do centro: preserva céu/fachada
    im = im.crop((left, top, left + crop_w, top + crop_h))
    if im.width > target_w:
        im = im.resize((target_w, target_h), Image.LANCZOS)
    return im


def pdf_image(pdf_path, xref):
    doc = fitz.open(pdf_path)
    data = doc.extract_image(xref)["image"]
    doc.close()
    import io
    return Image.open(io.BytesIO(data)).convert("RGB")


def save_jpg(im, path, width, height):
    cover(im, width, height).save(path, **JPEG)
    print(f"  {os.path.relpath(path, ROOT)}  {os.path.getsize(path) // 1024} KB")


# --------------------------------------------------------------------------- fontes
BOOKS = {
    "veneza-prime": "Book Oficial - Veneza Prime.pdf",
    "vila-santiago": "Book Oficial - Vila Santiago.pdf",
    "parque-dos-monarcas": "PARQUE DOS MONARCAS.pdf",
    "conquista-vila-verde": os.path.join("..", "novos empreendimentos", "BOOK VILA VERDE.pdf"),
    "conquista-lauro-de-freitas": os.path.join("..", "novos empreendimentos", "CONQUISTA LAURO DE FREITAS.pdf"),
    "morada-das-estacoes": os.path.join("..", "novos empreendimentos", "Morada das Estaçoes.pdf"),
    "encanto-piata": os.path.join("..", "novos empreendimentos", "Encanto Piatã  (1).pdf"),
}

# (arquivo de saída, xref da imagem embutida no PDF) — todas verificadas sem texto sobreposto
EMPREENDIMENTOS = {
    "veneza-prime": [
        ("card", 282),        # fachada ao entardecer
        ("01-fachada", 278),  # fachada à noite
        ("02-portaria", 326),
        ("03-varanda", 405),
        ("04-area-externa", 370),
    ],
    "vila-santiago": [
        ("card", 142),          # portaria ao pôr do sol
        ("01-piscina", 154),
        ("02-churrasqueira", 144),
        ("03-playground", 148),
        ("04-office", 172),
    ],
    "parque-dos-monarcas": [
        ("card", 95),           # fachada
        ("01-piscinas", 99),
        ("02-gourmet", 103),
        ("03-salao-festas", 115),
        ("04-playground", 107),
    ],
    "conquista-vila-verde": [
        ("card", 39),           # fachada / guarita
        ("01-piscina", 45),     # piscina adulto e infantil
        ("02-salao-festas", 78),
        ("03-playground", 85),
        ("04-quadra", 90),
    ],
    "conquista-lauro-de-freitas": [
        ("card", 885),          # guarita / fachada
        ("01-piscina", 879),    # piscina adulto e infantil
        ("02-playground", 893),
        ("03-pet", 914),
        ("04-gourmet", 948),
    ],
    "morada-das-estacoes": [
        ("card", 74),           # portaria / fachada
        ("01-churrasqueira", 149),
        ("02-quadra", 160),
        ("03-playground", 182),
        ("04-salao-festas", 207),
    ],
    "encanto-piata": [
        ("card", 89),           # vista das torres de 15 andares
        ("01-portaria", 93),    # portaria 24h
        ("02-salao-festas", 149),
        ("03-brinquedoteca", 169),
        ("04-sportbar", 177),
    ],
}

HERO = ("veneza-prime", 190)  # casal ao pôr do sol — mesma cena do protótipo aprovado

PARTNERS = {
    "tenda-v2": "tenda atualizada .png",
    "mrv": "4.png",
    "direcional": "2.png",
    "lmarquezzo": "4 (2).png",
    "sertenge": "1.png",
    "pejota": "7.png",
    "santana": "8 (2).png",
    "singcred": "9.png",
    "caixa": "8.png",
}

# recorte da logo Minha Casa Minha Vida no painel do estande (fração da página)
MCMV_CROP = (0.033, 0.874, 0.258, 0.972)


# --------------------------------------------------------------------------- etapas
def get_pdf_path(filename):
    if os.path.isabs(filename):
        return filename
    return os.path.abspath(os.path.join(SRC_BOOKS, filename))


def build_empreendimentos():
    print("\n[1/5] Imagens dos empreendimentos (extraídas dos books oficiais)")
    for slug, items in EMPREENDIMENTOS.items():
        pdf = get_pdf_path(BOOKS[slug])
        dest = os.path.join(OUT_IMG, slug)
        os.makedirs(dest, exist_ok=True)
        for name, xref in items:
            im = pdf_image(pdf, xref)
            if name == "card":
                save_jpg(im, os.path.join(dest, "card.jpg"), 1200, 800)
            else:
                save_jpg(im, os.path.join(dest, f"{name}.jpg"), 1600, 1000)


def build_hero():
    print("\n[2/5] Hero")
    slug, xref = HERO
    im = pdf_image(get_pdf_path(BOOKS[slug]), xref)
    save_jpg(im, os.path.join(OUT_IMG, "hero-casal.jpg"), 1588, 894)
    save_jpg(im, os.path.join(OUT_IMG, "hero-casal-mobile.jpg"), 900, 1100)


def build_partners():
    print("\n[3/5] Logos das construtoras e parceiros")
    for slug, filename in PARTNERS.items():
        src = os.path.join(SRC_PARTNERS, filename)
        im = trim(Image.open(src))
        im = fit_box(im, 460, 150)
        out = os.path.join(OUT_PARTNERS, f"{slug}.png")
        im.save(out, optimize=True)
        print(f"  {os.path.relpath(out, ROOT)}  {im.width}x{im.height}  ({filename})")

    # Minha Casa Minha Vida: vetor dentro do painel do estande -> render + recorte
    pdf = os.path.join(SRC_APOIO, "130X115 - LADO ESQUERDO DA TV.pdf")
    doc = fitz.open(pdf)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    full = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()
    x1, y1, x2, y2 = MCMV_CROP
    crop = full.crop((int(x1 * full.width), int(y1 * full.height),
                      int(x2 * full.width), int(y2 * full.height)))
    crop = fit_box(trim(white_to_alpha(crop)), 460, 150)
    out = os.path.join(OUT_PARTNERS, "mcmv.png")
    crop.save(out, optimize=True)
    print(f"  {os.path.relpath(out, ROOT)}  {crop.width}x{crop.height}  (painel do estande)")


def build_brand():
    print("\n[4/5] Marca Conrado e selo do Feirão")
    pairs = [
        (os.path.join(SRC_LOGO, "Design sem nome (2).png"), "conrado.png", (760, 460)),
        (os.path.join(SRC_LOGO, "LOGO FEIRÃO FUNDO TRANPARENTE", "Design sem nome (1).png"),
         "feirao-conrado.png", (1100, 1100)),
    ]
    for src, name, box in pairs:
        im = fit_box(trim(Image.open(src)), *box)
        out = os.path.join(OUT_LOGO, name)
        im.save(out, optimize=True)
        print(f"  {os.path.relpath(out, ROOT)}  {im.width}x{im.height}")


def build_icones():
    """Favicon, ícone de iOS e imagem de compartilhamento (WhatsApp, redes)."""
    print("\n[5/6] Favicon e imagem de compartilhamento")
    selo = Image.open(os.path.join(OUT_LOGO, "feirao-conrado.png")).convert("RGBA")

    for nome, lado, fundo in (("favicon.png", 64, (18, 17, 16, 255)),
                              ("apple-touch-icon.png", 180, (18, 17, 16, 255))):
        base = Image.new("RGBA", (lado, lado), fundo)
        marca = selo.copy()
        marca.thumbnail((int(lado * 0.78), int(lado * 0.78)), Image.LANCZOS)
        base.alpha_composite(marca, ((lado - marca.width) // 2, (lado - marca.height) // 2))
        out = os.path.join(ROOT, "assets", nome)
        base.save(out)
        print(f"  {os.path.relpath(out, ROOT)}  {lado}x{lado}")

    # og-image: hero + véu escuro + selo
    hero = pdf_image(os.path.join(SRC_BOOKS, BOOKS[HERO[0]]), HERO[1])
    og = cover(hero, 1200, 630).convert("RGBA")
    og.alpha_composite(Image.new("RGBA", og.size, (18, 17, 16, 130)))
    marca = selo.copy()
    marca.thumbnail((330, 330), Image.LANCZOS)
    og.alpha_composite(marca, (72, (630 - marca.height) // 2))
    out = os.path.join(OUT_IMG, "og-image.jpg")
    og.convert("RGB").save(out, **JPEG)
    print(f"  {os.path.relpath(out, ROOT)}  {os.path.getsize(out) // 1024} KB")


def build_books():
    print("\n[6/6] Books em PDF para download")
    for slug, filename in BOOKS.items():
        dst = os.path.join(OUT_BOOKS, f"{slug}.pdf")
        shutil.copyfile(os.path.join(SRC_BOOKS, filename), dst)
        print(f"  {os.path.relpath(dst, ROOT)}  {os.path.getsize(dst) // 1024} KB")


if __name__ == "__main__":
    ensure_dirs()
    build_empreendimentos()
    build_hero()
    build_partners()
    build_brand()
    build_icones()
    build_books()
    print("\nAssets prontos.")
