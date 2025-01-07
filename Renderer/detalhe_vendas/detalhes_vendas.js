const filtrosDiv = document.querySelector('.total-filtradas');
const filterButton = document.getElementById('filterButton');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const titulo_relatorio = document.getElementById('titulo-relatorio');
const numeroPedidoFiltro = document.getElementById('numeroPedidoFiltro');
const nomeClienteFiltro = document.getElementById('nomeClienteFiltro');


document.addEventListener('DOMContentLoaded', () => {
    // Atualiza o título do relatório com base nas datas
    if (startDate.value && endDate.value) {
        titulo_relatorio.innerHTML = `Forma de Pagamento<br>Período: ${startDate.value} - ${endDate.value}`;
    } else {
        titulo_relatorio.innerHTML = `Forma de Pagamento<br>Período: não selecionado`;
    }

    console.log('Start Date:', startDate.value || 'não selecionada'); // Verifica o valor no console
    console.log('End Date:', endDate.value || 'não selecionada'); // Verifica o valor no console

});


// Adicionando o evento de clique no filtro
filterButton.addEventListener('click', filterVendas);

// Função de filtro de vendas
function filterVendas() {

    titulo_relatorio.innerHTML = `Forma de Pagamento<br>Período: ${validarDataVenda(startDate.value)} - ${validarDataVenda(endDate.value)}`

    // Verifique se as datas são capturadas corretamente
    console.log('Start Date:', startDate.value); // Verifique se o valor está sendo capturado
    console.log('End Date:', endDate.value); // Verifique se o valor está sendo capturado
    console.log('nome Cliente:', nomeClienteFiltro.value); // Verifique se o valor está sendo capturado
    console.log('numero Pedido :', numeroPedidoFiltro.value); // Verifique se o valor está sendo capturado

    // Captura as datas diretamente, pois já estão no formato adequado para a API (YYYY-MM-DD)
    const startDateFormated = startDate.value;
    const endDateFormated = endDate.value;
    const nomeClienteFiltroFormated = nomeClienteFiltro.value;
    const numeroPedidoFiltroFormated = numeroPedidoFiltro.value;

    const filtros = {
        startDate: startDateFormated,  // Data inicial no formato aceito pela API
        endDate: endDateFormated,      // Data final no formato aceito pela API
        clienteNome: nomeClienteFiltroFormated,  // Nome do cliente como filtro
        numeroPedido: numeroPedidoFiltroFormated, // Número do pedido como filtro
    };

    // Exibe as datas no console para depuração
    console.log('Filtros:', filtros);

    if (!startDateFormated || !endDateFormated){
        titulo_relatorio.innerHTML = `Forma de Pagamento<br>Período: não selecionado`;
    }

    // Chama a função para pegar o histórico de vendas com os filtros
    fetchSalesHistory(filtros);

}

// Funções de agrupamento e exibição
function groupSalesByOrder(sales) {
    return sales.reduce((grouped, sale) => {
        if (!grouped[sale.numero_pedido]) {
            grouped[sale.numero_pedido] = {
                numero_pedido: sale.numero_pedido,
                data_venda: sale.data_venda,
                cliente_nome: sale.cliente_nome,
                produtos: [],
                tipo_pagamento: sale.tipo_pagamento,
                total_liquido: sale.total_liquido,
                valor_recebido: sale.valor_recebido,
                troco: sale.troco,
            };
        }

        // Adiciona o produto ao grupo
        grouped[sale.numero_pedido].produtos.push({
            codigo_ean: sale.codigo_ean,
            produto_nome: sale.produto_nome,
            quantidade: sale.quantidade,
            unidade_estoque_nome: sale.unidade_estoque_nome,
            preco: sale.preco
        });

        return grouped;
    }, {});
}

function formatarDataISOParaBR(dataISO) {
    const date = new Date(dataISO);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Funções de exibição (displaySalesHistory, displayTotalSales, etc.)
function calculateTotalSales(groupedSales) {
    return Object.values(groupedSales).reduce((total, saleGroup) => {
        return total + parseFloat(saleGroup.total_liquido);
    }, 0);
}

function displaySalesHistory(groupedSales) {
    const salesHistory = document.getElementById('sales-history');
    salesHistory.innerHTML = ''; // Limpa os dados anteriores

    Object.values(groupedSales).forEach(saleGroup => {
        const saleCard = document.createElement('div');
        saleCard.className = 'sale-card';

        const productDetails = saleGroup.produtos
            .map(product => `
                <p>
                    ${product.codigo_ean ? product.codigo_ean.toString() : 'Sem código'} - ${product.produto_nome ? product.produto_nome : 'Produto desconhecido'} - ${product.quantidade || 0}${product.unidade_estoque_nome || ''} x ${parseFloat(product.preco).toFixed(2)}
                </p>
            `)
            .join('');

        saleCard.innerHTML = `
            <p>
            <strong>Comprovante de Venda Nº000${saleGroup.numero_pedido}</strong><br>
            <strong>Data da Venda:</strong> ${formatarDataISOParaBR(saleGroup.data_venda)}<br>
            <strong>Cliente:</strong> ${saleGroup.cliente_nome}
            </p>
            ${productDetails}
            <p>
            <strong>Forma de Pagamento:</strong> ${(saleGroup.tipo_pagamento)}<br>
            <strong>Total Líquido da Venda:</strong> R$ ${parseFloat(saleGroup.total_liquido).toFixed(2)}<br>
            <strong>Valor Recebido:</strong> R$ ${parseFloat(saleGroup.valor_recebido).toFixed(2)}<br>
            <strong>Troco:</strong> R$ ${parseFloat(saleGroup.troco).toFixed(2)}<br>
            </p>
        `;

        salesHistory.appendChild(saleCard);
    });
}

function displayTotalSales(totalRows) {
    const filtrosDiv = document.querySelector('.total-filtradas');
    filtrosDiv.innerHTML = ''; // Limpa a div para evitar duplicações

    if (totalRows.length === 0) {
        // Caso não haja vendas, exibe a mensagem
        const noSalesMessage = document.createElement('div');
        noSalesMessage.className = 'no-sales-message';
        noSalesMessage.innerHTML = `
            <p>Sem vendas para o filtro selecionado</p>
        `;
        filtrosDiv.appendChild(noSalesMessage);
        return;
    }

    totalRows.forEach(item => {
        const saleTotal = document.createElement('div');
        saleTotal.className = 'sale-total';

        saleTotal.innerHTML = `
            <h3>${item.tipo_pagamento}</h3>
            <p><strong>Total de Vendas:</strong> R$ ${parseFloat(item.total_vendas).toFixed(2)}</p>
        `;

        filtrosDiv.appendChild(saleTotal);
    });
}

function displayTotalLiquido(totalLiquido) {
    const filtrosDiv = document.querySelector('.filtros');

    // Verifique se já existe a div 'total-relatorio' e remova-a antes de adicionar uma nova
    const existingTotalLiquidoDiv = filtrosDiv.querySelector('.total-relatorio');
    if (existingTotalLiquidoDiv) {
        existingTotalLiquidoDiv.remove();
    }

    const totalLiquidoDiv = document.createElement('div');
    totalLiquidoDiv.className = 'total-relatorio';

    totalLiquidoDiv.innerHTML = `
        <h3>Total de Vendas filtradas: R$ ${converteMoeda(totalLiquido)}</h3>
       
    `;

    filtrosDiv.appendChild(totalLiquidoDiv);
}

