const express = require('express');
const Router = express.Router();
const controllers = require('../Controller/controllers');
const { getLicenca } = require('../../db/mongoDB');

// Definições de rotas
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
Router.post('/postControleEstoque', controllers.postNewControleEstoque);
Router.post('/postVenda', controllers.postNewVenda);
Router.post('/postNewCor', controllers.postNewProductCor);
Router.get('/getVenda', controllers.getVenda);
Router.get('/getAtivacaoMysql', controllers.getAtivacaoMysql);
Router.post('/insertAtivacao', controllers.postAtivacao);
Router.patch('/UpdateAtivacao', controllers.UpdateAtivacao);
Router.patch('/UpdateEstoque', controllers.UpdateEstoque);
Router.patch('/UpdateValores', controllers.UpdateValores);
Router.post('/postNewCliente', controllers.postNewCliente);
Router.get('/getHistoricoVendas', controllers.getHistoricoDeVenda);
Router.get('/getVendaPorNumeroPedido/:numero_pedido', controllers.getVendasPorNumeroVenda);

// Rota para obter licença
Router.get('/getLicenca/:userID/:serialKey', getLicenca);


module.exports = Router;
