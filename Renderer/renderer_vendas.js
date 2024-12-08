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
const valorDinheiro = document.getElementById('valorDinheiro');

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

    // Verifica se o carrinho está vazio e altera o estado do campo 'valorDinheiro'
    if (carrinho.length === 0) {
        valorDinheiro.readOnly = true; // Bloqueia o campo
        valorDinheiro.style.color='red';
        valorDinheiro.style.border='1px solid red';
        mensagem.innerHTML = 'Não é possível inserir o pagamento, o carrinho está vazio.'; // Exibe a mensagem
        console.log(mensagem)
    } else {
        valorDinheiro.readOnly = false; // Permite a edição
        mensagem.innerHTML = ''; // Limpa a mensagem se o carrinho não estiver vazio
        valorDinheiro.style.background='';
        valorDinheiro.style.border='none';
        valorDinheiro.style.color='black';
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
    }

    switch (event.key) {
        case 'F8':
            if (visibleDivs.length === 0) {
                alertRemoverItem.style.display = 'flex';
                inputExcluiItem.focus();
            }
            break;
        case 'F4':
            if (visibleDivs.length === 0) {
                formaPagamento.style.display = 'flex';
                valorDinheiro.focus();
                valorDinheiro.value = '0,00'
            }
            break;
        case 'F1':
            if (visibleDivs.length === 0) {
                event.preventDefault();
                divSelecionarQtd.style.display = 'flex';
                inputQtd.focus();
            }
            break;
        case 'F6':
            if (visibleDivs.length === 0) {
                event.preventDefault();
                alertLimparVenda.style.display = 'flex';
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

// Evento de entrada para valorDinheiro
valorDinheiro.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = (parseFloat(value) / 100).toFixed(2);
    e.target.value = formatCurrency(value);

    const totalLiquido = parseFloat(inputTotalLiquido.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const valorPago = parseFloat(value.replace(',', '.')) || 0;

    const troco = Math.max(0, valorPago - totalLiquido);
    inputTroco.value = converteMoeda(troco);
    inputTotalPago.value = valorDinheiro.value;
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