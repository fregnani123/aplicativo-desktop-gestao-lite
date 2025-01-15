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
const textSelecionarQtd = document.querySelector('.qtd-selecionada');
const alertLimparVenda = document.querySelector('.confirmation-clear');
const alertExit = document.querySelector('.exit-venda');
const alertRemoverItem = document.querySelector('.remove-item');
const formaPagamento = document.querySelector('.square-2-2-2-4');
const inputExitVenda = document.querySelector('#exit-key');
const inputlimparTelakey = document.querySelector('#limpar-tela-key');
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
const div_qtd = document.querySelector('.product-quantity')

// Estado do carrinho
let carrinho = [];

// Define foco inicial
codigoEan.focus();


document.addEventListener('DOMContentLoaded', () => {
    const numeroPedido = document.querySelector('#numero-pedido');
    getVenda(numeroPedido);
    const codigoEan = document.querySelector('#codigo');
    const inputQtd = document.querySelector('#input-qtd');
    const alertLimparVenda = document.querySelector('.confirmation-clear');
    const alertExit = document.querySelector('.exit-venda');
    const alertRemoverItem = document.querySelector('.remove-item');
    const divSelecionarQtd = document.querySelector('.div-qtd');
    const divPagamento = document.querySelector('.payment-form-section');
  

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
                    divPagamento.style.display = 'block';
                    valorDinheiro.focus();
                }
                break;
                case 'F4':
                    if (divPagamento.style.display === 'block') {
                        FinalizarVenda();
                        divPagamento.style.display = 'none';
                        codigoEan.focus(); // Certifique-se de manter o foco aqui
                    }
                    break;
            case 'F5':
                if (visibleDivs.length === 0) {
                    alertRemoverItem.style.display = 'block';
                    inputExcluiItem.focus();
                }
                break;

            case 'F12':
                if (visibleDivs.length === 0) {
                    alertLimparVenda.style.display = 'block';
                   
                }
                break;
                case 'Delete':
                    console.log("carrinho: ",carrinho)
                    if (alertRemoverItem.style.display === 'block') {
                        const index = parseInt(inputExcluiItem.value, 10) - 1;
                        if (!isNaN(index) && index >= 0 && index < carrinho.length) {
                            carrinho.splice(index, 1);
                            calCarrinho(
                                carrinho,
                                converteMoeda,
                                inputTotalLiquido,
                                textSelecionarQtd
                            );
                            rendererCarrinho(carrinho, ulDescricaoProduto, createSpan);
                            console.log(`Item ${index + 1} removido.`);
                        }
                        inputExcluiItem.value = '';
                        inputExcluiItem.focus();
                    }
                break;

            case 'Escape':

            inputExcluiItem.value = '';
            inputExitVenda.value = '';

                    if (visibleDivs.length === 0) {
                        // Alterna o estado de alertExit
                        alertExit.style.display = alertExit.style.display === 'block' ? 'none' : 'block';
                        if(alertExit.style.display === 'block'){
                            inputExitVenda.focus();
                        }
                    } else {
                        // Fecha qualquer div visível (inclusive divPagamento)
                        visibleDivs.forEach(div => div.style.display = 'none');
                        codigoEan.focus();
                    }
                    break; 
                   
            case 'Enter': // Adiciona qtde escolhida no input apertando enter 
                if (alertRemoverItem.style.display === 'block') {
                    const inputExcluiItem = document.querySelector('#numero-Item');
                    inputExcluiItem.focus();
                } else if (divSelecionarQtd.style.display === 'block') {
                    divSelecionarQtd.style.display = 'none';
                    codigoEan.focus();
                }
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
          
            div_qtd.style.backgroundColor = '';
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
    textSelecionarQtd.innerHTML = e.target.value;
    div_qtd.style.backgroundColor = 'yellow';
});



const handleInputExit = (e) => {
    if (e.key === 'Enter') { // Verifica se a tecla pressionada foi Enter
        if (inputExitVenda.value === 'adm') {
            window.location.href = '../public/menu.html';
        } else {
            alertMsg('Senha incorreta, tente novamente.', 'error', 3000);
            inputExitVenda.value ='';

            setTimeout(() => {
                inputExitVenda.focus();
            }, 4000);
        }
        }
};

const limparTelakey = (e) => {
    if (e.key === 'Enter') { // Verifica se a tecla pressionada foi Enter
        if (inputlimparTelakey.value === 'adm') {
            alertMsg('Todos os campos serão limpos e a venda será reiniciada.', 'warning', 6000);
            limparCampos();
        } else {
            alertMsg('Senha incorreta, tente novamente.', 'error', 3000);
            inputlimparTelakey.value ='';
            setTimeout(() => {
                inputlimparTelakey.focus();
            }, 4000);
        }
        }
};


// Adiciona o evento keydown ao campo de entrada
inputExitVenda.addEventListener('keydown', handleInputExit);
inputlimparTelakey.addEventListener('keydown', limparTelakey);





