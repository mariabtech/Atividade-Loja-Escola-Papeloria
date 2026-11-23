/**
 * Gerenciamento seguro do carrinho, dados do cliente e pedido em sessionStorage.
 */
const STORAGE_KEYS = {
  CARRINHO: "papeloria_carrinho",
  PEDIDO: "papeloria_ultimo_pedido",
  ENDERECO: "papeloria_endereco_entrega",
  CLIENTE_NOME: "papeloria_cliente_nome"
};

function obterCarrinho() {
  try {
    const bruto = sessionStorage.getItem(STORAGE_KEYS.CARRINHO);
    const parsed = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function salvarCarrinho(itens) {
  sessionStorage.setItem(STORAGE_KEYS.CARRINHO, JSON.stringify(itens));
  atualizarContadorCarrinhoHeader();
}

function adicionarAoCarrinho(produtoId, quantidade = 1) {
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) return false;

  const qtd = Math.max(1, Math.min(10, Number(quantidade) || 1));
  const carrinho = obterCarrinho();
  const existente = carrinho.find((item) => item.id === produto.id);

  if (existente) {
    existente.quantidade = Math.min(10, existente.quantidade + qtd);
  } else {
    carrinho.push({ id: produto.id, quantidade: qtd });
  }

  salvarCarrinho(carrinho);
  return true;
}

function alterarQuantidadeItem(produtoId, delta) {
  const carrinho = obterCarrinho();
  const indice = carrinho.findIndex((item) => item.id === Number(produtoId));
  if (indice === -1) return;

  const novaQtd = carrinho[indice].quantidade + delta;
  if (novaQtd <= 0) {
    carrinho.splice(indice, 1);
  } else {
    carrinho[indice].quantidade = Math.min(10, novaQtd);
  }

  salvarCarrinho(carrinho);
}

function removerItemCarrinho(produtoId) {
  const atualizado = obterCarrinho().filter((item) => item.id !== Number(produtoId));
  salvarCarrinho(atualizado);
}

function contarItensCarrinho() {
  return obterCarrinho().reduce((total, item) => total + item.quantidade, 0);
}

function atualizarContadorCarrinhoHeader() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const total = contarItensCarrinho();
  badges.forEach((badge) => {
    badge.textContent = String(total);
    badge.setAttribute("aria-label", `${total} ${total === 1 ? "item" : "itens"} no carrinho`);
  });
}

function salvarEnderecoHeader(textoEndereco) {
  if (!textoEndereco) return;
  sessionStorage.setItem(STORAGE_KEYS.ENDERECO, textoEndereco);
  atualizarDadosHeader();
}

function salvarNomeClienteHeader(nomeCompleto) {
  const primeiroNome = (nomeCompleto || "").trim().split(/\s+/)[0];
  if (!primeiroNome) return;
  sessionStorage.setItem(STORAGE_KEYS.CLIENTE_NOME, primeiroNome);
  atualizarDadosHeader();
}

function atualizarDadosHeader() {
  const enderecoSalvo = sessionStorage.getItem(STORAGE_KEYS.ENDERECO);
  const nomeSalvo = sessionStorage.getItem(STORAGE_KEYS.CLIENTE_NOME);

  if (enderecoSalvo) {
    document.querySelectorAll("[data-header-endereco]").forEach((el) => {
      el.textContent = enderecoSalvo;
    });
  }

  if (nomeSalvo) {
    document.querySelectorAll("[data-header-usuario]").forEach((el) => {
      el.textContent = `Olá, ${nomeSalvo}`;
    });
  }
}

function salvarPedidoConcluido(dadosPedido) {
  sessionStorage.setItem(STORAGE_KEYS.PEDIDO, JSON.stringify(dadosPedido));
  sessionStorage.removeItem(STORAGE_KEYS.CARRINHO);
  atualizarContadorCarrinhoHeader();
}

function obterPedidoConcluido() {
  try {
    const bruto = sessionStorage.getItem(STORAGE_KEYS.PEDIDO);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContadorCarrinhoHeader();
  atualizarDadosHeader();
});