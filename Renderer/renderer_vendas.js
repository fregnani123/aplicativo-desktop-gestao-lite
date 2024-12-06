
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
const inputExitVenda= document.querySelector('#exit-key');
const inputExcluiItem= document.querySelector('#numero-Item');
const mensagemDiv = document.querySelector('#mensagem');

codigoEan.focus(); // Define o foco no input

let carrinho = [];

document.addEventListener('keydown', function (event) {
    if (event.key === 'F8') {
        if( alertRemoverItem.style.display !== 'flex'){
            alertRemoverItem.style.display = 'flex';
            inputExcluiItem.focus();
        }
    }
    if (event.key === 'v') {
        if( alertRemoverItem.style.display !== 'none'){
            alertRemoverItem.style.display = 'none';
            inputExcluiItem.value='';
            mensagemDiv.innerHTML = '';
        }
    }
});


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

inputExcluiItem.addEventListener('keypress', function (event) {
    // Verifica se a tecla pressionada foi Enter
    if (event.key === 'c') {
      const indexParaRemover = Number(inputExcluiItem.value) - 1; // Ajusta para índice do array

      if (indexParaRemover >= 0 && indexParaRemover < carrinho.length) {
        // Remove o item do índice especificado
        const itemRemovido = carrinho.splice(indexParaRemover, 1);

        // Mostra a mensagem de confirmação
        mensagemDiv.textContent = `Item "${indexParaRemover + 1}" removido com sucesso.`;
        mensagemDiv.style.color = "green";
        console.log("Carrinho atualizado:", carrinho);
      } else {
        // Índice inválido
        mensagemDiv.textContent = "Índice inválido! Por favor, tente novamente.";
        mensagemDiv.style.color = "red";
      }

      // Limpa o valor do input após a exclusão ou erro
      inputExcluiItem.value = '';
      rendererCarrinho()
      calCarrinho();
    }
  });
 
codigoEan.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        pushProdutoCarrinho();
    }
});


document.addEventListener('keydown', function (event) {
    // Tecla F1 - Abrir divSelecionarQtd
    if (event.key === 'F1') {
        event.preventDefault();
        // Verificar se o alertLimparVenda está visível
        if (alertLimparVenda.style.display !== 'flex') {
            divSelecionarQtd.style.display = 'flex';
            QtdFocus(); // Chamar a função relacionada
        }
    }

    // Tecla Enter - Fechar divSelecionarQtd e atualizar texto
    if (event.key === 'Enter') {
        event.preventDefault();
        // Verificar se o alertLimparVenda está visível antes de fechar divSelecionarQtd
        if (alertLimparVenda.style.display !== 'flex') {
            divSelecionarQtd.style.display = 'none';
            if (inputQtd.value === '') {
                textSelecionarQtd.innerHTML = '';
            } else {
                textSelecionarQtd.innerHTML = `${inputQtd.value}x`;
            }
            EanFocus(); // Chamar a função relacionada
        }
    }

    // Tecla F6 - Mostrar alertLimparVenda
    if (event.key === 'F6') {
        event.preventDefault();
        if( divSelecionarQtd.style.display !== 'flex'){
            alertLimparVenda.style.display = 'flex';
        }
        
    }

    //Tecla ESC - voltar para o tela Menu-Painel  -  Alterar senha para o servidor - aqui esta apenas para testes
    if (event.key === 'Escape') {
        event.preventDefault();
        if( alertExit.style.display !== 'flex'){
            alertExit.style.display = 'flex';
            inputExitVenda.focus()
        };
        
    }
    if (event.key === 'v') {
        event.preventDefault();
        alertExit.style.display = 'none';
    }

    const handleInputExit = (e) => {
        const checkkeyExit = e.target.value;
        if (checkkeyExit === 'a') {
            // Redireciona para o menu
            window.location.href = '../public/menu.html';
            console.log('Login successful');

            // Remove o evento para evitar múltiplas adições
            inputExitVenda.removeEventListener('input', handleInputExit);
        }
    };

    inputExitVenda.addEventListener('input', handleInputExit, { once: true });

    
    if (event.key === 'n') {
        event.preventDefault();
         alertLimparVenda.style.display = 'none';
         EanFocus(); // Chamar a função relacionada
    }
    


    // Evento de tecla `s`
    document.addEventListener('keydown', function (event) {
        if (event.key === 's') {
            // Só executa se alertLimparVenda estiver visível
            if (alertLimparVenda.style.display === 'flex') {
                event.preventDefault();
                resetDefaults();
            }
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'n') {
            event.preventDefault();
             alertLimparVenda.style.display = 'none';
             EanFocus(); // Chamar a função relacionada
        }
    });
    

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


