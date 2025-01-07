// queries.js

const pool = require('../db');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../config/.env') });
const { initializeDB, insertSubGrupo, insertGrupo, insertTamanhoLetras, insertTamanhoNumeros,
    insertUnidadeMassa, insertUnidadeVolume, insertUnidadeComprimento, insertUnidadeEstoque, insertFornecedorPadrao, insertCorProduto, insertClienteDefault

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
            await insertClienteDefault();
            console.log('Dados iniciais inseridos com sucesso.');
        } catch (error) {
            console.error('Erro ao inserir dados iniciais nas tabelas:', error);
        }
        dbTableInitialized = true;
    }
};

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
};


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
};

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
};
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
};

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
};

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
};
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
};

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
};

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
};

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
};

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
};

async function getAtivacaoMysql() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM serial_key');
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
};

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
};


async function postNewFornecedor(fornecedor) {
    await ensureDBInitialized();
    let connection;
    try {
        connection = await pool.getConnection();

        const checkQuery = 'SELECT fornecedor_id FROM fornecedor WHERE cnpj = ?';
        const [existingFornecedor] = await connection.query(checkQuery, [fornecedor.cnpj]);

        if (existingFornecedor.length > 0) {
            // Retorna uma mensagem de erro detalhada
            throw new Error('Um fornecedor com o mesmo CNPJ já existe.');
        }

        const insertQuery = `
        INSERT INTO fornecedor (
            cnpj, inscricao_estadual, razao_social, nome_fantasia,
            cep, cidade, bairro, uf, endereco,
            telefone, email, observacoes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            fornecedor.cnpj, fornecedor.inscricao_estadual || null, fornecedor.razao_social || null,
            fornecedor.nome_fantasia || null, fornecedor.cep || null, fornecedor.cidade || null,
            fornecedor.bairro || null, fornecedor.uf || null, fornecedor.endereco || null,
            fornecedor.telefone || null, fornecedor.email || null, fornecedor.observacoes || null
        ];

        const [result] = await connection.query(insertQuery, values);
        return { insertId: result.insertId };
    } catch (error) {
        console.error('Erro ao inserir o fornecedor:', error.message);

        // Envia um status de erro com uma mensagem JSON para o frontend
        throw { status: 400, message: error.message };
    } finally {
        if (connection) connection.release();
    }
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
                quantidade_vendido, 
                observacoes, 
                preco_compra, 
                markup, 
                preco_venda, 
                unidade_estoque_id, 
                fornecedor_id, 
                caminho_img_produto
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            produto.quantidade_vendido || 0,
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
};


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
};

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
};

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
            INSERT INTO venda (data_venda, cliente_id, total_liquido,valor_recebido,troco, numero_pedido) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const saleValues = [
            newSale.data_venda,
            newSale.cliente_id,
            newSale.total_liquido,
            newSale.valor_recebido,
            newSale.troco, // Define troco como 0 caso esteja indefinido ou vazio
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
};

async function fetchVenda() {
    await ensureDBInitialized();
    let connection;

    try {
        connection = await pool.getConnection(); // Obtém conexão com o banco de dados
        const [rows, fields] = await connection.query(
            'SELECT * FROM venda ORDER BY venda_id DESC LIMIT 1'
        ); // Obtém apenas a última venda
        return rows[0]; // Retorna o único resultado
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error; // Repassa o erro para o controlador
    } finally {
        if (connection) connection.release(); // Libera a conexão com o banco
    }
};


async function postAtivacao(serial_key) {
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existem registros na tabela
        const [existingRecords] = await connection.query('SELECT COUNT(*) as count FROM serial_key');
        if (existingRecords.count > 0) {
            console.log('Tabela ativado já contém registros.');
            return;
        }

        // Query para inserir os dados
        const query = `
            INSERT INTO serial_key (userID, serialKey, startedDate, expirationDate, ativado) 
            VALUES (?, ?, ?, ?, ?)
        `;

        // Converte o valor de ativado para 1 (true) ou 0 (false)


        // Executa a query com os valores
        const [result] = await connection.query(query, [
            serial_key.userID,
            serial_key.serialKey,
            serial_key.startedDate,
            serial_key.expirationDate,
            serial_key.ativado
        ]);

        console.log('Registro inserido com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao inserir MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}
async function UpdateAtivacao(serial_key) {
    let connection;
    try {
        connection = await pool.getConnection();

        // Convertendo as datas para o formato 'YYYY-MM-DD HH:MM:SS'
        const startedDate = new Date(serial_key.startedDate)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

        const expirationDate = new Date(serial_key.expirationDate)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' '); // Formato 'YYYY-MM-DD HH:MM:SS'

        // Query para atualizar apenas os campos permitidos
        const query = `
            UPDATE serial_key
            SET 
                startedDate = ?, 
                expirationDate = ?, 
                ativado = ?
            WHERE serialKey = ?
        `;

        // Executa a query com os valores
        const [result] = await connection.query(query, [
            startedDate,
            expirationDate,
            serial_key.ativado ? 1 : 0, // Converte ativado para 1 ou 0
            serial_key.serialKey // Chave de busca no WHERE
        ]);

        console.log('Registro atualizado com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar MySQL:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};


async function UpdateEstoque(produto) {
    let connection;
    try {
        connection = await pool.getConnection();

        // Query para atualizar apenas os campos permitidos
        const query = `
            UPDATE produto
            SET 
                quantidade_estoque = ?, 
                quantidade_vendido = ?
            WHERE codigo_ean = ?
        `;

        // Executa a query com os valores
        const [result] = await connection.query(query, [
            produto.quantidade_estoque,  // Valor do estoque
            produto.quantidade_vendido, // Valor da quantidade vendida
            produto.codigo_ean          // Código EAN do produto
        ]);

        console.log('Registro Estoque e qtd vendido atualizado com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar MySQL: Estoque e qtd vendido', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

async function postNewCliente(cliente) {
    await ensureDBInitialized();
    let connection;
    try {
        connection = await pool.getConnection();

        // Verifica se já existe um cliente com o mesmo CPF
        const checkQuery = 'SELECT cliente_id FROM cliente WHERE cpf = ?';
        const [existingCliente] = await connection.query(checkQuery, [cliente.cpf]);

        if (existingCliente.length > 0) {
            // Retorna uma mensagem de erro detalhada
            throw new Error('Um cliente com o mesmo CPF já existe.');
        }

        // Insere o novo cliente
        const insertQuery = `
        INSERT INTO cliente (
            nome, cpf, data_nascimento, telefone, email, cep, 
            logradouro, numero, bairro, estado, cidade, observacoes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            cliente.nome, cliente.cpf, cliente.data_nascimento || null,
            cliente.telefone || null, cliente.email || null, cliente.cep || null,
            cliente.logradouro || null, cliente.numero || null, cliente.bairro || null,
            cliente.estado || null, cliente.cidade || null, cliente.observacoes || null
        ];

        const [result] = await connection.query(insertQuery, values);
        return { insertId: result.insertId };
    } catch (error) {
        console.error('Erro ao inserir o cliente:', error.message);

        // Envia um status de erro com uma mensagem JSON para o frontend
        throw { status: 400, message: error.message };
    } finally {
        if (connection) connection.release();
    }
};


async function historicoDeVendas({ startDate, endDate, clienteNome, numeroPedido }) {
    await ensureDBInitialized(); // Certifica-se de que o banco foi inicializado
    let connection;

    try {
        connection = await pool.getConnection(); // Obtém conexão com o banco de dados

        // Construindo a cláusula WHERE dinamicamente com base nos filtros
        let whereConditions = [];
        let queryParams = [];

        // Adiciona o filtro de data de início e fim se existirem
        if (startDate && endDate) {
            whereConditions.push('v.data_venda BETWEEN ? AND ?');
            queryParams.push(startDate, endDate);
        }

        // Filtro por nome do cliente
        if (clienteNome) {
            whereConditions.push('c.nome LIKE ?');
            queryParams.push(`%${clienteNome}%`);
        }

        // Filtro por número do pedido
        if (numeroPedido) {
            whereConditions.push('v.numero_pedido = ?');
            queryParams.push(numeroPedido);
        }

        // Caso haja filtros, adiciona a cláusula WHERE à consulta
        const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

        console.log("Cláusula WHERE:", whereClause); // Log para depuração

        // Consultar o total de vendas e as formas de pagamento
        const totalQuery = `
        SELECT   
            SUM(v.total_liquido) AS total_vendas,
            fp.tipo_pagamento, 
            SUM(fp.valor) AS total_pago
        FROM 
            venda v
        LEFT JOIN 
            forma_pagamento fp ON v.venda_id = fp.venda_id
        LEFT JOIN 
            cliente c ON v.cliente_id = c.cliente_id -- Adicionado o JOIN na tabela cliente
        ${whereClause}
        GROUP BY fp.tipo_pagamento;
        `;
        
        // Consultar as vendas detalhadas
        const query = `
            SELECT 
                v.data_venda, 
                c.nome AS cliente_nome, 
                v.total_liquido,
                v.valor_recebido, 
                v.troco,
                v.numero_pedido,
                iv.produto_id,
                p.codigo_ean AS codigo_ean,
                p.nome_produto AS produto_nome,
                iv.preco,
                iv.quantidade,
                ue.estoque_nome AS unidade_estoque_nome,
                fp.tipo_pagamento, 
                fp.valor AS valor_pagamento
            FROM 
                venda v
            LEFT JOIN 
                cliente c ON v.cliente_id = c.cliente_id
            LEFT JOIN 
                item_venda iv ON v.venda_id = iv.venda_id
            LEFT JOIN 
                produto p ON iv.produto_id = p.produto_id
            LEFT JOIN 
                unidade_estoque ue ON iv.unidade_estoque_id = ue.unidade_estoque_id
            LEFT JOIN 
                forma_pagamento fp ON v.venda_id = fp.venda_id
            ${whereClause}
            ORDER BY v.data_venda DESC;
        `;
        
        console.log("Consulta detalhada:", query); // Log para depuração

        // Execute both queries: total query and detailed query without pagination
        const [totalRows] = await connection.query(totalQuery, queryParams); // Total de vendas e formas de pagamento
        const [rows] = await connection.query(query, queryParams); // Vendas detalhadas sem paginação

        return { totalRows, rows }; // Retorna os resultados da consulta
    } catch (error) {
        console.error('Erro ao conectar ao MySQL ou executar a consulta:', error);
        throw error;
    } finally {
        if (connection) connection.release(); // Libera a conexão com o banco
    }
};


async function getVendasPorNumeroVenda(numeroPedido) {
    let connection;

    try {
        connection = await pool.getConnection(); // Obtém conexão com o banco de dados

        // Consulta para buscar todos os itens de uma venda com base no numero_pedido
        const query = `
            SELECT 
            v.data_venda, 
            c.nome AS cliente_nome, 
            v.total_liquido,
            v.valor_recebido,
            v.troco,
            v.numero_pedido,
            iv.produto_id,
            p.codigo_ean,
            p.nome_produto AS produto_nome,
            iv.preco,
            iv.quantidade,
            ue.estoque_nome AS unidade_estoque_nome,
            fp.tipo_pagamento,
            fp.valor AS valor_pagamento
            FROM 
                venda v
            LEFT JOIN 
                cliente c 
            ON 
                v.cliente_id = c.cliente_id
            LEFT JOIN 
                item_venda iv
            ON 
                v.venda_id = iv.venda_id
            LEFT JOIN 
                produto p
            ON 
                iv.produto_id = p.produto_id
            LEFT JOIN 
                unidade_estoque ue
            ON 
                iv.unidade_estoque_id = ue.unidade_estoque_id
            LEFT JOIN 
                forma_pagamento fp
            ON 
                v.venda_id = fp.venda_id
            WHERE 
            v.numero_pedido = ?; 
        `;

        const [rows] = await connection.query(query, [numeroPedido]);

        return rows; // Retorna todos os itens dessa venda
    } catch (error) {
        console.error('Erro ao buscar vendas por número do pedido:', error);
        throw error;
    } finally {
        if (connection) connection.release(); // Libera a conexão
    }
}




module.exports = {
    postAtivacao,
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
    fetchVenda,
    getAtivacaoMysql,
    UpdateAtivacao,
    UpdateEstoque,
    postNewCliente,
    historicoDeVendas,
    getVendasPorNumeroVenda
};
