/**
 * Lógica da confirmação de compra (sucesso.html):
 * Impede acesso direto sem compra concluída e exibe o resumo do pedido.
 */
const painelSucesso = document.querySelector("#painelSucesso");
const pedido = obterPedidoConcluido();

if (!pedido) {
  document.title = "Papeloria | Nenhum pedido ativo";
  painelSucesso.innerHTML = `
    <div class="success-icon" aria-hidden="true">!</div>
    <p class="eyebrow mb-2">Acesso restrito</p>
    <h1 id="titulo-sucesso" class="h2 mb-3">Nenhuma compra concluída encontrada</h1>
    <p class="lead mb-4">
      Parece que você acessou esta página diretamente sem finalizar um pedido na Papeloria.
      Escolha seus produtos extraordinários na vitrine para iniciar sua jornada!
    </p>
    <a class="btn btn-papeloria btn-lg" href="index.html">Ir para a vitrine</a>
  `;
} else {
  document.querySelector("#mensagemCliente").textContent =
    `${pedido.cliente.nome}, seu pedido na Papeloria foi registrado com sucesso! Enviamos os detalhes para ${pedido.cliente.email}.`;

  document.querySelector("#numeroPedido").textContent = pedido.numero;
  document.querySelector("#destinoPedido").textContent = `${pedido.cliente.cidade} - ${pedido.cliente.estado}`;
  document.querySelector("#pagamentoPedido").textContent = pedido.pagamento;
  document.querySelector("#totalPedido").textContent = formatarMoeda(pedido.total);

  const listaItensSucesso = document.querySelector("#itensPedidoSucesso");
  listaItensSucesso.innerHTML = pedido.itens
    .map(
      (item) => `
      <li class="d-flex justify-content-between py-2 border-bottom">
        <span><strong>${item.quantidade}x</strong> ${item.nome}</span>
        <span>${formatarMoeda(item.subtotal)}</span>
      </li>
    `
    )
    .join("");
}