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
const inputPrecoVenda = document.querySelector('#precoVenda');
const outputLucro = document.querySelector('#lucro');

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



inputCodigoEANProduto.addEventListener('input', (e) => {
    formatarCodigoEAN(e.target);
});
inputNomeProduto.addEventListener('input', (e) => {
    inputMaxCaracteres(inputNomeProduto,150);
});
// inputObservacoes.addEventListener('input', (e) => {
//     inputMaxCaracteres(inputObservacoes, 150);
// });

inputCodigoEANProduto.focus();

// Função para formatar valores como moeda brasileira (R$)
function formatarMoeda(valor) {
    return `${valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

// Função para calcular o preço de venda e o lucro
function calcularPrecoVendaELucro(inputMarkup, inputPrecoCompra, inputPrecoVenda, outputLucro) {
    const precoCompra = parseFloat(inputPrecoCompra.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const markup = parseFloat(inputMarkup.value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;

    if (markup === 0 || precoCompra === 0) {
        inputPrecoVenda.value = formatarMoeda(0);
        outputLucro.value = formatarMoeda(0);
        return;
    }

    // Calcula o preço de venda e o lucro
    const precoVenda = precoCompra * (1 + markup / 100);
    const lucro = precoVenda - precoCompra;

    // Atualiza os campos com valores formatados
    inputPrecoVenda.value = formatarMoeda(precoVenda);
    outputLucro.value = formatarMoeda(lucro);
}

// Função para formatar o valor de um campo como moeda brasileira
function handleMoedaInput(event) {
    const input = event.target;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (valor) {
        valor = (parseFloat(valor) / 100).toFixed(2); // Converte para decimal e formata
        input.value = formatarMoeda(parseFloat(valor));
    }
}

// Configuração de eventos
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os campos de input
    const inputMarkup = document.querySelector('#inputMarkup');
    const inputPrecoCompra = document.querySelector('#precoCusto');
    const inputPrecoVenda = document.querySelector('#precoVenda');
    const outputLucro = document.querySelector('#lucro');

    // Evento para Preço de Custo
    inputPrecoCompra.addEventListener('input', (event) => {
        handleMoedaInput(event);
        calcularPrecoVendaELucro(inputMarkup, inputPrecoCompra, inputPrecoVenda, outputLucro);
    });
    // Evento para Preço de Custo
    inputPrecoVenda.addEventListener('input', (event) => {
        handleMoedaInput(event);

    });

    // Evento para Markup (sem formatação automática durante digitação)
    inputMarkup.addEventListener('input', () => {
        calcularPrecoVendaELucro(inputMarkup, inputPrecoCompra, inputPrecoVenda, outputLucro);
    });
});


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


// Função para tratar campos de valores monetários
function tratarCampoMonetario(valor) {
    if (!valor) return 0; // Retorna 0 se o valor estiver vazio ou for inválido
    // Remove separadores de milhar e troca a vírgula por ponto
    return parseFloat(valor.replace(/\./g, '').replace(',', '.'));
}


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

    const PrecoCompraTratado = tratarCampoMonetario(inputPrecoCompra.value);
    const PrecoVendaTratado = tratarCampoMonetario(inputPrecoVenda.value);
    const markupTratado = tratarCampoMonetario(inputMarkup.value);

    const file = document.querySelector('input[type="file"]').files[0];
    let relativePath = null;

    if (file) {
        const extension = file.name.split('.').pop();
        relativePath = `${inputPathImg.getAttribute('data-relative-path')}.${extension}`;
    }

    const produtoData = {
        codigo_ean: inputCodigoEAN.value,
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
        preco_compra: PrecoCompraTratado,
        markup: markupTratado,
        preco_venda: PrecoVendaTratado,
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
        inputCodigoEAN.value = '';
        inputNomeProduto.value = '';
        inputObservacoes.value = '';
        inputQuantidadeEstoque.value = '';
        inputPrecoCompra.value = '';
        inputMarkup.value = '';
        inputPrecoVenda.value = '';

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

