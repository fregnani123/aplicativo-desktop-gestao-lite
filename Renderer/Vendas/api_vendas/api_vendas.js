// My Methods.
const apiEndpoints = {
    findOneProduct: 'http://localhost:3000/produto', // URL base
    getunidadeEstoque: 'http://localhost:3000/unidadeEstoque',
    getVenda: 'http://localhost:3000/getVenda',
    postVenda: 'http://localhost:3000/postVenda',
    updateEstoque: 'http://localhost:3000/UpdateEstoque',
    // getHistoricoVendas: 'http://localhost:3000/getHistoricoVendas',
    getVendaPorNumeroPedido: 'http://localhost:3000/getVendaPorNumeroPedido'
};


async function getunidadeEstoqueVendas(id) {
    try {
        const response = await fetch(apiEndpoints.getunidadeEstoque);
        const data = await response.json();

        const unidadeEstoque = data.find(unidade => unidade.unidade_estoque_id === id);
        return unidadeEstoque ? unidadeEstoque.estoque_nome : null;
    } catch (error) {
        console.error('Erro ao buscar unidade de estoque:', error);
        return null;
    }
};

const { ipcRenderer } = require('electron');
const path = require('path');


async function getProduto(descricaoElement, codigoDeBarras, precoVendaElement) {
    try {
        const getOneProduct = `${apiEndpoints.findOneProduct}/${codigoDeBarras}`;
        const response = await fetch(getOneProduct, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

        if (!response.ok){alertMsg('Produto não encontrado. Por favor, verifique se o item está cadastrado corretamente.','orange',6000);
            codigoEan.value = '';

        } 

        const data = await response.json();
        console.log("Dados recebidos:", data);

        if (Array.isArray(data) && data.length > 0 && data[0].nome_produto) {
            const produto = data[0];

            const estoqueNome = await getunidadeEstoqueVendas(produto.unidade_estoque_id);
            unidadeEstoqueRender.value = estoqueNome || 'Não disponível';

            descricaoElement.value = produto.nome_produto;
            precoVendaElement.value = produto.preco_venda;

            produtoIdGlobal = produto.produto_id;
            unIDGlobal = produto.unidade_estoque_id;
            quantidade_estoqueGlobal = produto.quantidade_estoque;
            quantidade_vendidoGlobal = produto.quantidade_vendido;
            pathIgmGlobal = produto.caminho_img_produto;

            // Formata o preço
            let value = precoVendaElement.value.replace(/\D/g, '');
            value = (parseFloat(value) / 100).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            precoVendaElement.value = value;

            // Solicitar o caminho APPDATA
            const appDataPath = await ipcRenderer.invoke('get-app-data-path');
            const imgDir = path.join(appDataPath, 'electronmysql', 'img', 'produtos');
            const imagePath = pathIgmGlobal || 'produto.png';
            const imgPath = path.join(imgDir, imagePath);

            imgProduto.src = `file://${imgPath}`;
            imgProduto.onload = () => console.log("Imagem carregada com sucesso");
            imgProduto.onerror = () => {
                console.log(`Erro ao carregar a imagem de: ${imgPath}, usando imagem padrão`);
                imgProduto.src = path.join(__dirname, '../style/img/produto.png');
            };
        } else {
            console.error('Propriedade nome_produto ou produto_id não encontrada na resposta da API');
            descricaoElement.value = '';
            precoVendaElement.value = '';
            descricaoElement.placeholder = 'Produto não encontrado';
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};


async function postVendaDb(vendaData) {
    // Defina o endpoint para o qual os dados de venda serão enviados
    const postVendaDbEndpoint = apiEndpoints.postVenda; // Altere para o endpoint correto de sua API

    try {
        // Envia os dados da venda para o backend
        const response = await fetch(postVendaDbEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vendaData), // Envia os dados de venda no corpo da requisição
        });
        //Chama o numero do pedido para evitar erros na sincronização na próxima venda.
        setTimeout(() => {
            getVenda(numeroPedido)
        }, 6000);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Exibe o resultado no console
        console.log('Venda registrada com sucesso:', data);
    } catch (error) {
        // Trata qualquer erro que ocorrer durante o processo
        console.error('Erro ao registrar a venda:', error);
    }
};


async function getVenda(inputElement) {
    const getVendaEndpoint = apiEndpoints.getVenda;

    try {
        const response = await fetch(getVendaEndpoint);

        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.status} ${response.statusText}`);
        }

        // Verifica se a resposta está vazia
        const rawResponseText = await response.text();
        if (!rawResponseText) {
            console.warn('Nenhuma venda encontrada. Definindo número do pedido como 1.');
            inputElement.value = '1';
            return;
        }

        // Converte a resposta para JSON
        const rawResponse = JSON.parse(rawResponseText);

        // Verifica se o objeto contém a propriedade venda_id
        if (rawResponse && typeof rawResponse === 'object' && rawResponse.venda_id) {
            const numeroUltimaVenda = parseInt(rawResponse.venda_id, 10);

            if (!isNaN(numeroUltimaVenda)) {
                const proximoNumeroVenda = numeroUltimaVenda + 1;
                inputElement.value = proximoNumeroVenda.toString();
                console.log(`Última venda registrada: ${numeroUltimaVenda}, Próxima venda: ${proximoNumeroVenda}`);
            } else {
                console.warn('O número da última venda não é válido. Definindo como 1.');
                inputElement.value = '1';
            }
        } else {
            console.warn('Nenhuma venda encontrada. Definindo número do pedido como 1.');
            inputElement.value = '1';
        }
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
        inputElement.value = '1'; // Valor padrão em caso de erro
    }
};

async function updateEstoque(produto) {
    try {
        const patchResponse = await fetch(apiEndpoints.updateEstoque, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto), // Apenas serialize aqui
        });

        if (!patchResponse.ok) {
            console.log('Erro ao atualizar estoque do produto');
        } else {
            console.log('Estoque do produto atualizado com sucesso');
        }
    } catch (error) {
        console.log('Erro durante a atualização do estoque:', error);
    }
};

function getUltimoPedidoImprimir(numero_pedido_imprimir) {
    const ultimoPedidoImprimir = `http://localhost:3000/getVendaPorNumeroPedido/${numero_pedido_imprimir}`;

    fetch(ultimoPedidoImprimir)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Limpa o conteúdo anterior do cupom
            impressaoCupom.innerHTML = '';

            // Adiciona os detalhes gerais da venda
            const header = `
                <div>
                    <h3>Detalhes da Venda</h3>
                    <p>Data: ${data[0].data_venda}</p>
                    <p>Cliente: ${data[0].cliente_nome}</p>
                    <p>Número do Pedido: ${data[0].numero_pedido}</p>
                    <p>Total: R$ ${data[0].total_liquido}</p>
                </div>
                <hr>
            `;
            impressaoCupom.innerHTML += header;

            // Exibe cada item separadamente
            data.forEach(venda => {
                const itemHTML = `
                    <div>
                        <p>Produto: ${venda.produto_nome}</p>
                        <p>Quantidade: ${venda.quantidade} ${venda.unidade_estoque_nome}</p>
                        <p>Preço Unitário: R$ ${parseFloat(venda.preco).toFixed(2)}</p>
                    </div>
                    <hr>
                `;
                impressaoCupom.innerHTML += itemHTML;
                impressaoCupom.style.display = 'block'
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            impressaoCupom.innerHTML = `<p style="color: red;">Erro ao carregar os dados do pedido.</p>`;
        });
}

