const path = require('path');
const multer = require('multer');

const { 
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
    postNewFornecedor 
} = require(path.join(__dirname, '../../db/model/product'));

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../img/produtos')); // Caminho para salvar imagens
    },
    filename: function (req, file, cb) {
        const uniqueFilename = `${Date.now()}-${file.originalname}`; // Nome único para evitar conflitos
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

            const imagePath = req.file ? req.file.path : null;
            const produtoData = JSON.parse(req.body.produtoData); // Corrigido para garantir que os dados do produto sejam tratados como um objeto

            // Adiciona o caminho da imagem aos dados do produto
            if (imagePath) {
                produtoData.caminho_imagem = imagePath; // Campo correto para salvar no banco
            }

            try {
                const newProductId = await postNewProduct(produtoData); // Certifique-se de que a função insere corretamente no banco

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
            const fornecedorData = req.body;
            const newFornecedorId = await postNewFornecedor(fornecedorData);

            res.json({
                message: 'Fornecedor inserido com sucesso!',
                fornecedor_id: newFornecedorId
            });
        } catch (error) {
            console.error('Erro ao inserir o fornecedor:', error);
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
};

module.exports = controllers;
