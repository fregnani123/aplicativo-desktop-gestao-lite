// Eventos para exibir o formulário de cadastro de grupo, subgrupo e fornecedor
async function postNewGrupoProduto(newGrupoData) {
    const postNewGrupoProdutoData = apiEndpoints.postNewGrupoProduto;
    fetch(postNewGrupoProdutoData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGrupoData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();

        })
        .then(data => {
            console.log('Grupo adicionado com sucesso:', data);
            // // Chama a função para carregar novamente os grupos a partir da API
            getGrupo(selectGrupo);
        })
        .catch(error => {
            console.error('Error adding Grupo:', error);
        });

}

async function postNewSubGrupoProduto(newSubGrupoData) {
    const postNewSubGrupoProdutoData = apiEndpoints.postNewSubGrupoProduto;
    fetch(postNewSubGrupoProdutoData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubGrupoData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Sub-Grupo added successfully:', data);
            // Atualiza os subgrupos a partir da API
            getSubGrupo(selectSubGrupo);
        })
        .catch(error => {
            console.error('Error adding Sub-Grupo:', error);
        });
}



function criarEstruturaFormulario(container, tipo, placeholder, onSubmit, onExit) {
    container.innerHTML = '';

    const divContainer = document.createElement('div');
    divContainer.className = `div-${tipo}`;

    const exitButton = document.createElement('button');
    exitButton.id = 'btn-exit';
    exitButton.className = 'btn-exit';
    exitButton.textContent = 'X';
    divContainer.appendChild(exitButton);

    const labelText = document.createElement('span');
    labelText.textContent = `Cadastrar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    divContainer.appendChild(labelText);

    const input = document.createElement('input');
    input.className = `new${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    input.id = 'grupos-inputs'
    input.type = 'text';
    input.placeholder = placeholder;
    divContainer.appendChild(input);

    const cadButton = document.createElement('button');
    cadButton.id = `btn-cad-${tipo}`;
    cadButton.textContent = 'Cadastrar';
    divContainer.appendChild(cadButton);

    container.appendChild(divContainer);
    
      // Focar no input automaticamente
      input.focus();

    // Eventos
    cadButton.addEventListener('click', onSubmit);
    exitButton.addEventListener('click', onExit);

    return input;
}


function renderizarInputsGrupo() {
    const tipo = 'grupo';

    const inputNewGrupo = criarEstruturaFormulario(
        containerRegister,
        tipo,
        '',
        (e) => {
            e.preventDefault();

            const newGrupo = {
                nome_grupo: inputNewGrupo.value.trim()
            };

            if (!inputNewGrupo.value.trim()) {
                alertMsg('O campo de grupo não pode estar vazio!','orange',4000);
                inputNewGrupo.focus();
                return;
            }

            postNewGrupoProduto(newGrupo);
            inputNewGrupo.value = ''; // Limpa o campo após o envio
            // Limpa as opções atuais do select e redefine a primeira como "Selecione"
            selectGrupo.innerHTML = '<option value="">Selecione</option>';
        },
        (e) => {
            e.preventDefault();
            containerRegister.style.display = 'none';
        }
    );
}

function renderizarInputsSubGrupo() {
    const tipo = 'subGrupo';

    const inputNewSubGrupo = criarEstruturaFormulario(
        containerRegister,
        tipo,
        '',
        (e) => {
            e.preventDefault();
        
            const newSubGrupo = {
                nome_sub_grupo: inputNewSubGrupo.value.trim()
            };

            if (!inputNewSubGrupo.value.trim()) {
                alertMsg('O campo de sub-grupo não pode estar vazio!','orange',4000);
                inputNewSubGrupo.focus();
                return;
            }
            postNewSubGrupoProduto(newSubGrupo);
            inputNewSubGrupo.value = ''; // Limpa o campo após o envio
            // Limpa as opções atuais do select e redefine a primeira como "Selecione"
            selectSubGrupo.innerHTML = '<option value="">Selecione</option>';
        },
        (e) => {
            e.preventDefault();
            containerRegister.style.display = 'none';
        }
    );
}
