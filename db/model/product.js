const path = require('path');
const { initializeDB, insertSubGrupo, insertGrupo, insertTamanhoLetras, insertTamanhoNumeros,
    insertUnidadeMassa, insertUnidadeVolume, insertUnidadeComprimento, insertUnidadeEstoque, insertFornecedorPadrao, insertCorProduto, insertClienteDefault
} = require(path.join(__dirname, './initializeDB'));

// Importa a conexão com o banco de dados SQLite
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, '../gestaolite.db'), { verbose: console.log });

let dbInitialized = false;
let dbTableInitialized = false;

// Função para verificar se uma tabela já tem dados
async function hasData(tableName) {
    try {
        const row = db.prepare(`SELECT COUNT(*) AS count FROM ${tableName}`).get();
        return row.count > 0; // Retorna true se houver dados
    } catch (err) {
        console.error('Erro ao verificar dados na tabela:', err);
        throw err;
    }
}

// Função para inicializar o banco de dados
async function ensureDBInitialized() {
    if (!dbInitialized) {
        console.log('Inicializando banco de dados...');
        try {
            await initializeDB(db); // Passando a instância do banco SQLite
            dbInitialized = true;
            console.log('Banco de dados inicializado.');
        } catch (error) {
            console.error('Erro ao inicializar o banco de dados:', error);
        }
    }

    if (dbInitialized && !dbTableInitialized) {
        console.log('Verificando e inserindo dados iniciais nas tabelas...');
        try {
            // Verifica se as tabelas possuem dados antes de inserir
            const tables = [
                { name: 'grupo', insertFunc: insertGrupo },
                { name: 'sub_grupo', insertFunc: insertSubGrupo },
                { name: 'tamanho_letras', insertFunc: insertTamanhoLetras },
                { name: 'tamanho_numero', insertFunc: insertTamanhoNumeros },
                { name: 'unidade_massa', insertFunc: insertUnidadeMassa },
                { name: 'medida_volume', insertFunc: insertUnidadeVolume },
                { name: 'unidade_comprimento', insertFunc: insertUnidadeComprimento },
                { name: 'unidade_estoque', insertFunc: insertUnidadeEstoque },
                { name: 'fornecedor', insertFunc: insertFornecedorPadrao },
                { name: 'cor_produto', insertFunc: insertCorProduto },
                { name: 'cliente', insertFunc: insertClienteDefault }
            ];

            for (let table of tables) {
                const dataExists = await hasData(table.name);
                if (!dataExists) {
                    console.log(`Inserindo dados na tabela ${table.name}...`);
                    await table.insertFunc(db);
                } else {
                    console.log(`Dados na tabela ${table.name} já existem, pulando inserção.`);
                }
            }

            console.log('Dados iniciais verificados e inseridos, se necessário.');
            dbTableInitialized = true;
        } catch (error) {
            console.error('Erro ao verificar e inserir dados iniciais nas tabelas:', error);
        }
    }
}

// Fecha o banco de dados ao desligar o servidor
process.on('SIGINT', () => {
    console.log('Servidor está sendo desligado...');
    db.close();
    console.log('Banco de dados SQLite fechado com sucesso.');
    process.exit(0); // Sai do processo com sucesso
});



// Função para buscar todos os produtos
async function getAllProdutos() {
    await ensureDBInitialized();

    try {
        const rows = db.prepare('SELECT * FROM produto').all();
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados SQLite ou executar a consulta:', error);
        throw error;
    }
}


async function getFornecedor() {
    await ensureDBInitialized();

    try {
        const rows = db.prepare('SELECT * FROM fornecedor').all();
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados SQLite ou executar a consulta de fornecedor:', error);
        throw error;
    }
}

async function ensureDBInitialized() {
    // Função vazia caso a inicialização seja necessária em outro lugar
}

function getTamanhoLetras() {
    try {
        const rows = db.prepare('SELECT * FROM tamanho_letras').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getTamanhoNumeros() {
    try {
        const rows = db.prepare('SELECT * FROM tamanho_numero').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getGrupo() {
    try {
        const rows = db.prepare('SELECT * FROM grupo').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getSubGrupo() {
    try {
        const rows = db.prepare('SELECT * FROM sub_grupo').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getUnidadeMassa() {
    try {
        const rows = db.prepare('SELECT * FROM unidade_massa').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getMedidaVolume() {
    try {
        const rows = db.prepare('SELECT * FROM medida_volume').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getUnidadeComprimento() {
    try {
        const rows = db.prepare('SELECT * FROM unidade_comprimento').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getUnidadeEstoque() {
    try {
        const rows = db.prepare('SELECT * FROM unidade_estoque').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getCorProduto() {
    try {
        const rows = db.prepare('SELECT * FROM cor_produto').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function getAtivacaoMysql() {
    try {
        const rows = db.prepare('SELECT * FROM serial_key').all();
        return rows;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
}

function findProductByBarcode(barcode) {
    try {
        const rows = db.prepare('SELECT * FROM produto WHERE codigo_ean = ?').all(barcode);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
}

function postNewFornecedor(fornecedor) {
    try {
        const existingFornecedor = db.prepare('SELECT fornecedor_id FROM fornecedor WHERE cnpj = ?').get(fornecedor.cnpj);
        if (existingFornecedor) {
            throw new Error('Um fornecedor com o mesmo CNPJ já existe.');
        }

        const insertQuery = `
            INSERT INTO fornecedor (
                cnpj, inscricao_estadual, razao_social, nome_fantasia,
                cep, cidade, bairro, uf, endereco,
                telefone, email, observacoes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = db.prepare(insertQuery).run(
            fornecedor.cnpj, fornecedor.inscricao_estadual || null, fornecedor.razao_social || null,
            fornecedor.nome_fantasia || null, fornecedor.cep || null, fornecedor.cidade || null,
            fornecedor.bairro || null, fornecedor.uf || null, fornecedor.endereco || null,
            fornecedor.telefone || null, fornecedor.email || null, fornecedor.observacoes || null
        );

        return { insertId: result.lastInsertRowid };
    } catch (error) {
        console.error('Erro ao inserir fornecedor:', error.message);
        throw { status: 400, message: error.message };
    }
}

function postNewProduct(produto) {
    try {
        const existingEAN = db.prepare('SELECT produto_id FROM produto WHERE codigo_ean = ?').get(produto.codigo_ean);
        if (existingEAN) {
            throw new Error('Um produto com o mesmo código EAN já existe.');
        }

        const existingImage = db.prepare('SELECT produto_id FROM produto WHERE caminho_img_produto = ?').get(produto.caminho_img_produto);
        if (existingImage) {
            throw new Error('Já existe um produto com o mesmo caminho de imagem.');
        }

        const insertQuery = `
            INSERT INTO produto (
                codigo_ean, nome_produto, grupo_id, sub_grupo_id, tamanho_letras_id, tamanho_num_id,
                unidade_massa_qtd, unidade_massa_id, medida_volume_qtd, medida_volume_id,
                unidade_comprimento_qtd, unidade_comprimento_id, cor_produto_id, quantidade_estoque,
                quantidade_vendido, observacoes, preco_compra, markup, preco_venda, unidade_estoque_id,
                fornecedor_id, caminho_img_produto
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = db.prepare(insertQuery).run(
            produto.codigo_ean, produto.nome_produto, produto.grupo_id || null, produto.sub_grupo_id || null,
            produto.tamanho_letras_id || null, produto.tamanho_num_id || null, produto.unidade_massa_qtd || 0,
            produto.unidade_massa_id || null, produto.medida_volume_qtd || 0, produto.medida_volume_id || null,
            produto.unidade_comprimento_qtd || 0, produto.unidade_comprimento_id || null, produto.cor_produto_id || null,
            produto.quantidade_estoque || 0, produto.quantidade_vendido || 0, produto.observacoes || '',
            produto.preco_compra || 0, produto.markup || 0, produto.preco_venda || 0,
            produto.unidade_estoque_id || null, produto.fornecedor_id || null, produto.caminho_img_produto || ''
        );

        return { insertId: result.lastInsertRowid };
    } catch (error) {
        console.error('Erro ao inserir o produto:', error.message);
        throw error;
    }
}

// Função para verificar se já existe um grupo com o mesmo nome
async function postNewProductGrupo(newGrupo) {
    try {
        const checkQuery = 'SELECT grupo_id FROM grupo WHERE nome_grupo = ?';
        const existingGrupo = db.prepare(checkQuery).get(newGrupo.nome_grupo);

        if (existingGrupo) {
            throw new Error('Este Grupo com o mesmo nome já existe.');
        }

        const insertQuery = 'INSERT INTO grupo (nome_grupo) VALUES (?)';
        const result = db.prepare(insertQuery).run(newGrupo.nome_grupo);
        return result.lastInsertRowid;
    } catch (error) {
        console.error('Erro ao inserir o grupo:', error.message);
        throw error;
    }
}

// Função para verificar se já existe um sub-grupo com o mesmo nome
async function postNewProductSubGrupo(newSubGrupo) {
    try {
        const checkQuery = 'SELECT sub_grupo_id FROM sub_grupo WHERE nome_sub_grupo = ?';
        const existingSubGrupo = db.prepare(checkQuery).get(newSubGrupo.nome_sub_grupo);

        if (existingSubGrupo) {
            throw new Error('Este sub-grupo com o mesmo nome já existe.');
        }

        const insertQuery = 'INSERT INTO sub_grupo (nome_sub_grupo) VALUES (?)';
        const result = db.prepare(insertQuery).run(newSubGrupo.nome_sub_grupo);
        return result.lastInsertRowid;
    } catch (error) {
        console.error('Erro ao inserir o sub-grupo:', error.message);
        throw error;
    }
}

// Função para inserir uma nova venda
async function postNewVenda(newSale) {
    const insertSaleQuery = `
        INSERT INTO venda (data_venda, cliente_id, total_liquido, valor_recebido, troco, numero_pedido)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const insertItemQuery = `
        INSERT INTO item_venda (venda_id, produto_id, preco, quantidade, unidade_estoque_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const insertPaymentQuery = `
        INSERT INTO forma_pagamento (venda_id, tipo_pagamento, valor)
        VALUES (?, ?, ?)
    `;

    try {
        db.transaction(() => {
            const vendaResult = db.prepare(insertSaleQuery).run(
                newSale.data_venda,
                newSale.cliente_id,
                newSale.total_liquido,
                newSale.valor_recebido,
                newSale.troco || 0,
                newSale.numero_pedido
            );

            const vendaId = vendaResult.lastInsertRowid;

            newSale.itens.forEach(item => {
                db.prepare(insertItemQuery).run(
                    vendaId,
                    item.produto_id,
                    item.preco,
                    item.quantidade,
                    item.unidade_estoque_id
                );
            });

            newSale.pagamentos.forEach(pagamento => {
                db.prepare(insertPaymentQuery).run(
                    vendaId,
                    pagamento.tipo,
                    pagamento.valor
                );
            });

            return vendaId;
        })();
    } catch (error) {
        console.error('Erro ao inserir a venda:', error.message);
        throw error;
    }
}

// Função para buscar a última venda
async function fetchVenda() {
    try {
        const query = 'SELECT * FROM venda ORDER BY venda_id DESC LIMIT 1';
        return db.prepare(query).get();
    } catch (error) {
        console.error('Erro ao buscar a última venda:', error.message);
        throw error;
    }
}

// Função para verificar se um valor é válido (número, string, bigint, buffer ou null)
function isValidData(value) {
    return ['number', 'string', 'bigint'].includes(typeof value) || value === null || Buffer.isBuffer(value);
}

// Função para inserir na tabela serial_key
async function postAtivacao(serial_key) {
    try {
        console.log('Dados recebidos para ativação:', serial_key);

        // Verificar se os valores são válidos
        if (!isValidData(serial_key.userID) || !isValidData(serial_key.serialKey) || 
            !isValidData(serial_key.startedDate) || !isValidData(serial_key.expirationDate) || 
            !isValidData(serial_key.ativado)) {
            console.log('Tipos dos dados:', {
                userID: typeof serial_key.userID,
                serialKey: typeof serial_key.serialKey,
                startedDate: typeof serial_key.startedDate,
                expirationDate: typeof serial_key.expirationDate,
                ativado: typeof serial_key.ativado,
            });
            throw new Error('Dados inválidos fornecidos para a ativação.');
        }

        // Converter valor booleano para inteiro
        serial_key.ativado = serial_key.ativado ? 1 : 0;

        const countQuery = 'SELECT COUNT(*) as count FROM serial_key';
        const { count } = db.prepare(countQuery).get();

        if (count > 0) {
            console.log('Tabela ativado já contém registros.');
            return;
        }

        const query = `
            INSERT INTO serial_key (userID, serialKey, startedDate, expirationDate, ativado)
            VALUES (?, ?, ?, ?, ?)
        `;

        const result = db.prepare(query).run(
            serial_key.userID,
            serial_key.serialKey,
            serial_key.startedDate,
            serial_key.expirationDate,
            serial_key.ativado
        );

        console.log('Registro inserido com sucesso:', result.lastInsertRowid);
        return result.lastInsertRowid;
    } catch (error) {
        console.error('Erro ao inserir ativação:', error.message);
        throw error;
    }
}

// Função para atualizar dados de ativação
async function UpdateAtivacao(serial_key) {
    try {
        const query = `
            UPDATE serial_key
            SET startedDate = ?, expirationDate = ?, ativado = ?
            WHERE serialKey = ?
        `;

        const result = db.prepare(query).run(
            serial_key.startedDate,
            serial_key.expirationDate,
            serial_key.ativado ? 1 : 0,
            serial_key.serialKey
        );

        console.log('Registro atualizado com sucesso:', result.changes);
        return result.changes;
    } catch (error) {
        console.error('Erro ao atualizar MySQL:', error.message);
        throw error;
    }
}

// Função para atualizar o estoque de um produto
async function UpdateEstoque(produto) {
    try {
        const query = `
            UPDATE produto
            SET quantidade_estoque = ?, quantidade_vendido = ?
            WHERE codigo_ean = ?
        `;

        const result = db.prepare(query).run(
            produto.quantidade_estoque,
            produto.quantidade_vendido,
            produto.codigo_ean
        );

        console.log('Registro Estoque e qtd vendido atualizado com sucesso:', result.changes);
        return result.changes;
    } catch (error) {
        console.error('Erro ao atualizar MySQL:', error.message);
        throw error;
    }
}

// Função para atualizar valores de um produto
async function UpdateValores(produto) {
    try {
        const query = `
            UPDATE produto
            SET preco_compra = ?, markup = ?, preco_venda = ?
            WHERE codigo_ean = ?
        `;

        const result = db.prepare(query).run(
            produto.preco_compra,
            produto.markup,
            produto.preco_venda,
            produto.codigo_ean
        );

        console.log('Registro valores atualizado com sucesso:', result.changes);
        return result.changes;
    } catch (error) {
        console.error('Erro ao atualizar MySQL:', error.message);
        throw error;
    }
}


async function postNewCliente(cliente) {
    
    await ensureDBInitialized();

    try {
        // Verifica se já existe um cliente com o mesmo CPF
        const row = await db.get('SELECT cliente_id FROM cliente WHERE cpf = ?', [cliente.cpf]);
        if (row) {
            throw new Error('Um cliente com o mesmo CPF já existe.');
        }

        const insertQuery = `
            INSERT INTO cliente (nome, cpf, data_nascimento, telefone, email, cep, 
            logradouro, numero, bairro, estado, cidade, observacoes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            cliente.nome, cliente.cpf, cliente.data_nascimento || null,
            cliente.telefone || null, cliente.email || null, cliente.cep || null,
            cliente.logradouro || null, cliente.numero || null, cliente.bairro || null,
            cliente.estado || null, cliente.cidade || null, cliente.observacoes || null
        ];

        const { lastID } = await db.run(insertQuery, values);
        return { insertId: lastID };
    } catch (err) {
        console.error('Erro ao inserir cliente:', err);
        throw err;
    } 
}

async function historicoDeVendas({ startDate, endDate, clienteNome, numeroPedido }) {
   
    await ensureDBInitialized();

    try {
        let whereConditions = [];
        let queryParams = [];

        if (startDate && endDate) {
            whereConditions.push('v.data_venda BETWEEN ? AND ?');
            queryParams.push(startDate, endDate);
        }
        if (clienteNome) {
            whereConditions.push('c.nome LIKE ?');
            queryParams.push(`%${clienteNome}%`);
        }
        if (numeroPedido) {
            whereConditions.push('v.numero_pedido = ?');
            queryParams.push(numeroPedido);
        }

        const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

        const totalQuery = `
            SELECT SUM(v.total_liquido) AS total_vendas, fp.tipo_pagamento, SUM(fp.valor) AS total_pago
            FROM venda v
            LEFT JOIN forma_pagamento fp ON v.venda_id = fp.venda_id
            LEFT JOIN cliente c ON v.cliente_id = c.cliente_id
            ${whereClause}
            GROUP BY fp.tipo_pagamento;
        `;

        const query = `
            SELECT v.data_venda, c.nome AS cliente_nome, v.total_liquido,
            v.valor_recebido, v.troco, v.numero_pedido, iv.produto_id,
            p.codigo_ean AS codigo_ean, p.nome_produto AS produto_nome, iv.preco, iv.quantidade,
            ue.estoque_nome AS unidade_estoque_nome, fp.tipo_pagamento, fp.valor AS valor_pagamento
            FROM venda v
            LEFT JOIN cliente c ON v.cliente_id = c.cliente_id
            LEFT JOIN item_venda iv ON v.venda_id = iv.venda_id
            LEFT JOIN produto p ON iv.produto_id = p.produto_id
            LEFT JOIN unidade_estoque ue ON iv.unidade_estoque_id = ue.unidade_estoque_id
            LEFT JOIN forma_pagamento fp ON v.venda_id = fp.venda_id
            ${whereClause}
            ORDER BY v.data_venda DESC;
        `;

        const totalRows = await db.all(totalQuery, queryParams);
        const rows = await db.all(query, queryParams);

        return { totalRows, rows };
    } catch (err) {
        console.error('Erro ao consultar histórico de vendas:', err);
        throw err;
    }
}

async function getVendasPorNumeroVenda(numeroPedido) {
    try {
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
                cliente c ON v.cliente_id = c.cliente_id
            LEFT JOIN 
                item_venda iv ON v.venda_id = iv.venda_id
            LEFT JOIN 
                produto p ON iv.produto_id = p.produto_id
            LEFT JOIN 
                unidade_estoque ue ON iv.unidade_estoque_id = ue.unidade_estoque_id
            LEFT JOIN 
                forma_pagamento fp ON v.venda_id = fp.venda_id
            WHERE 
                v.numero_pedido = ?;
        `;

        // Use .all() com `better-sqlite3`
        const rows = db.prepare(query).all(numeroPedido);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar vendas por número do pedido:', error);
        throw error;
    }
}


// Função para inserir controle de estoque
async function postControleEstoque(controleEstoque) {
    try {
        // Verifica se o controle_estoque com o mesmo controle_estoque_id já existe
        const checkQuery = 'SELECT controle_estoque_id FROM controle_estoque WHERE controle_estoque_id = ?';
        const row = db.prepare(checkQuery).get(controleEstoque.controle_estoque_id);
        
        if (row) {
            throw new Error('Um controle_estoque com o mesmo controle_estoque_id já existe.');
        } 

        const insertQuery = `
            INSERT INTO controle_estoque (
                produto_id,
                qtde_movimentada,
                preco_compra_anterior,
                preco_compra_atual,
                preco_markup_anterior,
                preco_markup_atual,
                preco_venda_anterior,
                preco_venda_atual,
                situacao_movimento,
                motivo_movimentacao,
                numero_compra_fornecedor,
                venda_id,
                data_movimentacao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const stmt = db.prepare(insertQuery);
        const result = stmt.run(
            controleEstoque.produto_id,
            controleEstoque.qtde_movimentada,
            controleEstoque.preco_compra_anterior,
            controleEstoque.preco_compra_atual,
            controleEstoque.preco_markup_anterior || null,
            controleEstoque.preco_markup_atual || null,
            controleEstoque.preco_venda_anterior,
            controleEstoque.preco_venda_atual,
            controleEstoque.situacao_movimento,
            controleEstoque.motivo_movimentacao,
            controleEstoque.numero_compra_fornecedor || null,
            controleEstoque.venda_id || null,
            controleEstoque.data_movimentacao
        );

        return { insertId: result.lastInsertRowid };
    } catch (error) {
        console.error('Erro ao inserir no controle_estoque:', error.message);
        throw { status: 400, message: error.message };
    }
};

// Função para inserir uma nova cor de produto
async function postNewCor(newCor) {
    try {
        // Verifica se já existe uma cor com o mesmo nome
        const checkQuery = 'SELECT cor_produto_id FROM cor_produto WHERE nome_cor_produto = ?';
        const row = db.prepare(checkQuery).get(newCor.nome_cor_produto);
        
        if (row) {
            throw new Error('Esta cor com o mesmo nome já existe.');
        }

        const insertQuery = 'INSERT INTO cor_produto (nome_cor_produto) VALUES (?)';
        const stmt = db.prepare(insertQuery);
        const result = stmt.run(newCor.nome_cor_produto);
        
        return result.lastInsertRowid;
    } catch (error) {
        console.error('Erro ao inserir a cor de produto:', error.message);
        throw error;
    }
};


module.exports = {
    ensureDBInitialized,
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
    postNewVenda,
    fetchVenda,
    getAtivacaoMysql,
    UpdateAtivacao,
    UpdateEstoque,
    postNewCliente,
    historicoDeVendas,
    getVendasPorNumeroVenda,
    postControleEstoque,
    UpdateValores,
    postNewCor
};
