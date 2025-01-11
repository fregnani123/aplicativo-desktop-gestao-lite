const situacaoSelect = document.getElementById('situacao');
const movimentoSelect = document.getElementById('movimento');
const dateEstoque = document.getElementById('dateEstoque');
const alterarPreco = document.getElementById('alterarPreco');
const inputPrecoCompra = document.getElementById('inputPrecoCompra');
const inputMarkupEstoque = document.getElementById('MarkupEstoque');
const inputprecoVendaEstoque = document.getElementById('precoVendaEstoque');
const inputCodigoEanBuscar = document.getElementById('CodigoEanBuscar');
const inputprodutoEncontrado = document.getElementById('produtoEncontrado');

document.addEventListener('DOMContentLoaded', () => {
    const inputElement =  inputCodigoEanBuscar;
    if (inputElement) {
      inputElement.focus();
    }
  });
  
inputCodigoEanBuscar.addEventListener('input', (e) => {
    // Remove non-numeric characters and limit the input to 13 characters
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
    if (e.target.value.length === 13) {
         getProdutoEstoque(e.target.value);
    } else if (e.target.value.length === 0) {
        resetInputs();
    }
});


// Obter a data atual
const today = new Date();

// Formatar a data no formato "YYYY-MM-DD"
const formattedDate = today.toISOString().split('T')[0];

// Definir o valor no campo de entrada
dateEstoque.value = formattedDate;


// Objeto contendo os motivos para cada situação
const motivos = {
    "1": ["Compra de estoque", "Devolução de venda", "Ajuste de inventário"],
    "2": ["Venda de produto", "Transferência", "Perda de estoque"],
};

situacaoSelect.addEventListener('change',SituaçaoMovimento);
alterarPreco.addEventListener('change', liberarInputs);



