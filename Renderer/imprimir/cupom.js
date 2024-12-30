function gerarImpressaoVenda() {
    const nomeFantasia = 'NOME DE FANTASIA';
    const razaoSocial = 'NOME RAZAO SOCIAL COM. INFORMÁTICA LTDA-ME';
    const endereco = 'Rua Avenida Sete de Setembro - Edificio Comercial 1010';
    const localizacao = 'Centro - 88820-000 - Içara/SC';
    const contato = '(48) 9999999990';
    const cnpj = '80.907.585/0001-67';
    const IE = '388.108.598.269';
    const cliente = 'Consumidor Final';
    const data = '29/12/2024';
    const numeroVenda = '001';
    const itensVenda = [
        { codigo: '7897897891231', descricao: 'Leitor Código de Barras S/fio', quantidade: '2 un', valor: '80,00' }
    ];
    const totalNota = '80,00';
    const valorRecebido = '100,00';
    const troco = '20,00';
    const formaPgto = 'À VISTA';
    const dataPgto = '29/12/2024';
    const vendedor = 'Vendedor 1';

    // Criação do estilo
    const style = document.createElement('style');
    style.innerHTML = `
        #impressaoCupom {
            font-family: Arial, sans-serif;
            margin: 0 auto;
            width: 21cm;
            padding: 2cm;
            box-sizing: border-box;
            position: absolute;
            background-color: white;
        }

        #impressaoCupom .cabecalho {
            text-align: center;
            margin-bottom: 1cm;
        }

        #impressaoCupom .cabecalho h1 {
            margin: 0;
            font-size: 18px;
        }

        #impressaoCupom .cabecalho p {
            margin: 2px 0;
        }

        #impressaoCupom .itens-venda {
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 0.5cm 0;
            margin-bottom: 1cm;
        }

        #impressaoCupom .itens-venda .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        #impressaoCupom .rodape {
            text-align: center;
            border-top: 1px dashed #000;
            padding-top: 1cm;
        }

        #impressaoCupom .rodape p {
            margin: 0;
        }
    `;
    document.head.appendChild(style);

    // Criação do layout HTML
    const impressaoCupom = document.createElement('div');
    impressaoCupom.id = 'impressaoCupom';

    impressaoCupom.innerHTML = `
        <div class="cabecalho">
            <h1>${nomeFantasia}</h1>
            <p>Razão Social: ${razaoSocial}</p>
            <p>Endereço: ${endereco}</p>
            <p>Localização: ${localizacao}</p>
            <p>Contato: ${contato}</p>
            <p>CNPJ: ${cnpj} | IE: ${IE}</p>
        </div>
        <div>
            <p>Cliente: ${cliente}</p>
            <p>Data: ${data}</p>
            <p>Venda Nº: ${numeroVenda}</p>
        </div>
        <div class="itens-venda">
            ${itensVenda.map(item => `
                <div class="item">
                    <span>Código: ${item.codigo}</span>
                    <span>${item.descricao}</span>
                    <span>${item.quantidade} x R$ ${item.valor}</span>
                </div>
            `).join('')}
        </div>
        <div>
            <p>Total da Nota: R$ ${totalNota}</p>
            <p>Valor Recebido: R$ ${valorRecebido}</p>
            <p>Troco: R$ ${troco}</p>
            <p>Forma de Pagamento: ${formaPgto}</p>
            <p>Data do Pagamento: ${dataPgto}</p>
            <p>Vendedor: ${vendedor}</p>
        </div>
        <div class="rodape">
            <p>Obrigado pela preferência!</p>
            <p>Emitido em: ${data}</p>
        </div>
    `;

    // Adiciona ao body
    document.body.appendChild(impressaoCupom);
}

// Chamada da função para gerar a impressão
// gerarImpressaoVenda();
