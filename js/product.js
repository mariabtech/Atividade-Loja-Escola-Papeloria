/**
 * Lógica da página de detalhes (produto.html):
 * Lê o parâmetro ?id= da URL, trata IDs inexistentes e gerencia compra/carrinho.
 */
const containerProduto = document.querySelector("#detalheProdutoContainer");
const breadcrumbAtual = document.querySelector("#breadcrumbProduto");

function renderizarProdutoNaoEncontrado() {
  document.title = "Papeloria | Produto não encontrado";
  if (breadcrumbAtual) breadcrumbAtual.textContent = "Produto não encontrado";

  containerProduto.innerHTML = `
    <section class="specs-box text-center py-5 my-4" aria-labelledby="titulo-nao-encontrado">
      <p class="eyebrow mb-2">Item fora de catálogo</p>
      <h1 id="titulo-nao-encontrado" class="h2 mb-3">Ops! Esse invento ainda não foi criado.</h1>
      <p class="lead col-lg-7 mx-auto mb-4">
        O endereço acessado não corresponde a nenhum produto disponível na Papeloria.
        Que tal explorar nossa vitrine de itens extraordinários?
      </p>
      <a class="btn btn-papeloria btn-lg" href="index.html">Voltar para a vitrine</a>
    </section>
  `;
}

function renderizarDetalhesProduto(produto) {
  document.title = `Papeloria | ${produto.nome}`;
  if (breadcrumbAtual) breadcrumbAtual.textContent = produto.nome;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", produto.descricaoCurta);

  const listaSpecs = produto.especificacoes
    .map((item) => `<li class="mb-1">${item}</li>`)
    .join("");

  containerProduto.innerHTML = `
    <article class="row g-4 g-lg-5 align-items-start">
      <div class="col-lg-6">
        <div class="product-detail-illustration" role="img" aria-label="${produto.altImagem}">
          ${produto.ilustracaoSvg}
        </div>
      </div>
      <div class="col-lg-6">
        <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
          <span class="category-tag">${produto.categoria}</span>
          <span class="rule-badge">Regra: ${produto.regra}</span>
        </div>
        <h1 class="mb-3">${produto.nome}</h1>
        <p class="lead mb-3">${produto.descricaoDetalhada}</p>
        <p class="price price-large mb-4">${formatarMoeda(produto.preco)}</p>

        <section aria-labelledby="titulo-detalhes" class="specs-box mb-4">
          <h2 id="titulo-detalhes" class="h5 mb-3">Ficha técnica & modo de uso</h2>
          <ul class="mb-0 ps-3">
            ${listaSpecs}
          </ul>
        </section>

        <form id="formProduto" novalidate>
          <div class="mb-3">
            <label for="quantidade" class="form-label">Quantidade (1 a 10 unidades)</label>
            <input class="form-control quantity-field" id="quantidade" name="quantidade" type="number" min="1" max="10" value="1" required>
          </div>
          <div class="d-flex flex-wrap gap-3">
            <button class="btn btn-papeloria btn-lg" type="submit" data-action="comprar">Comprar agora</button>
            <button class="btn btn-papeloria-outline btn-lg" type="button" id="btnAdicionarCarrinho">Adicionar ao carrinho</button>
          </div>
        </form>
        <div id="produtoFeedback" class="feedback-banner mt-3" role="status" aria-live="polite"></div>
      </div>
    </article>
  `;

  configurarEventosCompra(produto);
}

function configurarEventosCompra(produto) {
  const formProduto = document.querySelector("#formProduto");
  const inputQtd = document.querySelector("#quantidade");
  const btnAdd = document.querySelector("#btnAdicionarCarrinho");
  const feedback = document.querySelector("#produtoFeedback");

  function validarQuantidade() {
    const valor = Number(inputQtd.value);
    if (!Number.isInteger(valor) || valor < 1 || valor > 10) {
      feedback.className = "feedback-banner feedback-error mt-3";
      feedback.textContent = "Escolha uma quantidade inteira entre 1 e 10 unidades.";
      inputQtd.focus();
      return null;
    }
    return valor;
  }

  formProduto?.addEventListener("submit", (event) => {
    event.preventDefault();
    const qtd = validarQuantidade();
    if (!qtd) return;

    adicionarAoCarrinho(produto.id, qtd);
    window.location.href = "checkout.html";
  });

  btnAdd?.addEventListener("click", () => {
    const qtd = validarQuantidade();
    if (!qtd) return;

    adicionarAoCarrinho(produto.id, qtd);
    feedback.className = "feedback-banner feedback-success mt-3";
    feedback.textContent = `${qtd}x "${produto.nome}" adicionado ao carrinho!`;
  });
}

const params = new URLSearchParams(window.location.search);
const produtoId = params.get("id");
const produtoEncontrado = buscarProdutoPorId(produtoId);

if (!produtoEncontrado) {
  renderizarProdutoNaoEncontrado();
} else {
  renderizarDetalhesProduto(produtoEncontrado);
}