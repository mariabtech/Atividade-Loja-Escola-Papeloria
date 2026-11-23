/**
 * Catálogo oficial de produtos inéditos da Papeloria.
 * Fonte única de verdade compartilhada entre vitrine, detalhes, checkout e confirmação.
 */
const PRODUTOS_PAPELORIA = [
  {
    id: 1,
    nome: "Lápis Telescópico de Bolso Infinito",
    categoria: "Escrita Portátil",
    regra: "Caber em um bolso",
    preco: 42.90,
    descricaoCurta: "Parece um cotoco de 4 cm, mas estica até 12 metros de grafite que nunca perde a ponta.",
    descricaoDetalhada:
      "Projetado com engenharia de dobra espacial, este lápis cabe confortavelmente no menor bolso da calça e se expande com um leve giro. Seu núcleo de grafite autorregenerativo mantém a ponta sempre afiada sem gerar raspas.",
    especificacoes: [
      "Dimensões fechado: 4,0 cm x 0,8 cm (aberto: até 12 metros)",
      "Material: Madeira de cedro compressível e grafite estelar",
      "Modo de uso: Gire a borracha rosa no sentido horário para expandir",
      "Peso: 9 gramas"
    ],
    altImagem: "Ilustração de um pequeno lápis amarelo com borracha rosa e anéis telescópicos que se estendem",
    ilustracaoSvg: `
      <svg viewBox="0 0 160 160" role="img" aria-hidden="true">
        <rect x="24" y="64" width="34" height="32" rx="6" fill="#ee95ac" stroke="#3c0912" stroke-width="4"/>
        <rect x="54" y="64" width="14" height="32" fill="#e8d99c" stroke="#3c0912" stroke-width="4"/>
        <rect x="68" y="66" width="26" height="28" fill="#ffd400" stroke="#3c0912" stroke-width="4"/>
        <rect x="94" y="69" width="22" height="22" fill="#f59e0b" stroke="#3c0912" stroke-width="4"/>
        <polygon points="116,69 144,80 116,91" fill="#f7e3b5" stroke="#3c0912" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="133,76 144,80 133,84" fill="#3c0912"/>
      </svg>`
  },
  {
    id: 2,
    nome: "Zumbilume Onírico",
    categoria: "Sonhos & Arte",
    regra: "Começar com a letra Z",
    preco: 68.50,
    descricaoCurta: "Marcador fosforescente de tinta estelar que ilumina e desenha sonhos lúcidos antes de dormir.",
    descricaoDetalhada:
      "O Zumbilume captura a luz do entardecer em seu reservatório de cristal. Ao fazer um único traço no canto do travesseiro, ele projeta paisagens oníricas interativas durante toda a noite e evapora ao amanhecer.",
    especificacoes: [
      "Uso: Uso único (1 noite completa de projeção onírica)",
      "Material: Tubo de vidro lunar e pigmento bioluminescente",
      "Dimensões: 13,5 cm x 1,4 cm",
      "Modo de uso: Agite três vezes, destampe e desenhe uma estrela no travesseiro"
    ],
    altImagem: "Ilustração de uma caneta marcadora luminosa com brilho dourado e estrelas ao redor",
    ilustracaoSvg: `
      <svg viewBox="0 0 160 160" role="img" aria-hidden="true">
        <circle cx="80" cy="80" r="56" fill="#e8d99c" opacity="0.55"/>
        <rect x="66" y="42" width="28" height="72" rx="10" fill="#a94846" stroke="#3c0912" stroke-width="4"/>
        <polygon points="70,42 80,22 90,42" fill="#ffd400" stroke="#3c0912" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="80" cy="78" r="8" fill="#e8d99c" stroke="#3c0912" stroke-width="3"/>
        <path d="M40 46 L44 54 L52 58 L44 62 L40 70 L36 62 L28 58 L36 54 Z" fill="#ffd400" stroke="#3c0912" stroke-width="2.5"/>
        <path d="M120 88 L123 94 L129 97 L123 100 L120 106 L117 100 L111 97 L117 94 Z" fill="#ee95ac" stroke="#3c0912" stroke-width="2.5"/>
      </svg>`
  },
  {
    id: 3,
    nome: "Caderno Orbital Gravitacional",
    categoria: "Exploração Espacial",
    regra: "Ser usado no espaço sideral",
    preco: 134.00,
    descricaoCurta: "Folhas magnetizadas com tinta à vácuo que não flutuam em gravidade zero.",
    descricaoDetalhada:
      "Desenvolvido para astronautas poetas e cartógrafos de nebulosas. Suas páginas possuem microfilamentos magnéticos que mantêm o caderno aberto na estação espacial, enquanto a caneta acoplada escreve no vácuo absoluto.",
    especificacoes: [
      "Resistência térmica: -180 °C a +150 °C em órbita",
      "Material: Fibra de titânio flexível e papel eletrostático",
      "Dimensões: 21 cm x 15 cm (80 folhas pautadas com constelações)",
      "Modo de uso: Acione a trava magnética lateral para fixar no traje espacial"
    ],
    altImagem: "Ilustração de um caderno espacial bordô com anéis planetários e estrelas orbitando",
    ilustracaoSvg: `
      <svg viewBox="0 0 160 160" role="img" aria-hidden="true">
        <rect x="44" y="30" width="72" height="96" rx="10" fill="#3c0912" stroke="#3c0912" stroke-width="4"/>
        <rect x="52" y="38" width="56" height="80" rx="6" fill="#a94846"/>
        <circle cx="80" cy="78" r="18" fill="#e8d99c" stroke="#3c0912" stroke-width="3"/>
        <ellipse cx="80" cy="78" rx="34" ry="10" fill="none" stroke="#ee95ac" stroke-width="4" transform="rotate(-18 80 78)"/>
        <circle cx="122" cy="40" r="5" fill="#ffd400" stroke="#3c0912" stroke-width="2.5"/>
      </svg>`
  },
  {
    id: 4,
    nome: "Micro-Grampeador Formicário",
    categoria: "Micro-Papelaria",
    regra: "Servir em uma formiga",
    preco: 29.90,
    descricaoCurta: "O menor grampeador funcional do mundo (0,8 mm), ergonômico para seis patas e antenas.",
    descricaoDetalhada:
      "Ideal para formigas-cortadeiras executivas organizarem relatórios em pétalas de rosa e folhas de hortelã. Possui mola ultraleve acionada com apenas 0,002 gramas de pressão.",
    especificacoes: [
      "Dimensões: 0,8 mm de comprimento x 0,3 mm de altura",
      "Material: Liga de micro-alumínio e molas de seda de aranha",
      "Capacidade: 50 micro-grampos de néctar cristalizado",
      "Modo de uso: Posicionar a folha e pressionar suavemente com as patas dianteiras"
    ],
    altImagem: "Ilustração ampliada por lupa de um minúsculo grampeador rosa e dourado",
    ilustracaoSvg: `
      <svg viewBox="0 0 160 160" role="img" aria-hidden="true">
        <circle cx="76" cy="76" r="46" fill="#ffffff" stroke="#3c0912" stroke-width="5"/>
        <line x1="109" y1="109" x2="138" y2="138" stroke="#a94846" stroke-width="10" stroke-linecap="round"/>
        <rect x="52" y="76" width="48" height="10" rx="4" fill="#3c0912"/>
        <path d="M54 74 L98 62 L100 72 L54 78 Z" fill="#ee95ac" stroke="#3c0912" stroke-width="3" stroke-linejoin="round"/>
      </svg>`
  },
  {
    id: 5,
    nome: "Borracha Monumental Apaga-Nuvens",
    categoria: "Escala Colossal",
    regra: "Não caber em um avião",
    preco: 890.00,
    descricaoCurta: "Bloco de borracha de 42 metros de comprimento para apagar nuvens de tempestade ou erros gigantes.",
    descricaoDetalhada:
      "Tão imensa que precisa ser transportada por dirigíveis de carga pesada. Basta esfregá-la contra o horizonte para dissolver nuvens carregadas em céu azul límpido sem deixar farelos.",
    especificacoes: [
      "Dimensões: 42 m x 18 m x 9 m (não cabe em nenhuma aeronave comercial)",
      "Material: Látex atmosférico aerado de baixa densidade",
      "Entrega: Transporte especial via comboio de balões dirigíveis",
      "Modo de uso: Ancorar nas extremidades e deslizar suavemente sob nuvens cúmulos"
    ],
    altImagem: "Ilustração de uma borracha gigante bicolor rosa e creme flutuando acima de pequenas nuvens",
    ilustracaoSvg: `
      <svg viewBox="0 0 160 160" role="img" aria-hidden="true">
        <path d="M26 118 Q40 104 56 114 Q74 102 90 116 Q106 106 122 118 Z" fill="#ffffff" stroke="#3c0912" stroke-width="3"/>
        <polygon points="24,78 96,46 136,68 64,100" fill="#ee95ac" stroke="#3c0912" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="24,78 64,100 64,118 24,96" fill="#a94846" stroke="#3c0912" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="64,100 136,68 136,86 64,118" fill="#e8d99c" stroke="#3c0912" stroke-width="4" stroke-linejoin="round"/>
      </svg>`
  },
  {
    id: 6,
    nome: "Post-it Efêmero Autodestrutivo",
    categoria: "Recados Secretos",
    regra: "Ser de uso único",
    preco: 35.90,
    descricaoCurta: "Bloco com 30 folhas que voam até o destinatário, leem o recado e viram confete perfumado.",
    descricaoDetalhada:
      "Cada folha funciona uma única vez: escreva o bilhete, dobre em aviãozinho e solte no ar. Ao pousar na mesa certa, o papel sussurra a mensagem e se transforma em confete de baunilha.",
    especificacoes: [
      "Uso: Cada folha possui ciclo único e irreversível após leitura",
      "Material: Celulose de açúcar orgânico e tinta acústica",
      "Dimensões: 7,6 cm x 7,6 cm (bloco com 30 unidades)",
      "Modo de uso: Escreva o recado, dobre uma vez e assopre na direção desejada"
    ],
    altImagem: "Ilustração de um bloco de notas adesivas amarelo com uma folha dobrada voando e confetes",
    ilustracaoSvg: `
      <svg viewBox="0 0 160 160" role="img" aria-hidden="true">
        <rect x="34" y="48" width="68" height="68" rx="8" fill="#e8d99c" stroke="#3c0912" stroke-width="4"/>
        <rect x="40" y="42" width="68" height="68" rx="8" fill="#ffd400" stroke="#3c0912" stroke-width="4"/>
        <line x1="52" y1="62" x2="94" y2="62" stroke="#3c0912" stroke-width="3" stroke-linecap="round"/>
        <line x1="52" y1="76" x2="84" y2="76" stroke="#3c0912" stroke-width="3" stroke-linecap="round"/>
        <polygon points="96,94 138,76 116,116 110,100" fill="#ee95ac" stroke="#3c0912" stroke-width="3.5" stroke-linejoin="round"/>
      </svg>`
  }
];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function buscarProdutoPorId(id) {
  return PRODUTOS_PAPELORIA.find((produto) => produto.id === Number(id)) || null;
}