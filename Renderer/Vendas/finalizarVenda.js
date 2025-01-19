function parseCurrency(value) {
    if (!value) return 0;
    
    // Remove caracteres não numéricos (exceto vírgula e ponto)
    value = value.replace(/[^\d,-]/g, '');

    // Substitui vírgula por ponto, para tratar como decimal
    value = value.replace(',', '.');

    // Converte para número
    return parseFloat(value) || 0;
}


async function FinalizarVenda(){
    imgProduto.src = ''
    if (carrinho.length === 0) {
        alertMsg("Seu carrinho está vazio. Adicione itens antes de concluir a venda.", 'warning', 4000);
        return;
    }

    const totalLiquido = parseCurrency(inputTotalLiquido.value);
    const valorPago = calcularValores();

    if (valorPago < totalLiquido) {
        alertMsg('O valor pago está menor que o valor da compra.', 'warning', 3000);
        console.log('O valor pago está menor que o valor da compra.')
        return;
    }

    const carrinhoId = carrinho.map(produto => ({
        produto_id: produto.produto_id,
        preco: parseCurrency(produto.preco).toFixed(2),
        quantidade: produto.Qtd,
        unidade_estoque_id: produto.unidadeIDGlobal,
    }));

    const venda = {
        data_venda: validarDataVenda(dataVenda.value),
        itens: carrinhoId,
        cliente_id: clienteId.value,
        total_liquido: totalLiquido.toFixed(2),
        valor_recebido: valorPago.toFixed(2),
        troco: Math.max(0, valorPago - totalLiquido),
        numero_pedido: numeroPedido.value,
        pagamentos: getFormasDePagamento(),
    };

    try {
        // Registra a venda no banco
        await postVendaDb(venda);
        alertMsg('Venda realizada com sucesso, obrigado!', 'success', 6000);

        // Altera o estoque e o vendido
        await alteraEstoqueEVendido(carrinho);
        console.log('Estoque atualizado com sucesso!', 'success', 6000);

        // Busca os dados do pedido registrado e imprime
        await imprimirVenda(numeroPedido.value);
       imgProduto.src = '../../style/img/carrinho-de-compras.png';
        

    } catch (error) {
        console.error('Erro ao processar a venda ou atualizar estoque:', error);
        alertMsg('Erro ao registrar a venda ou atualizar o estoque. Tente novamente.', 'error', 4000);
    }
};

async function imprimirVenda(numeroPedido) {
    try {
        getUltimoPedidoImprimirFolha(numeroPedido);
        // Limpa os campos
        limparCampos();
    } catch (error) {
        console.error('Erro ao buscar o último pedido para impressão:', error);
    }
};

function limparCampos() {
    // Limpa o carrinho imediatamente
    carrinho = [];
    setTimeout(() => {
        valorDinheiro.value = '';
        PIX.value = '';
        CartaoDebito.value = '';
        CartaoCredito.value = '';
        dataVenda.value = '';
        descricao.value = '';
        precoVenda.value = '';
        inputQtd.value = '';
        selectCliente.value = 'Consumidor Final'; // Define para o valor padrão ou vazio
        ulDescricaoProduto.innerHTML = ''; // Limpa a lista de produtos
        inputTotalLiquido.value = '0,00'; // Zera o total líquido
        inputTotalPago.value = '0,00'; // Zera o total pago
        unidadeEstoqueRender.value = '';
        divSelecionarQtd.style.display = 'none'; // Esconde a div de seleção de quantidade
        textSelecionarQtd.textContent = ''; // Limpa o texto da quantidade selecionada
        alertLimparVenda.style.display = 'none'; // Esconde alerta de limpar venda
        alertExit.style.display = 'none'; // Esconde alerta de saída
        alertRemoverItem.style.display = 'none'; // Esconde alerta de remover item
        inputExitVenda.value = '';
        inputExcluiItem.value = '';
        mensagemDiv.textContent = ''; // Remove mensagens adicionais
        inputTroco.value = '0,00'; // Zera o troco
        inputlimparTelakey.value = '';
        valorDinheiro.value = '0,00';
        codigoEan.value = '';
        codigoEan.focus(); // Certifique-se de aplicar foco após todas as ações
        div_qtd.style.backgroundColor = '';
        imgProduto.src = '../../style/img/carrinho-de-compras.png';

        // AQUI você pode adicionar uma linha para não tocar no relógio
        console.log('Todos os campos foram limpos.');
    }, 6000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && divPagamento.style.display === 'block') {
        console.log('Enter pressionado.');
        console.log('FinalizarVenda chamado.');
        FinalizarVenda();
        divPagamento.style.display = 'none';
        codigoEan.focus();
    }
});