const ulFiltros = document.getElementById('ul-filtros');

function getProdutos(renderer) {
    const apiGetAllProdutos = 'http://localhost:3000/produtos';

    fetch(apiGetAllProdutos)
        .then(response => response.json())
        .then(data => {
            // Use forEach for actions like appending to the DOM
            data.forEach((produto) => {
                const li = document.createElement('li');
                li.classList.add('li-list');

                const spanCodigo = document.createElement('span');
                spanCodigo.textContent = produto.codigo_ean;

                const spanNome = document.createElement('span');
                spanNome.textContent = produto.nome_produto;

                const spanPrecoCompra = document.createElement('span');
                spanPrecoCompra.textContent = `R$ ${produto.preco_compra}`;

                const spanPrecoVenda = document.createElement('span');
                spanPrecoVenda.textContent = `R$ ${produto.preco_venda}`;

                const spanEstoqueAtual = document.createElement('span');
                spanEstoqueAtual.textContent = `${produto.quantidade_estoque
                }`;

                li.appendChild(spanCodigo);
                li.appendChild(spanNome);
                li.appendChild(spanPrecoCompra);
                li.appendChild(spanPrecoVenda);
                li.appendChild(spanEstoqueAtual);

                renderer.appendChild(li);
            });

            console.log('Produtos cadastrados: ', data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

getProdutos(ulFiltros);
