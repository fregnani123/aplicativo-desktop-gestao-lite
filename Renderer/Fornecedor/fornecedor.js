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
        alertMsg(`${'CNPJ e nome fantasia são obrigatórios.'}`, 'orange', 4000);
        return;
    }
     await postNewFornecedor(newFornecedor); // Chama a função para enviar os dados 
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

