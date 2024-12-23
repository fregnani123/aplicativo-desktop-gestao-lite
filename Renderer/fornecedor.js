// Declarando as variáveis para os campos do formulário
const telefone = document.getElementById('telefone');
const cnpj = document.getElementById('cnpj');
const ie = document.getElementById('ie');
const cep = document.getElementById('cep');
const email = document.getElementById('email');
const razaoSocial = document.getElementById('razaoSocial');
const nomeFantasia = document.getElementById('nomeFantasia');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const observacoes = document.getElementById('observacoes');

// Função para limitar caracteres no campo de entrada
function inputMaxCaracteres(input, maxLength) {
    input.addEventListener("input", function () {
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength);
        }
    });
}

// Função para formatar o telefone (ex: (XX) XXXX-XXXX)
function formatarTelefone(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/\D/g, ''); // Remove tudo o que não for número
        if (value.length <= 2) {
            input.value = value.replace(/^(\d{0,2})/, '($1');
        } else if (value.length <= 6) {
            input.value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
        } else {
            input.value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        }
    });
}

// Função para formatar o CNPJ (ex: XX.XXX.XXX/XXXX-XX)
function formatarCNPJ(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/\D/g, ''); // Remove tudo o que não for número
        if (value.length <= 2) {
            input.value = value.replace(/^(\d{0,2})/, '$1');
        } else if (value.length <= 5) {
            input.value = value.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
        } else if (value.length <= 8) {
            input.value = value.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else if (value.length <= 12) {
            input.value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
        } else {
            input.value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
        }
    });
}

// Função para formatar a inscrição estadual (ex: XX.XXX.XXX)
function formatarIE(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/\D/g, ''); // Remove tudo o que não for número
        if (value.length <= 3) {
            input.value = value.replace(/^(\d{0,3})/, '$1');
        } else if (value.length <= 6) {
            input.value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
        } else {
            input.value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        }
    });
}

// Função para formatar o CEP (ex: 12345-678)
function formatarCEP(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/\D/g, ''); // Remove tudo o que não for número
        if (value.length <= 5) {
            input.value = value.replace(/^(\d{0,5})/, '$1');
        } else {
            input.value = value.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
        }
    });
}

// Função para verificar o email
function verificarEmail(input) {
    input.addEventListener('input', function () {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(input.value)) {
            input.setCustomValidity("Por favor, insira um email válido.");
        } else {
            input.setCustomValidity("");
        }
    });
}

// APLICANDO A FORMATAÇÃO NOS CAMPOS

// Formatando o campo telefone
formatarTelefone(telefone);
inputMaxCaracteres(telefone, 15);

// Formatando o campo CNPJ
formatarCNPJ(cnpj);
inputMaxCaracteres(cnpj, 18);

// Formatando o campo IE
formatarIE(ie);
inputMaxCaracteres(ie, 14);

// Formatando o campo CEP
formatarCEP(cep);
inputMaxCaracteres(cep, 9);

// Verificando o campo email
verificarEmail(email);
inputMaxCaracteres(email, 150);

// Limitando o número de caracteres para outros campos
inputMaxCaracteres(razaoSocial, 200);
inputMaxCaracteres(nomeFantasia, 200);
inputMaxCaracteres(endereco, 255);
inputMaxCaracteres(bairro, 150);
inputMaxCaracteres(cidade, 150);
inputMaxCaracteres(uf, 2);

// Enviar dados do formulário
async function sendNewFornecedor() {
    const newFornecedor = {
        cnpj: cnpj.value.trim() || null,
        inscricao_estadual: ie.value.trim() || null,
        razao_social: razaoSocial.value.trim(),
        nome_fantasia: nomeFantasia.value.trim() || null,
        cep: cep.value.trim() || null,
        endereco: endereco.value.trim() || null,
        bairro: bairro.value.trim() || null,
        uf: uf.value.trim().toUpperCase() !== "SELECIONE" ? uf.value.toUpperCase() : null,
        cidade: cidade.value.trim() !== "selecione" ? cidade.value : null,
        telefone: telefone.value.trim() || null,
        email: email.value.trim() || null,
        observacoes: observacoes.value.trim() || null
    };

    // Validar Razão Social
    if (!newFornecedor.razao_social) {
        alert("O campo 'Razão Social' é obrigatório.");
        return;
    }

    try {
        await postNewFornecedor(newFornecedor); // Supondo que postNewFornecedor seja assíncrono
        alertMsg('Fornecedor cadastrado com sucesso!', 'success', 3000);
        selectFornecedor.value = '';
        getFornecedor(selectFornecedor);
        containerRegisterForm.style.display = 'none';
        btnFornecedorMenu.classList.remove('li-fornecedor-active');
    } catch (error) {
        alertMsg('Erro ao cadastrar fornecedor. Tente novamente.', 'error', 4000);
        return;
    }

    // Limpa os campos
    limparFormulario();
}

// Função para limpar os campos
function limparFormulario() {
    telefone.value = '';
    cnpj.value = '';
    ie.value = '';
    cep.value = '';
    email.value = '';
    razaoSocial.value = '';
    nomeFantasia.value = '';
    endereco.value = '';
    bairro.value = '';
    cidade.value = '';
    uf.value = '';
    observacoes.value = '';
}

// Adicionando evento ao botão de envio
document.getElementById("btn-cad-fornecedor").addEventListener("click", (e) => {
    e.preventDefault();
    sendNewFornecedor();
});

