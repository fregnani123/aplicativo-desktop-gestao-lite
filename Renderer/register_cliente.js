// Capturando os elementos do formulário
const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const dataNascimento = document.getElementById('dataNascimento');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const cep = document.getElementById('cep');
const logradouro = document.getElementById('logradouro');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro');
const uf = document.getElementById('uf');
const cidade = document.getElementById('cidade');
const observacoes = document.getElementById('observacoes');
const salvarCliente = document.getElementById('salvar-cliente');

// Aplicando as formatações e verificações
formatarTelefone(telefone);
inputMaxCaracteres(telefone, 15);

verificarEmail(email);
inputMaxCaracteres(email, 150);

formatarCEP(cep);
inputMaxCaracteres(cep, 9);

formatarEVerificarCPF(cpf);
inputMaxCaracteres(cpf, 14);

// Limitando o número de caracteres para outros campos
inputMaxCaracteres(nome, 200);
inputMaxCaracteres(logradouro, 250);
inputMaxCaracteres(bairro, 150);
inputMaxCaracteres(cidade, 150);
inputMaxCaracteres(uf, 2);

// Função para enviar os dados do cliente
async function sendNewCliente() {
    const newCliente = {
        nome: nome.value.trim() || null,
        cpf: cpf.value.trim() || null,
        dataNascimento: dataNascimento.value || null,
        telefone: telefone.value.trim() || null,
        email: email.value.trim() || null,
        cep: cep.value.trim() || null,
        logradouro: logradouro.value.trim() || null,
        numero: numero.value.trim() || null,
        bairro: bairro.value.trim() || null,
        estado: uf.value.trim().toUpperCase() !== "SELECIONE" ? uf.value.toUpperCase() : null,
        cidade: cidade.value.trim() || null,
        observacoes: observacoes.value.trim() || null
    };

        await postNewCliente(newCliente);
}

// Função para limpar os campos do formulário
function limparFormulario() {
    nome.value = '';
    cpf.value = '';
    dataNascimento.value = '';
    telefone.value = '';
    email.value = '';
    cep.value = '';
    logradouro.value = '';
    numero.value = '';
    bairro.value = '';
    uf.value = '';
    cidade.value = '';
    observacoes.value = '';
}

// Adicionando evento ao botão de salvar
salvarCliente.addEventListener('click', (event) => {
    event.preventDefault();
    sendNewCliente();
});
