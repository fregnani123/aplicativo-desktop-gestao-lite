

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

        inputprodutoEncontrado.value = produto.nome_produto;
        inputPrecoCompra.value = produto.preco_compra;
        inputMarkupEstoque.value = produto.markup || '';
        inputprecoVendaEstoque.value = produto.preco_venda;
    };
        

    } catch (error) {
        // Captura e exibe erros
        console.error("Erro ao buscar o produto:", error);
        alertMsg('Erro ao buscar o produto. Tente novamente mais tarde.', 'red', 6000);
    }
}
