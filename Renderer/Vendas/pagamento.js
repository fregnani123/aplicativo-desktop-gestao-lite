//************************************ Forma de pagamento **************** */

// Referências aos elementos de forma de pagamento
const elementosPagamento = {
    valorDinheiro: document.getElementById('valorDinheiro'),
    divValorDinheiro: document.getElementById('div-valorDinheiro'),
    PIX: document.getElementById('PIX'),
    divPIX: document.getElementById('div-PIX'),
    CartaoDebito: document.getElementById('Cartao-Debito'),
    divCartaoDebito: document.getElementById('div-Cartao-Debito'),
    CartaoCredito: document.getElementById('Cartao-Credito'),
    divCartaoCredito: document.getElementById('div-Cartao-Credito'),
};

const inputsPagamento = Object.values(elementosPagamento).filter(item => item.tagName === 'INPUT');

// Inicializar os campos de pagamento com 0,00 e estilo padrão
inputsPagamento.forEach(input => {
    input.value = formatCurrency(0);
    input.style.border = '1px solid transparent';
    input.style.color = 'black';

    input.addEventListener('input', (e) => handleInput(e));
});

// Formatar valores como moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

// Converter valor para número
function parseCurrency(value) {
    const parsedValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
    return isNaN(parsedValue) ? 0 : parsedValue;
}

// Lógica para atualizar os valores
function atualizarValores() {
    const totalLiquido = parseCurrency(inputTotalLiquido.value);
    const valorPago = calculateTotalPago();
    const troco = Math.max(0, valorPago - totalLiquido);

    inputTotalPago.value = formatCurrency(valorPago.toFixed(2));
    inputTroco.value = formatCurrency(troco.toFixed(2));
}

// Calcula o total pago
function calculateTotalPago() {
    return inputsPagamento.reduce((acc, input) => acc + parseCurrency(input.value), 0);
}

// Manipula a entrada de dados nos campos de pagamento
function handleInput(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    value = (parseFloat(value) / 100).toFixed(2); // Converte para decimal
    e.target.value = formatCurrency(value); // Formata como moeda

    // Verificar o que está sendo capturado
    console.log(`Valor digitado no campo ${e.target.id}: ${e.target.value}`);

    // Atualiza a borda e a cor com base no valor
    const isValid = parseCurrency(e.target.value) > 0;
    e.target.style.border = isValid ? '1px solid green' : '1px solid transparent';
    e.target.style.color = isValid ? 'green' : 'black';

    atualizarValores(); // Atualiza os cálculos
}

// Mapear os atalhos para as divisões correspondentes
const formasPagamento = {
    "F3": 'valorDinheiro',
    "F6": 'valorDinheiro',
    "F7": 'PIX',
    "F8": 'CartaoDebito',
    "F9": 'CartaoCredito',
};

// Tornar todas as divisões invisíveis inicialmente
Object.values(formasPagamento).forEach(inputId => {
    elementosPagamento['div' + inputId.charAt(0).toUpperCase() + inputId.slice(1)].style.display = 'none';
});

// Controlar as divisões ativas
let divsAtivas = new Set();

// Alternar entre formas de pagamento com atalhos
document.addEventListener('keydown', (e) => {
    if (formasPagamento[e.key]) {
        handleKeyDown(e);
    }
});

// Lógica de alternância de divisões de pagamento
function handleKeyDown(e) {
    const divKey = formasPagamento[e.key];
    const div = elementosPagamento['div' + divKey.charAt(0).toUpperCase() + divKey.slice(1)];
    const input = elementosPagamento[divKey]; // Obtém o input correspondente

    // Mostrar a div selecionada
    if (e.shiftKey) {
        div.style.display = 'flex';
        divsAtivas.add(div);
    } else {
        divsAtivas.forEach(divAtiva => divAtiva.style.display = 'none');
        divsAtivas.clear();
        div.style.display = 'flex';
        divsAtivas.add(div);
    }

    // Adiciona um pequeno atraso para garantir que o input esteja visível
    setTimeout(() => {
        if (input) {
            input.focus();
        } else {
            console.error('Input não encontrado para o key: ', divKey);
        }
    }, 100); // Ajuste o tempo conforme necessário
}

function getFormasDePagamento() {
    const pagamentos = [];
    const valorDinheiroFormatted = parseCurrency(valorDinheiro.value); // Formata o valor do Dinheiro
    const valorPIXFormatted = parseCurrency(PIX.value); // Formata o valor do PIX
    const valorCartaoDebitoFormatted = parseCurrency(CartaoDebito.value); // Formata o valor do Cartão de Débito
    const valorCartaoCreditoFormatted = parseCurrency(CartaoCredito.value); // Formata o valor do Cartão de Crédito

    if (valorDinheiroFormatted > 0) {
        pagamentos.push({ tipo: 'Dinheiro', valor: valorDinheiroFormatted.toFixed(2) });
    }
    if (valorPIXFormatted > 0) {
        pagamentos.push({ tipo: 'PIX', valor: valorPIXFormatted.toFixed(2) });
    }
    if (valorCartaoDebitoFormatted > 0) {
        pagamentos.push({ tipo: 'Cartão Débito', valor: valorCartaoDebitoFormatted.toFixed(2) });
    }
    if (valorCartaoCreditoFormatted > 0) {
        pagamentos.push({ tipo: 'Cartão Crédito', valor: valorCartaoCreditoFormatted.toFixed(2) });
    }

    return pagamentos;
}
