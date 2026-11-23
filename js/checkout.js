/**
 * Lógica do checkout (checkout.html):
 * Resumo dinâmico do carrinho, cálculo de frete/totais, máscaras,
 * consulta ViaCEP com tratamento completo de erros e atualização do cabeçalho.
 */
const form = document.querySelector("#checkoutForm");
const nomeInput = document.querySelector("#nome");
const cepInput = document.querySelector("#cep");
const telefoneInput = document.querySelector("#telefone");
const buscarCepButton = document.querySelector("#buscarCep");
const cepFeedback = document.querySelector("#cepFeedback");
const checkoutFeedback = document.querySelector("#checkoutFeedback");

const logradouroInput = document.querySelector("#logradouro");
const numeroInput = document.querySelector("#numero");
const bairroInput = document.querySelector("#bairro");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");

const listaResumoEl = document.querySelector("#resumoItens");
const subtotalEl = document.querySelector("#resumoSubtotal");
const freteEl = document.querySelector("#resumoFrete");
const totalEl = document.querySelector("#resumoTotal");
const btnFinalizar = document.querySelector("#btnFinalizarCompra");

let ultimoCepConsultado = "";

function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function formatarCep(valor) {
  const numeros = somenteNumeros(valor).slice(0, 8);
  if (numeros.length <= 5) return numeros;
  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

function formatarTelefone(valor) {
  const nums = somenteNumeros(valor).slice(0, 11);
  if (nums.length === 0) return "";
  if (nums.length <= 2) return `(${nums}`;
  if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length <= 10) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
}

function cepValido(cep) {
  return somenteNumeros(cep).length === 8;
}

function calcularTotaisCarrinho() {
  const itens = obterCarrinho()
    .map((item) => {
      const produto = buscarProdutoPorId(item.id);
      if (!produto) return null;
      return {
        ...produto,
        quantidade: item.quantidade,
        subtotalItem: produto.preco * item.quantidade
      };
    })
    .filter(Boolean);

  const subtotal = itens.reduce((soma, item) => soma + item.subtotalItem, 0);
  const frete = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 18.90;
  const total = subtotal + frete;

  return { itens, subtotal, frete, total };
}

function renderizarResumoCheckout() {
  const { itens, subtotal, frete, total } = calcularTotaisCarrinho();

  if (itens.length === 0) {
    listaResumoEl.innerHTML = `
      <div class="text-center py-3">
        <p class="mb-3">Seu carrinho está vazio no momento.</p>
        <a class="btn btn-papeloria-outline btn-sm" href="index.html">Escolher produtos</a>
      </div>
    `;
    subtotalEl.textContent = formatarMoeda(0);
    freteEl.textContent = formatarMoeda(0);
    totalEl.textContent = formatarMoeda(0);
    if (btnFinalizar) btnFinalizar.disabled = true;
    return;
  }

  if (btnFinalizar) btnFinalizar.disabled = false;

  listaResumoEl.innerHTML = itens
    .map(
      (item) => `
      <div class="cart-item-row">
        <div class="d-flex justify-content-between align-items-start gap-2">
          <div>
            <strong class="d-block">${item.nome}</strong>
            <span class="small text-secondary">${formatarMoeda(item.preco)} cada</span>
          </div>
          <span class="fw-bold">${formatarMoeda(item.subtotalItem)}</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <div class="d-flex align-items-center gap-2" role="group" aria-label="Quantidade de ${item.nome}">
            <button type="button" class="qty-mini-btn" data-qty-change="-1" data-id="${item.id}" aria-label="Diminuir quantidade de ${item.nome}">−</button>
            <span class="fw-bold px-1">${item.quantidade}</span>
            <button type="button" class="qty-mini-btn" data-qty-change="1" data-id="${item.id}" aria-label="Aumentar quantidade de ${item.nome}">+</button>
          </div>
          <button type="button" class="btn btn-link btn-sm text-danger p-0" data-remove-id="${item.id}">Remover</button>
        </div>
      </div>
    `
    )
    .join("");

  subtotalEl.textContent = formatarMoeda(subtotal);
  freteEl.textContent = frete === 0 ? "Grátis" : formatarMoeda(frete);
  totalEl.textContent = formatarMoeda(total);
}

listaResumoEl?.addEventListener("click", (event) => {
  const btnQtd = event.target.closest("[data-qty-change]");
  if (btnQtd) {
    alterarQuantidadeItem(btnQtd.dataset.id, Number(btnQtd.dataset.qtyChange));
    renderizarResumoCheckout();
    return;
  }

  const btnRemover = event.target.closest("[data-remove-id]");
  if (btnRemover) {
    removerItemCarrinho(btnRemover.dataset.removeId);
    renderizarResumoCheckout();
  }
});

nomeInput?.addEventListener("blur", () => {
  if (nomeInput.value.trim()) {
    salvarNomeClienteHeader(nomeInput.value);
  }
});

cepInput?.addEventListener("input", () => {
  cepInput.value = formatarCep(cepInput.value);
  cepInput.setCustomValidity("");
});

telefoneInput?.addEventListener("input", () => {
  telefoneInput.value = formatarTelefone(telefoneInput.value);
});

function exibirFeedbackCep(tipo, mensagem) {
  cepFeedback.className = `feedback-banner mt-3 feedback-${tipo}`;
  cepFeedback.textContent = mensagem;
}

async function consultarViaCep() {
  const cepNumerico = somenteNumeros(cepInput.value);

  if (cepNumerico.length !== 8) {
    exibirFeedbackCep("error", "Digite um CEP válido com 8 números antes de buscar.");
    cepInput.focus();
    return;
  }

  if (cepNumerico === ultimoCepConsultado && logradouroInput.value.trim() !== "") {
    exibirFeedbackCep("success", "Endereço já carregado para este CEP.");
    return;
  }

  buscarCepButton.disabled = true;
  buscarCepButton.textContent = "Buscando...";
  exibirFeedbackCep("loading", "Consultando endereço na base dos Correios (ViaCEP)...");

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);

    if (!resposta.ok) {
      throw new Error(`Falha HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (dados.erro) {
      ultimoCepConsultado = "";
      exibirFeedbackCep("error", "CEP não encontrado. Verifique os números ou preencha o endereço manualmente.");
      logradouroInput.focus();
      return;
    }

    logradouroInput.value = dados.logradouro || "";
    bairroInput.value = dados.bairro || "";
    cidadeInput.value = dados.localidade || "";
    estadoInput.value = (dados.uf || "").toUpperCase();
    ultimoCepConsultado = cepNumerico;

    const resumoTopo = dados.logradouro
      ? `${dados.logradouro}, ${dados.localidade}/${dados.uf}`
      : `${dados.localidade} - ${dados.uf}`;
    salvarEnderecoHeader(resumoTopo);

    if (!dados.logradouro) {
      exibirFeedbackCep("success", "Cidade e UF preenchidas! Como este é um CEP geral, complete rua e número.");
      logradouroInput.focus();
    } else {
      exibirFeedbackCep("success", "Endereço encontrado! Informe agora o número da residência.");
      numeroInput.focus();
    }
  } catch {
    ultimoCepConsultado = "";
    exibirFeedbackCep(
      "error",
      "Não foi possível consultar o CEP no momento (verifique sua conexão). Você pode preencher o endereço manualmente."
    );
  } finally {
    buscarCepButton.disabled = false;
    buscarCepButton.textContent = "Buscar CEP";
  }
}

buscarCepButton?.addEventListener("click", consultarViaCep);

cepInput?.addEventListener("blur", () => {
  if (cepValido(cepInput.value) && somenteNumeros(cepInput.value) !== ultimoCepConsultado) {
    consultarViaCep();
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const { itens, subtotal, frete, total } = calcularTotaisCarrinho();
  if (itens.length === 0) {
    checkoutFeedback.className = "feedback-banner feedback-error mt-3";
    checkoutFeedback.textContent = "Adicione pelo menos um produto ao carrinho antes de concluir a compra.";
    return;
  }

  cepInput.setCustomValidity(cepValido(cepInput.value) ? "" : "Informe um CEP com 8 dígitos.");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    checkoutFeedback.className = "feedback-banner feedback-error mt-3";
    checkoutFeedback.textContent = "Por favor, revise os campos destacados em vermelho antes de finalizar.";
    form.querySelector(":invalid")?.focus();
    return;
  }

  const nomeCompleto = nomeInput.value.trim();
  salvarNomeClienteHeader(nomeCompleto);

  const dadosPedido = {
    numero: `PAP-${Math.floor(100000 + Math.random() * 900000)}`,
    data: new Date().toLocaleDateString("pt-BR"),
    cliente: {
      nome: nomeCompleto,
      email: document.querySelector("#email").value.trim(),
      cidade: cidadeInput.value.trim(),
      estado: estadoInput.value.trim().toUpperCase()
    },
    pagamento: document.querySelector("#pagamento").selectedOptions[0].textContent,
    itens: itens.map((i) => ({
      nome: i.nome,
      quantidade: i.quantidade,
      subtotal: i.subtotalItem
    })),
    subtotal,
    frete,
    total
  };

  salvarPedidoConcluido(dadosPedido);
  window.location.href = "sucesso.html";
});

renderizarResumoCheckout();