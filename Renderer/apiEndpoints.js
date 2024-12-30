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
    getVenda: 'http://localhost:3000/getVenda',
    postVenda: 'http://localhost:3000/postVenda',
    postNewCliente: 'http://localhost:3000/postNewCliente',
    updateEstoque: 'http://localhost:3000/UpdateEstoque',
    // getHistoricoVendas: 'http://localhost:3000/getHistoricoVendas',
    getVendaPorNumeroPedido: 'http://localhost:3000/getVendaPorNumeroPedido'
};

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

        const data = await response.json();
        console.log('Produto e imagem adicionados com sucesso:', data);

        // Exibe a mensagem de sucesso
        alertMsg('Produto adicionados com sucesso!', 'success', 4000);

        
        limparCampos();
        limparImagem();
    } catch (error) {

        console.error('Erro ao adicionar produto:', error);
        alertMsg(`${error}`, 'error', 4000);

        // Retorna imediatamente para evitar limpar os campos e exibir a imagem de sucesso
        return;
    }
};


async function postNewFornecedor(fornecedorData) {
    const postNewFornecedorData = apiEndpoints.postNewFornecedor;

    if (!fornecedorData.cnpj || !fornecedorData.nome_fantasia) {
        alert('Erro: CNPJ e nome fantasia são obrigatórios.');
        return;
    }

    try {
        const response = await fetch(postNewFornecedorData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fornecedorData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error); // Lança a mensagem detalhada do backend
        }

        const data = await response.json();
        console.log('Fornecedor adicionado com sucesso:', data);
        alertMsg(`${'Fornecedor adicionado com sucesso'}`, 'success', 4000);
        limparFormulario();
        getFornecedor(selectFornecedor);
        selectFornecedor.value = ''; // Limpa o campo após o envio
        // Limpa as opções atuais do select e redefine a primeira como "Selecione"
        selectFornecedor.innerHTML = '<option value="">Selecione</option>';
        containerRegisterForm.style.display = 'none';

        return data;

    } catch (error) {
        console.error('Erro ao adicionar fornecedor:', error.message);
        alertMsg(`${error.message}`, 'error', 4000); // Exibe o erro retornado pelo backend
        throw error;
    }
};

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
};


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
                quantidade_estoqueGlobal = produto.quantidade_estoque;
                quantidade_vendidoGlobal = produto.quantidade_vendido;
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


// async function getHistoricoVendas(filters) {
//     const getVendaEndpoint = apiEndpoints.getHistoricoVendas;

//     // Construção dos parâmetros de consulta (query string)
//     const params = new URLSearchParams(filters).toString();

//     try {
//         const response = await fetch(`${getVendaEndpoint}?${params}`, {
//             method: 'GET',
//         });

//         if (!response.ok) {
//             throw new Error(`Erro ao buscar vendas: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log('Dados das vendas:', data);
//         return data; // Retorna os dados para serem usados no front-end
//     } catch (error) {
//         console.error('Erro ao buscar dados das vendas:', error);
//         return null;
//     }
// };

// getHistoricoVendas()

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


async function postNewCliente(clienteData) {
    const postNewClienteData = apiEndpoints.postNewCliente;

    if (!clienteData.cpf || !clienteData.nome) {
        alert('Erro: CPF e nome são obrigatórios.');
        return;
    }

    try {
        const response = await fetch(postNewClienteData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error); // Lança a mensagem detalhada do backend
        }

        const data = await response.json();
        console.log('cliente adicionado com sucesso:', data);
        alertMsg(`${'cliente adicionado com sucesso'}`, 'success', 4000);
        limparFormulario();
        return data;

    } catch (error) {
        console.error('Erro ao adicionar cliente:', error.message);
        alertMsg(`${error.message}`, 'error', 4000); // Exibe o erro retornado pelo backend
        throw error;
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

