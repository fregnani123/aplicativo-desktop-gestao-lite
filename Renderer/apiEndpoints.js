// My Methods.
const apiEndpoints = {
    findOneProduct: 'http://localhost:3000/produto', // URL base
    getGrupo: 'http://localhost:3000/grupos',
    getSubGrupo: 'http://localhost:3000/subGrupos',
    getFornecedor: 'http://localhost:3000/fornecedor',
    getTamanhoLetras: 'http://localhost:3000/tamanhoLetras',
    getTamanhoNumeros: 'http://localhost:3000/tamanhoNumeros',
    getunidadeDeMassa: 'http://localhost:3000/unidadeMassa',
    getMedidaVolume: 'http://localhost:3000/medidaVolume',
    getunidadeComprimento: 'http://localhost:3000/unidadeComprimento',
    getunidadeEstoque: 'http://localhost:3000/unidadeEstoque',
    getCorProduto: 'http://localhost:3000/corProduto',
    postNewProduto: 'http://localhost:3000/postNewProduto',
    postNewGrupoProduto: 'http://localhost:3000/newGrupo',
    postNewSubGrupoProduto: 'http://localhost:3000/newSubGrupo',
    postNewFornecedor: 'http://localhost:3000/newFornecedor',
    postVenda: 'http://localhost:3000/postVenda',
    getVenda: 'http://localhost:3000/getVenda',
    postAtivacao: 'http://localhost:3000/insertAtivacao',
    getAtivacaoMysql: 'http://localhost:3000/getAtivacaoMysql',
    updateAtivacao: 'http://localhost:3000/UpdateAtivacao',
};

function inputMaxCaracteres(input, max) {
    input.addEventListener('input', (e) => {
        let input = e.target.value;

        // Limita o número de caracteres a 18 (incluindo a formatação)
        if (input.length > max) {
            input = input.substring(0, max);
        }

        // Atualiza o valor do input com o CNPJ formatado
        e.target.value = input;
    }
    )
}

// Função para envio do produto e imagem
async function postNewProdutoWithImage(produtoData, selectedFile) {
    const apiEndpoint = apiEndpoints.postNewProduto;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('produtoData', JSON.stringify(produtoData)); // Dados do produto como string JSON

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }



        limparCampos();
        limparImagem();

        const data = await response.json();
        console.log('Produto e imagem adicionados com sucesso:', data);

        // Exibe a mensagem de sucesso
        alertMsg('Produto adicionados com sucesso!', 'success', 4000);

    } catch (error) {

        console.error('Erro ao adicionar produto:', error);
        alertMsg(`${error}`, 'error', 4000);

        // Retorna imediatamente para evitar limpar os campos e exibir a imagem de sucesso
        return;
    }
}

async function postNewFornecedor(fornecedorData) {
    const postNewFornecedorData = apiEndpoints.postNewFornecedor;
    if (!fornecedorData.cnpj || !fornecedorData.nome_fantasia) {
        console.error('Erro: cnpj e nome fantasia são obrigatórios.');
        alert('Erro: Erro: cnpj e nome fantasia são obrigatórios.');
        return;
    }
    fetch(postNewFornecedorData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fornecedorData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('fornecedor added successfully:', data);

        })
        .catch(error => {
            console.error('Error adding fornecedor:', error);
        });
}

function getGrupo(renderer) {
    const getGrupo = apiEndpoints.getGrupo;
    fetch(getGrupo)
        .then(response => response.json())
        .then(data => {
            const grupo = data;
            grupo.forEach((grupo) => {
                const option = document.createElement('option');
                option.innerHTML = grupo.nome_grupo;
                option.value = grupo.grupo_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}


function getSubGrupo(renderer) {
    const getSubGrupo = apiEndpoints.getSubGrupo;

    fetch(getSubGrupo)
        .then(response => response.json())
        .then(data => {
            const subGrupo = data;
            subGrupo.forEach((subGrupo) => {
                const option = document.createElement('option');
                option.innerHTML = subGrupo.nome_sub_grupo;
                option.value = subGrupo.sub_grupo_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}


async function getunidadeEstoqueVendas(id, renderer) {
    const getEstoque = apiEndpoints.getunidadeEstoque;

    fetch(getEstoque)
        .then(response => response.json())
        .then(data => {
            data.forEach((unidadeEstoque) => {
                if (id === unidadeEstoque.unidade_estoque_id)
                    renderer.value = unidadeEstoque.estoque_nome;
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function getProduto(descricaoElement, codigoDeBarras, precoVendaElement, unidadeEstoqueID) {
    const getOneProduct = `${apiEndpoints.findOneProduct}/${codigoDeBarras}`;
    fetch(getOneProduct, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Produto não encontrado');
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos:", data);

            if (Array.isArray(data) && data.length > 0 && data[0].nome_produto) {
                const produto = data[0];


                descricaoElement.value = produto.nome_produto;
                precoVendaElement.value = produto.preco_venda;
                unidadeEstoqueID = produto.unidadeEstoqueID;
                produtoIdGlobal = produto.produto_id;
                unIDGlobal = produto.unidade_estoque_id;
                pathIgmGlobal = produto.caminho_img_produto;
                let value = precoVendaElement.value;
                value = value.replace(/\D/g, '');
                value = (parseFloat(value) / 100).toFixed(2);
                value = value.replace('.', ',');
                value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                precoVendaElement.value = value;
                imgProduto.src = !pathIgmGlobal ? '../style/img/produto.png' :
                    `../img/produtos/${pathIgmGlobal}`;

                // Chama a função `getunidadeEstoqueVendas` aqui, garantindo que unidadeEstoqueID já foi atualizado
                getunidadeEstoqueVendas(Number(produto.unidade_estoque_id), unidadeEstoqueRender);
            } else {
                console.error('Propriedade nome_produto ou produto_id não encontrada na resposta da API');
                descricaoElement.value = '';
                precoVendaElement.value = '';
                descricaoElement.placeholder = 'Produto não encontrado';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}


function getFornecedor(renderer) {
    const getFornecedor = apiEndpoints.getFornecedor;

    fetch(getFornecedor)
        .then(response => response.json())
        .then(data => {
            const fornecedor = data;
            fornecedor.forEach((fornecedor) => {
                const option = document.createElement('option');
                option.innerHTML = fornecedor.nome_fantasia;
                option.value = fornecedor.fornecedor_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function getTamanhoLetras(renderer) {
    const getTamanho = apiEndpoints.getTamanhoLetras;

    fetch(getTamanho)
        .then(response => response.json())
        .then(data => {
            data.forEach((tamanho) => {
                const option = document.createElement('option');
                option.innerHTML = tamanho.tamanho;
                option.value = tamanho.tamanho_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function getunidadeDeMassa(renderer) {
    const getunidadeDeMassa = apiEndpoints.getunidadeDeMassa;

    fetch(getunidadeDeMassa)
        .then(response => response.json())
        .then(data => {
            data.forEach((unMassa) => {
                const option = document.createElement('option');
                option.innerHTML = unMassa.unidade_nome;
                option.value = unMassa.unidade_massa_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function getTamanhoNumeros(renderer) {
    const getTamanho = apiEndpoints.getTamanhoNumeros;

    fetch(getTamanho)
        .then(response => response.json())
        .then(data => {
            data.forEach((tamanho) => {
                const option = document.createElement('option');
                option.innerHTML = tamanho.tamanho;
                option.value = tamanho.tamanho_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}
function getunidadeComprimento(renderer) {
    const getComprimento = apiEndpoints.getunidadeComprimento;

    fetch(getComprimento)
        .then(response => response.json())
        .then(data => {
            data.forEach((comprimento) => {
                const option = document.createElement('option');
                option.innerHTML = comprimento.unidade_nome;
                option.value = comprimento.unidade_comprimento_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function getunidadeEstoque(renderer) {
    const getEstoque = apiEndpoints.getunidadeEstoque;

    fetch(getEstoque)
        .then(response => response.json())
        .then(data => {
            data.forEach((unidadeEstoque) => {
                const option = document.createElement('option');
                option.innerHTML = unidadeEstoque.estoque_nome;
                option.value = unidadeEstoque.unidade_estoque_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}


function getMedidaVolume(renderer) {
    const getVolume = apiEndpoints.getMedidaVolume;

    fetch(getVolume)
        .then(response => response.json())
        .then(data => {
            data.forEach((medida) => {
                const option = document.createElement('option');
                option.innerHTML = medida.medida_nome;
                option.value = medida.medida_volume_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function getCorProduto(renderer) {
    const getVolume = apiEndpoints.getCorProduto;

    fetch(getVolume)
        .then(response => response.json())
        .then(data => {
            data.forEach((cor) => {
                const option = document.createElement('option');
                option.innerHTML = cor.nome_cor_produto;
                option.value = cor.cor_produto_id;
                renderer.appendChild(option);
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}


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
}

async function getVenda(inputElement) {
    const getVendaEndpoint = apiEndpoints.getVenda; // Substitua pelo endpoint correto

    try {
        const response = await fetch(getVendaEndpoint);
        const data = await response.json();

        // Se houver vendas
        if (data && data.length > 0) {
            const ultimoPedido = data[data.length - 1]; // Pega o último pedido
            const numeroPedido = ultimoPedido.venda_id; // Obtém o número do último pedido

            console.log(`Vendas registradas no Db:`, data);
            // Incrementa o número do pedido (supondo que seja uma string numérica)
            const proximoNumeroPedido = (parseInt(numeroPedido, 10) + 1).toString();

            inputElement.value = proximoNumeroPedido; // Define o próximo número do pedido no input
        } else {
            console.warn('Nenhuma venda encontrada. Definindo número do pedido como 1.');
            inputElement.value = '1'; // Define como 1 caso não haja vendas
        }
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
    }
};



async function syncLicenca(userID, serialKey) {
    // Endpoint da API para obter os dados do MongoDB
    const getLicencaEndpoint = `http://localhost:3000/getLicenca/${userID}/${serialKey}`;
    const postAtivacaoDbEndpoint = apiEndpoints.postAtivacao; // Endpoint para inserir no MySQL

    try {
        // Passo 1: Buscar os dados do MongoDB
        const response = await fetch(getLicencaEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar licença do MongoDB. Status: ${response.status}`);
        }

        const mongoData = await response.json();
        console.log('Dados obtidos do MongoDB:', mongoData);

        // Passo 2: Preparar os dados para o MySQL
        const formatDate = (date) => {
            // Converte a data para o formato YYYY-MM-DD
            const d = new Date(date);
            return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
        };

        const ativacaoData = {
            userID: mongoData.userID,
            serialKey: mongoData.serialKey,
            startedDate: formatDate(mongoData.startedDate), // Formata a data para o formato aceito pelo MySQL
            expirationDate: formatDate(mongoData.expirationDate), // Formata a data para o formato aceito pelo 
            ativado: mongoData.ativado,
        };

        // Passo 3: Inserir os dados no MySQL
        const postResponse = await fetch(postAtivacaoDbEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ativacaoData),
        });

        if (!postResponse.ok) {
            throw new Error(`Erro ao inserir ativação no MySQL. Status: ${postResponse.status}`);
        }

        const mysqlData = await postResponse.json();
        console.log('Ativação registrada no MySQL com sucesso:', mysqlData);

    } catch (error) {
        console.error('Erro ao sincronizar licença:', error);
    }

};

let ativado = false; // Padrão inicial como "não ativado"
let divAtivar = null; // Inicializa a variável

document.addEventListener('DOMContentLoaded', function () {
    divAtivar = document.querySelector('.ativar-produto'); // Seleciona a div após o DOM carregar
    if (divAtivar) {
        divAtivar.style.display = 'none'; // Esconde por padrão
    }
    focus();
    fetchAtivacaoMysql(); // Chama após o DOM carregar
});

async function fetchAtivacaoMysql() {
    const apiUrl = apiEndpoints.getAtivacaoMysql;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
     console.log(data)
        // Verifica se há dados e define `ativado` como true ou false
        ativado = data.length > 0 && data[0]?.ativado === 1;

        atualizarDisplay(); // Atualiza o estado da div com base no valor de `ativado`
    } catch (error) {
        console.error('Erro ao buscar dados:', error);

        // Em caso de erro, considere como "não ativado"
        ativado = false;
        atualizarDisplay();
    }
}

const atualizarDisplay = () => {
    if (divAtivar) {
        if (ativado) {
            divAtivar.style.display = 'none';
        } else {
            divAtivar.style.display = 'flex'; // Exibe se não ativado
        }
    } else {
        console.error('divAtivar não foi inicializada.');
    }
};


async function verificaAtivacaoMysql() {
    const apiUrl = apiEndpoints.getAtivacaoMysql;

    try {
        // Faz a requisição à API para obter os dados do MySQL
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Dados do MySQL:', data);

        if (data.length > 0) {
            const { userID, serialKey } = data[0]; // Extrai os campos necessários
            const ativado = data[0]?.ativado === 1;

            // Monta a URL para buscar os dados no MongoDB
            const getLicencaEndpoint = `http://localhost:3000/getLicenca/${encodeURIComponent(userID)}/${encodeURIComponent(serialKey)}`;

            // Faz a requisição ao MongoDB
            const licencaResponse = await fetch(getLicencaEndpoint);
            const licencaData = await licencaResponse.json();

            console.log('Dados do MongoDB:', licencaData);

            // Verifica se há mudanças entre os dados do MySQL e MongoDB
            const hasChanges =
                (data[0].ativado !== (licencaData.ativado ? 1 : 0)) ||
                new Date(data[0].expirationDate).toISOString().slice(0, 10) !== new Date(licencaData.expirationDate).toISOString().slice(0, 10) ||
                new Date(data[0].startedDate).toISOString().slice(0, 10) !== new Date(licencaData.startedDate).toISOString().slice(0, 10);

            console.log('Mudanças detectadas:', hasChanges);

            if (hasChanges) {
                console.log('Mudanças detectadas, atualizando no MySQL...');
                
                // Atualiza os dados no MySQL com PATCH
                const updateResponse = await fetch('http://localhost:3000/UpdateAtivacao', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ativado: licencaData.ativado,
                        expirationDate: licencaData.expirationDate,
                        serialKey: licencaData.serialKey,
                        startedDate: licencaData.startedDate,
                        userID: licencaData.userID,
                        mongoID: licencaData._id, // Adiciona o ID do MongoDB para referência
                    }),
                });

                const updateResult = await updateResponse.json();
                console.log('Resultado da atualização no MySQL:', updateResult);
                location.reload();
            } else {
                console.log('Nenhuma mudança detectada, nenhuma atualização necessária.');
            }
        } else {
            console.warn('Nenhum dado encontrado no MySQL.');
            ativado = false;
        }
    } catch (error) {
        console.error('Erro ao processar a ativação:', error);
        ativado = false;
    } finally {
        atualizarDisplay(); // Atualiza o estado da interface
    }
}

// Chama a função
verificaAtivacaoMysql();



async function verificaValidadeDate() {
    const apiUrl = apiEndpoints.getAtivacaoMysql;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        if (data.length > 0) {
            const { startedDate, expirationDate } = data[0];

            // Converte as datas para objetos Date
            const startDate = new Date(startedDate);
            const endDate = new Date(expirationDate);
            const today = new Date(); // Data atual

            console.log(`Início: ${startDate}, Fim: ${endDate}, Hoje: ${today}`);

            const timeDifference = endDate.getTime() - today.getTime();
            const daysToExpire = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Calcula os dias restantes

            // Exibe mensagens apropriadas dependendo da validade da licença
            if (today >= startDate && today <= endDate) {
                if (daysToExpire <= 3) {
                    exibirMensagemVencimentoProximo(endDate, daysToExpire);
                } else {
                    exibirMensagemLicencaValida(endDate);
                }
            } else {
                exibirMensagemLicencaExpirada(endDate);
                bloqueiaCampos();
            }
        } else {
            console.warn('Nenhum dado encontrado na API.');
            exibirMensagemSemDados();
            bloqueiaCampos();
        }
    } catch (error) {
        console.error(
            'Erro ao verificar a validade da licença. Entre em contato para renovar.',
            error
        );
        exibirMensagemErro();
        bloqueiaCampos();
    }
}

function exibirMensagemVencimentoProximo(endDate, daysToExpire) {
    const formattedDate = endDate.toLocaleDateString();
    exibirMensagem(
        `A licença está prestes a expirar! Faltam ${daysToExpire} dias para o vencimento (${formattedDate}).`,
        'orange'
    );
}

function exibirMensagemLicencaExpirada(endDate) {
    const formattedDate = endDate.toLocaleDateString();
    exibirMensagem(
        `A licença venceu em ${formattedDate}. Entre em contato para renovação.`,
        'red'
    );
}

function exibirMensagemLicencaValida(endDate) {
    const formattedDate = endDate.toLocaleDateString();
    exibirMensagem(`Licença válida até ${formattedDate}.`, 'green');
}

function exibirMensagemSemDados() {
    exibirMensagem('Nenhum dado de licença encontrado. Entre em contato para suporte.', 'red');
}

function exibirMensagemErro() {
    exibirMensagem(
        'Erro ao verificar a validade da licença. Entre em contato para suporte.',
        'red'
    );
}

function exibirMensagem(texto, cor) {
    const messageContainer = document.getElementById('mensagem-licenca');
    if (!messageContainer) {
        console.error('Elemento para exibir mensagens não encontrado.');
        return;
    }

    messageContainer.textContent = texto;
    messageContainer.style.color = cor;
    messageContainer.style.marginTop = '10px';
}

function bloqueiaCampos() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (usernameInput) usernameInput.disabled = true;
    if (passwordInput) passwordInput.disabled = true;
}

// Chama a função ao carregar a página
verificaValidadeDate();
