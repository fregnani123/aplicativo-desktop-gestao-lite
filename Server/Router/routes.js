const express = require('express');
const Router = express.Router();
const controllers = require('../Controller/controllers');

Router.get('/produtos', controllers.getAllProducts);
Router.get('/grupos', controllers.getGrupo);
Router.get('/subGrupos', controllers.getSubGrupo);
Router.get('/fornecedor', controllers.getFornecedor);
Router.get('/tamanhoLetras', controllers.getTamanhoLetras);
Router.get('/tamanhoNumeros', controllers.getTamanhoNumeros);
Router.get('/unidadeMassa', controllers.getUnidadeMassa);
Router.get('/medidaVolume', controllers.getMedidaVolume);
Router.get('/unidadeComprimento', controllers.getUnidadeComprimento);
Router.get('/unidadeEstoque', controllers.getUnidadeEstoque);
Router.get('/corProduto', controllers.getCorProduto);
Router.get('/produto/:codigoDeBarras', controllers.findOneProduct);
Router.post('/postNewProduto', controllers.postNewProductWithImage);
Router.post('/newGrupo', controllers.postNewProductGrupo);
Router.post('/newSubGrupo', controllers.postNewProductSubGrupo);
Router.post('/newFornecedor', controllers.postNewFornecedor);
Router.post('/postVenda', controllers.postNewVenda);
Router.get('/getVenda', controllers.getVenda);

module.exports = Router;