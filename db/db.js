// Carrega as variáveis de ambiente do arquivo .env
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });
const Database = require('better-sqlite3');

// Abre ou cria um banco de dados SQLite
const db = new Database(path.join(__dirname, '../db/gestaolite.db'), { verbose: console.log });

console.log('Conectado ao banco de dados SQLite.');

// Fecha o banco de dados ao desligar o servidor
process.on('SIGINT', () => {
    console.log('Servidor está sendo desligado...');

    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados:', err.message);
        } else {
            console.log('Banco de dados SQLite fechado com sucesso.');
        }
        process.exit(0); // Sai do processo com sucesso
    });
});

module.exports = db;
