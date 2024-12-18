

function FinalizarVenda() {
    if (carrinho.length === 0) {
        alertMsg("Seu carrinho está vazio. Adicione itens antes de concluir a venda.",'warning', 4000);
        return;
    }

    const totalLiquido = parseCurrency(inputTotalLiquido.value);
    const valorPago = calculateTotalPago();

    if (valorPago < totalLiquido) {
        alertMsg('O valor pago está menor que o valor da compra.', 'warning', 3000);
        return;
    }

    const carrinhoId = carrinho.map(produto => ({
        produto_id: produto.produto_id,
        preco: parseCurrency(produto.preco).toFixed(2),
        quantidade: produto.Qtd,
        unidade_estoque_id: produto.unidadeIDGlobal,
    }));

    const venda = {
        data_venda: dataVenda.value,
        itens: carrinhoId,
        cliente_id: clienteId.value,
        total_liquido: totalLiquido.toFixed(2),
        numero_pedido: numeroPedido.value,
        pagamentos: getFormasDePagamento(),
    };

    let vendaDb = JSON.stringify(venda);
    console.log('Venda enviada: ' + vendaDb);

    try {
        postVendaDb(venda);
        alertMsg('Venda realizada com sucesso, obrigado!', 'success', 6000);
    } catch (error) {
        console.error('Erro ao cadastrar a Venda no Db:', error);
        alertMsg('Erro ao registrar a venda no sistema. Tente novamente.', 'error', 4000);
    }

    limparCampos();
}

// Função que limpa os campos ao registrar a venda
function limparCampos() {
    // Limpa todos os inputs e campos relacionados0

    setTimeout(() => {
        dataVenda.value = '';
        codigoEan.value = '';
        descricao.value = '';
        precoVenda.value = '';
        inputQtd.value = '';
        selectCliente.value = 'Consumidor Final'; // Define para o valor padrão ou vazio
        ulDescricaoProduto.innerHTML = ''; // Limpa a lista de produtos
        numeroPedido.value = '';
        inputTotalLiquido.value = '0,00'; // Zera o total líquido
        inputTotalPago.value = '0,00'; // Zera o total pago
        unidadeEstoqueRender.value = '';
        unidadeEstoqueRender.value = '';
        divSelecionarQtd.style.display = 'none'; // Esconde a div de seleção de quantidade
        textSelecionarQtd.textContent = ''; // Limpa o texto da quantidade selecionada
        alertLimparVenda.style.display = 'none'; // Esconde alerta de limpar venda
        alertExit.style.display = 'none'; // Esconde alerta de saída
        alertRemoverItem.style.display = 'none'; // Esconde alerta de remover item
        formaPagamento.style.display = 'none'; // Esconde alerta de forma de pagamento
        inputExitVenda.value = '';
        inputExcluiItem.value = '';
        mensagemDiv.textContent = ''; // Remove mensagens adicionais
        inputTroco.value = '0,00'; // Zera o troco
        imgProduto.src = '../style/img/produto.png';
        // Limpa o estado do carrinho
        carrinho = [];
        getVenda(numeroPedido.value);
        //renderiza input numero pedido - data da venda - cliente
        squareInputs.style.display = 'none';
        console.log('Todos os campos foram limpos.');
    
        // Redefine o foco para o campo de código EAN
        codigoEan.focus();
    }, 3000);
   
}

