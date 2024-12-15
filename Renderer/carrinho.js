function rendererCarrinho(carrinho, ulDescricaoProduto, createSpan) {
    ulDescricaoProduto.innerHTML = ''; // Limpa a lista existente

    carrinho.forEach((item, index) => {
        const produto = document.createElement('li');
        produto.classList.add('li-produto');

        // Criação dos elementos usando a função createSpan
        const indexProduto = createSpan('spanIndex', index + 1);
        const codigoSpan = createSpan('spanEan', item.codigoEan);
        const descricaoSpan = createSpan(
            'spanDescricao',
            `${item.descricao} R$${item.preco} x ${item.Qtd}${item.unidadeEstoqueID}`
        );

        // Adiciona os elementos ao produto
        produto.append(indexProduto, codigoSpan, descricaoSpan);

        // Adiciona o produto à lista
        ulDescricaoProduto.appendChild(produto);
    });
}


function calCarrinho(carrinho, converteMoeda, inputTotalLiquido, textSelecionarQtd) {
    if (textSelecionarQtd) textSelecionarQtd.innerHTML = ''; // Atualiza o texto, se fornecido

    const total = carrinho.reduce((acc, item) => {
        const precoFormatado = parseFloat(
            item.preco.replace(/\./g, '').replace(',', '.')
        );
        return acc + precoFormatado * parseInt(item.Qtd, 10);
    }, 0);

    if (inputTotalLiquido) inputTotalLiquido.value = converteMoeda(total); // Atualiza o campo, se fornecido
    return total;
}


function pushProdutoCarrinho({
    carrinho,
    codigoEan,
    descricao,
    precoVenda,
    inputQtd,
    unidadeEstoqueRender,
    rendererCarrinho,
    ulDescricaoProduto,
    createSpan,
    resetInputs,
    calCarrinho,
    converteMoeda,
    inputTotalLiquido,
    textSelecionarQtd,
    getVenda,
    numeroPedido,
    alertLimparVenda
}) {
    // Verifica se algum campo está vazio
    if (!codigoEan.value || !descricao.value || !inputQtd.value) {
        console.log('Existem inputs vazios');
        return;
    }

    // Cria o objeto do produto
    const produto = {
        produto_id: produtoIdGlobal,
        codigoEan: codigoEan.value,
        descricao: descricao.value,
        preco: precoVenda.value,
        Qtd: inputQtd.value,
        unidadeEstoqueID: unidadeEstoqueRender.value,
        unidadeIDGlobal: unIDGlobal
    };

    // Adiciona o produto ao carrinho
    carrinho.push(produto);
    console.log("Produto adicionado ao carrinho:", produto);

    // Renderiza o carrinho
    rendererCarrinho(carrinho, ulDescricaoProduto, createSpan);

    // Reseta os campos de entrada
    resetInputs();

    // Calcula o total do carrinho
    calCarrinho(
        carrinho,
        converteMoeda,
        inputTotalLiquido,
        textSelecionarQtd
    );

    // Obtém os dados da venda
    getVenda(numeroPedido);

    // Oculta o alerta de limpar venda
    alertLimparVenda.style.display = 'none';
}

// Limpa os campos de entrada
function resetInputs() {
    descricao.value = '';
    precoVenda.value = '';
    inputQtd.value = '';
    codigoEan.value = '';
    unidadeEstoqueRender.value = '';
}

// Cria elemento <span> com classe e texto
function createSpan(className, textContent) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = textContent;
    return span;
}

// Função que reseta os inputs
function resetInputs() {
    descricao.value = '';
    precoVenda.value = '';
    inputQtd.value = '';
    codigoEan.value = '';
    unidadeEstoqueRender.value = '';
};


