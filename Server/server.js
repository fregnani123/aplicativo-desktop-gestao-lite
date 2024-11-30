const express = require('express');
const path = require('path');
const Routes = require(path.join(__dirname, '../Server/Router/routes'));
const cors = require('cors');
const { getAllProdutos } = require(path.join(__dirname, '../db/model/product'));
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });


const serverApp = express();
const PORT = process.env.PORT;

serverApp.use(express.json());
serverApp.use(cors());
serverApp.use(Routes);


const startServer = async () => {
    try {
        // Tenta obter dados para garantir que a conexão com o banco de dados está funcionando
        await getAllProdutos();
        console.log('Servidor MySQL conectado com sucesso!');

        serverApp.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
};

module.exports = startServer;
