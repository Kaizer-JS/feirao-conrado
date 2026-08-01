import fitz  # PyMuPDF
from PIL import Image
import os

Image.MAX_IMAGE_PIXELS = None  # Disable decompression bomb limit for high-res PDF renders

os.makedirs("assets/logos", exist_ok=True)
os.makedirs("assets/images", exist_ok=True)

print("--- Step 1: Render PDF 130X115 (Partner Logos) ---")
pdf_path = r"MATERIAL DE APOIO\130X115 - LADO ESQUERDO DA TV.pdf"
doc = fitz.open(pdf_path)
page = doc[0]

# Render page to 2x scale
mat = fitz.Matrix(2, 2)
pix = page.get_pixmap(matrix=mat)
img_path = r"assets\logos\partners_page.png"
pix.save(img_path)
print("Saved partners page to", img_path)

img = Image.open(img_path)
width, height = img.size
print(f"Page dimensions: {width} x {height}")

# Crop top row logos (Tenda, MRV, Direcional, L.Marquezzo, Sertenge, Pejota, Santana, SingCred, Caixa)
top_y1 = int(height * 0.02)
top_y2 = int(height * 0.16)

box_width = width / 9.0

logos_top = [
    "tenda", "mrv", "direcional", "lmarquezzo", 
    "sertenge", "pejota", "santana", "singcred", "caixa"
]

for idx, name in enumerate(logos_top):
    x1 = int(idx * box_width)
    x2 = int((idx + 1) * box_width)
    cropped = img.crop((x1, top_y1, x2, top_y2))
    
    # Save logo
    save_path = f"assets/logos/partner-{name}.png"
    cropped.save(save_path)
    print(f"Extracted {name} logo -> {save_path}")

# Bottom row: Minha Casa Minha Vida (y=80% to y=98%)
bot_y1 = int(height * 0.80)
bot_y2 = int(height * 0.98)
mcmv_crop = img.crop((int(width * 0.02), bot_y1, int(width * 0.32), bot_y2))
mcmv_crop.save("assets/logos/partner-mcmv.png")
print("Extracted MCMV logo -> assets/logos/partner-mcmv.png")

print("\n--- Step 2: Render Real Property Renders from PDFs ---")

# 1. Vila Santiago (Page 7 - Main building render)
doc_santiago = fitz.open(r"EMPREENDIMENTOS\Book Oficial - Vila Santiago.pdf")
page_santiago = doc_santiago[6] # page 7
pix_santiago = page_santiago.get_pixmap(matrix=fitz.Matrix(2, 2))
pix_santiago.save(r"assets\images\vila-santiago-real.png")
print("Extracted Vila Santiago real render -> assets/images/vila-santiago-real.png")

# 2. Veneza Prime (Page 12 - Main fachada render)
doc_veneza = fitz.open(r"EMPREENDIMENTOS\Book Oficial - Veneza Prime.pdf")
page_veneza = doc_veneza[11] # page 12
pix_veneza = page_veneza.get_pixmap(matrix=fitz.Matrix(2, 2))
pix_veneza.save(r"assets\images\veneza-prime-real.png")
print("Extracted Veneza Prime real render -> assets/images/veneza-prime-real.png")

# 3. Parque dos Monarcas (Page 1 cover)
doc_monarcas = fitz.open(r"EMPREENDIMENTOS\PARQUE DOS MONARCAS.pdf")
page_monarcas = doc_monarcas[0] # page 1
pix_monarcas = page_monarcas.get_pixmap(matrix=fitz.Matrix(2, 2))
pix_monarcas.save(r"assets\images\parque-monarcas-real.png")
print("Extracted Parque dos Monarcas real render -> assets/images/parque-monarcas-real.png")

print("\n--- Step 3: Extract Master Hero Image & Couple from PHOTO-2026-07-31-10-04-09.jpg ---")
master_img = Image.open(r"MATERIAL DE APOIO\PHOTO-2026-07-31-10-04-09.jpg")
mw, mh = master_img.size

# Hero section in master photo
hero_crop = master_img.crop((0, 0, mw, int(mh * 0.28)))
hero_crop.save(r"assets\images\master-hero-bg.jpg")
print("Extracted Master Hero image -> assets/images/master-hero-bg.jpg")

# Couple right side
couple_crop = master_img.crop((int(mw * 0.65), 0, mw, int(mh * 0.28)))
couple_crop.save(r"assets\images\hero-couple-view.jpg")
print("Extracted Couple Hero image -> assets/images/hero-couple-view.jpg")

print("\n--- All Assets Extracted Successfully! ---")
