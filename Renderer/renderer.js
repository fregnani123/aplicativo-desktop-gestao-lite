// Seleciona os elementos do dropdown
const selectGrupo = document.querySelector('#grupo');
const selectSubGrupo = document.querySelector('#sub-grupo');
const selectFornecedor = document.querySelector('#fornecedor');
const selectTamanhoLetras = document.querySelector('#tamanhoLetras');
const selectTamanhoNumeros = document.querySelector('#tamanhoNumeros');
const selectUnidadeMassa = document.querySelector('#unidadeDeMassa');
const selectMedidaVolume = document.querySelector('#medidaVolume');
const selectUnidadeComprimento = document.querySelector('#unidadeComprimento');
const selectUnidadeEstoque = document.querySelector('#unidadeEstoque');
const selectCorProduto = document.querySelector('#corProduto');

// Seleciona todos os campos de input
const inputCodigoEAN = document.querySelector('#codigoDeBarras');
const inputNomeProduto = document.querySelector('#nomeProduto');
const inputObservacoes = document.querySelector('#observacoes');
const inputMassa = document.querySelector('#massaNumero');
const inputVolume = document.querySelector('#volumeNumero');
const inputComprimento = document.querySelector('#comprimento');
const inputQuantidadeEstoque = document.querySelector('#estoqueQtd');
const inputPrecoCompra = document.querySelector('#precoCusto');
const inputMarkup = document.querySelector('#inputMarkup');
const outputLucro = document.querySelector('#lucro');
const inputPrecoVenda = document.querySelector('#precoVenda');

const inputPathImg = document.querySelector('#produto-imagem');
const divImgProduct = document.querySelector('.quadro-img');
const btnExit = document.querySelector('#botaoSair')

//Metodos criado por mim que renderizam os values iniciais padrões ou cadastrados no DB.

getGrupo(selectGrupo);
getSubGrupo(selectSubGrupo);
getFornecedor(selectFornecedor);
getTamanhoLetras(selectTamanhoLetras);
getTamanhoNumeros(selectTamanhoNumeros);
getunidadeComprimento(selectUnidadeComprimento);
getunidadeEstoque(selectUnidadeEstoque);
getMedidaVolume(selectMedidaVolume);
getCorProduto(selectCorProduto);
getunidadeDeMassa(selectUnidadeMassa);

inputMaxCaracteres(inputNomeProduto, 150); //max caracteres input
inputMaxCaracteres(inputObservacoes, 150);

const btnFornecedorMenu = document.querySelector('.menu-item-8');


// Formatação do campo de preço de compra
inputPrecoCompra.addEventListener('input', (e) => {
    let value = e.target.value;
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');
    
    // Converte para um número com duas casas decimais
    value = (parseFloat(value) / 100).toFixed(2);
    
    // Atualiza o valor do campo, substitui o ponto por vírgula
    value = value.replace('.', ','); // Substitui o ponto decimal por vírgula

    // Adiciona ponto como separador de milhar
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona o ponto como separador de milhar

    // Define o valor formatado no campo
    e.target.value = value;

  calcularMarkup()
});

// Função para calcular o markup
function calcularMarkup() {
    // Obtém o preço de compra e a margem de markup
    const precoCompra = parseFloat(inputPrecoCompra.value.replace(',', '.')); // Troca vírgula por ponto
    const margemMarkup = parseFloat(inputMarkup.value.replace(',', '.')); // Troca vírgula por ponto

    // Verifica se os valores são válidos
    if (!isNaN(precoCompra) && !isNaN(margemMarkup)) {
        // Calcula o valor do markup
        const calc = precoCompra * (margemMarkup / 100);
        outputLucro.value = calc.toFixed(2).replace('.', ',');
        precoVenda.value = (calc + precoCompra).toFixed(2).replace('.', ',');
        console.log('Markup: R$ ' + calc.toFixed(2).replace('.', ','));
    } else {
        console.log('Valores inválidos');
    }
}


// Adiciona ouvintes de eventos para os campos de entrada
inputPrecoCompra.addEventListener('input', calcularMarkup);
inputMarkup.addEventListener('input', calcularMarkup);



// Formatação do campo de preço de venda
inputPrecoVenda.addEventListener('input', (e) => {
    let value = e.target.value;
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');
    
    // Converte para um número com duas casas decimais
    value = (parseFloat(value) / 100).toFixed(2);
    
    // Atualiza o valor do campo, substitui o ponto por vírgula
    value = value.replace('.', ','); // Substitui o ponto decimal por vírgula

    // Adiciona ponto como separador de milhar
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona o ponto como separador de milhar

    // Define o valor formatado no campo
    e.target.value = value;

    // Chama as funções para calcular lucro
    calcularLucroPorVenda();
    calcularLucro();
});


inputCodigoEAN.addEventListener('input', (e) => {
    let value = e.target.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Limita o número de caracteres a 13
    if (value.length > 13) {
        value = value.substring(0, 13);
    }

    // Atualiza o valor do input com o valor formatado
    e.target.value = value;
});

// Permite apenas números e um ponto decimal no campo de markup
inputMarkup.addEventListener('input', (e) => {
    // Se o input estiver vazio, redefine a saída e retorna
    if (e.target.value === '') {
        inputPrecoVenda.value = '0,00';
        outputLucro.value = '0,00';
        // Resetando o valor da saída para '0,00' quando o input é limpo
        return;
    }

    // Substitui caracteres não numéricos e garante que apenas um ponto decimal é permitido
    e.target.value = e.target.value
        .replace(/[^0-9,.]/g, '') // Permitir dígitos, vírgulas e pontos
        .replace(/(\..*)\./g, '$1') // Garantir que apenas um ponto decimal é permitido
        .replace(/,/g, '.'); // Converter vírgula em ponto para a conversão correta para float
});

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
            console.log('Grupo added successfully:', data);
            // // Chama a função para carregar novamente os grupos a partir da API
            getGrupo(selectGrupo);
        })
        .catch(error => {
            console.error('Error adding Grupo:', error);
        });

}


    const containerRegister = document.querySelector('.container-register');

    const btnCadGrupo = document.querySelector('#add-grupo');
    const btnCadSubGrupo = document.querySelector('#add-subGrupo');
  

    btnCadGrupo.addEventListener('click', (e) => {
        e.preventDefault();
        containerRegister.style.display = 'flex';
        renderizarInputsGrupo();
    });

    btnCadSubGrupo.addEventListener('click', (e) => {
        e.preventDefault();
        containerRegister.style.display = 'flex';
        renderizarInputsSubGrupo();
    });


    // Função para criar o formulário de cadastro de grupo
    function renderizarInputsGrupo() {
        containerRegister.innerHTML = '';

        const divGrupo = document.createElement('div');
        divGrupo.className = 'div-grupo';

        const exitButton = document.createElement('button');
        exitButton.id = 'btn-exit';
        exitButton.className = 'btn-exit';
        exitButton.textContent = 'X';
        divGrupo.appendChild(exitButton);

        const labelText = document.createElement('span');
        labelText.textContent = 'Cadastrar Grupo';
        divGrupo.appendChild(labelText);

        const inputGrupo = document.createElement('input');
        inputGrupo.className = 'newGrupo';
        inputGrupo.type = 'text';
        inputGrupo.placeholder = 'Nome do Grupo';
        divGrupo.appendChild(inputGrupo);

        const cadButton = document.createElement('button');
        cadButton.id = 'btn-cad-grupo';
        cadButton.textContent = 'Cadastrar';
        divGrupo.appendChild(cadButton);

        containerRegister.appendChild(divGrupo);

        let inputNewGrupo = document.querySelector('.newGrupo');

        cadButton.addEventListener('click', (e) => {
            e.preventDefault();

            const newGrupo = {
                nome_grupo: inputNewGrupo.value.trim()
            };

            if (!inputNewGrupo.value.trim()) {
                alert('O campo de grupo não pode estar vazio!');
                return;
            }

            postNewGrupoProduto(newGrupo);
            inputNewGrupo.value = ''; // Limpa o campo após o envio
            // Limpa as opções atuais do select e redefine a primeira como "Selecione"
            selectGrupo.innerHTML = '<option value="">Selecione</option>';

        });

        exitButton.addEventListener('click', (e) => {
            e.preventDefault();
            containerRegister.style.display = 'none';

        });
    }

    // Função para criar o formulário de cadastro de subgrupo

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
                console.log('sub-grupo added successfully:', data);
                // // Chama a função para carregar novamente os grupos a partir da API
                getSubGrupo(selectSubGrupo);
            })
            .catch(error => {
                console.error('Error adding Sub-Grupo:', error);
            });

    }

    function renderizarInputsSubGrupo() {
        
        containerRegister.innerHTML = '';

        const divSubGrupo = document.createElement('div');
        divSubGrupo.className = 'div-subGrupo';

        const exitButton = document.createElement('button');
        exitButton.id = 'btn-exit';
        exitButton.className = 'btn-exit';
        exitButton.textContent = 'X';
        divSubGrupo.appendChild(exitButton);

        const labelText = document.createElement('span');
        labelText.textContent = 'Cadastrar Sub-Grupo';
        divSubGrupo.appendChild(labelText);

        const inputSubGrupo = document.createElement('input');
        inputSubGrupo.className = 'newSubGrupo';
        inputSubGrupo.type = 'text';
        inputSubGrupo.placeholder = 'Nome do Sub-Grupo';
        divSubGrupo.appendChild(inputSubGrupo);

        const cadButton = document.createElement('button');
        cadButton.id = 'btn-cad-subGrupo';
        cadButton.textContent = 'Cadastrar';
        divSubGrupo.appendChild(cadButton);

        containerRegister.appendChild(divSubGrupo);

        let inputNewSubGrupo = document.querySelector('.newSubGrupo');

        cadButton.addEventListener('click', (e) => {
            e.preventDefault();

            const newSubGrupo = {
                nome_sub_grupo: inputNewSubGrupo.value.trim()
            };

            if (!inputNewSubGrupo.value.trim()) {
                alert('O campo de sub-grupo não pode estar vazio!');
                return;
            }

            postNewSubGrupoProduto(newSubGrupo);
            inputNewSubGrupo.value = ''; // Limpa o campo após o envio
            // Limpa as opções atuais do select e redefine a primeira como "Selecione"
            selectSubGrupo.innerHTML = '<option value="">Selecione</option>';

        });

        exitButton.addEventListener('click', (e) => {
            e.preventDefault();
            containerRegister.style.display = 'none';
        });
    }

    //formatar Telefone
    function formatarTelefone(input) {
        input.addEventListener('input', (e) => {
            let telefone = e.target.value;
            telefone = telefone.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
            telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses em volta do DDD
            telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen no quinto dígito

            e.target.value = telefone;
        });
    };
    function verificarEmail(input) {
        input.addEventListener('blur', (e) => { // Trigger the validation when the input loses focus
            let email = e.target.value;

            // Expressão regular para validar e-mail
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Verifica se o valor digitado é um e-mail válido
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.'); // Alerta se o e-mail for inválido
            }
        });
    }

    function formatarCNPJ(input) {
        input.addEventListener('input', (e) => {
            let cnpj = e.target.value;

            // Remove qualquer caractere que não seja número
            cnpj = cnpj.replace(/\D/g, '');

            // Aplica a formatação do CNPJ
            cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");           // Coloca o ponto após os 2 primeiros dígitos
            cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); // Coloca o segundo ponto após os 3 dígitos seguintes
            cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");          // Adiciona a barra após mais 3 dígitos
            cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");             // Coloca o hífen após os 4 dígitos

            // Limita o número de caracteres a 18 (incluindo a formatação)
            if (cnpj.length > 18) {
                cnpj = cnpj.substring(0, 18);
            }

            // Atualiza o valor do input com o CNPJ formatado
            e.target.value = cnpj;
        });
    }

    function formatarIE(input) {
        input.addEventListener('input', (e) => {
            let IE = e.target.value;

            // Remove qualquer caractere que não seja número
            IE = IE.replace(/\D/g, '');

            // Limita o número de caracteres a 18 (incluindo a formatação)
            if (IE.length > 9) {
                IE = IE.substring(0, 9);
            }

            // Atualiza o valor do input com o CNPJ formatado
            e.target.value = IE;
        });
    }

    // Formatar CEP
    function formatarCEP(input) {
        input.addEventListener('input', (e) => {
            let cep = e.target.value;
            cep = cep.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
            cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após o quinto dígito

            if (cep.length > 9) {
                cep = cep.substring(0, 9);
            }

            e.target.value = cep;
        });
    };


    //Renderizar Div Fornecedor
   
    const containerRegisterForm = document.querySelector('.container-register-form')

    btnExit.addEventListener('click',(e)=>{
        containerRegisterForm.style.display = 'none';
        btnFornecedorMenu.classList.remove('menu-item-8-active');
    })

    btnFornecedorMenu.addEventListener('click', (e) => {
        e.preventDefault();
        containerRegisterForm.style.display = 'flex';
        renderizarDivFornecedor();
        btnFornecedorMenu.classList.add('menu-item-8-active');
    });

    // Renderiza form cadastro Fornecedor
    function renderizarDivFornecedor() {
       
        // Função para formatar o campo telefone 
        const inputTelefone = document.getElementById('telefone');
        formatarTelefone(inputTelefone);

        // Função para formatar o campo cnpj
        const inputTCnpj = document.getElementById('cnpj');
        formatarCNPJ(inputTCnpj);

        // Função para formatar o campo inscrição estadual
        const inputIE = document.getElementById('ie');
        formatarIE(inputIE);

        // Função para formatar o campo CEP
        const inputCep = document.getElementById('cep');
        formatarCEP(inputCep);

        // Função para formatar o campo email
        const inputEmail = document.getElementById('email');
        verificarEmail(inputEmail);
        inputMaxCaracteres(inputEmail, 150);


        // Função para formatar caracteres máximo, campo razao Social
        const razao_social = document.getElementById('razaoSocial');
        inputMaxCaracteres(razao_social, 200);

        // Função para formatar caracteres máximo, campo nome fantasia
        const nome_fantasia = document.getElementById('nomeFantasia');
        inputMaxCaracteres(nome_fantasia, 200);

        // Função para formatar caracteres máximo, campo endereco
        const endereco = document.getElementById('endereco');
        inputMaxCaracteres(endereco, 250);

        // Função para formatar caracteres máximo, campo bairro
        const bairro = document.getElementById('bairro');
        inputMaxCaracteres(bairro, 150);


    }


// Função para exibir a imagem do produto
inputPathImg.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
        const rendererImgProduct = document.createElement('img');
        rendererImgProduct.style.maxWidth = '100%';

        const reader = new FileReader();

        reader.onload = function (e) {
            rendererImgProduct.src = e.target.result;
            divImgProduct.innerHTML = '';
            divImgProduct.appendChild(rendererImgProduct);
        };

        reader.readAsDataURL(file);

        const relativePath = file.name.replace(/\.[^/.]+$/, "");
        inputPathImg.setAttribute('data-relative-path', relativePath);
    }
};

// Evento para cadastrar um novo produto
document.querySelector('#btn-cadastrar').addEventListener('click', function (e) {
    e.preventDefault();
    const file = document.querySelector('input[type="file"]').files[0];
    let relativePath = null;

    if (file) {
        const extension = file.name.split('.').pop();
        relativePath = `${inputPathImg.getAttribute('data-relative-path')}-${inputCodigoEAN.value}.${extension}`;
        uploadImage(relativePath);
    }
    const produtoData = {
        codigo_ean: inputCodigoEAN.value,
        nome_produto: inputNomeProduto.value,
        observacoes: inputObservacoes.value,
        categoria_id: selectGrupo.value,
        grupo_produto_id: selectSubGrupo.value,
        fornecedor_id: selectFornecedor.value,
        tamanho_letras_id: selectTamanhoLetras.value,
        tamanho_num_id: selectTamanhoNumeros.value,
        unidade_massa_id: selectUnidadeMassa.value,
        unidade_comprimento_id: selectUnidadeComprimento.value,
        medida_volume_id: selectMedidaVolume.value,
        quantidade_estoque: inputQuantidadeEstoque.value,
        preco_compra: inputPrecoCompra.value.replace(",", "."),
        markup: inputMarkup.value,
        preco_venda: inputPrecoVenda.value.replace(",", "."),
        unidade_estoque_id: selectUnidadeEstoque.value,
        cor_produto: selectCorProduto.value,
        caminho_imagem: relativePath,
    };
    
    postNewProduto(produtoData);

    // Limpar todos os campos
    inputCodigoEAN.value = '';
    inputNomeProduto.value = '';
    inputObservacoes.value = '';
    inputMassa.value = '';
    inputVolume.value = '';
    inputComprimento.value = '';
    inputQuantidadeEstoque.value = '';
    inputPrecoCompra.value = '';
    inputMarkup.value = '';
    outputLucro.value = '';
    inputPrecoVenda.value = '';

    // Resetar as seleções dos dropdowns
    selectGrupo.selectedIndex = 0;
    selectSubGrupo.selectedIndex = 0;
    selectFornecedor.selectedIndex = 0;
    selectTamanhoLetras.selectedIndex = 0;
    selectTamanhoNumeros.selectedIndex = 0;
    selectUnidadeMassa.selectedIndex = 0;
    selectMedidaVolume.selectedIndex = 0;
    selectUnidadeComprimento.selectedIndex = 0;
    selectUnidadeEstoque.selectedIndex = 0;
    selectCorProduto.selectedIndex = 0;

    // Limpar pré-visualização da imagem
    divImgProduct.innerHTML = ` <img class="img-produto" src="../style/img/produto.png" alt="imagem produto">`;
    inputPathImg.value = '';

});


// Função para enviar a imagem
async function uploadImage(filePath) {
    const fileInput = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('image', fileInput.files[0], filePath);

    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Imagem enviada com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar a imagem:', error);
        });
} 