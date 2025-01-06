// Fetch dados da API
async function fetchSalesHistory() {
    try {
        const response = await fetch('http://localhost:3000/getHistoricoVendas');
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        const data = await response.json();
        console.log(data);

        const groupedSales = groupSalesByOrder(data.rows);
        displaySalesHistory(groupedSales);

        // Supondo que 'data.totalRows' seja o array de totais agrupados por forma de pagamento
        const totalRows = data.totalRows;
        displayTotalSales(totalRows); // Exibe os totais de vendas
        const totalLiquido = calculateTotalSales(groupedSales); // Soma os totais líquidos
        displayTotalLiquido(totalLiquido); // Exibe o total de vendas líquidas
    } catch (error) {
        console.error('Erro ao buscar o histórico de vendas:', error);
    }
}

// Agrupar vendas por número do pedido
function groupSalesByOrder(sales) {
    return sales.reduce((grouped, sale) => {
        if (!grouped[sale.numero_pedido]) {
            grouped[sale.numero_pedido] = {
                numero_pedido: sale.numero_pedido,
                data_venda: sale.data_venda,
                cliente_nome: sale.cliente_nome,
                produtos: [],
                tipo_pagamento:sale.tipo_pagamento,
                total_liquido: sale.total_liquido, // Usa o total fornecido pela API
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

// Calcular o total de vendas líquidas
function calculateTotalSales(groupedSales) {
    return Object.values(groupedSales).reduce((total, saleGroup) => {
        return total + parseFloat(saleGroup.total_liquido);
    }, 0);
}

// Exibir dados de vendas agrupadas
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
            <strong>Data da Venda:</strong> ${saleGroup.data_venda}<br>
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

// Exibir totais de vendas por forma de pagamento
function displayTotalSales(totalRows) {
    const filtrosDiv = document.querySelector('.total-filtradas'); // Seleciona a div para exibir os totais
    filtrosDiv.innerHTML = ''; // Limpa a div para evitar duplicações

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

// Exibir o total de vendas líquidas
function displayTotalLiquido(totalLiquido) {
    const filtrosDiv = document.querySelector('.filtros');
    const totalLiquidoDiv = document.createElement('div');
    totalLiquidoDiv.className = 'total-relatorio';

    totalLiquidoDiv.innerHTML = `
        <h3>Total Geral de Vendas Líquidas</h3>
        <p class='total-vendas'><strong>Total Líquido:</strong> R$ ${totalLiquido.toFixed(2)}</p>
    `;

    filtrosDiv.appendChild(totalLiquidoDiv);
}

// Inicia o carregamento dos dados
document.addEventListener('DOMContentLoaded', fetchSalesHistory);
