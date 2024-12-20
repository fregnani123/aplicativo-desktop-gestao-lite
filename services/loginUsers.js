document.addEventListener('DOMContentLoaded', function () {
    // Define o foco inicial no campo de username
    const usersFocus = document.querySelector('#username');
    usersFocus.focus();

    // Seleciona o formulário de login
    const loginForm = document.getElementById('formLogin');
    console.log(loginForm);

    // Adiciona evento de submissão ao formulário
    loginForm.addEventListener('submit', handleLogin);

    // Adiciona evento para habilitar o botão de ativação
    const termosCheckbox = document.getElementById('termos');
    if (termosCheckbox) {
        termosCheckbox.addEventListener('change', habilitarBotao);
    }
});

// Função para tratar o login
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Debugging output (remova em produção)
    console.log(`Username: ${username}, Password: ${password}`);

    if (username === 'adm' && password === 'adm') {
        window.location.href = '../public/menu.html';
        console.log('Login bem-sucedido');
    } else {
        console.log('Usuário ou senha inválidos');
        exibirMensagemErro('Usuário ou senha inválidos');
    }
}

// Função para habilitar/desabilitar o botão com base no checkbox
function habilitarBotao() {
    const checkbox = document.getElementById('termos');
    const botao = document.getElementById('ativar-btn');
    botao.disabled = !checkbox.checked;
}

// Função para exibir mensagem de erro no login
function exibirMensagemErro(mensagem) {
    let erroDiv = document.getElementById('login-error');
    if (!erroDiv) {
        erroDiv = document.createElement('div');
        erroDiv.id = 'login-error';
        erroDiv.style.color = 'red';
        erroDiv.style.marginTop = '10px';
        erroDiv.setAttribute('aria-live', 'polite'); // Acessibilidade
        document.getElementById('formLogin').appendChild(erroDiv);
    }
    erroDiv.textContent = mensagem;
}

getLicenca('ABC-6581-7492-3841');