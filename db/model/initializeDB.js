
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const pool = require('../db');

async function initializeDB() {
    let connection;
    try {
        // Conectar ao MySQL sem especificar um banco de dados
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        const queries = [
            // Desabilitar checagem de chaves únicas e chaves estrangeiras temporariamente
            `SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;`,
            `SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;`,
            `SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`,

            // Criar Schema gestaolite
            `CREATE SCHEMA IF NOT EXISTS gestaolite DEFAULT CHARACTER SET utf8;`,
            `USE gestaolite;`,

            // Criar Tabela grupo
            `CREATE TABLE IF NOT EXISTS grupo (
                grupo_id INT NOT NULL AUTO_INCREMENT,
                nome_grupo VARCHAR(150) NULL,
                PRIMARY KEY(grupo_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela sub-grupo
            `CREATE TABLE IF NOT EXISTS sub_grupo (
                sub_grupo_id INT NOT NULL AUTO_INCREMENT,
                nome_sub_grupo VARCHAR(150) NULL,
                PRIMARY KEY(sub_grupo_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela tamanho_letras
            `CREATE TABLE IF NOT EXISTS tamanho_letras (
                tamanho_id INT NOT NULL AUTO_INCREMENT,
                tamanho VARCHAR(15) NULL,
                PRIMARY KEY(tamanho_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela tamanho_numero
            `CREATE TABLE IF NOT EXISTS tamanho_numero (
                tamanho_id INT NOT NULL AUTO_INCREMENT,
                tamanho VARCHAR(15) NULL,
                PRIMARY KEY(tamanho_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela unidade_massa
            `CREATE TABLE IF NOT EXISTS unidade_massa (
                unidade_massa_id INT NOT NULL AUTO_INCREMENT,
                unidade_nome VARCHAR(45) NULL,
                PRIMARY KEY(unidade_massa_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela medida_volume
            `CREATE TABLE IF NOT EXISTS medida_volume (
                medida_volume_id INT NOT NULL AUTO_INCREMENT,
                medida_nome VARCHAR(45) NULL,
                PRIMARY KEY(medida_volume_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela unidade_comprimento
            `CREATE TABLE IF NOT EXISTS unidade_comprimento (
                unidade_comprimento_id INT NOT NULL AUTO_INCREMENT,
                unidade_nome VARCHAR(100) NULL,
                PRIMARY KEY(unidade_comprimento_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela unidade_estoque
            `CREATE TABLE IF NOT EXISTS unidade_estoque (
                unidade_estoque_id INT NOT NULL AUTO_INCREMENT,
                estoque_nome VARCHAR(45) NULL,
                PRIMARY KEY(unidade_estoque_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela fornecedor com as novas colunas
            `CREATE TABLE IF NOT EXISTS fornecedor (
            fornecedor_id INT NOT NULL AUTO_INCREMENT,
            cnpj VARCHAR(18) NULL,
            inscricao_estadual VARCHAR(14) NULL,
            razao_social VARCHAR(200) NULL,
            nome_fantasia VARCHAR(200) NULL,
            cep VARCHAR(9) NULL,
            cidade VARCHAR(150) NULL,
            bairro VARCHAR(150) NULL,
            uf VARCHAR(2) NULL,
            endereco VARCHAR(255) NULL,
            telefone VARCHAR(15) NULL,
            email VARCHAR(150) NULL,
            PRIMARY KEY(fornecedor_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela cor produto
            `CREATE TABLE IF NOT EXISTS cor_produto (
                cor_produto_id INT NOT NULL AUTO_INCREMENT,
                nome_cor_produto VARCHAR(150) NULL,
                PRIMARY KEY(cor_produto_id)
            ) ENGINE = InnoDB;`,

            // Criar Tabela produto
            `CREATE TABLE IF NOT EXISTS produto (
                produto_id INT NOT NULL AUTO_INCREMENT,
                codigo_ean BIGINT(13) NULL,
                grupo_id INT NULL,
                sub_grupo_id INT NULL,
                nome_produto VARCHAR(200) NULL,
                tamanho_letras_id INT NULL,
                tamanho_num_id INT NULL,
                unidade_massa_id INT NULL,
                medida_volume_id INT NULL,
                unidade_comprimento_id INT NULL,
                quantidade_estoque INT NULL,
                preco_compra DECIMAL(10,2) NULL,
                markup DECIMAL(5,2) NULL,
                preco_venda DECIMAL(10,2) NULL,
                unidade_estoque_id INT NULL,
                unidade_massa_qtd BIGINT NULL,
                medida_volume_qtd BIGINT NULL,
                unidade_comprimento_qtd BIGINT NULL,
                fornecedor_id INT NULL,
                caminho_img_produto VARCHAR(280) NULL,
                cor_produto_id INT NULL,
                observacoes VARCHAR(390) NULL,
                PRIMARY KEY(produto_id),
                INDEX fk_produto_categoria1_idx (grupo_id ASC) VISIBLE,
                INDEX fk_produto_setor_produto1_idx (sub_grupo_id ASC) VISIBLE,
                INDEX fk_produto_tamanho_letras1_idx (tamanho_letras_id ASC) VISIBLE,
                INDEX fk_produto_tamanho_numero1_idx (tamanho_num_id ASC) VISIBLE,
                INDEX fk_produto_unidade_massa1_idx (unidade_massa_id ASC) VISIBLE,
                INDEX fk_produto_medida_volume1_idx (medida_volume_id ASC) VISIBLE,
                INDEX fk_produto_unidade_comprimento1_idx (unidade_comprimento_id ASC) VISIBLE,
                INDEX fk_produto_unidade_estoque1_idx (unidade_estoque_id ASC) VISIBLE,
                INDEX fk_produto_fornecedor1_idx (fornecedor_id ASC) VISIBLE,
                INDEX fk_produto_cor_produto1_idx (cor_produto_id ASC) VISIBLE,
                CONSTRAINT fk_produto_categoria1
                    FOREIGN KEY (grupo_id)
                    REFERENCES gestaolite.grupo (grupo_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_setor_produto1
                    FOREIGN KEY (sub_grupo_id)
                    REFERENCES gestaolite.sub_grupo (sub_grupo_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_tamanho_letras1
                    FOREIGN KEY (tamanho_letras_id)
                    REFERENCES gestaolite.tamanho_letras (tamanho_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_tamanho_numero1
                    FOREIGN KEY (tamanho_num_id)
                    REFERENCES gestaolite.tamanho_numero (tamanho_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_unidade_massa1
                    FOREIGN KEY (unidade_massa_id)
                    REFERENCES gestaolite.unidade_massa (unidade_massa_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_medida_volume1
                    FOREIGN KEY (medida_volume_id)
                    REFERENCES gestaolite.medida_volume (medida_volume_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_unidade_comprimento1
                    FOREIGN KEY (unidade_comprimento_id)
                    REFERENCES gestaolite.unidade_comprimento (unidade_comprimento_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_unidade_estoque1
                    FOREIGN KEY (unidade_estoque_id)
                    REFERENCES gestaolite.unidade_estoque (unidade_estoque_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_fornecedor1
                    FOREIGN KEY (fornecedor_id)
                    REFERENCES gestaolite.fornecedor (fornecedor_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT fk_produto_cor_produto1
                    FOREIGN KEY (cor_produto_id)
                    REFERENCES gestaolite.cor_produto (cor_produto_id)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION
            ) ENGINE = InnoDB;`,

            // Reativar as verificações de chaves únicas e chaves estrangeiras
            `SET SQL_MODE=@OLD_SQL_MODE;`,
            `SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;`,
            `SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;`
        ];

        // Execução das queries
        for (const query of queries) {
            await connection.query(query);
        }

        console.log("Banco de dados e tabelas criados ou já existentes.");
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}


async function insertGrupo() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM grupo');
        if (existingRecords[0].count > 0) {
            console.log('As grupo de produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO grupo (nome_grupo) 
VALUES ('Geral')

ON DUPLICATE KEY UPDATE nome_grupo = VALUES(nome_grupo)
`;
        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir grupo de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};
async function insertSubGrupo() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM sub_grupo');
        if (existingRecords[0].count > 0) {
            console.log('As grupo de produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO sub_grupo (nome_sub_grupo) 
    VALUES ('Geral')
   
ON DUPLICATE KEY UPDATE nome_sub_grupo = VALUES(nome_sub_grupo)
`;
        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir sub_grupo de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function insertTamanhoLetras() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM tamanho_letras');
        if (existingRecords[0].count > 0) {
            console.log('Os tamanhos_letras dos produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO tamanho_letras (tamanho) 
    VALUES 
    ('PP'), 
    ('P'), 
    ('M'), 
    ('G'), 
    ('GG'), 
    ('XG'), 
    ('XXG')
    ON DUPLICATE KEY UPDATE tamanho = VALUES(tamanho);
`;

        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir categorias de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function insertCorProduto() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM cor_produto');
        if (existingRecords[0].count > 0) {
            console.log('As cores dos produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO cor_produto (nome_cor_produto) 
VALUES 
('Vermelho'), 
('Azul'),('Verde'), ('Amarelo'), ('Preto'), ('Branco'), ('Roxo'), ('Laranja'), 
('Rosa'), ('Marrom'), ('Cinza'), ('Ciano'), ('Magenta'), ('Lima'), ('Índigo'),
('Violeta'), ('Dourado'), ('Prata'), ('Bege'), ('Bordô')
  
    ON DUPLICATE KEY UPDATE nome_cor_produto = VALUES(nome_cor_produto);
`;

        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir cores dos produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};


async function insertTamanhoNumeros() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM tamanho_numero');
        if (existingRecords[0].count > 0) {
            console.log('Os tamanhos_numero dos produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO tamanho_numero (tamanho) 
VALUES 
    ('1'), ('2'), ('3'), ('4'), ('5'), ('6'), ('7'), ('8'), ('9'), ('10'),
    ('11'), ('12'), ('13'), ('14'), ('15'), ('16'), ('17'), ('18'), ('19'), ('20'),
    ('21'), ('22'), ('23'), ('24'), ('25'), ('26'), ('27'), ('28'), ('29'), ('30'),
    ('31'), ('32'), ('33'), ('34'), ('35'), ('36'), ('37'), ('38'), ('39'), ('40'),
    ('41'), ('42'), ('43'), ('44'), ('45'), ('46'), ('47'), ('48'), ('49'), ('50'),
    ('51'), ('52'), ('53'), ('54'), ('55'), ('56'), ('57'), ('58'), ('59'), ('60'),
    ('61'), ('62'), ('63'), ('64'), ('65'), ('66'), ('67'), ('68'), ('69'), ('70'),
    ('71'), ('72'), ('73'), ('74'), ('75'), ('76'), ('77'), ('78'), ('79'), ('80'),
    ('81'), ('82'), ('83'), ('84'), ('85'), ('86'), ('87'), ('88'), ('89'), ('90'),
    ('91'), ('92'), ('93'), ('94'), ('95'), ('96'), ('97'), ('98'), ('99'), ('100')
ON DUPLICATE KEY UPDATE tamanho = VALUES(tamanho);
`;


        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir tamanho_numero de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function insertUnidadeMassa() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM unidade_massa');
        if (existingRecords[0].count > 0) {
            console.log('As unidades_massa dos produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO unidade_massa (unidade_nome) 
    VALUES 
    ('g'), 
    ('kg'), 
    ('mg'), 
    ('lb'), 
    ('oz'), 
    ('ton')
    ON DUPLICATE KEY UPDATE unidade_nome = VALUES(unidade_nome);
`;

        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir unidade_nome de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function insertUnidadeVolume() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM medida_volume');
        if (existingRecords[0].count > 0) {
            console.log('As medida_volume dos produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO medida_volume (medida_nome) 
VALUES 
    ('ml'), 
    ('l'), 
    ('cl'), 
    ('dl'), 
    ('m³'), 
    ('cm³'), 
    ('ft³'), 
    ('in³'), 
    ('gal'), 
    ('qt'), 
    ('pt'), 
    ('cup'), 
    ('tbsp'), 
    ('tsp')
ON DUPLICATE KEY UPDATE medida_nome = VALUES(medida_nome);
`;
        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir medida_volume de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function insertUnidadeComprimento() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM unidade_comprimento');
        if (existingRecords[0].count > 0) {
            console.log('As unidade_comprimento dos produtos já foram inseridos.');
            return;
        }

        const query = `INSERT INTO unidade_comprimento (unidade_nome) 
VALUES 
    ('mm'), 
    ('cm'), 
    ('m'), 
    ('km'), 
    ('in'), 
    ('ft'), 
    ('yd'), 
    ('mi')
ON DUPLICATE KEY UPDATE unidade_nome = VALUES(unidade_nome);
`;

        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir unidade_comprimento de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function insertUnidadeEstoque() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM unidade_estoque');
        if (existingRecords[0].count > 0) {
            console.log('As unidades de estoque dos produtos já foram inseridas.');
            return;
        }

        const query = `INSERT INTO unidade_estoque (estoque_nome) 
    VALUES 
        ('un'),
        ('cx'),
        ('rolo'),
        ('pc')
        ON DUPLICATE KEY UPDATE estoque_nome = VALUES(estoque_nome);
    `;

        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir unidade de estoque de produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function insertFornecedorPadrao() {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM fornecedor');
        if (existingRecords[0].count > 0) {
            console.log('Fornecedores dos produtos já foram inseridas.');
            return;
        }

        const query = `INSERT INTO fornecedor (nome_fantasia) 
    VALUES 
        ('Fornecedor não Cadastrado')
        ON DUPLICATE KEY UPDATE nome_fantasia = VALUES(nome_fantasia);
    `;

        const [result] = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Erro ao inserir fornecedor_nome do produtos no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};


module.exports = {
    initializeDB,
    insertGrupo,
    insertSubGrupo,
    insertTamanhoLetras,
    insertTamanhoNumeros,
    insertUnidadeMassa,
    insertUnidadeVolume,
    insertUnidadeComprimento,
    insertUnidadeEstoque,
    insertFornecedorPadrao,
    insertCorProduto
};
