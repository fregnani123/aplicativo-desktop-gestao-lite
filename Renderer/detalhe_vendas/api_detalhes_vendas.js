// Fetch dados da API
async function fetchSalesHistory({ startDate, endDate, clienteNome, numeroPedido }) {
    try {
        // Constrói os parâmetros da URL dinamicamente
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (clienteNome) params.append('clienteNome', clienteNome);
        if (numeroPedido) params.append('numeroPedido', numeroPedido);

        // Faz a requisição com os parâmetros
        const response = await fetch(`http://localhost:3000/getHistoricoVendas?${params.toString()}`);

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
};
