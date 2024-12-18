

// Método para formatar código EAN
function formatarCodigoEAN(inputElement) {
    let value = inputElement.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Limita o comprimento para 13 caracteres
    if (value.length > 13) {
        value = value.substring(0, 13);
    }

    inputElement.value = value;
}

// Função para formatar o campo de telefone
function formatarTelefone(input) {
    input.addEventListener('input', (e) => {
        let telefone = e.target.value;
        telefone = telefone.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
        telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses em volta do DDD
        telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen no quinto dígito

        e.target.value = telefone;
    });
}

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

//**********************************************************************************************************/
//************ Código renderiza o fornecedor no cadastro do produto ************

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


