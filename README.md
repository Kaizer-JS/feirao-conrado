# Feirão Conrado — Landing Page

Página única de captação para o **Feirão Conrado — Minha Casa, Minha Conquista**.
HTML, CSS e JavaScript puros: sobe em qualquer hospedagem estática, sem build e sem dependências.

---

## O que precisa ser trocado antes de publicar

Tudo está em **um lugar só**: o bloco `CONFIG`, nas primeiras linhas de [js/main.js](js/main.js).

```js
const CONFIG = {
  whatsapp: "5571999999999",                        // ← número que recebe os cadastros (55 + DDD)
  telefone: "(71) 99999-9999",                      // ← telefone exibido no rodapé
  email: "contato@conradoimobiliaria.com.br",       // ← confirmar
  instagram: "conradoimobiliaria",                  // ← confirmar
  local: "",                                        // ← nome/endereço do stand (vazio = frase padrão)
  envio: "whatsapp",
  endpoint: "",
};
```

Os três primeiros são **placeholders** — o telefone `(71) 99999-9999` veio do protótipo e
precisa ser substituído pelo número real antes de o site ir ao ar.

### Para onde vão os cadastros

| `envio`      | O que acontece                                                                       |
| ------------ | ------------------------------------------------------------------------------------ |
| `"whatsapp"` | (padrão) abre o WhatsApp da imobiliária com os dados já escritos. Não exige servidor. |
| `"endpoint"` | envia por `POST` em JSON para a URL em `endpoint` (Formspree, Google Apps Script, CRM). |

Para usar um endpoint, troque as duas linhas:

```js
envio: "endpoint",
endpoint: "https://formspree.io/f/SEU_ID",
```

---

## Estrutura

```
index.html              página inteira
css/styles.css          design system em tokens + estilos das seções
js/main.js              CONFIG, dados dos empreendimentos, formulário, galeria, animações
tools/build_assets.py   gera todas as imagens a partir do material oficial
assets/
  img/                  fotos dos empreendimentos, hero, og-image
  logos/                marca Conrado, selo do Feirão
  logos/partners/       10 logos (9 construtoras/bancos + Minha Casa Minha Vida)
  books/                PDFs oficiais para download
_ARQUIVO-ANTIGO/        material descartado da versão anterior — pode apagar
```

Pastas de origem (`EMPREENDIMENTOS/`, `EMPRESAS PARCEIRAS/`, `LOGO/`, `MATERIAL DE APOIO/`,
`INSTRUÇÕES/`, `VIEOS/`) não são usadas pelo site; ficam como acervo do projeto.

---

## Imagens

Nenhuma imagem foi gerada por IA. Todas saem do material oficial pelo script:

```bash
python tools/build_assets.py
```

| Saída                       | Origem                                                     |
| --------------------------- | ---------------------------------------------------------- |
| `assets/img/<empreendimento>/` | imagens embutidas em alta resolução dos books em PDF     |
| `assets/img/hero-casal.jpg` | Book Veneza Prime, página 6                                |
| `assets/logos/partners/`    | `EMPRESAS PARCEIRAS/` (logos oficiais, recortadas e normalizadas) |
| `.../partners/mcmv.png`     | painel do estande `130X115 - LADO ESQUERDO DA TV.pdf`      |
| `assets/favicon.png`, `og-image.jpg` | selo do Feirão + foto do hero                     |

O script depende de `PyMuPDF` e `Pillow`:

```bash
pip install pymupdf pillow
```

### Trocar ou acrescentar um empreendimento

1. Coloque o book em `EMPREENDIMENTOS/`.
2. Descubra as imagens boas do PDF e anote página + `xref`.
3. Acrescente o bloco em `EMPREENDIMENTOS` no `tools/build_assets.py` e rode o script.
4. Copie um `<article class="imovel">` no `index.html` e o bloco correspondente em
   `EMPREENDIMENTOS` no `js/main.js` (ficha técnica, lazer, fotos, book).

---

## Rodar localmente

```bash
python -m http.server 8000
```

Depois abra <http://127.0.0.1:8000>. Abrir o `index.html` direto pelo Explorer também
funciona, mas o `<dialog>` da galeria fica mais fiel servido por HTTP.

---

## Conteúdo: de onde veio cada informação

- **Fichas técnicas** (área privativa, unidades, blocos, vagas, endereço) — páginas de ficha
  técnica dos books oficiais. Nenhum dado foi inventado.
- **Nenhum preço é exibido**: os books não trazem valores. Se a Conrado quiser publicar
  "a partir de R$ …", é só adicionar no card e no `js/main.js`.
- **Condições do feirão** (entrada em até 100x, sem tarifas bancárias, ITBI e documentação) —
  página 24 do book do Vila Santiago. Confirme se valem para todos os empreendimentos.
- **Datas (1 a 31 de agosto)** — protótipo aprovado. **Local do stand** ainda não foi
  informado: preencha `CONFIG.local`.

---

## Publicar

Suba o conteúdo da pasta (menos `_ARQUIVO-ANTIGO/` e as pastas de acervo) para a raiz da
hospedagem. Sem etapa de build.

**Atenção ao peso**: os books somam ~120 MB, sendo 90 MB só o do Parque dos Monarcas.
Se a hospedagem for limitada ou a conexão do visitante for fraca, vale trocar os PDFs em
`assets/books/` por versões comprimidas — o resto do site tem menos de 3 MB.
