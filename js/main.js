/**
 * Lógica da vitrine (index.html):
 * Renderização dinâmica, busca por texto, filtro por regra do desafio e ordenação.
 */
const listaProdutosEl = document.querySelector("#listaProdutos");
const filtroTextoEl = document.querySelector("#filtroProduto");
const filtroRegraEl = document.querySelector("#filtroRegra");
const ordenacaoEl = document.querySelector("#ordenarProdutos");
const limparFiltrosBtn = document.querySelector("#limparFiltros");
const mensagemFiltroEl = document.querySelector("#mensagemFiltro");

function popularSelectRegras() {
  if (!filtroRegraEl) return;
  const regrasUnicas = [...new Set(PRODUTOS_PAPELORIA.map((p) => p.regra))];
  regrasUnicas.forEach((regra) => {
    const option = document.createElement("option");
    option.value = regra;
    option.textContent = regra;
    filtroRegraEl.appendChild(option);
  });
}

function renderizarVitrine(produtos) {
  if (!listaProdutosEl) return;
  listaProdutosEl.innerHTML = "";

  if (produtos.length === 0) {
    mensagemFiltroEl.className = "feedback-banner feedback-loading mt-4";
    mensagemFiltroEl.textContent =
      "Nenhum item fantástico encontrado com esses filtros. Tente limpar a busca para ver toda a Papeloria!";
    return;
  }

  mensagemFiltroEl.className = "mt-4 text-secondary small";
  mensagemFiltroEl.textContent = `Exibindo ${produtos.length} ${produtos.length === 1 ? "produto inédito" : "produtos inéditos"}.`;

  produtos.forEach((produto) => {
    const col = document.createElement("article");
    col.className = "col-sm-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 product-card">
        <div class="product-illustration" role="img" aria-label="${produto.altImagem}">
          ${produto.ilustracaoSvg}
        </div>
        <div class="card-body d-flex flex-column">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
            <span class="category-tag">${produto.categoria}</span>
            <span class="rule-badge">${produto.regra}</span>
          </div>
          <h3 class="h5 mb-2">${produto.nome}</h3>
          <p class="mb-3 flex-grow-1">${produto.descricaoCurta}</p>
          <p class="price mb-3">${formatarMoeda(produto.preco)}</p>
          <div class="d-flex flex-wrap gap-2 mt-auto">
            <a class="btn btn-papeloria flex-grow-1" href="produto.html?id=${produto.id}">Ver detalhes</a>
            <button class="btn btn-papeloria-outline" type="button" data-quick-add="${produto.id}" aria-label="Adicionar ${produto.nome} ao carrinho">
              + Carrinho
            </button>
          </div>
        </div>
      </div>
    `;

    listaProdutosEl.appendChild(col);
  });
}

function aplicarFiltrosEOrdenacao() {
  const termo = (filtroTextoEl?.value || "").trim().toLowerCase();
  const regraSelecionada = filtroRegraEl?.value || "";
  const criterioOrdem = ordenacaoEl?.value || "destaque";

  let filtrados = PRODUTOS_PAPELORIA.filter((produto) => {
    const bateTexto =
      !termo ||
      produto.nome.toLowerCase().includes(termo) ||
      produto.descricaoCurta.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo);

    const bateRegra = !regraSelecionada || produto.regra === regraSelecionada;
    return bateTexto && bateRegra;
  });

  if (criterioOrdem === "nome-asc") {
    filtrados = [...filtrados].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  } else if (criterioOrdem === "preco-asc") {
    filtrados = [...filtrados].sort((a, b) => a.preco - b.preco);
  } else if (criterioOrdem === "preco-desc") {
    filtrados = [...filtrados].sort((a, b) => b.preco - a.preco);
  }

  renderizarVitrine(filtrados);
}

listaProdutosEl?.addEventListener("click", (event) => {
  const botaoAdd = event.target.closest("[data-quick-add]");
  if (!botaoAdd) return;

  const id = Number(botaoAdd.dataset.quickAdd);
  const produto = buscarProdutoPorId(id);
  if (produto && adicionarAoCarrinho(id, 1)) {
    mensagemFiltroEl.className = "feedback-banner feedback-success mt-4";
    mensagemFiltroEl.textContent = `"${produto.nome}" foi adicionado ao seu carrinho!`;
  }
});

filtroTextoEl?.addEventListener("input", aplicarFiltrosEOrdenacao);
filtroRegraEl?.addEventListener("change", aplicarFiltrosEOrdenacao);
ordenacaoEl?.addEventListener("change", aplicarFiltrosEOrdenacao);

limparFiltrosBtn?.addEventListener("click", () => {
  if (filtroTextoEl) filtroTextoEl.value = "";
  if (filtroRegraEl) filtroRegraEl.value = "";
  if (ordenacaoEl) ordenacaoEl.value = "destaque";
  aplicarFiltrosEOrdenacao();
});

// Sincroniza a barra de busca do cabeçalho com o filtro da vitrine
const buscaHeaderInput = document.querySelector("#buscaHeader");
const formBuscaHeader = document.querySelector(".header-search-form");

buscaHeaderInput?.addEventListener("input", () => {
  if (filtroTextoEl) {
    filtroTextoEl.value = buscaHeaderInput.value;
    aplicarFiltrosEOrdenacao();
  }
});

formBuscaHeader?.addEventListener("submit", (event) => {
  if (filtroTextoEl) {
    event.preventDefault();
    filtroTextoEl.value = buscaHeaderInput.value;
    aplicarFiltrosEOrdenacao();
    document.querySelector("#vitrine")?.scrollIntoView({ behavior: "smooth" });
  }
});

popularSelectRegras();
aplicarFiltrosEOrdenacao();