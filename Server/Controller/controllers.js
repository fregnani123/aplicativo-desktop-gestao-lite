const path = require('path');
const multer = require('multer');

const {
    postAtivacao,
    getAllProdutos,
    findProductByBarcode,
    getGrupo,
    getSubGrupo,
    getFornecedor,
    getTamanhoLetras,
    getTamanhoNumeros,
    getUnidadeMassa,
    getMedidaVolume,
    getUnidadeComprimento,
    getUnidadeEstoque,
    getCorProduto,
    postNewProduct,
    postNewProductGrupo,
    postNewProductSubGrupo,
    postNewFornecedor,
    postNewSale,
    fetchVenda,
    getAtivacaoMysql,
    UpdateAtivacao,
    UpdateEstoque,
    postNewCliente,
    historicoDeVendas,
    getVendasPorNumeroVenda

} = require(path.join(__dirname, '../../db/model/product'));



// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../img/produtos')); // Caminho para salvar imagens
    },
    filename: function (req, file, cb) {
        const uniqueFilename = file.originalname; // Nome único para evitar conflitos
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage }).single('image'); // Usar o campo "image" do formulário

const controllers = {

    getAllProducts: async (req, res) => {
        try {
            const produtos = await getAllProdutos();
            res.json(produtos);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    },

    getGrupo: async (req, res) => {
        try {
            const categorias = await getGrupo();
            res.json(categorias);
        } catch (error) {
            console.error('Erro ao buscar Categoria de Produto:', error);
            res.status(500).json({ error: 'Erro ao buscar Categoria de Produto' });
        }
    },

    getAtivacaoMysql: async (req, res) => {
        try {
            const ativacao = await getAtivacaoMysql();
            res.json(ativacao);
        } catch (error) {
            console.error('Erro ao buscar ativação:', error);
            res.status(500).json({ error: 'Erro ao buscar ativação' });
        }
    },

    getSubGrupo: async (req, res) => {
        try {
            const grupoProduto = await getSubGrupo();
            res.json(grupoProduto);
        } catch (error) {
            console.error('Erro ao buscar grupo_produto:', error);
            res.status(500).json({ error: 'Erro ao buscar grupo_produto' });
        }
    },

    getFornecedor: async (req, res) => {
        try {
            const fornecedor = await getFornecedor();
            res.json(fornecedor);
        } catch (error) {
            console.error('Erro ao buscar fornecedor:', error);
            res.status(500).json({ error: 'Erro ao buscar fornecedor' });
        }
    },

    getTamanhoLetras: async (req, res) => {
        try {
            const tamanhoLetras = await getTamanhoLetras();
            res.json(tamanhoLetras);
        } catch (error) {
            console.error('Erro ao buscar tamanhoLetras:', error);
            res.status(500).json({ error: 'Erro ao buscar tamanhoLetras' });
        }
    },


    getTamanhoNumeros: async (req, res) => {
        try {
            const tamanhoNumeros = await getTamanhoNumeros();
            res.json(tamanhoNumeros);
        } catch (error) {
            console.error('Erro ao buscar tamanhoNumeros:', error);
            res.status(500).json({ error: 'Erro ao buscar tamanhoNumeros' });
        }
    },

    getMedidaVolume: async (req, res) => {
        try {
            const medidaVolume = await getMedidaVolume();
            res.json(medidaVolume);
        } catch (error) {
            console.error('Erro ao buscar MedidaVolume:', error);
            res.status(500).json({ error: 'Erro ao buscar MedidaVolume' });
        }
    },

    getUnidadeMassa: async (req, res) => {
        try {
            const unidadeMassa = await getUnidadeMassa();
            res.json(unidadeMassa);
        } catch (error) {
            console.error('Erro ao buscar UnidadeMassa:', error);
            res.status(500).json({ error: 'Erro ao buscar UnidadeMassa' });
        }
    },

    getUnidadeComprimento: async (req, res) => {
        try {
            const unidadeComprimento = await getUnidadeComprimento();
            res.json(unidadeComprimento);
        } catch (error) {
            console.error('Erro ao buscar UnidadeComprimento:', error);
            res.status(500).json({ error: 'Erro ao buscar UnidadeComprimento' });
        }
    },

    getUnidadeEstoque: async (req, res) => {
        try {
            const unidadeEstoque = await getUnidadeEstoque();
            res.json(unidadeEstoque);
        } catch (error) {
            console.error('Erro ao buscar UnidadeEstoque:', error);
            res.status(500).json({ error: 'Erro ao buscar UnidadeEstoque' });
        }
    },

    getCorProduto: async (req, res) => {
        try {
            const corProduto = await getCorProduto();
            res.json(corProduto);
        } catch (error) {
            console.error('Erro ao buscar Cor do Produto:', error);
            res.status(500).json({ error: 'Erro ao buscar Cor do Produto' });
        }
    },

    findOneProduct: async (req, res) => {
        try {
            const barcode = req.params.codigoDeBarras;
            const produto = await findProductByBarcode(barcode);
            if (produto.length === 0) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.json(produto);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    },

    postNewProductWithImage: async (req, res) => {
        upload(req, res, async function (err) {
            if (err) {
                console.error('Erro no upload da imagem:', err);
                return res.status(500).json({ message: 'Erro no upload da imagem.', error: err.message });
            }

            // Extrair o caminho da imagem carregada
            const imagePath = req.file ? req.file.path : null;

            // Garantir que os dados do produto sejam um objeto JSON
            let produtoData;
            try {
                produtoData = JSON.parse(req.body.produtoData); // Garantindo que os dados sejam tratados como um objeto
            } catch (parseError) {
                console.error('Erro ao analisar os dados do produto:', parseError);
                return res.status(400).json({ message: 'Dados do produto inválidos.', error: parseError.message });
            }

            // Adiciona o caminho da imagem aos dados do produto, se a imagem foi carregada
            if (imagePath) {
                produtoData.caminho_imagem = imagePath; // Usando o campo correto para salvar no banco de dados
            }

            try {
                // Tente inserir o produto no banco de dados
                const newProductId = await postNewProduct(produtoData); // Certifique-se de que esta função insere corretamente o produto no banco

                // Se a inserção for bem-sucedida, retorne uma resposta de sucesso
                res.status(201).json({
                    message: 'Produto e imagem inseridos com sucesso!',
                    produto_id: newProductId,
                    caminho_imagem: imagePath,
                });
            } catch (error) {
                console.error('Erro ao inserir o produto no banco de dados:', error);
                res.status(500).json({ message: 'Erro ao inserir o produto.', error: error.message });
            }
        });
    },

    postNewFornecedor: async (req, res) => {
        try {
            const fornecedorData = req.body; // Dados do fornecedor recebidos do frontend
            const newFornecedorId = await postNewFornecedor(fornecedorData); // Insere o fornecedor no banco

            res.json({
                message: 'Fornecedor inserido com sucesso!',
                fornecedor_id: newFornecedorId
            });
        } catch (error) {
            console.error('Erro ao inserir o fornecedor:', error);

            // Verifica se o erro possui uma mensagem personalizada (como para o CNPJ duplicado)
            if (error.message) {
                return res.status(400).json({ error: error.message }); // Retorna a mensagem específica do erro
            }

            // Retorna uma mensagem genérica para outros erros
            res.status(500).json({ error: 'Erro ao inserir o fornecedor.' });
        }
    },

    postNewProductGrupo: async (req, res) => {
        try {
            const grupoData = req.body;
            const newGrupoProductId = await postNewProductGrupo(grupoData);

            res.json({
                message: 'Grupo inserido com sucesso!',
                grupo_id: newGrupoProductId
            });
        } catch (error) {
            console.error('Erro ao inserir novo grupo:', error);
            res.status(500).json({ error: 'Erro ao inserir novo grupo.' });
        }
    },

    postNewProductSubGrupo: async (req, res) => {
        try {
            const subGrupoData = req.body;
            const newGrupoProductId = await postNewProductSubGrupo(subGrupoData);

            res.json({
                message: 'Grupo inserido com sucesso!',
                subGrupo_id: newGrupoProductId
            });
        } catch (error) {
            console.error('Erro ao inserir novo sub-grupo:', error);
            res.status(500).json({ error: 'Erro ao inserir novo sub-grupo.' });
        }
    },

    postNewVenda: async (req, res) => {
        try {
            const vendaData = req.body;
            const newVendaId = await postNewSale(vendaData);

            res.json({
                message: 'Venda inserida com sucesso!',
                venda_id: newVendaId
            });
        } catch (error) {
            console.error('Erro ao inserir a venda:', error.message);
            res.status(500).json({ error: 'Erro ao inserir a venda.' });
        }
    },

    getVenda: async (req, res) => {
        try {
            const vendas = await fetchVenda(); // Chama a função para buscar as vendas
            res.json(vendas); // Retorna os dados como JSON
        } catch (error) {
            console.error('Erro ao buscar Venda:', error);
            res.status(500).json({ error: 'Erro ao buscar Venda' });
        }
    },


    getVendasPorNumeroVenda: async (req, res) => {
        const { numero_pedido } = req.params;  // Pegando o numero_pedido da URL
        try {
            // Chama a função que busca as vendas pelo numero_pedido
            const vendas = await getVendasPorNumeroVenda(numero_pedido);
            if (vendas.length === 0) {
                return res.status(404).json({ message: 'Venda não encontrada' });
            }
            res.json(vendas);  // Retorna todos os itens da venda
        } catch (error) {
            console.error('Erro ao buscar vendas:', error);
            res.status(500).json({ error: 'Erro ao buscar vendas' });
        }
    },


    getHistoricoDeVenda: async (req, res) => {
        try {
            // Extrai parâmetros de filtros e paginação da requisição
            const { startDate, endDate, clienteNome, produtoNome } = req.query;

            // Verifica se os parâmetros de data estão presentes, caso contrário, define como NULL
            const startDateFormatted = startDate || null;
            const endDateFormatted = endDate || null;
            const clienteNomeFormatted = clienteNome || null;
            const produtoNomeFormatted = produtoNome || null;

            // Chama a função para buscar o histórico de vendas com os filtros
            const historicoVendas = await historicoDeVendas({
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                clienteNome: clienteNomeFormatted,
                produtoNome: produtoNomeFormatted,
            });

            res.json(historicoVendas); // Retorna os dados como JSON
        } catch (error) {
            console.error('Erro ao buscar histórico de vendas:', error);
            res.status(500).json({ error: 'Erro ao buscar histórico de vendas' });
        }
    },


    postAtivacao: async (req, res) => {
        try {
            const insertAtivacao = req.body;
            await postAtivacao(insertAtivacao);

            res.json({
                message: 'ativação inserido com sucesso!',
            });

        } catch (error) {
            console.error('Erro ao inserir a ativação:', error);
            res.status(500).json({ error: 'Erro ao inserir a ativação.' });
        }
    },

    UpdateAtivacao: async (req, res) => {
        try {
            const serialKeyData = req.body; // Renomear para evitar confusão
            await UpdateAtivacao(serialKeyData); // Chamar a função importada/definida

            res.json({
                message: 'UpdateAtivacao alterado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao alterar UpdateAtivacao:', error);
            res.status(500).json({ error: 'Erro ao alterar UpdateAtivacao.' });
        }
    },

    UpdateEstoque: async (req, res) => {
        try {
            const produto = req.body; // Renomear para evitar confusão
            await UpdateEstoque(produto); // Chamar a função importada/definida

            res.json({
                message: 'UpdateEstoque alterado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao alterar UpdateEstoque:', error);
            res.status(500).json({ error: 'Erro ao alterar UpdateAtivacao.' });
        }
    },

    postNewCliente: async (req, res) => {
        try {
            const clienteData = req.body; // Dados do fornecedor recebidos do frontend
            const newFornecedorId = await postNewCliente(clienteData); // Insere o fornecedor no banco

            res.json({
                message: 'Cliente inserido com sucesso!',
                fornecedor_id: newFornecedorId
            });
        } catch (error) {
            console.error('Erro ao inserir o Cliente:', error);

            // Verifica se o erro possui uma mensagem personalizada (como para o CNPJ duplicado)
            if (error.message) {
                return res.status(400).json({ error: error.message }); // Retorna a mensagem específica do erro
            }

            // Retorna uma mensagem genérica para outros erros
            res.status(500).json({ error: 'Erro ao inserir o fornecedor.' });
        }
    },


};



module.exports = controllers;
