

async function getProdutoEstoque(codigoDeBarras) {
    try {
        // Constrói a URL completa para a requisição
        const getOneProductUrl = `http://localhost:3000/produto/${codigoDeBarras}`;
        
        // Faz a requisição para o endpoint
        const response = await fetch(getOneProductUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        // Verifica se a resposta não está OK
        if (!response.ok) {
            alertMsg(
                'Produto não encontrado. Por favor, verifique se o item está cadastrado corretamente.',
                'orange', 6000);
            return; // Sai da função para evitar erros
        }

        // Extrai os dados da resposta JSON
        const data = await response.json();
        console.log("Dados recebidos:", data);
        
        if (Array.isArray(data) && data.length > 0 && data[0].nome_produto) {
            const produto = data[0];

        produtoID = produto.produto_id;    
        preco_compra_anterior = produto.preco_compra;    
        markup_anterior = produto.preco_compra;   
        preco_venda_anterior = produto.preco_venda;    
           
        inputprodutoEncontrado.value = produto.nome_produto;

        inputPrecoCompraFormated = parseFloat(produto.preco_compra);
        inputPrecoCompra.value = converteMoeda(inputPrecoCompraFormated);

        inputMarkupEstoque.value =  produto.markup || '';
        
        inputprecoVendaFormated = parseFloat(produto.preco_venda);
        inputprecoVenda.value = converteMoeda(inputprecoVendaFormated);

        codigoEanGlobal = produto.codigo_ean;
        qtdEstoqueGlobal = produto.quantidade_estoque;
        qtdeVendidaGlobal = produto.quantidade_vendido;

    };
        

    } catch (error) {
        // Captura e exibe erros
        console.error("Erro ao buscar o produto:", error);
        alertMsg('Erro ao buscar o produto. Tente novamente mais tarde.', 'orange', 6000);
        return;
    }
};

async function postMovimentarEstoque(movimentacaoEstoque) {
     const postEstoqueDbEndpoint = 'http://localhost:3000/postControleEstoque';

     try {
        
        const response = await fetch(postEstoqueDbEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movimentacaoEstoque), 
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('postMovimentarEstoque registrada com sucesso:', data);

    } catch (error) {
        console.error('Erro ao registrar postMovimentarEstoque:', error);
    }

};

async function updateEstoque(produto) {
       const updateEstoque = 'http://localhost:3000/UpdateEstoque'
    try {
        const patchResponse = await fetch( updateEstoque, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto), // Apenas serialize aqui
        });

        if (!patchResponse.ok) {
            console.log('Erro ao atualizar estoque do produto');
        } else {
            console.log('Estoque do produto atualizado com sucesso');
        }
    } catch (error) {
        console.log('Erro durante a atualização do estoque:', error);
    }
};

async function UpdateValores(produto) {
       const updateEstoque = 'http://localhost:3000/UpdateValores'
    try {
        const patchResponse = await fetch( updateEstoque, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto), // Apenas serialize aqui
        });

        if (!patchResponse.ok) {
            console.log('Erro ao atualizar estoque do produto');
        } else {
            console.log('Estoque do produto atualizado com sucesso');
        }
    } catch (error) {
        console.log('Erro durante a atualização do estoque:', error);
    }
};

