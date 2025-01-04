// Seletores de elementos
const dataVenda = document.querySelector('#data-venda');
const codigoEan = document.querySelector('#codigo');
const descricao = document.querySelector('#input-descricao');
const precoVenda = document.querySelector('#valor-unitario');
const inputQtd = document.querySelector('#input-qtd');
const selectCliente = document.querySelector('#nome-cliente');
const clienteId = document.querySelector("#id-cliente");
const ulDescricaoProduto = document.querySelector('.ul-descricao-produto');
const numeroPedido = document.querySelector('#numero-pedido');
const inputTotalLiquido = document.querySelector('#total-liquido');
const inputTotalPago = document.querySelector('#total-pago');
const unidadeEstoqueRender = document.querySelector('#medidaEstoque');
const divSelecionarQtd = document.querySelector('.div-qtd');
const textSelecionarQtd = document.querySelector('.qtd-p-1');
const alertLimparVenda = document.querySelector('.confirmation-clear');
const alertExit = document.querySelector('.exit-venda');
const alertRemoverItem = document.querySelector('.remove-item');
const formaPagamento = document.querySelector('.square-2-2-2-4');
const inputExitVenda = document.querySelector('#exit-key');
const inputExcluiItem = document.querySelector('#numero-Item');
const mensagemDiv = document.querySelector('#mensagem');
const inputTroco = document.querySelector('#troco');
const valorDinheiro = document.getElementById('valorDinheiro');
const PIX = document.getElementById('PIX');
const CartaoDebito = document.getElementById('Cartao-Debito');
const CartaoCredito = document.getElementById('Cartao-Credito');
const info_container = document.querySelector('.info-container');
const imgProduto = document.querySelector('.img-produto');
const impressaoCupom = document.getElementById('impressaoCupom');


// Estado do carrinho
let carrinho = [];

// Define foco inicial
codigoEan.focus();


document.addEventListener('DOMContentLoaded', () => {
    const numeroPedido = document.querySelector('#numero-pedido');
    getVenda(numeroPedido);
    const carrinho = [];
    const codigoEan = document.querySelector('#codigo');
    const inputQtd = document.querySelector('#input-qtd');
    const alertLimparVenda = document.querySelector('.confirmation-clear');
    const alertExit = document.querySelector('.exit-venda');
    const alertRemoverItem = document.querySelector('.remove-item');
    const divSelecionarQtd = document.querySelector('.div-qtd');
    const divPagamento = document.querySelector('.payment-form-section');
  
    codigoEan.focus();

    document.addEventListener('keydown', (event) => {
        const visibleDivs = [alertRemoverItem, divPagamento, alertLimparVenda, divSelecionarQtd, alertExit].filter(div => div.style.display === 'block');

        switch (event.key) {
            case 'F1':
                if (visibleDivs.length === 0) {
                    divSelecionarQtd.style.display = 'block';
                    inputQtd.focus();
                }
                break;

            case 'F3':
                if (visibleDivs.length === 0) {
                    divPagamento.style.display = 'flex';
                    valorDinheiro.focus();
                }
                break;

            case 'F5':
                if (visibleDivs.length === 0) {
                    alertRemoverItem.style.display = 'block';
                }
                break;

            case 'F12':
                if (visibleDivs.length === 0) {
                    alertLimparVenda.style.display = 'block';
                }
                break;

            case 'Escape':
                if (visibleDivs.length === 0) {
                    alertExit.style.display = 'block';
                }
                break;

            case 'Enter':
                if (alertRemoverItem.style.display === 'block') {
                    const inputExcluiItem = document.querySelector('#numero-Item');
                    inputExcluiItem.focus();
                } else if (divSelecionarQtd.style.display === 'block') {
                    divSelecionarQtd.style.display = 'none';
                    codigoEan.focus();
                }
                break;

            case 'c':
            case 'C':
                if (alertRemoverItem.style.display === 'block') {
                    const inputExcluiItem = document.querySelector('#numero-Item');
                    const index = parseInt(inputExcluiItem.value, 10) - 1;
                    if (!isNaN(index) && index >= 0 && index < carrinho.length) {
                        carrinho.splice(index, 1);
                        console.log(`Item ${index + 1} removido.`);
                    }
                    inputExcluiItem.value = '';
                    inputExcluiItem.focus();
                }
                break;

            case 's':
            case 'S':
                if (alertLimparVenda.style.display === 'block') {
                    carrinho.length = 0; // Limpa o carrinho
                    alertLimparVenda.style.display = 'none';
                }
                break;

            case 'n':
            case 'N':
                if (alertLimparVenda.style.display === 'block') {
                    alertLimparVenda.style.display = 'none';
                }
                break;

            default:
                break;
        }
    });
});

// Valida entrada do código EAN
codigoEan.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
    if (e.target.value.length === 13) {
        if (!descricao.value && !inputQtd.value) inputQtd.value = '1';
        getProduto( descricao, e.target.value, precoVenda, unidadeEstoqueRender);
        setTimeout(() => {
            pushProdutoCarrinho({
                carrinho,produtoIdGlobal,codigoEan,descricao,precoVenda,inputQtd,unidadeEstoqueRender,rendererCarrinho,ulDescricaoProduto,createSpan,resetInputs,calCarrinho,converteMoeda,inputTotalLiquido,textSelecionarQtd,getVenda,numeroPedido,alertLimparVenda
            });
            calCarrinho(
                carrinho,
                converteMoeda,
                inputTotalLiquido,
                textSelecionarQtd
            );
            //renderiza input numero pedido - data da venda - cliente
            info_container.style.display = 'flex';
        }, 100);
    } else if (e.target.value.length === 0) resetInputs();
    getVenda(numeroPedido.value);
});

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




