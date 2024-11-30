const path = require('path');
const multer = require('multer');

const { getAllProdutos, findProductByBarcode, getGrupo, getSubGrupo, getFornecedor, getTamanhoLetras, getTamanhoNumeros, getUnidadeMassa, getMedidaVolume, getUnidadeComprimento, getUnidadeEstoque,getCorProduto, postNewProduct, postNewProductGrupo, postNewProductSubGrupo, postNewFornecedor} = require(path.join(__dirname, '../../db/model/product'));

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
    getGrupo : async (req, res) => {
        try {
            const categorias = await getGrupo();
            res.json(categorias);
        } catch (error) {
            console.error('Erro ao buscar Categoria de Produto:', error);
            res.status(500).json({ error: 'Erro ao buscar Categoria de Produto' });
        }
    },
    getSubGrupo : async (req, res) => {
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
            console.error('Erro ao busca MedidaVolume:', error);
            res.status(500).json({ error: 'Erro ao buscar MedidaVolume' });
        }
    },
    getUnidadeMassa: async (req, res) => {
        try {
            const getMedida_volume = await getUnidadeMassa();
            res.json(getMedida_volume);
        } catch (error) {
            console.error('Erro ao busca Medida_volume:', error);
            res.status(500).json({ error: 'Erro ao buscar Medida_volume' });
        }
    },
    getUnidadeComprimento: async (req, res) => {
        try {
            const getComprimento = await getUnidadeComprimento();
            res.json(getComprimento);
        } catch (error) {
            console.error('Erro ao busca Unidade_Comprimento:', error);
            res.status(500).json({ error: 'Erro ao buscar Unidade_Comprimento'});
        }
    },

    getUnidadeEstoque: async (req, res) => {
        try {
            const unidadeEstoque = await getUnidadeEstoque();
            res.json(unidadeEstoque);
        } catch (error) {
            console.error('Erro ao busca Unidade_estoque:', error);
            res.status(500).json({ error: 'Erro ao buscar Unidade_estoque'});
        }
    },

    getCorProduto: async (req, res) => {
        try {
            const unidadeEstoque = await getCorProduto();
            res.json(unidadeEstoque);
        } catch (error) {
            console.error('Erro ao busca Cor do Produto:', error);
            res.status(500).json({ error: 'Erro ao buscar Cor do Produto'});
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

    postNewProduct: async (req, res) => {
        try {
            // Extrai os dados do produto do corpo da requisição
            const productData = req.body;

            // Chama a função insertNewProduct para inserir o produto no banco de dados
            const newProductId = await postNewProduct(productData);

            // Cria uma resposta contendo o ID do novo produto inserido
            const response = {
                message: 'Produto inserido com sucesso!',
                produto_id: newProductId
            };

            // Envia a resposta em formato JSON
            res.json(response);
        } catch (error) {
            console.error('Erro ao inserir o produto:', error);
            res.status(500).json({ error: 'Erro ao inserir o produto.' });
        }
    },

      postNewFornecedor: async (req, res) => {
        try {
            // Extrai os dados do fornecedor do corpo da requisição
            const fornecedorData = req.body;

            // Chama a função insertNewProduct para inserir o produto no banco de dados
            const newFornecedorId = await postNewFornecedor(fornecedorData);

            // Cria uma resposta contendo o ID do novo produto inserido
            const response = {
                message: 'Fornecedor inserido com sucesso!',
                fornecedor_id: newFornecedorId
            };

            // Envia a resposta em formato JSON
            res.json(response);
        } catch (error) {
            console.error('Erro ao inserir o fornecedor:', error);
            res.status(500).json({ error: 'Erro ao inserir o fornecedor.' });
        }
    },

    postImgProduct: async (req, res) => {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '../../img/produtos')); // Define o caminho onde as imagens serão salvas
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname); // Define o nome do arquivo com a extensão
            }
        });

        const upload = multer({ storage: storage }).single('image');

        upload(req, res, function (err) {
            if (err) {
                return res.status(500).json({ message: 'Falha no upload do arquivo', error: err.message });
            }
            res.status(200).json({ message: 'Arquivo carregado com sucesso', filePath: req.file.path });
        });
    },

    postNewProductGrupo: async (req, res) => {
        try {
            // Extrai os dados do produto do corpo da requisição
            const grupoData = req.body;

            // Chama a função insertNewProduct para inserir o grupo no banco de dados
            const newGrupoProductId = await postNewProductGrupo(grupoData);

            // Cria uma resposta contendo o ID do novo grupo inserido
            const response = {
                message: 'Grupo inserido com sucesso!',
                grupo_id: newGrupoProductId
            };

            // Envia a resposta em formato JSON
            res.json(response);
        } catch (error) {
            console.error('Erro ao inserir novo grupo:', error);
            res.status(500).json({ error: 'Erro ao inserir novo grupo.' });
        }
    },


    postNewProductSubGrupo: async (req, res) => {
        try {
            // Extrai os dados do produto do corpo da requisição
            const subGrupoData = req.body;

            // Chama a função insertNewProduct para inserir o produto no banco de dados
            const newGrupoProductId = await postNewProductSubGrupo(subGrupoData);

            // Cria uma resposta contendo o ID do novo produto inserido
            const response = {
                message: 'Grupo inserido com sucesso!',
                subGrupo_id: newGrupoProductId
            };

            // Envia a resposta em formato JSON
            res.json(response);
        } catch (error) {
            console.error('Erro ao inserir novo sub-grupo:', error);
            res.status(500).json({ error: 'Erro ao inserir novo sub-grupo.' });
        }
    },

}


module.exports = controllers;


