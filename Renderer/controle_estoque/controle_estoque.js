const situacaoSelect = document.getElementById('situacao');
const movimentoSelect = document.getElementById('movimento');
const dateEstoque = document.getElementById('dateEstoque');
const alterarPreco = document.getElementById('alterarPreco');
const inputPrecoCompra = document.getElementById('inputPrecoCompra');
const inputMarkupEstoque = document.getElementById('MarkupEstoque');
const inputprecoVenda = document.getElementById('precoVendaEstoque');
const inputCodigoEanBuscar = document.getElementById('CodigoEanBuscar');
const inputprodutoEncontrado = document.getElementById('produtoEncontrado');
const inputqtdeMovimentacao = document.getElementById('qtdeMovimentacao');
const inputinputqtChaveCompra = document.getElementById('inputqtChaveCompra');
const inputqtvenda_id = document.getElementById('venda_id');
const btnEstoque = document.getElementById('btn-estoque');
formatarCodigoEAN(inputCodigoEanBuscar);


document.addEventListener('DOMContentLoaded', () => {
  const inputElement = inputCodigoEanBuscar;
  if (inputElement) {
    inputElement.focus();
  }
});


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
    calcularPrecoVenda(parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0, inputMarkupEstoque.value, inputprecoVenda);
  } catch (error) {
    console.error(error.message);
  }
});

inputMarkupEstoque.addEventListener('input', () => {
  try {
    // Remove caracteres inválidos, permitindo apenas números e um único ponto decimal
    let value = inputMarkupEstoque.value;

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
    inputMarkupEstoque.value = value;

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

// Função para calcular o percentual de markup
function calcularMarkup(precoCompra, precoVenda) {
  const precoCompraNum = parseFloat(precoCompra.replace(',', '.').replace('.', '').trim());
  const precoVendaNum = parseFloat(precoVenda.replace(',', '.').replace('.', '').trim());

  if (!isNaN(precoCompraNum) && !isNaN(precoVendaNum) && precoCompraNum > 0 && precoVendaNum > 0) {
    // Calcula o markup
    const markupPercentual = ((precoVendaNum - precoCompraNum) / precoCompraNum) * 100;

    // Atualiza o campo de markup com o valor calculado
    inputMarkupEstoque.value = markupPercentual < 0 ? 0.00 : markupPercentual.toFixed(2);
  }
}


// Obter a data atual
const today = new Date();

// Formatar a data no formato "YYYY-MM-DD"
const formattedDate = today.toISOString().split('T')[0];
dateEstoque.value = formattedDate;

// Tem que criar uma table motivo e situacao e ajustar com o db apenas, atualmente esta assim para agilizar.
const motivos = {
  "1": [
    { motivo: "Compra de estoque" },
    { motivo: "Devolução de venda" },
    { motivo: "Ajuste de inventário" }
  ],
  "2": [
    { motivo: "Venda de produto" },
    { motivo: "Transferência" },
    { motivo: "Perda de estoque" }
  ]
};

situacaoSelect.addEventListener('change', SituaçaoMovimento);
alterarPreco.addEventListener('change', liberarInputs);
movimentoSelect.addEventListener('change', liberarInputsNV);
movimentoSelect.addEventListener('change', liberarInputsCV);
btnEstoque.addEventListener('click', alterarEstoque);


function alteraEstoque(produto, operacao) {
  const qtd = parseFloat(produto.qtd);
  const quantidadeEstoqueAtualizada =
    operacao === 'adicionar'
      ? parseFloat(produto.quantidade_estoque) + qtd
      : parseFloat(produto.quantidade_estoque) - qtd;

  const estoqueAtualizado = {
    quantidade_estoque: quantidadeEstoqueAtualizada,
    quantidade_vendido: parseFloat(produto.quantidade_vendido), // Mantém o valor original
    codigo_ean: produto.codigo_ean,
  };

  updateEstoque(estoqueAtualizado);
}


async function alterarEstoque(e) {
  e.preventDefault();

  if (inputCodigoEanBuscar.value.length === 0) {
    alertMsg('Nenhum produto foi adicionado à movimentação de estoque.', 'warning', 5000);
    return;
  }
  if (inputqtdeMovimentacao.value.length === 0) {
    alertMsg('Qtde a ser Movimentada não pode estar vazio.', 'warning', 5000);
    return;
  }
  if (movimentoSelect.value === '') {
    alertMsg('Situação do Movimento não pode estar vazio.', 'warning', 5000);
    return;
  }


  const movimentacaoEstoque = {
    produto_id: produtoID,
    qtde_movimentada: inputqtdeMovimentacao.value,
    preco_compra_anterior: preco_compra_anterior.replace(',', '.'),
    preco_compra_atual: inputPrecoCompra.value.replace(',', '.'),
    preco_markup_anterior: markup_anterior,
    preco_markup_atual: inputMarkupEstoque.value,
    preco_venda_anterior: preco_venda_anterior.replace(',', '.'),
    preco_venda_atual: inputprecoVenda.value.replace(',', '.'),
    situacao_movimento: situacaoSelect.value,
    motivo_movimentacao: movimentoSelect.value,
    numero_compra_fornecedor: inputinputqtChaveCompra.value,
    venda_id: produtoID || null,
    data_movimentacao: formatDate(dateEstoque.value) // Chama a função para formatar a data
  };

  const alterarEstoque = {
    quantidade_estoque: qtdEstoqueGlobal,  // Valor do estoque
    quantidade_vendido: qtdeVendidaGlobal, // Valor da quantidade vendida
    codigo_ean: codigoEanGlobal,
    qtd: inputqtdeMovimentacao.value
  };

  const alterarValores = {
    preco_compra: inputprecoVenda.value.replace(',', '.'),
    markup: inputMarkupEstoque.value,
    preco_venda: inputprecoVenda.value.replace(',', '.'),
    codigo_ean: codigoEanGlobal,
  }

  try {
    await postMovimentarEstoque(movimentacaoEstoque);
    if (situacaoSelect.value === '1') {
      alteraEstoque(alterarEstoque, 'adicionar');
      alertMsg('Quantidade do Produto adicionado ao estoque!', 'success', 5000)
    } else if (situacaoSelect.value === '2') {
      alteraEstoque(alterarEstoque, 'retirar');
      alertMsg('Quantidade do Produto retirado do estoque!', 'success', 5000)
    };
      
    UpdateValores(alterarValores);

  } catch {
    alertMsg('Alteração do estoque não concluída. Por favor, verifique se todos os campos foram preenchidos corretamente!', 'warning', 6000);
    return
  }

}
