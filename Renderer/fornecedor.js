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