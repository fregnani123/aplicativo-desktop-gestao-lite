// queries.js

const pool = require('../db');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const { initializeDB, insertSubGrupo, insertGrupo, insertTamanhoLetras, insertTamanhoNumeros,
    insertUnidadeMassa, insertUnidadeVolume, insertUnidadeComprimento, insertUnidadeEstoque, insertFornecedorPadrao, insertCorProduto

} = require(path.join(__dirname, './initializeDB'));


let dbInitialized = false;
let dbTableInitialized = false;

async function ensureDBInitialized() {
    if (!dbInitialized) {
        console.log('Inicializando banco de dados...');
        await initializeDB(); // Inicializa o banco de dados apenas uma vez
        dbInitialized = true;
        console.log('Banco de dados inicializado.');
    }
    if (!dbTableInitialized) {
        console.log('Inserindo dados iniciais nas tabelas...');
        try {
            await insertGrupo();
            await insertSubGrupo();
            await insertTamanhoLetras();
            await insertTamanhoNumeros();
            await insertUnidadeMassa();
            await insertUnidadeVolume();
            await insertUnidadeComprimento();
            await insertUnidadeEstoque();
            await insertFornecedorPadrao();
            await insertCorProduto();
            console.log('Dados iniciais inseridos com sucesso.');
        } catch (error) {
            console.error('Erro ao inserir dados iniciais nas tabelas:', error);
        }
        dbTableInitialized = true;
    }
}

async function getAllProdutos() {
    await ensureDBInitialized();

    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM produto');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}


async function getFornecedor() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM fornecedor');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

async function getTamanhoLetras() {
    await ensureDBInitialized();
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM tamanho_letras');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}
async function getTamanhoNumeros() {
    await ensureDBInitialized();
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM tamanho_numero');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

async function getGrupo() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM grupo');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}

async function getSubGrupo() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM sub_grupo');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}
async function getUnidadeMassa() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM unidade_massa');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}

async function getMedidaVolume() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM medida_volume');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}

async function getUnidadeComprimento() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM unidade_comprimento');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}

async function getUnidadeEstoque() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM unidade_estoque');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}

async function getCorProduto() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM cor_produto');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}

async function findProductByBarcode(barcode) {
    await ensureDBInitialized();
    let connection;
    try {
        connection = await pool.getConnection();
        const query = 'SELECT * FROM produto WHERE codigo_ean = ?';
        const [rows, fields] = await connection.query(query, [barcode]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar produto no MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

async function postNewFornecedor(fornecedor) {
    await ensureDBInitialized();
    let connection;
    try {
        // Obtém uma conexão do pool
        connection = await pool.getConnection();

        // Verifica se já existe um produto com o mesmo código EAN
        const checkQuery = 'SELECT fornecedor_id FROM fornecedor WHERE cnpj = ?';
        const [existingProduct] = await connection.query(checkQuery, [fornecedor.cnpj]);

        if (existingProduct.length > 0) {
            // Se o fornecedor já existir, lance um erro ou retorne uma mensagem
            throw new Error('Um fornecedor com o mesmo cnpj já existe.');
        }

        const insertQuery = `
        INSERT INTO fornecedor (
        cnpj,
        inscricao_estadual,
        razao_social,
        nome_fantasia,
        cep,
        cidade,
        bairro,
        uf,
        endereco,
        telefone,
        email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            fornecedor.cnpj,
            fornecedor.inscricao_estadual || null, // Use null se o valor for vazio ou indefinido
            fornecedor.razao_social || null, // Use null se o valor for vazio ou indefinido,
            fornecedor.razao_social,
            fornecedor.cep || null, // Use null se o valor for vazio ou indefinido,
            fornecedor.cidade || null, // Use null se o valor for vazio ou indefinido,
            fornecedor.bairro || null, // Use null se o valor for vazio ou indefinido,
            fornecedor.uf || null, // Use null se o valor for vazio ou indefinido,
            fornecedor.endereco || null, // Use null se o valor for vazio ou indefinido,
            fornecedor.telefone || null, // Use null se o valor for vazio ou indefinido,
            fornecedor.email || null // Use null se o valor for vazio ou indefinido
        ];

        const [result] = await connection.query(insertQuery, values);

        // Retorne o ID do novo produto inserido ou uma confirmação
        return result.insertId;

    } catch (error) {
        console.error('Erro ao inserir o fornecedor:', error.message);
        throw error;
    } finally {
        if (connection) connection.release();
    };

}


async function postNewProduct(produto) {
    await ensureDBInitialized();
    let connection;
    try {
        // Obtém uma conexão do pool
        connection = await pool.getConnection();

        // Verifica se já existe um produto com o mesmo código EAN
        const checkEANQuery = 'SELECT produto_id FROM produto WHERE codigo_ean = ?';
        const [existingEAN] = await connection.query(checkEANQuery, [produto.codigo_ean]);

        if (existingEAN.length > 0) {
            throw new Error('Um produto com o mesmo código EAN já existe.');
        }

        // Verifica se já existe um produto com o mesmo caminho de imagem
        const checkImageQuery = 'SELECT produto_id FROM produto WHERE caminho_img_produto = ?';
        const [existingImage] = await connection.query(checkImageQuery, [produto.caminho_img_produto]);

        if (existingImage.length > 0) {
            throw new Error('Já existe um produto com o mesmo caminho de imagem.');
        }

        // Insere o novo produto
        const insertQuery = `
            INSERT INTO produto (
                codigo_ean, 
                nome_produto, 
                grupo_id, 
                sub_grupo_id, 
                tamanho_letras_id, 
                tamanho_num_id, 
                unidade_massa_qtd, 
                unidade_massa_id, 
                medida_volume_qtd, 
                medida_volume_id, 
                unidade_comprimento_qtd, 
                unidade_comprimento_id, 
                cor_produto_id, 
                quantidade_estoque, 
                observacoes, 
                preco_compra, 
                markup, 
                preco_venda, 
                unidade_estoque_id, 
                fornecedor_id, 
                caminho_img_produto
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            produto.codigo_ean,
            produto.nome_produto,
            produto.grupo_id || null,
            produto.sub_grupo_id || null,
            produto.tamanho_letras_id || null,
            produto.tamanho_num_id || null,
            produto.unidade_massa_qtd || 0,
            produto.unidade_massa_id || null,
            produto.medida_volume_qtd || 0,
            produto.medida_volume_id || null,
            produto.unidade_comprimento_qtd || 0,
            produto.unidade_comprimento_id || null,
            produto.cor_produto_id || null,
            produto.quantidade_estoque || 0,
            produto.observacoes || '',
            produto.preco_compra || 0,
            produto.markup || 0,
            produto.preco_venda || 0,
            produto.unidade_estoque_id || null,
            produto.fornecedor_id || null,
            produto.caminho_img_produto || ''
        ];

        const [result] = await connection.query(insertQuery, values);

        // Retorne o ID do novo produto inserido
        return result.insertId;
    } catch (error) {
        console.error('Erro ao inserir o produto:', error.message);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}


async function postNewProductGrupo(newGrupo) {
    await ensureDBInitialized();
    let connection;
    try {
        // Obtém uma conexão do pool
        connection = await pool.getConnection();

        // Verifica se já existe um grupo com o mesmo nome
        const checkQuery = 'SELECT grupo_id FROM grupo WHERE nome_grupo = ?';
        const [existingGrupo] = await connection.query(checkQuery, [newGrupo.nome_grupo]);

        if (existingGrupo.length > 0 || '') {
            // Se o grupo já existir, lance um erro ou retorne uma mensagem

            throw new Error('Este Grupo com o mesmo nome já existe.');
        }
    }
    catch (error) {
        console.error('Erro ao inserir o grupo:', error.message);
        throw error;
    } finally {
        if (connection) connection.release();
    }
    const insertQuery = `
    INSERT INTO grupo (
        nome_grupo
    ) VALUES (?)
`;
    const values = [
        newGrupo.nome_grupo
    ];

    const [result] = await connection.query(insertQuery, values);
    return result.insertId;
}

async function postNewProductSubGrupo(newSubGrupo) {
    await ensureDBInitialized();
    let connection;
    try {
        // Obtém uma conexão do pool
        connection = await pool.getConnection();

        // Verifica se já existe um grupo com o mesmo nome
        const checkQuery = 'SELECT sub_grupo_id FROM sub_grupo WHERE nome_sub_grupo = ?';
        const [existingSubGrupo] = await connection.query(checkQuery, [newSubGrupo.nome_sub_grupo]);

        if (existingSubGrupo.length > 0 || '') {
            // Se o sub-grupo já existir, lance um erro ou retorne uma mensagem

            throw new Error('Este sub-grupo com o mesmo nome já existe.');
        }
    }
    catch (error) {
        console.error('Erro ao inserir o sub-grupo:', error.message);
        throw error;
    } finally {
        if (connection) connection.release();
    }
    const insertQuery = `
    INSERT INTO sub_grupo (
        nome_sub_grupo
    ) VALUES (?)
`;
    const values = [
        newSubGrupo.nome_sub_grupo
    ];

    const [result] = await connection.query(insertQuery, values);
    return result.insertId;
}

async function postNewSale(newSale) {
    await ensureDBInitialized();
    let connection;

    try {
        // Obtém uma conexão do pool
        connection = await pool.getConnection();

        // Verifica se a venda já existe com o mesmo número de pedido (opcional)
        const checkQuery = 'SELECT venda_id FROM venda WHERE numero_pedido = ?';
        const [existingSale] = await connection.query(checkQuery, [newSale.numero_pedido]);

        if (existingSale.length > 0) {
            // Se a venda com o mesmo número de pedido já existir, lance um erro ou retorne uma mensagem
            throw new Error('Venda com este número de pedido já existe.');
        }

        // Inicia a transação para garantir que todos os dados sejam inseridos com sucesso
        await connection.beginTransaction();

        // Inserir dados na tabela `venda`
        const insertSaleQuery = `
            INSERT INTO venda (data_venda, cliente_id, total_liquido, numero_pedido) 
            VALUES (?, ?, ?, ?)
        `;
        const saleValues = [
            newSale.data_venda,
            newSale.cliente_id,
            newSale.total_liquido,
            newSale.numero_pedido
        ];

        const [saleResult] = await connection.query(insertSaleQuery, saleValues);
        const vendaId = saleResult.insertId;

        // Inserir os itens da venda na tabela `item_venda`
        for (const item of newSale.itens) {
            const insertItemQuery = `
                INSERT INTO item_venda (venda_id, produto_id, preco, quantidade, unidade_estoque_id) 
                VALUES (?, ?, ?, ?, ?)
            `;
            const itemValues = [
                vendaId,
                item.produto_id,
                item.preco,
                item.quantidade,
                item.unidade_estoque_id
            ];
            await connection.query(insertItemQuery, itemValues);
        }

        // Inserir as formas de pagamento na tabela `forma_pagamento`
        for (const pagamento of newSale.pagamentos) {
            const insertPaymentQuery = `
                INSERT INTO forma_pagamento (venda_id, tipo_pagamento, valor) 
                VALUES (?, ?, ?)
            `;
            const paymentValues = [
                vendaId,
                pagamento.tipo,
                pagamento.valor
            ];
            await connection.query(insertPaymentQuery, paymentValues);
        }

        // Commit a transação
        await connection.commit();

        // Retorna o ID da venda recém-criada
        return vendaId;

    } catch (error) {
        // Se houver erro, faz o rollback da transação
        if (connection) await connection.rollback();
        console.error('Erro ao inserir a venda:', error.message);
        throw error;
    } finally {
        // Libera a conexão
        if (connection) connection.release();
    }
}

async function fetchVenda() {
    await ensureDBInitialized(); // Certifica-se de que o banco foi inicializado
    let connection;

    try {
        connection = await pool.getConnection(); // Obtém conexão com o banco de dados
        const [rows, fields] = await connection.query(
            'SELECT * FROM venda'
        ); // Executa a consulta SQL
        return rows; // Retorna os resultados da consulta
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error; // Repassa o erro para o controlador
    } finally {
        if (connection) connection.release(); // Libera a conexão com o banco
    }
}


module.exports = {
    getAllProdutos,
    getFornecedor,
    findProductByBarcode,
    getGrupo,
    getSubGrupo,
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
    fetchVenda
};
