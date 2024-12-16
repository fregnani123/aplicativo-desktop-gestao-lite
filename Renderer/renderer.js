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
const inputCodigoEAN = document.querySelector('#codigoDeBarras');
const inputNomeProduto = document.querySelector('#nomeProduto');
const inputObservacoes = document.querySelector('#observacoes');
const inputMassa = document.querySelector('#massaNumero');
const inputVolume = document.querySelector('#volumeNumero');
const inputComprimento = document.querySelector('#comprimento');
const inputQuantidadeEstoque = document.querySelector('#estoqueQtd');
const inputPrecoCompra = document.querySelector('#precoCusto');
const inputMarkup = document.querySelector('#inputMarkup');
const outputLucro = document.querySelector('#lucro');
const inputPrecoVenda = document.querySelector('#precoVenda');

const inputPathImg = document.querySelector('#produto-imagem');
const divImgProduct = document.querySelector('.quadro-img');
const btnExit = document.querySelector('#botaoSair');

const containerRegisterForm = document.querySelector('.container-register-form'); //Renderizar Div Fornecedor
const btnFornecedorMenu = document.querySelector('.li-fornecedor');

const containerRegister = document.querySelector('.container-register');
const btnCadGrupo = document.querySelector('#add-grupo');
const btnCadSubGrupo = document.querySelector('#add-subGrupo');

// Adiciona ouvintes de eventos para os campos de entrada
inputPrecoCompra.addEventListener('input', calcularMarkup);
inputMarkup.addEventListener('input', calcularMarkup);


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

inputMaxCaracteres(inputNomeProduto, 150); //max caracteres input
inputMaxCaracteres(inputObservacoes, 150);


// Configuração de eventos
inputPrecoVenda.addEventListener('input', (e) => {
    formatarPrecoVenda(e.target);
    calcularLucroPorVenda();
    calcularLucro();
});

inputCodigoEAN.addEventListener('input', (e) => {
    formatarCodigoEAN(e.target);
});

inputMarkup.addEventListener('input', (e) => {
    formatarMarkup(e.target, inputPrecoVenda, outputLucro);
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


btnExit.addEventListener('click', (e) => {
    containerRegisterForm.style.display = 'none';
    btnFornecedorMenu.classList.remove('li-fornecedor-active');
})

btnFornecedorMenu.addEventListener('click', (e) => {
    e.preventDefault();
    containerRegisterForm.style.display = 'flex';
    renderizarDivFornecedor();
    btnFornecedorMenu.classList.add('li-fornecedor-active');
});


// Evento associado ao input do campo de preço de compra
inputPrecoCompra.addEventListener('input', (e) => {
    formatarPrecoCompra(e.target, calcularMarkup);
});


// Espera o DOM carregar completamente - função que renderiza a img durante o cadastro feito pelo usuário.
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


//função que envia os dados do produto e img para cadastro das informações no db e inserção da img na pasta (caso o usuário envie a img)

document.querySelector('#btn-cadastrar-produto').addEventListener('click', async function (e) {
    e.preventDefault();
    const file = document.querySelector('input[type="file"]').files[0];
    let relativePath = null;

    if (file) {
        const extension = file.name.split('.').pop();
        relativePath = `${inputPathImg.getAttribute('data-relative-path')}-${inputCodigoEAN.value}.${extension}`;
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
        preco_compra: inputPrecoCompra.value.replace(",", "."),
        markup: inputMarkup.value,
        preco_venda: inputPrecoVenda.value.replace(",", "."),
        unidade_estoque_id: selectUnidadeEstoque.value,
        cor_produto: selectCorProduto.value,
        caminho_img_produto: relativePath,
    };

    console.log('Dados do Produto Enviados:', produtoData);

    if (!produtoData.codigo_ean || !produtoData.nome_produto || !produtoData.categoria_id || !produtoData.grupo_produto_id) {
            alertMsg("Todos os campos obrigatórios devem ser preenchidos.",'warning', 4000);
            return;
    }

    try {
        await postNewProdutoWithImage(produtoData, file);
        alertMsg('Produto cadastrado com sucesso!','success', 4000);
    } catch (error) {
        console.error('Erro ao cadastrar o produto:', error);
            alertMsg('Erro ao cadastrar o produto. Tente novamente.','warning', 4000);
            return;
    }

    limparCampos();
    limparImagem();
});


// Função para limpar campos
function limparCampos() {
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
}

// Função para limpar a pré-visualização da imagem
function limparImagem() {
    divImgProduct.innerHTML = `<img class="img-produto" src="../style/img/produto.png" alt="imagem produto">`;
    inputPathImg.value = '';
}



