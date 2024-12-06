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



















async function postNewProdutoWithImage(produtoData, selectedFile) {
    const apiEndpoint = apiEndpoints.postNewProduto;

    if (!produtoData.codigo_ean || !produtoData.nome_produto) {
        console.error('Erro: código EAN e nome do produto são obrigatórios.');
        alert('Erro: código EAN e nome do produto são obrigatórios.');
        return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('produtoData', JSON.stringify(produtoData)); // Dados do produto como string JSON

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Produto e imagem adicionados com sucesso:', data);
    } catch (error) {
        console.error('Erro ao adicionar produto e imagem:', error);
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

                let value = precoVendaElement.value;
                value = value.replace(/\D/g, '');
                value = (parseFloat(value) / 100).toFixed(2);
                value = value.replace('.', ',');
                value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                precoVendaElement.value = value;

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



