// Seletores de elementos
const dataVenda = document.querySelector('#data-venda');
const codigoEan = document.querySelector('#codigo');
const descricao = document.querySelector('#input-descricao');
const precoVenda = document.querySelector('#valor-unitario');
const inputQtd = document.querySelector('#input-qtd');
const selectCliente = document.querySelector('#nome-cliente');
const clienteId = document.querySelector("#id-cliente")
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
const PIX = document.getElementById('PIX');
const CartaoDebito = document.getElementById('Cartao-Debito');
const CartaoCredito = document.getElementById('Cartao-Credito');



// Estado do carrinho
let carrinho = [];

// Define foco inicial
codigoEan.focus();


// Gerencia eventos de teclado
document.addEventListener('keydown', function (event) {
    const visibleDivs = [
        alertRemoverItem,
        formaPagamento,
        alertLimparVenda,
        divSelecionarQtd,
        alertExit,
    ].filter(div => div.style.display === 'flex'); // Verifica quais estão visíveis

    const divPagamento = document.querySelector('.div-pagamento');

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
            rendererCarrinho(carrinho, ulDescricaoProduto, createSpan);
            calCarrinho(
                carrinho,
                converteMoeda,
                inputTotalLiquido,
                textSelecionarQtd
            );
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
                formaPagamento.style.display = 'flex';
                valorDinheiro.focus();
                valorDinheiro.value = '0,00';
                PIX.value = '0,00';
                CartaoCredito.value = '0,00';
                CartaoDebito.value = '0,00';
            }
            if (carrinho.length === 0) {
                divPagamento.style.display = 'none';
                alertMsg('Não é possível inserir o pagamento, o carrinho está vazio.', 'warning', 3000);
            } else {
                divPagamento.style.display = 'flex';
            }
            break;

        case 'F4': // Finaliza a venda
            if (event.key) {
                event.preventDefault();
                FinalizarVenda();
            }
            break;

        case 'F5':
            if (visibleDivs.length === 0) {
                alertRemoverItem.style.display = 'flex';
                inputExcluiItem.focus();
            }
            break;

        case 'F12':
            if (visibleDivs.length === 0) {
                event.preventDefault();
                alertLimparVenda.style.display = 'flex';
            }
            break;

        case 's':
        case 'S': // Limpa tudo quando pressionar 'S' ou 'sim'
            if (alertLimparVenda.style.display === 'flex') {
                limparCampos(); // Função que limpa carrinho e inputs
                alertLimparVenda.style.display = 'none'; // Fecha o alerta
            }
            break;

        case 'n':
        case 'N': // Fecha o alerta ao pressionar 'N' ou 'não'
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

        case 'Enter': // Adiciona ao carrinho ou esconde divs visíveis
            codigoEan.focus();
            if (visibleDivs.length > 0) {
                visibleDivs.forEach(div => div.style.display = 'none');
                inputTroco.value = '0,00';
                inputTotalPago.value = '0,00';
                codigoEan.focus(); // Retorna o foco para o campo de código de barras
            } else {
                event.preventDefault();
                pushProdutoCarrinho({
                    carrinho,
                    codigoEan,
                    descricao,
                    precoVenda,
                    inputQtd,
                    unidadeEstoqueRender,
                    rendererCarrinho,
                    ulDescricaoProduto,
                    createSpan,
                    resetInputs,
                    calCarrinho,
                    converteMoeda,
                    inputTotalLiquido,
                    textSelecionarQtd,
                    getVenda,
                    numeroPedido,
                    alertLimparVenda,
                });
            }
            break;
    }
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
        }, 100);
    } else if (e.target.value.length === 0) resetInputs();
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


//************************** Finalizar Venda **********************************/



function FinalizarVenda() {
    if (carrinho.length === 0) {
        alertMsg("Seu carrinho está vazio. Adicione itens antes de concluir a venda.", 3000);
        return;
    }

    const totalLiquido = parseCurrency(inputTotalLiquido.value);
    const valorPago = calculateTotalPago();

    if (valorPago < totalLiquido) {
        alertMsg('O valor pago está menor que o valor da compra.', 'warning', 3000);
        return;
    }

    const carrinhoId = carrinho.map(produto => ({
        produto_id: produto.produto_id,
        preco: parseCurrency(produto.preco).toFixed(2),
        quantidade: produto.Qtd,
        unidade_estoque_id: produto.unidadeIDGlobal,
    }));

    const venda = {
        data_venda: dataVenda.value,
        itens: carrinhoId,
        cliente: clienteId.value,
        total_liquido: totalLiquido.toFixed(2),
        numero_pedido: numeroPedido.value,
        pagamentos: getFormasDePagamento(),
    };

    let vendaDb = JSON.stringify(venda);
    console.log('Venda enviada: ' + vendaDb);

    try {
        postVendaDb(venda);
        alertMsg('Venda realizada com sucesso, obrigado!', 'success', 6000);
    } catch (error) {
        console.error('Erro ao cadastrar a Venda no Db:', error);
        alertMsg('Erro ao registrar a venda no sistema. Tente novamente.', 'error', 4000);
    }

    limparCampos();
}



// Função que limpa os campos ao registrar a venda
function limparCampos() {
    // Limpa todos os inputs e campos relacionados0

    setTimeout(() => {
        dataVenda.value = '';
        codigoEan.value = '';
        descricao.value = '';
        precoVenda.value = '';
        inputQtd.value = '';
        selectCliente.value = 'Consumidor Final'; // Define para o valor padrão ou vazio
        ulDescricaoProduto.innerHTML = ''; // Limpa a lista de produtos
        numeroPedido.value = '';
        inputTotalLiquido.value = '0,00'; // Zera o total líquido
        inputTotalPago.value = '0,00'; // Zera o total pago
        unidadeEstoqueRender.value = '';
        unidadeEstoqueRender.value = '';
        divSelecionarQtd.style.display = 'none'; // Esconde a div de seleção de quantidade
        textSelecionarQtd.textContent = ''; // Limpa o texto da quantidade selecionada
        alertLimparVenda.style.display = 'none'; // Esconde alerta de limpar venda
        alertExit.style.display = 'none'; // Esconde alerta de saída
        alertRemoverItem.style.display = 'none'; // Esconde alerta de remover item
        formaPagamento.style.display = 'none'; // Esconde alerta de forma de pagamento
        inputExitVenda.value = '';
        inputExcluiItem.value = '';
        mensagemDiv.textContent = ''; // Remove mensagens adicionais
        inputTroco.value = '0,00'; // Zera o troco
        // Limpa o estado do carrinho
        carrinho = [];
        console.log('Todos os campos foram limpos.');
    
        // Redefine o foco para o campo de código EAN
        codigoEan.focus();
    }, 3000);
   
}

