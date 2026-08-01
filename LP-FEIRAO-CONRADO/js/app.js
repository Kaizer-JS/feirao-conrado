/* =============================================================================
   FEIRÃO CONRADO — comportamento da página

   ┌────────────────────────────────────────────────────────────────────────┐
   │ TROQUE OS DADOS DA IMOBILIÁRIA AQUI EMBAIXO. É O ÚNICO LUGAR DO SITE   │
   │ com telefone, e-mail, Instagram, local do stand e destino dos leads.   │
   └────────────────────────────────────────────────────────────────────────┘
   ============================================================================= */

const CONFIG = {
  whatsapp: "5571999999999",                   // número que recebe os cadastros: 55 + DDD + número
  telefone: "(71) 99999-9999",                 // exibido no rodapé
  email: "contato@conradoimobiliaria.com.br",
  instagram: "conradoimobiliaria",
  local: "",                                   // ex.: "Parque Shopping Bahia" — vazio usa a frase padrão

  // "whatsapp" abre a conversa com os dados preenchidos · "endpoint" envia POST em JSON
  envio: "whatsapp",
  endpoint: "",
};

/* ══════════════════════════════════════════════════════ contatos do rodapé */
function aplicarConfig() {
  const conversa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    "Olá! Vim pela página do Feirão Conrado e quero saber mais."
  )}`;

  document.querySelectorAll("[data-config]").forEach((el) => {
    switch (el.dataset.config) {
      case "whatsapp":
        el.href = conversa;
        break;
      case "telefone":
        el.href = `tel:+${CONFIG.whatsapp}`;
        el.textContent = CONFIG.telefone;
        break;
      case "email":
        el.href = `mailto:${CONFIG.email}`;
        el.textContent = CONFIG.email;
        break;
      case "instagram":
        el.href = `https://instagram.com/${CONFIG.instagram}`;
        el.textContent = `@${CONFIG.instagram}`;
        break;
      case "local":
        if (CONFIG.local) el.innerHTML = `<em>${CONFIG.local}</em>`;
        break;
    }
  });

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════════ topo e gaveta */
function iniciarTopo() {
  const topo = document.querySelector(".topo");
  const botao = document.querySelector(".topo__menu");
  const gaveta = document.getElementById("gaveta");

  const marcar = () => topo.toggleAttribute("data-preso", window.scrollY > 12);
  marcar();
  window.addEventListener("scroll", marcar, { passive: true });

  const fechar = () => {
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
    gaveta.hidden = true;
  };

  botao.addEventListener("click", () => {
    if (botao.getAttribute("aria-expanded") === "true") return fechar();
    botao.setAttribute("aria-expanded", "true");
    botao.setAttribute("aria-label", "Fechar menu");
    gaveta.hidden = false;
  });

  gaveta.querySelectorAll("a").forEach((a) => a.addEventListener("click", fechar));
  window.addEventListener("keydown", (e) => e.key === "Escape" && fechar());
}

/* ═════════════════════════════════════════════════════ revelação ao rolar */
function iniciarSurgimento() {
  const alvos = document.querySelectorAll("[data-surge]");
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (semMovimento || !("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("visto"));
    return;
  }

  const olho = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visto");
        olho.unobserve(e.target);
      }),
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
  );

  alvos.forEach((el) => olho.observe(el));
}

/* ═════════════════════════════════ esteira de logos (loop infinito) ══════
   Velocidade constante em qualquer largura de tela: ~46 px/s.
   O hover desacelera (regra em CSS), como no componente de referência. */
function iniciarEsteira() {
  const esteira = document.querySelector("[data-esteira]");
  if (!esteira) return;

  const fita = esteira.querySelector(".esteira__fita");
  const ajustar = () => {
    const largura = fita.scrollWidth / 2;
    if (largura) fita.style.setProperty("--duracao", `${Math.max(24, largura / 46)}s`);
  };

  ajustar();
  window.addEventListener("resize", ajustar);
  // as logos entram com lazy/decodificação assíncrona: reajusta quando terminarem
  fita.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", ajustar, { once: true });
  });
}

/* ═════════════════════════════════════════════════════════════ formulário */
function iniciarFormulario() {
  const forma = document.getElementById("forma");
  if (!forma) return;

  const ok = document.getElementById("forma-ok");
  const zap = forma.elements.zap;
  const botao = forma.querySelector('button[type="submit"]');

  const REGRAS = {
    nome: (v) => (v.trim().split(/\s+/).length >= 2 ? "" : "Escreva seu nome e sobrenome."),
    zap: (v) => (v.replace(/\D/g, "").length >= 10 ? "" : "Informe um WhatsApp com DDD."),
    cidade: (v) => (v.trim().length >= 2 ? "" : "Informe a cidade onde você mora."),
    bairro: (v) => (v.trim().length >= 2 ? "" : "Informe o seu bairro."),
    renda: (v) => (v ? "" : "Selecione a faixa de renda da família."),
    aceite: (_, campo) => (campo.checked ? "" : "Precisamos da sua autorização para o contato."),
  };

  const avisar = (nome, mensagem) => {
    const campo = forma.elements[nome];
    const alvo = forma.querySelector(`[data-erro="${nome}"]`);
    if (alvo) alvo.textContent = mensagem;
    campo.setAttribute("aria-invalid", mensagem ? "true" : "false");
    return !mensagem;
  };

  zap.addEventListener("input", () => {
    const d = zap.value.replace(/\D/g, "").slice(0, 11);
    zap.value =
      d.length <= 2 ? d
      : d.length <= 6 ? `(${d.slice(0, 2)}) ${d.slice(2)}`
      : d.length <= 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
      : `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  });

  Object.keys(REGRAS).forEach((nome) => {
    const campo = forma.elements[nome];
    campo.addEventListener("blur", () => {
      if (campo.value || campo.type === "checkbox") avisar(nome, REGRAS[nome](campo.value, campo));
    });
  });

  forma.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    let primeiro = null;
    Object.keys(REGRAS).forEach((nome) => {
      const campo = forma.elements[nome];
      if (!avisar(nome, REGRAS[nome](campo.value, campo)) && !primeiro) primeiro = campo;
    });

    if (primeiro) {
      primeiro.focus();
      primeiro.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const dados = {
      nome: forma.elements.nome.value.trim(),
      whatsapp: forma.elements.zap.value.trim(),
      cidade: forma.elements.cidade.value.trim(),
      bairro: forma.elements.bairro.value.trim(),
      renda: forma.elements.renda.value,
      corretor: forma.elements.corretor.value.trim() || "não informado",
      origem: "Landing page — Feirão Conrado",
    };

    botao.disabled = true;
    botao.textContent = "Enviando...";

    try {
      if (CONFIG.envio === "endpoint" && CONFIG.endpoint) {
        const resposta = await fetch(CONFIG.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(dados),
        });
        if (!resposta.ok) throw new Error(resposta.statusText);
      } else {
        const texto = [
          "*Novo cadastro — Feirão Conrado*",
          `Nome: ${dados.nome}`,
          `WhatsApp: ${dados.whatsapp}`,
          `Cidade: ${dados.cidade}`,
          `Bairro: ${dados.bairro}`,
          `Renda familiar: ${dados.renda}`,
          `Atendido por: ${dados.corretor}`,
        ].join("\n");
        window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
      }

      forma.hidden = true;
      ok.hidden = false;
      ok.focus();
    } catch (erro) {
      botao.disabled = false;
      botao.textContent = "Quero ser contatado";
      forma.querySelector('[data-erro="aceite"]').textContent =
        "Não conseguimos enviar agora. Tente de novo ou chame a gente no WhatsApp.";
    }
  });

  document.getElementById("outro")?.addEventListener("click", () => {
    forma.reset();
    forma.querySelectorAll(".campo__erro").forEach((p) => (p.textContent = ""));
    forma.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
    botao.disabled = false;
    botao.textContent = "Quero ser contatado";
    ok.hidden = true;
    forma.hidden = false;
    forma.elements.nome.focus();
  });
}

/* ═════════════════════════════════════════════════════════════════ início */
document.addEventListener("DOMContentLoaded", () => {
  aplicarConfig();
  iniciarTopo();
  iniciarSurgimento();
  iniciarEsteira();
  iniciarFormulario();
});
