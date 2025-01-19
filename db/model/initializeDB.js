
// Carrega as variáveis de ambiente do arquivo .env
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const Database = require('better-sqlite3');

// Caminho do arquivo do banco SQLite
const dbPath = path.join(__dirname, '../gestaolite.db');

async function initializeDB() {
    let db;
    try {
        // Conectar ao SQLite (se o arquivo não existir, ele será criado)
        db = new Database(dbPath, { verbose: console.log });
        console.log('Conectado ao banco de dados SQLite.');

        const queries = [
            // Criar Schema e Tabelas (SQLite não precisa de CREATE SCHEMA)

            // Criar Tabela Serial_Key
            `CREATE TABLE IF NOT EXISTS Serial_Key (
                serial_key_id INTEGER PRIMARY KEY AUTOINCREMENT,
                userID TEXT NOT NULL,
                serialKey TEXT NOT NULL, 
                startedDate TEXT NOT NULL, 
                expirationDate TEXT NOT NULL, 
                ativado INTEGER NOT NULL, 
                UNIQUE (userID), 
                UNIQUE (serialKey)
            );`,

            // Criar Tabela grupo
            `CREATE TABLE IF NOT EXISTS grupo (
                grupo_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_grupo TEXT
            );`,

            // Criar Tabela sub-grupo
            `CREATE TABLE IF NOT EXISTS sub_grupo (
                sub_grupo_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_sub_grupo TEXT
            );`,

            // Criar Tabela tamanho_letras
            `CREATE TABLE IF NOT EXISTS tamanho_letras (
                tamanho_id INTEGER PRIMARY KEY AUTOINCREMENT,
                tamanho TEXT
            );`,

            // Criar Tabela tamanho_numero
            `CREATE TABLE IF NOT EXISTS tamanho_numero (
            tamanho_id INTEGER PRIMARY KEY AUTOINCREMENT,
            tamanho TEXT
            );
            `,

            // Criar Tabela unidade_massa
            `CREATE TABLE IF NOT EXISTS unidade_massa (
                unidade_massa_id INTEGER PRIMARY KEY AUTOINCREMENT,
                unidade_nome TEXT
            );`,

            // Criar Tabela medida_volume
            `CREATE TABLE IF NOT EXISTS medida_volume (
                medida_volume_id INTEGER PRIMARY KEY AUTOINCREMENT,
                medida_nome TEXT
            );`,

            // Criar Tabela unidade_comprimento
            `CREATE TABLE IF NOT EXISTS unidade_comprimento (
                unidade_comprimento_id INTEGER PRIMARY KEY AUTOINCREMENT,
                unidade_nome TEXT
            );`,

            // Criar Tabela unidade_estoque
            `CREATE TABLE IF NOT EXISTS unidade_estoque (
                unidade_estoque_id INTEGER PRIMARY KEY AUTOINCREMENT,
                estoque_nome TEXT
            );`,

            // Criar Tabela fornecedor
            `CREATE TABLE IF NOT EXISTS fornecedor (
                fornecedor_id INTEGER PRIMARY KEY AUTOINCREMENT,
                cnpj TEXT,
                inscricao_estadual TEXT,
                razao_social TEXT,
                nome_fantasia TEXT,
                cep TEXT,
                cidade TEXT,
                bairro TEXT,
                uf TEXT,
                endereco TEXT,
                telefone TEXT,
                email TEXT,
                observacoes TEXT
            );`,

            // Criar Tabela cor produto
            `CREATE TABLE IF NOT EXISTS cor_produto (
                cor_produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_cor_produto TEXT
            );`,

            // Criar Tabela cliente
            `CREATE TABLE IF NOT EXISTS cliente (
                cliente_id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                cpf TEXT NOT NULL UNIQUE,
                data_nascimento TEXT NOT NULL,
                telefone TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                cep TEXT NOT NULL,
                logradouro TEXT,
                numero TEXT,
                bairro TEXT,
                estado TEXT NOT NULL,
                cidade TEXT NOT NULL,
                observacoes TEXT,
                data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`,

            // Criar Tabela venda
            `CREATE TABLE IF NOT EXISTS venda (
                venda_id INTEGER PRIMARY KEY AUTOINCREMENT,
                data_venda TEXT NOT NULL,
                cliente_id INTEGER,
                total_liquido REAL NOT NULL,
                valor_recebido REAL NOT NULL,
                troco REAL NOT NULL,
                numero_pedido TEXT NOT NULL
            );`,

            // Criar Tabela forma_pagamento
            `CREATE TABLE IF NOT EXISTS forma_pagamento (
                pagamento_id INTEGER PRIMARY KEY AUTOINCREMENT,
                venda_id INTEGER NOT NULL,
                tipo_pagamento TEXT NOT NULL,
                valor REAL NOT NULL,
                FOREIGN KEY (venda_id) REFERENCES venda(venda_id)
            );`,

            // Criar Tabela item_venda
            `CREATE TABLE IF NOT EXISTS item_venda (
                item_venda_id INTEGER PRIMARY KEY AUTOINCREMENT,
                venda_id INTEGER NOT NULL,
                produto_id INTEGER NOT NULL,
                preco REAL NOT NULL,
                quantidade INTEGER NOT NULL,
                unidade_estoque_id INTEGER NOT NULL,
                FOREIGN KEY (venda_id) REFERENCES venda(venda_id)
            );`,

            // Criar Tabela controle_estoque
            `CREATE TABLE IF NOT EXISTS controle_estoque (
                controle_estoque_id INTEGER PRIMARY KEY AUTOINCREMENT,
                produto_id INTEGER NOT NULL,
                qtde_movimentada INTEGER NOT NULL,
                preco_compra_anterior REAL NOT NULL,
                preco_compra_atual REAL NOT NULL,
                preco_markup_anterior REAL,
                preco_markup_atual REAL,
                preco_venda_anterior REAL NOT NULL,
                preco_venda_atual REAL NOT NULL,
                situacao_movimento TEXT NOT NULL,
                motivo_movimentacao TEXT NOT NULL,
                numero_compra_fornecedor TEXT,
                venda_id INTEGER,
                data_movimentacao TEXT NOT NULL,
                FOREIGN KEY (produto_id) REFERENCES produto(produto_id),
                FOREIGN KEY (venda_id) REFERENCES venda(venda_id)
            );`,

            // Criar Tabela produto
            `CREATE TABLE IF NOT EXISTS produto (
                produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo_ean TEXT,
                grupo_id INTEGER,
                sub_grupo_id INTEGER,
                nome_produto TEXT,
                tamanho_letras_id INTEGER,
                tamanho_num_id INTEGER,
                unidade_massa_id INTEGER,
                medida_volume_id INTEGER,
                unidade_comprimento_id INTEGER,
                quantidade_estoque INTEGER,
                quantidade_vendido INTEGER,
                preco_compra REAL,
                markup REAL,
                preco_venda REAL,
                unidade_estoque_id INTEGER,
                unidade_massa_qtd INTEGER,
                medida_volume_qtd INTEGER,
                unidade_comprimento_qtd INTEGER,
                fornecedor_id INTEGER,
                caminho_img_produto TEXT,
                cor_produto_id INTEGER,
                observacoes TEXT,
                produto_ativado INTEGER DEFAULT 1,
                FOREIGN KEY (grupo_id) REFERENCES grupo(grupo_id),
                FOREIGN KEY (sub_grupo_id) REFERENCES sub_grupo(sub_grupo_id),
                FOREIGN KEY (tamanho_letras_id) REFERENCES tamanho_letras(tamanho_id),
                FOREIGN KEY (tamanho_num_id) REFERENCES tamanho_numero(tamanho_id),
                FOREIGN KEY (unidade_massa_id) REFERENCES unidade_massa(unidade_massa_id),
                FOREIGN KEY (medida_volume_id) REFERENCES medida_volume(medida_volume_id),
                FOREIGN KEY (unidade_comprimento_id) REFERENCES unidade_comprimento(unidade_comprimento_id),
                FOREIGN KEY (unidade_estoque_id) REFERENCES unidade_estoque(unidade_estoque_id),
                FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(fornecedor_id),
                FOREIGN KEY (cor_produto_id) REFERENCES cor_produto(cor_produto_id)
            );`
        ];


        // Executar cada query para criar tabelas
        queries.forEach(query => {
            db.prepare(query).run();
        });
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
        throw err;
    }
}

// Fecha o banco de dados ao desligar o servidor
process.on('SIGINT', () => {
    console.log('Servidor está sendo desligado...');
    db.close();
    console.log('Banco de dados SQLite fechado com sucesso.');
    process.exit(0); // Sai do processo com sucesso
});



async function insertGrupo(db) {
    try {
        const query = `INSERT OR IGNORE INTO grupo (nome_grupo) VALUES ('Geral')`;
        const info = db.prepare(query).run();

        if (info.changes) {
            console.log('Grupo de produtos inserido com sucesso.');
            return info.changes;
        } else {
            console.log('Grupo de produtos já existe.');
            return 0;
        }
    } catch (error) {
        console.error('Erro ao inserir grupo de produtos:', error);
        throw error;
    }
}

async function insertSubGrupo(db) {
    try {
        const query = `INSERT OR IGNORE INTO sub_grupo (nome_sub_grupo) VALUES ('Geral')`;
        const info = db.prepare(query).run();

        if (info.changes) {
            console.log('Sub-grupo de produtos inserido com sucesso.');
            return info.changes;
        } else {
            console.log('Sub-grupo de produtos já existe.');
            return 0;
        }
    } catch (error) {
        console.error('Erro ao inserir sub-grupo de produtos:', error);
        throw error;
    }
}

async function insertTamanhoLetras(db) {
    try {
        const query = `INSERT OR IGNORE INTO tamanho_letras (tamanho) 
        VALUES ('PP'), ('P'), ('M'), ('G'), ('GG'), ('XG'), ('XXG')`;
        const info = db.prepare(query).run();

        console.log('Tamanhos de letras inseridos com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir tamanhos de letras dos produtos:', error);
        throw error;
    }
}

async function insertCorProduto(db) {
    try {
        const query = `INSERT OR IGNORE INTO cor_produto (nome_cor_produto) 
        VALUES ('Vermelho'), ('Azul'), ('Verde'), ('Amarelo'), ('Preto'), ('Branco'), 
        ('Roxo'), ('Laranja'), ('Rosa'), ('Marrom'), ('Cinza'), ('Ciano'), ('Magenta'), 
        ('Lima'), ('Índigo'), ('Violeta'), ('Dourado'), ('Prata'), ('Bege'), ('Bordô')`;
        const info = db.prepare(query).run();

        console.log('Cores de produtos inseridas com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir cores dos produtos:', error);
        throw error;
    }
}

async function insertTamanhoNumeros(db) {
    try {
        const query = `INSERT OR IGNORE INTO tamanho_numero (tamanho) 
        VALUES ${Array.from({ length: 100 }, (_, i) => `('${i + 1}')`).join(', ')}`;
        const info = db.prepare(query).run();

        console.log('Tamanhos numéricos inseridos com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir tamanhos numéricos dos produtos:', error);
        throw error;
    }
}

async function insertUnidadeMassa(db) {
    try {
        const query = `INSERT OR IGNORE INTO unidade_massa (unidade_nome)
        VALUES ('G'), ('KG'), ('MG'), ('TON')`;
        const info = db.prepare(query).run();

        console.log('Unidades de massa inseridas com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir unidades de massa dos produtos:', error);
        throw error;
    }
}

async function insertUnidadeVolume(db) {
    try {
        const query = `INSERT OR IGNORE INTO medida_volume (medida_nome) 
        VALUES ('ML'), ('L'), ('M³'), ('CM³')`;
        const info = db.prepare(query).run();

        console.log('Unidades de volume inseridas com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir unidades de volume dos produtos:', error);
        throw error;
    }
}

async function insertUnidadeComprimento(db) {
    try {
        const query = `INSERT OR IGNORE INTO unidade_comprimento (unidade_nome) 
        VALUES ('MM'), ('CM'), ('M')`;
        const info = db.prepare(query).run();

        console.log('Unidades de comprimento inseridas com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir unidades de comprimento dos produtos:', error);
        throw error;
    }
}

async function insertUnidadeEstoque(db) {
    try {
        const query = `INSERT OR IGNORE INTO unidade_estoque (estoque_nome) 
        VALUES ('un'), ('cx'), ('rolo'), ('pc')`;
        const info = db.prepare(query).run();

        console.log('Unidades de estoque inseridas com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir unidades de estoque dos produtos:', error);
        throw error;
    }
}

async function insertFornecedorPadrao(db) {
    try {
        const query = `INSERT OR IGNORE INTO fornecedor (nome_fantasia) 
        VALUES ('Fornecedor não Cadastrado')`;
        const info = db.prepare(query).run();

        console.log('Fornecedor padrão inserido com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir fornecedor padrão:', error);
        throw error;
    }
}

async function insertClienteDefault(db) {
    try {
        const query = `INSERT OR IGNORE INTO cliente (nome, cpf, telefone, email, cep, estado, cidade, data_nascimento) 
        VALUES ('Consumidor Final', '000.000.000-00', '', '', '', 'SP', 'São Paulo', CURRENT_TIMESTAMP)`;
        const info = db.prepare(query).run();

        console.log('Cliente padrão inserido com sucesso.');
        return info.changes;
    } catch (error) {
        console.error('Erro ao inserir cliente padrão:', error);
        throw error;
    }
}

module.exports = {
    insertGrupo,
    insertSubGrupo,
    insertTamanhoLetras,
    insertCorProduto,
    insertTamanhoNumeros,
    insertUnidadeMassa,
    insertUnidadeVolume,
    insertUnidadeComprimento,
    insertUnidadeEstoque,
    insertFornecedorPadrao,
    insertClienteDefault,
    initializeDB
};














