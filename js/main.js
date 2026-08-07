/* =============================================================================
   FEIRÃO CONRADO — comportamento da página

   ┌──────────────────────────────────────────────────────────────────────────┐
   │  TROQUE OS DADOS DA IMOBILIÁRIA NO BLOCO "CONFIG" LOGO ABAIXO.           │
   │  É o único lugar do projeto com telefone, e-mail, Instagram e destino    │
   │  dos cadastros.                                                          │
   └──────────────────────────────────────────────────────────────────────────┘
   ============================================================================= */

const CONFIG = {
  // WhatsApp que recebe os cadastros — só números, com 55 + DDD.
  whatsapp: "5571999491927",

  // Contatos exibidos no rodapé.
  telefone: "(71) 99949-1927",
  email: "contato@conradoimobiliaria.com.br",
  instagram: "conradoimobiliaria",

  // Local do stand. Deixe vazio ("") para exibir só a frase padrão.
  local: "",

  /* Cole aqui a URL do seu formulário no Formspree (ex.: "https://formspree.io/f/xxxxxxxx").
     Com isso preenchido, todo cadastro fica guardado e chega por e-mail automaticamente —
     além de continuar abrindo o WhatsApp do corretor, como já acontecia. Vazio = só WhatsApp. */
  endpoint: "https://formspree.io/f/xykrqeyk",
};

/* ─────────────────────────────────────────────────────────── dados dos imóveis
   Tudo abaixo veio dos books oficiais em EMPREENDIMENTOS/. */
const EMPREENDIMENTOS = {
  "veneza-prime": {
    nome: "Veneza Prime",
    construtora: "Tenda",
    local: "Av. Aliomar Baleeiro, 2.137 — Vila Canária, Salvador/BA",
    ficha: {
      Quartos: "2",
      "Área privativa": "35,44 m²",
      Unidades: "855",
      Blocos: "3 (térreo + 17 pavimentos)",
      Vagas: "79 para carro e 24 para moto",
    },
    lazer: [
      "Piscina adulto e infantil",
      "Quadra descoberta",
      "Espaço saúde e fitness",
      "Salão de festas e churrasqueira gourmet",
      "Play kids, play baby e brinquedoteca",
      "Espaço teen, sport bar e espaço office",
      "Play pet e fitness externo",
    ],
    book: "assets/books/veneza-prime.pdf",
    fotos: [
      ["assets/img/veneza-prime/card.jpg", "Fachada"],
      ["assets/img/veneza-prime/01-fachada.jpg", "Fachada à noite"],
      ["assets/img/veneza-prime/02-portaria.jpg", "Portaria"],
      ["assets/img/veneza-prime/03-varanda.jpg", "Varanda"],
      ["assets/img/veneza-prime/04-area-externa.jpg", "Área externa"],
    ],
  },

  "vila-santiago": {
    nome: "Vila Santiago",
    construtora: "Tenda",
    local: "Rua Chile, 489 — Recreio Ipitanga, Lauro de Freitas/BA",
    ficha: {
      Quartos: "2",
      "Área privativa": "35,45 m²",
      Unidades: "356",
      Blocos: "3 (térreo + 9 pavimentos)",
      Plantas: "Com e sem varanda",
    },
    lazer: [
      "Piscina adulto e infantil",
      "Quadra de streetball",
      "Churrasqueira e salão de festas",
      "Play kids, play baby e play pet",
      "Múltipla estação e espaço office",
      "Bicicletário e carro compartilhado",
    ],
    book: "assets/books/vila-santiago.pdf",
    fotos: [
      ["assets/img/vila-santiago/card.jpg", "Portaria"],
      ["assets/img/vila-santiago/01-piscina.jpg", "Piscina"],
      ["assets/img/vila-santiago/02-churrasqueira.jpg", "Churrasqueira"],
      ["assets/img/vila-santiago/03-playground.jpg", "Play kids"],
      ["assets/img/vila-santiago/04-office.jpg", "Espaço office"],
    ],
  },

  "parque-dos-monarcas": {
    nome: "Parque dos Monarcas",
    construtora: "MRV",
    local: "Rua B, s/n — Mussurunga II, Salvador/BA",
    ficha: {
      Quartos: "2",
      "Área privativa": "41,40 m²",
      Unidades: "380",
      Vagas: "427 vagas de veículos",
      Terreno: "18.410,49 m²",
    },
    lazer: [
      "Piscinas adulto e infantil",
      "Salão de festas e espaço gourmet",
      "Playground e espaço kids",
      "Fitness descoberto",
      "Previsão de pomar",
      "Cancela de veículos e sensores de presença",
    ],
    book: "assets/books/parque-dos-monarcas.pdf",
    fotos: [
      ["assets/img/parque-dos-monarcas/card.jpg", "Fachada"],
      ["assets/img/parque-dos-monarcas/01-piscinas.jpg", "Piscinas"],
      ["assets/img/parque-dos-monarcas/02-gourmet.jpg", "Espaço gourmet"],
      ["assets/img/parque-dos-monarcas/03-salao-festas.jpg", "Salão de festas"],
      ["assets/img/parque-dos-monarcas/04-playground.jpg", "Playground"],
    ],
  },

  "conquista-vila-verde": {
    nome: "Conquista Vila Verde",
    construtora: "Direcional",
    local: "Av. Rio Paramirim, s/n — Abrantes, Camaçari/BA",
    ficha: {
      Quartos: "2 (com opção garden)",
      "Área privativa": "40,67 m² a 47,50 m²",
      Unidades: "680 (34 torres)",
      Blocos: "34 torres (térreo + 4)",
      Vagas: "339 carros e 75 motos",
      Terreno: "26.982,83 m²",
    },
    lazer: [
      "Piscina adulto com deck molhado e infantil",
      "Salão de festas com churrasqueira",
      "Playground e playbaby",
      "Espaço pet e área verde",
      "Quadra descoberta",
      "Espaço fitness, jogos e fresh",
      "Bicicletário e ponto de embarque",
    ],
    book: "assets/books/conquista-vila-verde.pdf",
    fotos: [
      ["assets/img/conquista-vila-verde/card.jpg", "Guarita e Fachada"],
      ["assets/img/conquista-vila-verde/01-piscina.jpg", "Piscinas adulto e infantil"],
      ["assets/img/conquista-vila-verde/02-salao-festas.jpg", "Salão de festas"],
      ["assets/img/conquista-vila-verde/03-playground.jpg", "Playground"],
      ["assets/img/conquista-vila-verde/04-quadra.jpg", "Quadra descoberta"],
    ],
  },

  "conquista-lauro-de-freitas": {
    nome: "Conquista Lauro de Freitas",
    construtora: "Direcional",
    local: "Lauro de Freitas/BA (próximo à Estrada do Coco)",
    ficha: {
      Quartos: "1 e 2 (com opção garden)",
      "Área privativa": "36,24 m² (garden até 48,62 m²)",
      Unidades: "520 (26 blocos)",
      Blocos: "26 blocos (térreo + 4)",
      Vagas: "260 carros, 29 motos e 52 bikes",
      Terreno: "22.793,39 m²",
    },
    lazer: [
      "Piscina adulto e infantil com deck",
      "Salão gourmet com área externa",
      "Quadra recreativa coberta",
      "Churrasqueiras com área coberta",
      "Fitness descoberto e espaço fresh",
      "Espaço pet, playground e playbaby",
      "Bicicletário e estação bike",
      "Redário, espaço zen e espaço yoga",
    ],
    book: "assets/books/conquista-lauro-de-freitas.pdf",
    fotos: [
      ["assets/img/conquista-lauro-de-freitas/card.jpg", "Fachada das Torres"],
      ["assets/img/conquista-lauro-de-freitas/01-piscina.jpg", "Piscina adulto e infantil"],
      ["assets/img/conquista-lauro-de-freitas/02-playground.jpg", "Playground"],
      ["assets/img/conquista-lauro-de-freitas/03-pet.jpg", "Espaço Pet"],
      ["assets/img/conquista-lauro-de-freitas/04-gourmet.jpg", "Salão Gourmet"],
    ],
  },

  "morada-das-estacoes": {
    nome: "Morada das Estações",
    construtora: "Tenda",
    local: "Av. Aliomar Baleeiro, 13.371 — São Cristóvão, Salvador/BA",
    ficha: {
      Quartos: "2",
      "Área privativa": "38,54 m² a 38,73 m²",
      Unidades: "679 (34 reversíveis PCD)",
      Blocos: "6 torres (térreo + 9 a 12)",
      Vagas: "157 vagas no total",
      Terreno: "29.341,97 m²",
    },
    lazer: [
      "Quadra gramada e funcional externo",
      "Play kids e play baby",
      "Espaço delivery e espaço oficina",
      "Salão de festas com coworking",
      "Salão de festas gourmet e churrasqueira",
      "Horta / espaço cultivo e praça dos sabores",
      "Bicicletários e vaga de carro compartilhado",
      "Sugestão de espaço para minimercado",
    ],
    book: "assets/books/morada-das-estacoes.pdf",
    fotos: [
      ["assets/img/morada-das-estacoes/card.jpg", "Vista Aérea"],
      ["assets/img/morada-das-estacoes/01-churrasqueira.jpg", "Churrasqueira"],
      ["assets/img/morada-das-estacoes/02-quadra.jpg", "Quadra gramada"],
      ["assets/img/morada-das-estacoes/03-playground.jpg", "Play kids"],
      ["assets/img/morada-das-estacoes/04-salao-festas.jpg", "Salão de festas gourmet"],
    ],
  },

  "encanto-piata": {
    nome: "Encanto Piatã",
    construtora: "Tenda",
    local: "Rua Colina das Esmeraldas, 163 — Piatã, Salvador/BA",
    ficha: {
      Quartos: "2",
      "Área privativa": "38,54 m² a 38,73 m²",
      Unidades: "1.611 (81 reversíveis PCD)",
      Blocos: "8 torres (térreo + 15 pavimentos)",
      Vagas: "425 (310 carros, 98 motos, 17 PCD)",
      Terreno: "24.061,27 m²",
    },
    lazer: [
      "Primeiro Tenda com 15 andares em Salvador",
      "Salão de festas com coworking e gourmet",
      "Espaço saúde, fitness e fitness externo",
      "Brinquedoteca, play kids e play baby",
      "Play pet e sport bar",
      "Espaço teen e espaço oficina",
      "Quadras cobertas e espaço delivery",
      "Wi-Fi nas áreas comuns e minimercado",
    ],
    book: "assets/books/encanto-piata.pdf",
    fotos: [
      ["assets/img/encanto-piata/card.jpg", "Vista das Torres (15 andares)"],
      ["assets/img/encanto-piata/01-portaria.jpg", "Portaria 24h"],
      ["assets/img/encanto-piata/02-salao-festas.jpg", "Salão de festas com coworking"],
      ["assets/img/encanto-piata/03-brinquedoteca.jpg", "Brinquedoteca"],
      ["assets/img/encanto-piata/04-sportbar.jpg", "Sport Bar"],
    ],
  },
};

/* ══════════════════════════════════════════════════ contatos vindos do CONFIG */
function aplicarConfig() {
  const zap = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    "Olá! Vim pela página do Feirão Conrado e quero saber mais."
  )}`;

  document.querySelectorAll("[data-config]").forEach((el) => {
    switch (el.dataset.config) {
      case "whatsapp":
        el.href = zap;
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
        if (CONFIG.local) el.innerHTML = `<strong>${CONFIG.local}</strong>`;
        break;
    }
  });

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════════════════ cabeçalho */
function iniciarCabecalho() {
  const cabecalho = document.querySelector(".cabecalho");
  const botao = document.querySelector(".cabecalho__menu");
  const menu = document.getElementById("menu-mobile");

  const marcarRolagem = () => {
    cabecalho.toggleAttribute("data-fixo", window.scrollY > 12);
  };
  marcarRolagem();
  window.addEventListener("scroll", marcarRolagem, { passive: true });

  const fecharMenu = () => {
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
    menu.hidden = true;
  };

  botao.addEventListener("click", () => {
    const aberto = botao.getAttribute("aria-expanded") === "true";
    if (aberto) {
      fecharMenu();
    } else {
      botao.setAttribute("aria-expanded", "true");
      botao.setAttribute("aria-label", "Fechar menu");
      menu.hidden = false;
    }
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fecharMenu));
  window.addEventListener("keydown", (e) => e.key === "Escape" && fecharMenu());

  /* Ao girar o tablet de retrato para paisagem (ou alargar a janela), o menu
     sanfonado some do CSS mas continuaria marcado como aberto — e o botão que
     fecha ele já não aparece mais. Fecha junto para o estado não ficar preso. */
  const larguraMenu = window.matchMedia("(min-width: 861px)");
  const aoPassarDoLimite = (e) => {
    if (e.matches) fecharMenu();
  };
  if (larguraMenu.addEventListener) {
    larguraMenu.addEventListener("change", aoPassarDoLimite);
  } else {
    larguraMenu.addListener(aoPassarDoLimite); // Safari antigo
  }
}

/* ════════════════════════════════════════════════════════ revelação ao rolar */
function iniciarRevelacao() {
  const alvos = document.querySelectorAll("[data-revelar]");
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (semMovimento || !("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("visivel"));
    return;
  }

  /* threshold 0 (e não 0.12) por causa do celular: os blocos de detalhe passam
     de 2.400px de altura numa tela de 844px, então "12% do elemento visível"
     só acontecia depois de ~290px de rolagem — o visitante via uma faixa preta
     vazia antes do conteúdo aparecer. Com 0, revela assim que o bloco encosta
     na área visível, em qualquer altura de elemento. */
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 }
  );

  alvos.forEach((el) => observador.observe(el));

  /* Rede de segurança: se a página abrir já rolada (recarregar no meio, voltar
     pelo histórico, link direto para uma seção) ou se a pessoa passar rápido
     demais por um trecho, o observer pode não registrar a entrada e o bloco
     ficaria invisível para sempre. Aqui, tudo que já passou pela tela aparece.
     O ouvinte se remove sozinho quando não sobra mais nada escondido. */
  const revelarOQueJaPassou = () => {
    document.querySelectorAll("[data-revelar]:not(.visivel)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("visivel");
        observador.unobserve(el);
      }
    });
    if (!document.querySelector("[data-revelar]:not(.visivel)")) {
      window.removeEventListener("scroll", aoRolar);
    }
  };

  let agendado = false;
  const aoRolar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      revelarOQueJaPassou();
    });
  };

  window.addEventListener("scroll", aoRolar, { passive: true });
  window.addEventListener("load", revelarOQueJaPassou);
}

/* ══════════════════════════════════════════════════ acordeão "como funciona"
   Só um passo fica aberto por vez; o trilho dourado ao lado acompanha o
   passo ativo para reforçar a ideia de percurso (do cadastro até as chaves). */
function iniciarAcordeaoPassos() {
  const lista = document.querySelector("[data-acordeao]");
  if (!lista) return;

  const itens = Array.from(lista.querySelectorAll(".passo"));
  const preenchido = lista.querySelector(".passos__trilho-preenchido");

  const atualizarTrilho = () => {
    const ativo = lista.querySelector(".passo.is-ativo .passo__num");
    if (!preenchido || !ativo) return;
    preenchido.style.height = `${ativo.offsetTop + ativo.offsetHeight / 2}px`;
  };

  itens.forEach((item) => {
    const botao = item.querySelector(".passo__cabeca");
    botao.addEventListener("click", () => {
      if (item.classList.contains("is-ativo")) return;
      itens.forEach((outro) => {
        outro.classList.remove("is-ativo");
        outro.querySelector(".passo__cabeca").setAttribute("aria-expanded", "false");
      });
      item.classList.add("is-ativo");
      botao.setAttribute("aria-expanded", "true");
      atualizarTrilho();
    });
  });

  atualizarTrilho();
  window.addEventListener("resize", atualizarTrilho);
}

/* ═══════════════════════════════════════════════════════ carrossel de logos
   A esteira roda sozinha (CSS @keyframes correr), mas a pessoa pode segurar
   e arrastar para o lado a qualquer momento — no dedo ou no mouse. Ao soltar,
   a rolagem automática retoma exatamente do ponto onde parou, sem pular. */
function iniciarEsteiras() {
  document.querySelectorAll("[data-esteira]").forEach((esteira) => {
    const fita = esteira.querySelector(".esteira__fita");
    if (!fita) return;

    // velocidade constante (~55px/s) independente da largura do trilho
    const ajustarDuracao = () => {
      const largura = fita.scrollWidth / 2;
      fita.style.setProperty("--duracao", `${Math.max(18, largura / 55)}s`);
    };
    ajustarDuracao();
    window.addEventListener("resize", ajustarDuracao);

    let arrastando = false;
    let ponteiroId = null;
    let inicioX = 0;
    let distanciaInicial = 0; // px já percorridos no ciclo no momento em que o arraste começou
    // Enquanto arrasta, a animação é desligada (ver .esteira--arrastando no CSS)
    // e o transform computado deixa de refletir onde a fita está — por isso a
    // posição atual é guardada aqui em vez de ser relida do DOM.
    let distanciaCorrente = 0;

    // distância total de um ciclo: a lista aparece duplicada (a segunda cópia
    // é só para o loop ficar contínuo), então metade da largura é um ciclo.
    const larguraCiclo = () => fita.scrollWidth / 2;

    const distanciaAtual = () => {
      const matriz = new DOMMatrixReadOnly(getComputedStyle(fita).transform);
      return -matriz.m41; // translateX é negativo; guardamos como distância positiva
    };

    const iniciar = (evento) => {
      if (evento.pointerType === "mouse" && evento.button !== 0) return;
      arrastando = true;
      ponteiroId = evento.pointerId;
      inicioX = evento.clientX;
      // lê a posição ANTES de desligar a animação — depois da classe entrar, o
      // transform computado não reflete mais onde a fita está.
      distanciaInicial = distanciaAtual();
      distanciaCorrente = distanciaInicial;
      esteira.classList.add("esteira--arrastando");
      // reaplica a posição como inline para a fita não saltar para o começo
      // no instante em que a animação é desligada.
      fita.style.transform = `translateX(${-distanciaInicial}px)`;
      try {
        // mantém o arraste funcionando mesmo se o dedo sair da área da esteira
        esteira.setPointerCapture(ponteiroId);
      } catch {
        // alguns navegadores recusam capturar um ponteiro fora do padrão —
        // sem problema, o arraste continua funcionando enquanto o dedo
        // estiver sobre o elemento.
      }
    };

    const mover = (evento) => {
      if (!arrastando || evento.pointerId !== ponteiroId) return;
      const ciclo = larguraCiclo();
      if (!ciclo) return;
      const delta = evento.clientX - inicioX; // arrastar p/ direita = delta positivo
      let distancia = distanciaInicial - delta; // arrastar p/ direita recua a esteira
      distancia = ((distancia % ciclo) + ciclo) % ciclo; // sempre "infinito", nas duas direções
      distanciaCorrente = distancia;
      fita.style.transform = `translateX(${-distancia}px)`;
    };

    const soltar = (evento) => {
      if (!arrastando || evento.pointerId !== ponteiroId) return;
      arrastando = false;
      try {
        esteira.releasePointerCapture(ponteiroId);
      } catch {
        // nada a liberar se a captura não tiver sido estabelecida
      }
      const ciclo = larguraCiclo();

      // ordem importa: zera o inline e só então religa a animação, senão a
      // fita pisca de volta na posição antiga por um quadro.
      fita.style.transform = "";
      esteira.classList.remove("esteira--arrastando");

      // Reposiciona a animação recém-religada no ponto exato onde o dedo
      // soltou. Tem que ser pela Web Animations API: com animation-delay
      // negativo não funciona, porque o atalho "animation: ... !important" do
      // CSS traz um animation-delay: 0s !important que ganha do inline — e
      // forçar o inline com "important" deixa a animação presa em estado
      // pendente (startTime nulo), congelando a esteira de vez.
      const animacao = fita.getAnimations()[0];
      if (animacao && ciclo) {
        const duracao = animacao.effect.getTiming().duration;
        animacao.currentTime = (distanciaCorrente / ciclo) * duracao;
      }
    };

    esteira.addEventListener("pointerdown", iniciar);
    esteira.addEventListener("pointermove", mover);
    esteira.addEventListener("pointerup", soltar);
    esteira.addEventListener("pointercancel", soltar);
  });
}

/* ═══════════════════════════════════════ contagem animada dos números do feirão
   Conta uma única vez, quando a barra aparece, e o número FICA no valor final.
   Antes ele voltava para zero toda vez que a barra saía da tela — na prática
   os números passavam quase todo o tempo mostrando "+0 / 0% / R$ 0 mil / 0+". */
function iniciarContadores() {
  const grupos = document.querySelectorAll("[data-contador-grupo]");
  if (!grupos.length) return;

  const milhar = new Intl.NumberFormat("pt-BR");

  const escrever = (el, valor) => {
    const numero = el.dataset.formato === "milhar" ? milhar.format(valor) : String(valor);
    el.textContent = `${el.dataset.prefixo || ""}${numero}${el.dataset.sufixo || ""}`;
  };

  const DURACAO = 1600; // 1.6s de animação fluida

  const animarGrupo = (grupo) => {
    const itens = grupo.querySelectorAll("[data-contador]");
    itens.forEach((el) => {
      const alvo = Number(el.dataset.valor) || 0;
      const comeco = performance.now();

      el.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      el.style.transform = "scale(1.15)";
      setTimeout(() => {
        el.style.transform = "scale(1)";
      }, 400);

      const passo = (agora) => {
        const t = Math.min((agora - comeco) / DURACAO, 1);
        const suave = 1 - Math.pow(1 - t, 3);
        escrever(el, Math.round(alvo * suave));
        if (t < 1) {
          requestAnimationFrame(passo);
        } else {
          escrever(el, alvo);
        }
      };

      requestAnimationFrame(passo);
    });
  };

  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (semMovimento || !("IntersectionObserver" in window)) {
    grupos.forEach((grupo) => {
      grupo.querySelectorAll("[data-contador]").forEach((el) =>
        escrever(el, Number(el.dataset.valor) || 0)
      );
    });
    return;
  }

  grupos.forEach((grupo) => {
    let animado = false;

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            animarGrupo(grupo);
            animado = true;
          } else if (animado) {
            // Reseta quando sai da tela para re-animar se o usuário voltar a rolar
            grupo.querySelectorAll("[data-contador]").forEach((el) => escrever(el, 0));
            animado = false;
          }
        });
      },
      { threshold: 0.2 }
    );

    // Começa zerado
    grupo.querySelectorAll("[data-contador]").forEach((el) => escrever(el, 0));
    observador.observe(grupo);
  });
}

/* ═══════════════════════════════ vídeo mudo, em loop, com play/pause do usuário */
function iniciarVideoMudo() {
  const videos = document.querySelectorAll("[data-video-mudo]");
  if (!videos.length) return;

  const tocar = (video) => {
    video.muted = true; // exigido pelos navegadores para o autoplay
    video.play?.().catch(() => {
      // Se o navegador bloquear o autoplay, tenta no primeiro toque na página.
      const destravar = () => video.play?.().catch(() => {});
      window.addEventListener("pointerdown", destravar, { once: true });
      window.addEventListener("touchstart", destravar, { once: true });
    });
  };

  videos.forEach((video) => {
    video.muted = true;
    video.volume = 0;

    // O som fica desativado para sempre: se algo tentar religar, volta ao mudo.
    video.addEventListener("volumechange", () => {
      if (!video.muted || video.volume > 0) {
        video.muted = true;
        video.volume = 0;
      }
    });

    const alternar = () => {
      if (video.paused) {
        video.muted = true;
        video.play?.().catch(() => {});
      } else {
        video.pause();
      }
    };

    // Clicar no próprio vídeo pausa e continua.
    video.addEventListener("click", alternar);

    // Estado no contêiner: controla o ícone de play/pause pelo CSS.
    const caixa = video.closest("[data-video-caixa]");
    const marcarEstado = () => {
      if (caixa) caixa.dataset.estado = video.paused ? "pausado" : "tocando";
    };
    video.addEventListener("play", marcarEstado);
    video.addEventListener("pause", marcarEstado);
    marcarEstado();

    // Continua rodando mesmo quando a pessoa desce para as seções de baixo.
    tocar(video);
  });

  // Botão de play/pause sobre o vídeo.
  document.querySelectorAll("[data-video-toggle]").forEach((botao) => {
    const video = document.getElementById(botao.dataset.videoToggle);
    if (!video) return;

    // Qual ícone aparece é decidido pelo CSS, via data-estado do contêiner.
    const sincronizar = () => {
      botao.setAttribute("aria-label", video.paused ? "Reproduzir vídeo" : "Pausar vídeo");
    };

    botao.addEventListener("click", (evento) => {
      evento.stopPropagation(); // não deixa o clique chegar duas vezes no vídeo
      if (video.paused) {
        video.muted = true;
        video.play?.().catch(() => {});
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", sincronizar);
    video.addEventListener("pause", sincronizar);
    sincronizar();
  });
}

/* ═════════════════════════════════════════════════════════════════ galeria */
function iniciarGaleria() {
  const dialogo = document.getElementById("galeria");
  if (!dialogo || typeof dialogo.showModal !== "function") return;

  const foto = document.getElementById("galeria-foto");
  const legenda = document.getElementById("galeria-legenda");
  const contador = document.getElementById("galeria-contador");
  let atual = null;
  let indice = 0;

  const mostrarFoto = () => {
    const [src, texto] = atual.fotos[indice];
    foto.src = src;
    foto.alt = `${texto} — ${atual.nome}`;
    legenda.textContent = texto;
    contador.textContent = `${indice + 1}/${atual.fotos.length}`;
  };

  const abrir = (chave) => {
    atual = EMPREENDIMENTOS[chave];
    if (!atual) return;
    indice = 0;

    document.getElementById("galeria-construtora").textContent = atual.construtora;
    document.getElementById("galeria-nome").textContent = atual.nome;
    document.getElementById("galeria-local").textContent = atual.local;
    document.getElementById("galeria-book").href = atual.book;

    document.getElementById("galeria-ficha").innerHTML = Object.entries(atual.ficha)
      .map(([rotulo, valor]) => `<div><dt>${rotulo}</dt><dd>${valor}</dd></div>`)
      .join("");

    document.getElementById("galeria-lazer").innerHTML = atual.lazer
      .map((item) => `<li>${item}</li>`)
      .join("");

    mostrarFoto();
    dialogo.showModal();
    document.body.style.overflow = "hidden";
  };

  const passar = (passo) => {
    indice = (indice + passo + atual.fotos.length) % atual.fotos.length;
    mostrarFoto();
  };

  document.querySelectorAll("[data-abrir-imovel]").forEach((botao) => {
    botao.addEventListener("click", () => abrir(botao.dataset.abrirImovel));
  });

  dialogo.querySelectorAll("[data-galeria-passo]").forEach((botao) => {
    botao.addEventListener("click", () => passar(Number(botao.dataset.galeriaPasso)));
  });

  dialogo.querySelectorAll("[data-fechar-galeria]").forEach((botao) => {
    botao.addEventListener("click", () => dialogo.close());
  });

  dialogo.addEventListener("click", (e) => {
    if (e.target === dialogo) dialogo.close();
  });

  dialogo.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") passar(1);
    if (e.key === "ArrowLeft") passar(-1);
  });

  dialogo.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
}

/* ════════════════════════════════════════════════════════════════ formulário */
function iniciarFormulario() {
  const form = document.getElementById("formulario-lead");
  if (!form) return;

  const sucesso = document.getElementById("formulario-sucesso");
  const telefone = form.elements.telefone;

  const REGRAS = {
    nome: (v) => (v.trim().split(/\s+/).length >= 2 ? "" : "Escreva seu nome e sobrenome."),
    telefone: (v) =>
      v.replace(/\D/g, "").length >= 10 ? "" : "Informe um WhatsApp com DDD.",
    cidade: (v) => (v.trim().length >= 2 ? "" : "Informe a cidade onde você mora."),
    bairro: (v) => (v.trim().length >= 2 ? "" : "Informe o seu bairro."),
    renda: (v) => (v ? "" : "Selecione a faixa de renda da família."),
    aceite: (_, campo) => (campo.checked ? "" : "Precisamos da sua autorização para o contato."),
  };

  const mostrarErro = (nome, mensagem) => {
    const campo = form.elements[nome];
    const alvo = form.querySelector(`[data-erro-de="${nome}"]`);
    if (alvo) alvo.textContent = mensagem;
    campo.setAttribute("aria-invalid", mensagem ? "true" : "false");
    return !mensagem;
  };

  // máscara de telefone brasileira
  telefone.addEventListener("input", () => {
    const d = telefone.value.replace(/\D/g, "").slice(0, 11);
    telefone.value = d.length <= 2 ? d
      : d.length <= 6 ? `(${d.slice(0, 2)}) ${d.slice(2)}`
      : d.length <= 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
      : `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  });

  Object.keys(REGRAS).forEach((nome) => {
    const campo = form.elements[nome];
    campo.addEventListener("blur", () => {
      if (campo.value || campo.type === "checkbox") {
        mostrarErro(nome, REGRAS[nome](campo.value, campo));
      }
    });
  });

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    let primeiroErro = null;
    Object.keys(REGRAS).forEach((nome) => {
      const campo = form.elements[nome];
      const ok = mostrarErro(nome, REGRAS[nome](campo.value, campo));
      if (!ok && !primeiroErro) primeiroErro = campo;
    });

    if (primeiroErro) {
      primeiroErro.focus();
      primeiroErro.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const dados = {
      nome: form.elements.nome.value.trim(),
      telefone: form.elements.telefone.value.trim(),
      cidade: form.elements.cidade.value.trim(),
      bairro: form.elements.bairro.value.trim(),
      renda: form.elements.renda.value,
      corretor: form.elements.corretor.value.trim() || "não informado",
      autorizou_contato: form.elements.aceite.checked ? "Sim" : "Não",
      origem: "Landing page — Feirão Conrado",
      _subject: "Novo cadastro — Feirão Conrado",
    };

    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;
    botao.textContent = "Enviando...";

    try {
      // Guarda o cadastro no Formspree (ou outro endpoint configurado). Se falhar,
      // não trava o fluxo: o WhatsApp abaixo já garante que o corretor recebe o lead.
      // O Formspree só aceita form-data — não JSON — por isso o FormData aqui.
      if (CONFIG.endpoint) {
        const corpo = new FormData();
        Object.entries(dados).forEach(([chave, valor]) => corpo.append(chave, valor));
        fetch(CONFIG.endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: corpo,
        }).catch(() => {});
      }

      const texto = [
        "*Novo cadastro — Feirão Conrado*",
        `Nome: ${dados.nome}`,
        `WhatsApp: ${dados.telefone}`,
        `Cidade: ${dados.cidade}`,
        `Bairro: ${dados.bairro}`,
        `Renda familiar: ${dados.renda}`,
        `Atendido por: ${dados.corretor}`,
      ].join("\n");
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");

      form.hidden = true;
      sucesso.hidden = false;
      sucesso.querySelector("h3").focus?.();
      sucesso.scrollIntoView({ block: "center", behavior: "smooth" });
    } catch (erro) {
      botao.disabled = false;
      botao.textContent = "Quero ser contatado";
      const alvo = form.querySelector('[data-erro-de="aceite"]');
      alvo.textContent = "Não conseguimos enviar agora. Tente de novo ou chame a gente no WhatsApp.";
    }
  });

  document.getElementById("novo-cadastro")?.addEventListener("click", () => {
    form.reset();
    form.querySelectorAll(".campo__erro").forEach((p) => (p.textContent = ""));
    form.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = false;
    botao.textContent = "Quero ser contatado";
    sucesso.hidden = true;
    form.hidden = false;
    form.elements.nome.focus();
  });
}

/* ═════════════════════════════════════════════════════════════════════ início */
document.addEventListener("DOMContentLoaded", () => {
  aplicarConfig();
  iniciarCabecalho();
  iniciarRevelacao();
  iniciarAcordeaoPassos();
  iniciarEsteiras();
  iniciarContadores();
  iniciarVideoMudo();
  iniciarGaleria();
  iniciarFormulario();
});
