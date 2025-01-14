
// Método para formatar código EAN

function formatarCodigoEAN(inputEan){
    inputEan.addEventListener('input', (e) => {
      // Remove non-numeric characters and limit the input to 13 characters
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
      if (e.target.value.length === 13) {
        getProdutoEstoque(e.target.value);
      }
    });
  }

// Função para formatar o telefone (ex: (XX) XXXX-XXXX)
function formatarTelefone(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/\D/g, ''); // Remove tudo o que não for número
        if (value === "") {
            input.value = ""; // Permite que o campo fique vazio
        } else if (value.length <= 2) {
            input.value = value.replace(/^(\d{0,2})/, '($1');
        } else if (value.length <= 6) {
            input.value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
        } else {
            input.value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
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

// Função para verificar se o CPF é válido
function verificarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não for número

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // CPF inválido se tiver menos de 11 dígitos ou todos os dígitos iguais
    }

    let soma = 0;
    let resto;

    // Verifica o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    // Verifica o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true; // CPF válido
}

// Função para formatar e verificar o CPF no campo de entrada
function formatarEVerificarCPF(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/\D/g, ''); // Remove tudo o que não for número

        // Formata o CPF enquanto o usuário digita
        if (value === "") {
            input.value = ""; // Permite campo vazio
        } else if (value.length <= 3) {
            input.value = value.replace(/^(\d{0,3})/, '$1');
        } else if (value.length <= 6) {
            input.value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
        } else if (value.length <= 9) {
            input.value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else {
            input.value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        }
    });

    input.addEventListener('blur', function () {
        let cpf = input.value.replace(/\D/g, ''); // Remove a formatação
        if (cpf && !verificarCPF(cpf)) {
            input.setCustomValidity("CPF inválido. Verifique os dados informados.");
        } else {
            input.setCustomValidity("");
        }
    });
}

// Função para limitar caracteres no campo de entrada
function inputMaxCaracteres(input, maxLength) {
    input.addEventListener("input", function () {
        if (input.value.length > maxLength) {
            input.value = input.value.slice(0, maxLength);
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
};


// Função para validar e formatar a data
function validarDataVenda(dataVenda) {
    const regexBR = /^\d{2}\/\d{2}\/\d{4}$/; // Verifica formato DD/MM/YYYY
    const regexISO = /^\d{4}-\d{2}-\d{2}$/; // Verifica formato YYYY-MM-DD

    if (regexBR.test(dataVenda)) {
        // Converte de DD/MM/YYYY para YYYY-MM-DD
        const [dia, mes, ano] = dataVenda.split('/');
        const date = new Date(`${ano}-${mes}-${dia}`);
        return isNaN(date.getTime()) ? null : `${ano}-${mes}-${dia}`;
    } else if (regexISO.test(dataVenda)) {
        // Converte de YYYY-MM-DD para DD/MM/YYYY
        const [ano, mes, dia] = dataVenda.split('-');
        const date = new Date(`${ano}-${mes}-${dia}`);
        return isNaN(date.getTime()) ? null : `${dia}/${mes}/${ano}`;
    }

    return null; // Retorna null se o formato for inválido
}

function SituaçaoMovimento(e) {
    const situacaoSelecionada = e.target.value;

    // Limpar o select de movimento
    movimentoSelect.innerHTML = '<option value="">Selecione</option>';

    // Verificar se há motivos para a situação selecionada
    if (motivos[situacaoSelecionada]) {
        // Preencher o select de movimento com os motivos correspondentes
        motivos[situacaoSelecionada].forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index + 1; // Pode ajustar o valor conforme necessário
            option.textContent = item.motivo; // Acessar a propriedade `motivo`
            movimentoSelect.appendChild(option);
        });
    }
}

function liberarInputs() {
    // Verificar se o valor do select é "2"
    if (alterarPreco.value === '2') {
        inputPrecoCompra.readOnly = false; // Habilitar edição
        inputMarkupEstoque.readOnly = false;
        inputprecoVenda.readOnly = false;

        inputPrecoCompra.style.background = 'white';
        inputMarkupEstoque.style.background = 'white';
        inputprecoVenda.style.background = 'white';
    } else {
        inputPrecoCompra.readOnly = true; // Tornar somente leitura
        inputMarkupEstoque.readOnly = true;
        inputprecoVenda.readOnly = true;

        inputPrecoCompra.style.background = '#007bff00';
        inputMarkupEstoque.style.background = '#007bff00';
        inputprecoVenda.style.background = '#007bff00';
    }
}

function liberarInputsCV() {
    if (situacaoSelect.value === '1' && movimentoSelect.value === '1') {
        inputinputqtChaveCompra.readOnly = false;
        inputinputqtChaveCompra.style.background = 'white';
    } else {
        inputinputqtChaveCompra.readOnly = true; // Tornar somente leitura
        inputinputqtChaveCompra.style.background = '#007bff00';
    }
}

function liberarInputsNV() {
    if (situacaoSelect.value === '2' && movimentoSelect.value === '1' || situacaoSelect.value === '1' && movimentoSelect.value === '2' ) {
        inputqtvenda_id.readOnly = false;
        inputqtvenda_id.style.background = 'white';
    } else {
        inputqtvenda_id.readOnly = true; // Tornar somente leitura
        inputqtvenda_id.style.background = '#007bff00';
    }
}

// Função para formatar a data no formato 'yyyy-mm-dd HH:mm:ss'
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se o mês for 1-9
    const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se o dia for 1-9
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}