const apiEndpoints = {
    getFornecedor: 'http://localhost:3000/fornecedor',
    postNewFornecedor: 'http://localhost:3000/newFornecedor',
};

async function postNewFornecedor(fornecedorData) {
    const postNewFornecedorData = apiEndpoints.postNewFornecedor;

    if (!fornecedorData.cnpj || !fornecedorData.nome_fantasia) {
        console.log(`${'Erro: CNPJ e nome fantasia são obrigatórios.'}`, 'orange', 4000);
        return;
    }

    try {
        const response = await fetch(postNewFornecedorData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fornecedorData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error); // Lança a mensagem detalhada do backend
        }

        const data = await response.json();
        console.log('Fornecedor adicionado com sucesso:', data);
        alertMsg(`${'Fornecedor adicionado com sucesso'}`, 'success', 4000);
        limparFormulario();
       
        return data;

    } catch (error) {
        console.error('Erro ao adicionar fornecedor:', error.message);
        alertMsg(`${error.message}`, 'error', 4000); // Exibe o erro retornado pelo backend
        throw error;
    }
};

function getFornecedor(renderer) {
    const getFornecedor = apiEndpoints.getFornecedor;

    fetch(getFornecedor)
        .then(response => response.json())
        .then(data => {
            const fornecedor = data;
            fornecedor.forEach((fornecedor) => {
                const option = document.createElement('option');
                option.innerHTML = fornecedor.nome_fantasia;
                option.value = fornecedor.fornecedor_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}
