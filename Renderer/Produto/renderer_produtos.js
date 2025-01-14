// Seleciona os elementos do dropdown
const selectGrupo = document.querySelector('#grupo');
const selectSubGrupo = document.querySelector('#sub-grupo');
const selectFornecedor = document.querySelector('#fornecedor');
const selectTamanhoLetras = document.querySelector('#tamanhoLetras');
const selectTamanhoNumeros = document.querySelector('#tamanhoNumeros');
const selectUnidadeMassa = document.querySelector('#unidadeDeMassa');
const selectMedidaVolume = document.querySelector('#medidaVolume');
const selectUnidadeComprimento = document.querySelector('#unidadeComprimento');
const selectUnidadeEstoque = document.querySelector('#unidadeEstoque');
const selectCorProduto = document.querySelector('#corProduto');

// Seleciona todos os campos de input
const inputCodigoEANProduto = document.querySelector('#codigoDeBarras');
const inputNomeProduto = document.querySelector('#nomeProduto');
const inputObservacoes = document.querySelector('#observacoes');
const inputMassa = document.querySelector('#massaNumero');
const inputVolume = document.querySelector('#volumeNumero');
const inputComprimento = document.querySelector('#comprimento');
const inputQuantidadeEstoque = document.querySelector('#estoqueQtd');
const inputQuantidadeVendido = document.querySelector('#Qtd_vendido'); //Input Oculto, salva codidade 0 
const inputPathImg = document.querySelector('#produto-imagem');
const divImgProduct = document.querySelector('.quadro-img');
const btnFornecedorMenu = document.querySelector('.li-fornecedor');
const containerRegister = document.querySelector('.container-register');
const btnCadGrupo = document.querySelector('#add-grupo');
const btnCadSubGrupo = document.querySelector('#add-subGrupo');

// Seleciona os campos de input
const inputMarkup = document.querySelector('#inputMarkup');
const inputPrecoCompra = document.querySelector('#precoCusto');
const inputprecoVenda = document.querySelector('#precoVenda');
const inputLucro = document.querySelector('#lucro');


//Metodos criado por mim que renderizam os values iniciais padrões ou cadastrados no DB.
getGrupo(selectGrupo);
getSubGrupo(selectSubGrupo);
getFornecedor(selectFornecedor);
getTamanhoLetras(selectTamanhoLetras);
getTamanhoNumeros(selectTamanhoNumeros);
getunidadeComprimento(selectUnidadeComprimento);
getunidadeEstoque(selectUnidadeEstoque);
getMedidaVolume(selectMedidaVolume);
getCorProduto(selectCorProduto);
getunidadeDeMassa(selectUnidadeMassa);


// Função para calcular lucro
function calcularLucro() {
  // Remove qualquer coisa que não seja número, e converte para float
  let precoCompraNum = parseFloat(inputPrecoCompra.value.replace(/\D/g, '')) / 100;
  let precoVendaNum = parseFloat(inputprecoVenda.value.replace(/\D/g, '')) / 100;

  // Verifica se os valores são números válidos
  if (isNaN(precoCompraNum) || isNaN(precoVendaNum)) {
    inputLucro.value = ''; // Se não for válido, limpa o campo
    return;
  }

  // Calcula o lucro
  const lucro =  precoVendaNum - precoCompraNum ;

  // Atualiza o campo de lucro com o valor calculado
  inputLucro.value = lucro < 0 ? '0,00' : lucro.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Função para calcular o percentual de markup
function calcularMarkup(precoCompra, precoVenda) {
    const precoCompraNum = parseFloat(precoCompra.replace(',', '.').replace('.', '').trim());
    const precoVendaNum = parseFloat(precoVenda.replace(',', '.').replace('.', '').trim());
  
    if (!isNaN(precoCompraNum) && !isNaN(precoVendaNum) && precoCompraNum > 0 && precoVendaNum > 0) {
      // Calcula o markup
      const markupPercentual = ((precoVendaNum - precoCompraNum) / precoCompraNum) * 100;
  
      // Atualiza o campo de markup com o valor calculado
      inputMarkup.value = markupPercentual < 0 ? 0.00 : markupPercentual.toFixed(2);
    }
    calcularLucro();
  }
  

function calcularPrecoVenda(preco_compra, markup, preco_venda) {
    // Converte os valores de entrada (strings) para números
    const precoCompraNum = parseFloat(preco_compra);
    const markupNum = parseFloat(markup);
    const precoVendaNum = parseFloat(preco_venda);

    if (isNaN(precoCompraNum) || precoCompraNum < 0) {
      throw new Error("Preço de compra deve ser um número válido e positivo.");
    }
  
    let valorFinalVenda;
  
    if (!isNaN(markupNum) && markupNum >= 0) {
      // Cálculo do preço de venda com base no markup
      valorFinalVenda = precoCompraNum + (precoCompraNum * (markupNum / 100));
      preco_venda.value = formatarMoeda(valorFinalVenda);
    } else if (!isNaN(precoVendaNum) && precoVendaNum > 0) {
      // Se o preço de venda for fornecido, calcula o percentual de markup
      const calculoMarkup = ((precoVendaNum - precoCompraNum) / precoCompraNum) * 100;
      markup.value = calculoMarkup.toFixed(2); // Atualiza o campo de markup com 2 casas decimais
    }
    calcularLucro();
  }
  
  // Função para formatar os valores como moeda brasileira
  function formatarMoeda(valor) {
    return valor.toFixed(2)
      .replace('.', ',') // Troca o ponto decimal por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos como separador de milhar
  }


  inputPrecoCompra.addEventListener('input', () => {
    try {
      // Remove todos os caracteres que não sejam dígitos
      let value = inputPrecoCompra.value.replace(/\D/g, '');
  
      // Converte o valor para o formato de moeda brasileira
      if (value) {
        value = (parseInt(value, 10) / 100).toFixed(2) // Divide por 100 para obter o valor decimal
          .replace('.', ',') // Troca o ponto decimal por vírgula
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos como separador de milhar
      }
  
      // Atualiza o valor do campo formatado
      inputPrecoCompra.value = value;
  
      // Chama a função de cálculo usando o valor numérico original
      calcularPrecoVenda(parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0, inputMarkup.value, inputprecoVenda);
    } catch (error) {
      console.error(error.message);
    }
  });

  
  inputMarkup.addEventListener('input', () => {
    try {
      // Remove caracteres inválidos, permitindo apenas números e um único ponto decimal
      let value = inputMarkup.value;
  
      // Substitui caracteres que não sejam números ou pontos
      value = value.replace(/[^0-9.]/g, '');
  
      // Garante que apenas o primeiro ponto seja mantido
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join(''); // Remove pontos adicionais
      }
  
      // Limita a duas casas decimais
      if (value.indexOf('.') !== -1) {
        value = value.slice(0, value.indexOf('.') + 3); // mantém duas casas após o ponto
      }
  
      // Atualiza o campo de entrada com o valor limpo e com no máximo 2 casas decimais
      inputMarkup.value = value;
  
      // Chama a função de cálculo com os valores
      calcularPrecoVenda(parseFloat(inputPrecoCompra.value.replace(',', '.')) || 0, parseFloat(value) || 0, inputprecoVenda);
    } catch (error) {
      console.error(error.message);
    }
  });


// Evento para calcular o markup quando o preço de venda é alterado
inputprecoVenda.addEventListener('input', (e) => {
  // Remove qualquer coisa que não seja número
  let value = e.target.value.replace(/\D/g, '');

  // Converte o valor para o formato de moeda brasileira
  if (value) {
    value = (parseInt(value, 10) / 100).toFixed(2) // Divide por 100 para obter o valor decimal
      .replace('.', ',') // Troca o ponto decimal por vírgula
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos como separador de milhar
  }

  // Atualiza o campo de entrada com o valor formatado
  e.target.value = value;

  // Chama a função para calcular o markup
  calcularMarkup(inputPrecoCompra.value, e.target.value);
});


inputCodigoEANProduto.addEventListener('input', (e) => {
    formatarCodigoEAN(e.target);
});
inputNomeProduto.addEventListener('input', (e) => {
    inputMaxCaracteres(inputNomeProduto,150);
});
inputObservacoes.addEventListener('input', (e) => {
    inputMaxCaracteres(inputObservacoes, 150);
});

inputCodigoEANProduto.focus();


btnCadGrupo.addEventListener('click', (e) => {
    e.preventDefault();
    containerRegister.style.display = 'flex';
    renderizarInputsGrupo();
});

btnCadSubGrupo.addEventListener('click', (e) => {
    e.preventDefault();
    containerRegister.style.display = 'flex';
    renderizarInputsSubGrupo();
});



document.addEventListener('DOMContentLoaded', (event) => {
    const inputPathImg = document.querySelector('#produto-imagem');
    const divImgProduct = document.querySelector('.quadro-img');

    inputPathImg.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            // Verifica se já existe uma imagem com a classe .img-produto e a remove
            let imgProduto = divImgProduct.querySelector('.img-produto');
            if (imgProduto) {
                divImgProduct.removeChild(imgProduto);
            }

            // Cria um novo elemento de imagem
            imgProduto = document.createElement('img');
            imgProduto.className = 'img-produto';

            const reader = new FileReader();

            reader.onload = function (e) {
                imgProduto.src = e.target.result;
            };

            reader.readAsDataURL(file);

            // Adiciona a nova imagem à div.quadro-img
            divImgProduct.appendChild(imgProduto);

            const relativePath = file.name.replace(/\.[^/.]+$/, "");
            inputPathImg.setAttribute('data-relative-path', relativePath);
        }
    };
});

inputPathImg.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
        const produtoImg = document.getElementById('produtoImg');

        const reader = new FileReader();

        reader.onload = function (e) {
            produtoImg.src = e.target.result;
        };

        reader.readAsDataURL(file);

        const relativePath = file.name.replace(/\.[^/.]+$/, "");
        document.querySelector('#inputPathImg').setAttribute('data-relative-path', relativePath);
    }
};

document.querySelector('#btn-cadastrar-produto').addEventListener('click', async function (e) {
    e.preventDefault();

    const file = document.querySelector('input[type="file"]').files[0];
    let relativePath = null;

    if (file) {
        const extension = file.name.split('.').pop();
        relativePath = `${inputPathImg.getAttribute('data-relative-path')}.${extension}`;
    }

    const produtoData = {
        codigo_ean: inputCodigoEANProduto.value,
        nome_produto: inputNomeProduto.value,
        observacoes: inputObservacoes.value,
        categoria_id: selectGrupo.value,
        grupo_produto_id: selectSubGrupo.value,
        fornecedor_id: selectFornecedor.value,
        tamanho_letras_id: selectTamanhoLetras.value,
        tamanho_num_id: selectTamanhoNumeros.value,
        unidade_massa_id: selectUnidadeMassa.value,
        unidade_comprimento_id: selectUnidadeComprimento.value,
        medida_volume_id: selectMedidaVolume.value,
        quantidade_estoque: inputQuantidadeEstoque.value,
        quantidade_vendido: inputQuantidadeVendido.value,
        preco_compra: inputPrecoCompra.value.replace(',', '.'),
        markup: inputMarkup.value,
        preco_venda:  inputprecoVenda.value.replace(',', '.'),
        unidade_estoque_id: selectUnidadeEstoque.value,
        cor_produto: selectCorProduto.value,
        caminho_img_produto: relativePath,
    };

    if (!produtoData.codigo_ean || !produtoData.nome_produto || !produtoData.categoria_id || !produtoData.grupo_produto_id || !produtoData.unidade_estoque_id) {
        alertMsg("Todos os campos obrigatórios devem ser preenchidos.", 'warning', 4000);
        return;
    }


    await postNewProdutoWithImage(produtoData, file);

    console.log('Dados do Produto Enviados:', produtoData);


});


function limparCampos() {

    setTimeout(() => {
        inputCodigoEANProduto.value = '';
        inputNomeProduto.value = '';
        inputObservacoes.value = '';
        inputQuantidadeEstoque.value = '';
        inputPrecoCompra.value = '';
        inputMarkup.value = '';
        inputprecoVenda.value = '';
        inputLucro.value = '';
        selectGrupo.selectedIndex = 0;
        selectSubGrupo.selectedIndex = 0;
        selectFornecedor.selectedIndex = 0;
        selectTamanhoLetras.selectedIndex = 0;
        selectTamanhoNumeros.selectedIndex = 0;
        selectUnidadeMassa.selectedIndex = 0;
        selectMedidaVolume.selectedIndex = 0;
        selectUnidadeComprimento.selectedIndex = 0;
        selectUnidadeEstoque.selectedIndex = 0;
        selectCorProduto.selectedIndex = 0;
    }, 3000)
}


function limparImagem() {
    divImgProduct.innerHTML = `<img class="img-produto" src="../style/img/produto.png" alt="imagem produto">`;
    inputPathImg.value = '';
}

