// Seletores de elementos
const dataVenda = document.querySelector('#data-venda');
const codigoEan = document.querySelector('#codigo');
const descricao = document.querySelector('#input-descricao');
const precoVenda = document.querySelector('#valor-unitario');
const inputQtd = document.querySelector('#input-qtd');
const selectCliente = document.querySelector('#select-cliente');
const ulDescricaoProduto = document.querySelector('.ul-descricao-produto');
const numeroPedido = document.querySelector('#numero-pedido');
const inputTotalLiquido = document.querySelector('#total-liquido');
const inputTotalPago = document.querySelector('#total-pago');
const unidadeEstoqueRender = document.querySelector('#medidaEstoque');
const divSelecionarQtd = document.querySelector('.square-2');
const textSelecionarQtd = document.querySelector('.qtd-p-1');
const alertLimparVenda = document.querySelector('.square-2-2-2');
const alertExit = document.querySelector('.square-2-2-2-2');
const alertRemoverItem = document.querySelector('.square-2-2-2-3');
const formaPagamento = document.querySelector('.square-2-2-2-4');
const inputExitVenda = document.querySelector('#exit-key');
const inputExcluiItem = document.querySelector('#numero-Item');


const mensagemDiv = document.querySelector('#mensagem');
const inputTroco = document.querySelector('#troco');


// Estado do carrinho
let carrinho = [];

// Define foco inicial
codigoEan.focus();



// Renderiza o carrinho na tela
function rendererCarrinho() {
    ulDescricaoProduto.innerHTML = '';
    carrinho.forEach((item, index) => {
        const produto = document.createElement('li');
        produto.classList.add('li-produto');

        const indexProduto = createSpan('spanIndex', index + 1);
        const codigoSpan = createSpan('spanEan', item.codigoEan);
        const descricaoSpan = createSpan(
            'spanDescricao',
            `${item.descricao} R$${item.preco} x ${item.Qtd}${item.unidadeEstoqueID}`
        );

        produto.append(indexProduto, codigoSpan, descricaoSpan);
        ulDescricaoProduto.appendChild(produto);
    });
}

// Calcula o total do carrinho
function calCarrinho() {
    textSelecionarQtd.innerHTML = '';
    const total = carrinho.reduce((acc, item) => {
        const precoFormatado = parseFloat(
            item.preco.replace(/\./g, '').replace(',', '.')
        );
        return acc + precoFormatado * parseInt(item.Qtd, 10);
    }, 0);
    inputTotalLiquido.value = `R$ ${converteMoeda(total)}`;
    return total;
}

// Adiciona produto ao carrinho
function pushProdutoCarrinho() {
    if (codigoEan.value === '' || descricao.value === '' || inputQtd.value === '') {
        console.log('Existem inputs vazios');
        return;
    }

    const produto = {
        codigoEan: codigoEan.value,
        descricao: descricao.value,
        preco: precoVenda.value,
        Qtd: inputQtd.value,
        unidadeEstoqueID: unidadeEstoqueRender.value,
    };

    carrinho.push(produto);
    console.log("Produto adicionado ao carrinho:", produto);
    rendererCarrinho();
    resetInputs();
    calCarrinho();
    alertLimparVenda.style.display = 'none';
}

// Limpa os campos de entrada
function resetInputs() {
    descricao.value = '';
    precoVenda.value = '';
    inputQtd.value = '';
    codigoEan.value = '';
    unidadeEstoqueRender.value = '';
}

// Formata valor em moeda brasileira
function converteMoeda(valor) {
    return valor
        .toFixed(2)
        .replace('.', ',')
        .replace(/\d(?=(\d{3})+,)/g, '$&.');
}

// Gerencia eventos de teclado
document.addEventListener('keydown', function (event) {
    const visibleDivs = [
        alertRemoverItem,
        formaPagamento,
        alertLimparVenda,
        divSelecionarQtd,
        alertExit,
    ].filter(div => div.style.display === 'flex'); // Verifica quais estão visíveis

    const mensagem = document.getElementById('mensagemPagamento');
    const divPagamento = document.querySelector('.div-pagamento');
   
    
    if (carrinho.length === 0) {
        divPagamento.style.display = 'none';
        mensagem.innerHTML = `<p class='alert'>Tecla V = Voltar</p><p>Não é possível inserir o pagamento, o carrinho está vazio. </p>`//
    } else {
        divPagamento.style.display = 'flex';
        mensagem.innerHTML = '';
        mensagem.style.display = 'none';
    }

    if (event.key === 'Enter') {
        event.preventDefault();
        if (alertRemoverItem.style.display === 'flex') {
            inputExcluiItem.focus();
        } else if (divSelecionarQtd.style.display === 'flex') {
            divSelecionarQtd.style.display = 'none';
            if (inputQtd.value === '') {
                textSelecionarQtd.innerHTML = '';
            } else {
                textSelecionarQtd.innerHTML = `${inputQtd.value}x`;
            }
            codigoEan.focus();
        }
    };

    if (event.key.toLowerCase() === 'c') {
        const index = parseInt(inputExcluiItem.value, 10) - 1;
        if (!isNaN(index) && index >= 0 && index < carrinho.length) {
            // Remove o item usando splice
            const itemRemovido = carrinho.splice(index, 1);
            mensagemDiv.innerHTML = `Item removido: ${index + 1}`
            mensagemDiv.style.color = 'green'
            rendererCarrinho();
            calCarrinho();
            inputExcluiItem.value = '';
            inputExcluiItem.focus();
        } else {
            console.log('Índice inválido.');
        }
        console.log('Estado atual do carrinho:', carrinho);
    }

    switch (event.key) {
        case 'F1':
            if (visibleDivs.length === 0) {
                event.preventDefault();
                divSelecionarQtd.style.display = 'flex';
                inputQtd.focus();
            }
            break;
        case 'F3':
            if (visibleDivs.length === 0) {
                event.preventDefault();
                alertLimparVenda.style.display = 'flex';
            }
            break;
        case 'F4':
            if (visibleDivs.length === 0) {
                formaPagamento.style.display = 'flex';
                valorDinheiro.focus();
                valorDinheiro.value = 'R$ 0,00';
            }
            break;
        case 'd':
            if (visibleDivs.length === 0) {
                alertRemoverItem.style.display = 'flex';
                inputExcluiItem.focus();
            }
            break;
        case 's':
        case 'S': // Quando pressionar 'S' ou 'sim', limpa tudo
            if (alertLimparVenda.style.display === 'flex') {
                limparTudo(); // Função que limpa carrinho e inputs
                alertLimparVenda.style.display = 'none'; // Fecha o alerta
            }
            break;
        case 'n':
        case 'N': // Quando pressionar 'N' ou 'não', apenas fecha o alerta
            if (alertLimparVenda.style.display === 'flex') {
                alertLimparVenda.style.display = 'none'; // Fecha o alerta sem limpar
            }
            break;
        case 'Escape':
            if (visibleDivs.length === 0) {
                event.preventDefault();
                alertExit.style.display = 'flex';
                inputExitVenda.focus();
            }
            break;
        case 'v':
        case 'V': // Adiciona ao carrinho ou esconde divs visíveis
            if (visibleDivs.length > 0) {
                visibleDivs.forEach(div => div.style.display = 'none');
                inputTroco.value = '0,00';
                inputTotalPago.value = '0,00'
                codigoEan.focus(); // Retorna o foco para o campo de código de barras
            } else {
                event.preventDefault();
                pushProdutoCarrinho();
            }
            break;
    }
});

function limparTudo() {
    carrinho = []; // Limpa o carrinho
    rendererCarrinho(); // Re-renderiza a lista de produtos (agora vazia)
    resetInputs(); // Limpa todos os campos de entrada
    inputTotalLiquido.value = 'R$ 0,00'; // Zera o total líquido
    inputTotalPago.value = 'R$ 0,00'; // Zera o total pago
    inputTroco.value = 'R$ 0,00'; // Zera o troco
    console.log('Carrinho e campos foram limpos!');
}

// Função que reseta os inputs
function resetInputs() {
    descricao.value = '';
    precoVenda.value = '';
    inputQtd.value = '';
    codigoEan.value = '';
    unidadeEstoqueRender.value = '';
};

// Cria elemento <span> com classe e texto
function createSpan(className, textContent) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = textContent;
    return span;
}

// Valida entrada do código EAN
codigoEan.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
    if (e.target.value.length === 13) {
        if (!descricao.value && !inputQtd.value) inputQtd.value = '1';
        getProduto(descricao, e.target.value, precoVenda, unidadeEstoqueRender);
        setTimeout(() => {
            pushProdutoCarrinho();
            calCarrinho();
        }, 100);
    } else if (e.target.value.length === 0) resetInputs();
});

// Formata valor com separador de milhar
function formatCurrency(value) {
    return value
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

inputQtd.addEventListener('input', function (e) {
    let value = e.target.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Limita o número de caracteres a 13
    if (value.length > 9) {
        value = value.substring(0, 9);
    }

    // Atualiza o valor do input com o valor formatado
    e.target.value = value;
});



// Lógica para redirecionamento no alertExit
const handleInputExit = (e) => {
    if (e.target.value === 'a') {
        window.location.href = '../public/menu.html';
        inputExitVenda.removeEventListener('input', handleInputExit);
    }
};
inputExitVenda.addEventListener('input', handleInputExit, { once: true });


//














// Obter referências aos elementos
const valorDinheiro = document.getElementById('valorDinheiro');
const divValorDinheiro = document.getElementById('div-valorDinheiro');

const PIX = document.getElementById('PIX');
const divPIX = document.getElementById('div-PIX');

const CartaoDebito = document.getElementById('Cartao-Debito');
const divCartaoDebito = document.getElementById('div-Cartao-Debito');

const CartaoCredito = document.getElementById('Cartao-Credito');
const divCartaoCredito = document.getElementById('div-Cartao-Credito');

// Selecionar os campos de entrada
const inputsPagamento = [valorDinheiro, PIX, CartaoDebito, CartaoCredito];

// Adicionar o evento de entrada a todos os inputs
// Adicionar o evento de entrada a todos os inputs
inputsPagamento.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
        value = (parseFloat(value) / 100).toFixed(2); // Converte para decimal
        e.target.value = formatCurrency(value); // Formata como moeda

        // Verificar se o valor é maior que 0 e ajustar o estilo
        if (parseCurrency(e.target.value) > 0) {
            e.target.style.border = '1px solid green';
            e.target.style.color = 'green';
        } else {
            e.target.style.border = '1px solid transparent'; // Define uma borda vermelha para valores 0
            e.target.style.color = 'black'; // Define cor padrão
        }

        atualizarValores(); // Atualiza os cálculos
    });

    // Inicializar o campo com 0,00 e uma borda padrão
    input.value = formatCurrency(0);
    input.style.border = '1px solid transparent'; // Borda padrão inicial
    input.style.color = 'black'; // Cor padrão inicial
});




// Mapear os atalhos para as divisões correspondentes
const formasPagamento = {
    "F6": divValorDinheiro,
    "F7": divPIX,
    "F8": divCartaoDebito,
    "F9": divCartaoCredito,
};

// Tornar todas as divisões invisíveis inicialmente
Object.values(formasPagamento).forEach(div => {
    div.style.display = 'none';
});

// Controlar as divisões ativas
let divsAtivas = new Set();

// Alternar entre formas de pagamento com atalhos
document.addEventListener('keydown', (e) => {
    if (formasPagamento[e.key]) {
        const div = formasPagamento[e.key];

        if (e.shiftKey) {
            // Exibir a nova forma de pagamento sem ocultar as outras
            div.style.display = 'flex';
            divsAtivas.add(div);
        } else {
            // Ocultar todas as divisões e exibir apenas a selecionada
            divsAtivas.forEach(divAtiva => {
                divAtiva.style.display = 'none';
            });
            divsAtivas.clear();

            div.style.display = 'flex';
            divsAtivas.add(div);
        }

        // Focar no input correspondente à tecla pressionada
        const inputCorrespondente = document.getElementById(div.id.replace('div-', ''));
        inputCorrespondente.focus();
    }
});

document.addEventListener('keydown', (e) => {
    if (formasPagamento[e.key]) {
        const div = formasPagamento[e.key];
        const inputCorrespondente = document.getElementById(div.id.replace('div-', ''));

        if (e.shiftKey) {
            // Exibe a nova forma de pagamento sem ocultar as outras
            div.style.display = 'flex';
        } else {
            // Oculta todas as outras e exibe apenas a selecionada
            Object.values(formasPagamento).forEach(otherDiv => {
                otherDiv.style.display = 'none';
            });
            div.style.display = 'flex';
        }

        // Foca no input correspondente
        elementoAtivo = inputCorrespondente;
        elementoAtivo.focus();
    }
});


// Formatar valores como moeda
function formatCurrency(value) {
    const formattedValue = value || 0; // Se o valor for inválido, define como 0
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formattedValue);
}

// Converter valor para número
function parseCurrency(value) {
    const parsedValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
    return isNaN(parsedValue) ? 0 : parsedValue; // Retorna 0 se o valor não for um número
}

// Atualizar os valores
function atualizarValores() {
    const totalLiquido = parseCurrency(inputTotalLiquido.value);
    const valorPago =
        parseCurrency(valorDinheiro.value) +
        parseCurrency(PIX.value) +
        parseCurrency(CartaoDebito.value) +
        parseCurrency(CartaoCredito.value);

    const troco = Math.max(0, valorPago - totalLiquido);
    inputTotalPago.value = formatCurrency(valorPago);
    inputTroco.value = formatCurrency(troco);
}

// Adicionar evento aos inputs
[valorDinheiro, PIX, CartaoDebito, CartaoCredito].forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = (parseFloat(value) / 100).toFixed(2);
        e.target.value = formatCurrency(value);
        atualizarValores();
    });

    // Inicializar todos os inputs com 0,00
    input.value = formatCurrency(0);
});