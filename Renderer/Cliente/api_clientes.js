const apiEndpoints = {
    postNewCliente: 'http://localhost:3000/postNewCliente',
};

async function postNewCliente(clienteData) {
    const postNewClienteData = apiEndpoints.postNewCliente;

    if (!clienteData.cpf || !clienteData.nome) {
        alertMsg('CPF e nome são obrigatórios.','orange', 4000);
        return;
    }

    try {
        const response = await fetch(postNewClienteData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error); // Lança a mensagem detalhada do backend
        }

        const data = await response.json();
        console.log('cliente adicionado com sucesso:', data);
        alertMsg(`${'cliente adicionado com sucesso'}`, 'success', 4000);
        limparFormulario();
        return data;

    } catch (error) {
        console.error('Erro ao adicionar cliente:', error.message);
        alertMsg(`${error.message}`, 'error', 4000); // Exibe o erro retornado pelo backend
        throw error;
    }
};
