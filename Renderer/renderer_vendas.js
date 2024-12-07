
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
const alertExit= document.querySelector('.square-2-2-2-2');
const alertRemoverItem= document.querySelector('.square-2-2-2-3');
const formaPagamento= document.querySelector('.square-2-2-2-4');
const inputExitVenda= document.querySelector('#exit-key');
const inputExcluiItem= document.querySelector('#numero-Item');
const mensagemDiv = document.querySelector('#mensagem');
const inputTroco = document.querySelector('#troco');


codigoEan.focus(); // Define o foco no input

let carrinho = [];

function rendererCarrinho() {
    ulDescricaoProduto.innerHTML = '';
    carrinho.forEach((item, index) => {
        const produto = document.createElement('li');
        produto.classList.add('li-produto');

        // Número do item
        const indexProduto = document.createElement('span');
        indexProduto.classList.add('spanIndex');
        indexProduto.textContent = index + 1;

        // Código EAN
        const codigoEan = document.createElement('span');
        codigoEan.classList.add('spanEan');
        codigoEan.textContent = item.codigoEan;

        // Descrição do produto
        const descricao = document.createElement('span');
        descricao.classList.add('spanDescricao');
        descricao.textContent = `${item.descricao} R$${item.preco} x ${item.Qtd}${item.unidadeEstoqueID}`;

        // Adiciona cada elemento ao `produto`
        produto.appendChild(indexProduto);
        produto.appendChild(codigoEan);
        produto.appendChild(descricao);
        

        // Adiciona o item à lista
        ulDescricaoProduto.appendChild(produto);

    });
}

function calCarrinho() {

    textSelecionarQtd.innerHTML=''; 

    let total = carrinho.reduce((acc, item) => {
        // Remove pontos dos milhares e substitui a vírgula por ponto para parseFloat
        let precoFormatado = item.preco.replace(/\./g, '').replace(',', '.');
        return acc + (parseFloat(precoFormatado) * parseInt(item.Qtd));
    }, 0);

    // Converte o total para o formato de moeda brasileira
    const totalConvertido = converteMoeda(total);

    // Exibe o valor formatado no campo inputTotalLiquido
    inputTotalLiquido.value = `R$ ${totalConvertido}`;
   

    return total;
}



function pushProdutoCarrinho() {
    const produto = {
        codigoEan: codigoEan.value,
        descricao: descricao.value,
        preco: precoVenda.value,
        Qtd: inputQtd.value,
        unidadeEstoqueID: unidadeEstoqueRender.value
    };

    if (codigoEan.value === '' || descricao.value === '' || inputQtd.value === '') {
        console.log('existem inputs vazios');
        return;
    } else {
        carrinho.push(produto);
        console.log("Produto adicionado ao carrinho:", produto);
        console.log("Carrinho atual:", carrinho);
        rendererCarrinho();
        alertLimparVenda.style.display = 'none'
        descricao.value = '';
        precoVenda.value = '';
        inputQtd.value = '';
        codigoEan.value = '';
        unidadeEstoqueRender.value = '';
    }
    calCarrinho();
}
codigoEan.addEventListener('input', (e) => {
    let value = e.target.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Limita o número de caracteres a 13
    if (value.length > 13) {
        value = value.substring(0, 13);
    }

    // Atualiza o valor do input com o valor formatado
    e.target.value = value;
});

codigoEan.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');  // Remove caracteres não numéricos
    const EAN = e.target.value;

    if (EAN.length === 13) {  // Verifica se o código EAN tem 13 caracteres
        if (descricao.value === '' && inputQtd.value === '') {
            inputQtd.value = '1';
        }

        getProduto(descricao, EAN, precoVenda, unidadeEstoqueRender);  // Preenche os detalhes do produto

        setTimeout(() => {
            pushProdutoCarrinho();  // Adiciona o produto ao carrinho
            calCarrinho();  // Atualiza o total do carrinho
        }, 100);  // Delay para garantir o preenchimento dos valores
    }

    if (EAN.length <= 0) {  // Limpa os campos se o EAN tiver menos de 13 caracteres
        descricao.value = '';
        precoVenda.value = '';
        inputQtd.value = '';
    }
});

document.addEventListener('keydown', function (event) {
    // Verifica se alguma div está visível
    const isAnyDivVisible = [
        alertRemoverItem,
        formaPagamento,
        alertLimparVenda,
        divSelecionarQtd,
        alertExit
    ].some(div => div.style.display === 'flex');

    // Tecla F8 - Mostrar alertRemoverItem
    if (event.key === 'F8' && !isAnyDivVisible) {
        alertRemoverItem.style.display = 'flex';
        inputExcluiItem.focus();
    }

    // Tecla F3 - Mostrar formaPagamento
    if (event.key === 'F3' && !isAnyDivVisible) {
        formaPagamento.style.display = 'flex';
        formaPagamento.focus();
    }

    // Tecla F1 - Abrir divSelecionarQtd
    if (event.key === 'F1' && !isAnyDivVisible) {
        event.preventDefault();
        divSelecionarQtd.style.display = 'flex';
        QtdFocus();
    }

    // Tecla F6 - Mostrar alertLimparVenda
    if (event.key === 'F6' && !isAnyDivVisible) {
        event.preventDefault();
        alertLimparVenda.style.display = 'flex';
    }

    // Tecla Enter - Verificar se deve focar ou atualizar
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
            EanFocus();
        }
    }

    // Tecla ESC - Mostrar alertExit
    if (event.key === 'Escape' && !isAnyDivVisible) {
        event.preventDefault();
        alertExit.style.display = 'flex';
        inputExitVenda.focus();
    }

    // Tecla 'v' - Fechar alertRemoverItem ou alertExit
    if (event.key === 'v') {
        event.preventDefault();
        if (alertRemoverItem.style.display === 'flex') {
            alertRemoverItem.style.display = 'none';
            inputExcluiItem.value = '';
            mensagemDiv.innerHTML = '';
            EanFocus();
        } else if (alertExit.style.display === 'flex') {
            alertExit.style.display = 'none';
            EanFocus();
        }

        if ( formaPagamento.style.display === 'flex') {
            formaPagamento.style.display = 'none';
            formaPagamento.value = '';
            mensagemDiv.innerHTML = '';
            EanFocus();
        } 
    }

    // Tecla 'n' - Fechar alertLimparVenda
    if (event.key === 'n' && alertLimparVenda.style.display === 'flex') {
        event.preventDefault();
        alertLimparVenda.style.display = 'none';
        EanFocus();
    }

    // Tecla 's' - Resetar alertLimparVenda
    if (event.key === 's' && alertLimparVenda.style.display === 'flex') {
        event.preventDefault();
        resetDefaults();
    }

    // Lógica para redirecionamento no alertExit
    const handleInputExit = (e) => {
        if (e.target.value === 'a') {
            window.location.href = '../public/menu.html';
            inputExitVenda.removeEventListener('input', handleInputExit);
        }
    };
    inputExitVenda.addEventListener('input', handleInputExit, { once: true });
});


function resetDefaults() {
    // Esconde os elementos necessários
    alertLimparVenda.style.display = 'none';
    divSelecionarQtd.style.display = 'none';

    // Limpa os campos de entrada
    codigoEan.value = '';
    descricao.value = '';
    precoVenda.value = '';
    inputQtd.value = '';
    unidadeEstoqueRender.value = '';

    // Reseta texto e total
    textSelecionarQtd.innerHTML = '';
    inputTotalLiquido.value = '';
    inputTotalPago.value = '';

    // Limpa o carrinho e renderiza novamente
    carrinho = [];
    rendererCarrinho();

    // Foca no campo do código EAN
    EanFocus();
}

function QtdFocus() {
    inputQtd.focus();
    // Adicione aqui o código necessário para atualizar seu aplicativo
}
function EanFocus() {
    codigoEan.focus();
    // Adicione aqui o código necessário para atualizar seu aplicativo
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







valorDinheiro.addEventListener('input', (e) => {
    let value = e.target.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Converte para um número com duas casas decimais
    value = (parseFloat(value) / 100).toFixed(2);

    // Atualiza o valor do campo, substitui o ponto por vírgula
    value = value.replace('.', ','); // Substitui o ponto decimal por vírgula

    // Adiciona ponto como separador de milhar
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Adiciona o ponto como separador de milhar

    // Define o valor formatado no campo
    e.target.value = value;

    // Captura o valor de inputTotalLiquido e valorDinheiro corretamente
    let totalLiquido = parseFloat(inputTotalLiquido.value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
    let valorPago = parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;

    if (totalLiquido === 0) {
        valorDinheiro.value = '0,00'; // Define o valor como 0,00
        valorDinheiro.readOnly = true; // Bloqueia o campo
    } else {
        valorDinheiro.readOnly = false; // Desbloqueia o campo
    }

    // Verifica se os valores são válidos antes de calcular o troco
    if (!isNaN(totalLiquido) && !isNaN(valorPago)) {
        // Calcula o troco
        let troco = valorPago - totalLiquido;

        // Formata o troco para "0,00" caso seja negativo
        if (troco < 0) {
            troco = 0;
        }

        // Atualiza os campos
        inputTroco.value = converteMoeda(troco);
        inputTotalPago.value = valorDinheiro.value;

        // Log de teste
        console.log('Troco: ', troco.toFixed(2)); // Exemplo de uso
    } else {
        inputTotalPago.value = '0,00';
        inputTroco.value = '0,00';
        console.log('Valores inválidos para o cálculo.');
    }
});



const escolherformaPagamento= [
    {id: 1,  pagamento:'À Vista'},
    {id: 2, pagamento: 'PIX' },
    {id: 2, pagamento: 'Cartao Credito' },
    {id: 2, pagamento: 'Cartao Debito' },
    {id: 2, pagamento: 'Boleto' },
    {id: 2, pagamento: 'Crediario' },
]


