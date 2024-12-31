function getUltimoPedidoImprimir(numero_pedido_imprimir) {
    const ultimoPedidoImprimir = `http://localhost:3000/getVendaPorNumeroPedido/${numero_pedido_imprimir}`;

    fetch(ultimoPedidoImprimir)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const nomeFantasia = 'NEW SUN SHINE SHOP SERVICE';
            const razaoSocial = 'impressões. -informática.';
            const endereco = 'R. Henrique Lage - 222';
            const localizacao = 'Centro - 88820-000 - Içara/SC';
            const contato = '(48) 3432-5672';
            const cnpj = '07.833.865/0001-88';
            const IE = '';
            const cliente = data[0].cliente_nome;
            const dataVenda = data[0].data_venda;
            const numeroVenda = data[0].numero_pedido;
            const totalNota = data[0].total_liquido;
            const valorRecebido = data[0].valor_recebido;
            const troco = data[0].troco;
            const formaPgto = data[0].tipo_pagamento;
            const dataPgto = data[0].data_venda;
            const vendedor = 'Vendedor 1';

            // Títulos das colunas, renderizados apenas uma vez
            const titulosItens = `
                <div style="display: flex; flex-direction: row; justify-content: left; margin-bottom: 5px; gap: 10px;">
                    <span style="flex: 1; text-align: left;">CÓDIGO</span>
                    <span style="flex: 2; text-align: left;">DESCRIÇÃO</span>
                    <span style="flex: 1; text-align: right;">VALOR R$</span>
                </div>
            `;

            // Itens da venda, renderizados dinamicamente
            const itensVenda = data.map(venda => `
                <div style="display: flex; flex-direction: row; justify-content: left; margin-bottom: 5px; gap: 10px;">
                    <span style="flex: 1; text-align: left;">${venda.codigo_ean}</span>
                    <span style="flex: 2; text-align: left;">${venda.produto_nome}</span>
                    <span style="flex: 1; text-align: right;">${venda.quantidade} ${venda.unidade_estoque_nome} x R$ ${parseFloat(venda.preco).toFixed(2)}</span>
                </div>
            `).join('');

            const htmlContent = `
                <html>
                <head>
                    <style>
                        @media print {
                            @page {
                                margin: 0;
                            }
                            body {
                                margin: 0;
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                            }
                            body::before, body::after {
                                display: none !important;
                            }
                            .cupom {
                                width: 21cm;
                                padding: 1cm;
                                background-color: #fff;
                                margin: 0 auto;
                                font-size: 12px;
                                border-top: 1px dashed #000;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .cabecalho {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .cabecalho h1 {
                                font-size: 18px;
                                margin: 0;
                            }
                            .dados {
                                margin-bottom: 15px;
                            }
                            .itens-venda {
                                margin-top: 10px;
                                border-top: 1px dashed #000;
                                padding-top: 5px;
                            }
                            .itens-venda div {
                                display: flex;
                                justify-content:left;
                                padding: 5px 0;
                            }
                            .itens-venda span {
                                font-size: 12px;
                            }
                            .total {
                                margin-top: 15px;
                                font-weight: bold;
                            }
                            .total div {
                                display: flex;
                                gap: 5px;
                                padding: 5px 0;
                            }
                            .rodape {
                                text-align: center;
                                font-size: 12px;
                                margin-top: 0px;
                                border-top: 1px dashed #000;
                                padding-top: 0px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="cupom">
                        <div class="cabecalho">
                            <h1>${nomeFantasia}</h1>
                            <p>${razaoSocial}</p>
                            <p>${endereco}</p>
                            <p>${localizacao}</p>
                            <p>Contato: ${contato}</p>
                            <p>CNPJ: ${cnpj} | IE: ${IE}</p>
                        </div>
                        <div class="dados">
                            <p><strong>Cliente:</strong> ${cliente}</p>
                            <p><strong>Data:</strong> ${dataVenda}</p>
                            <p><strong>Venda Nº:</strong> ${numeroVenda}</p>
                        </div>
                        <div class="itens-venda">
                            ${titulosItens}
                            ${itensVenda}
                        </div>
                        <div class="total">
                            <div>
                                <span><strong>Total da Nota:</strong></span>
                                <span>R$ ${totalNota}</span>
                            </div>
                            <div>
                                <span><strong>Valor Recebido:</strong></span>
                                <span>R$ ${valorRecebido}</span>
                            </div>
                            <div>
                                <span><strong>Troco:</strong></span>
                                <span>R$ ${troco}</span>
                            </div>
                            <div>
                                <span><strong>Forma de Pagamento:</strong></span>
                                <span>${formaPgto}</span>
                            </div>
                            <div>
                                <span><strong>Data do Pagamento:</strong></span>
                                <span>${dataPgto}</span>
                            </div>
                            <div>
                                <span><strong>Vendedor:</strong></span>
                                <span>${vendedor}</span>
                            </div>
                        </div>
                        <div class="rodape">
                            <p class="rodape-p">Sempre fazendo o melhor para nossos clientes! <br/> Emitido em: ${dataVenda}</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0px';
            iframe.style.height = '0px';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            const doc = iframe.contentWindow.document;
            doc.open();
            doc.write(htmlContent);
            doc.close();

            iframe.contentWindow.focus();
            iframe.contentWindow.print();

            iframe.contentWindow.onafterprint = () => {
                document.body.removeChild(iframe);
            };

            setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 1000);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}






// function getUltimoPedidoImprimir(numero_pedido_imprimir) {
//     const ultimoPedidoImprimir = `http://localhost:3000/getVendaPorNumeroPedido/${numero_pedido_imprimir}`;

//     fetch(ultimoPedidoImprimir)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const nomeFantasia = 'NEW SUN SHINE SHOP SERVICE';
//             const razaoSocial = '';
//             const endereco = 'R. Henrique Lage - 222';
//             const localizacao = 'Centro - 88820-000 - Içara/SC';
//             const contato = '(48) 3432-5672';
//             const cnpj = '07.833.865/0001-88';
//             const IE = '';
//             const cliente = data[0].cliente_nome;
//             const dataVenda = data[0].data_venda;
//             const numeroVenda = data[0].numero_pedido;
//             const totalNota = data[0].total_liquido;
//             const valorRecebido = data[0].valor_recebido;
//             const troco = data[0].troco;
//             const formaPgto = data[0].tipo_pagamento;
//             const dataPgto = data[0].data_venda;
//             const vendedor = 'Vendedor 1';
//             const itensVenda = data.map(venda => `
//                 <div style="display: flex; flex-direction: row; justify-content: left; margin-bottom: 5px; gap: 10px;">
//     <span style="flex: 1; text-align: left;">CÓDIGO</span>
//     <span style="flex: 2; text-align: left;">DESCRIÇÃO</span>
//     <span style="flex: 1; text-align: right;">VALOR R$</span>
// </div>
// <div style="display: flex; flex-direction: row; justify-content: left; margin-bottom: 5px; gap: 10px;">
//     <span style="flex: 1; text-align: left;">${venda.codigo_ean}</span>
//     <span style="flex: 2; text-align: left;">${venda.produto_nome}</span>
//     <span style="flex: 1; text-align: right;">${venda.quantidade} ${venda.unidade_estoque_nome} x R$ ${parseFloat(venda.preco).toFixed(2)}</span>
// </div>
//             `).join('');

//             const htmlContent = `
//                 <html>
//                 <head>
//                     <style>
//                         @media print {
//                             @page {
//                                 margin: 0; /* Remove margens da página */
//                             }
//                             body {
//                                 margin: 0;
//                                 font-family: Arial, sans-serif;
//                                 background-color: #f4f4f4;
//                             }
//                             /* Esconde cabeçalhos padrão de impressão */
//                             body::before, 
//                             body::after {
//                                 display: none !important;
//                             }
//                             .cupom {
//                                 width: 21cm;
//                                 padding: 1cm;
//                                 background-color: #fff;
//                                 margin: 0 auto;
//                                 font-size: 12px;
//                                 border-top: 1px dashed #000;
//                                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                             }
//                             .cabecalho {
//                                 text-align: center;
//                                 margin-bottom: 20px;
//                             }
//                             .cabecalho h1 {
//                                 font-size: 18px;
//                                 margin: 0;
//                             }
//                             .dados {
//                                 margin-bottom: 15px;
//                             }
//                             .itens-venda {
//                                 margin-top: 10px;
//                                 border-top: 1px dashed #000;
//                                 padding-top: 5px;
//                             }
//                             .itens-venda div {
//                                 display: flex;
//                                 justify-content:left;
//                                 padding: 5px 0;
//                             }
//                             .itens-venda span {
//                                 font-size: 12px;
//                             }
//                             .total {
//                                 margin-top: 15px;
//                                 font-weight: bold;
//                             }
//                             .total div {
//                                 display: flex;
//                                 gap: 5px;
//                                 padding: 5px 0;
//                             }
//                             .rodape {
//                                 text-align: center;
//                                 font-size: 12px;
//                                 margin-top: 0px;
//                                 border-top: 1px dashed #000;
//                                 padding-top: 0px;
//                             }
                        
//                         }
//                     </style>
//                 </head>
//                 <body>
//                     <div class="cupom">
//                         <div class="cabecalho">
//                             <h1>${nomeFantasia}</h1>
//                             <p>${razaoSocial}</p>
//                             <p>${endereco}</p>
//                             <p>${localizacao}</p>
//                             <p>Contato: ${contato}</p>
//                             <p>CNPJ: ${cnpj} | IE: ${IE}</p>
//                         </div>
//                         <div class="dados">
//                             <p><strong>Cliente:</strong> ${cliente}</p>
//                             <p><strong>Data:</strong> ${dataVenda}</p>
//                             <p><strong>Venda Nº:</strong> ${numeroVenda}</p>
//                         </div>
//                         <div class="itens-venda">
//                             ${itensVenda}
//                         </div>
//                         <div class="total">
//                             <div>
//                                 <span><strong>Total da Nota:</strong></span>
//                                 <span>R$ ${totalNota}</span>
//                             </div>
//                             <div>
//                                 <span><strong>Valor Recebido:</strong></span>
//                                 <span>R$ ${valorRecebido}</span>
//                             </div>
//                             <div>
//                                 <span><strong>Troco:</strong></span>
//                                 <span>R$ ${troco}</span>
//                             </div>
//                             <div>
//                                 <span><strong>Forma de Pagamento:</strong></span>
//                                 <span>${formaPgto}</span>
//                             </div>
//                             <div>
//                                 <span><strong>Data do Pagamento:</strong></span>
//                                 <span>${dataPgto}</span>
//                             </div>
//                             <div>
//                                 <span><strong>Vendedor:</strong></span>
//                                 <span>${vendedor}</span>
//                             </div>
//                         </div>
//                         <div class="rodape">
//                             <p class="rodape-p">Obrigado pela preferência! <br/> Emitido em: ${dataVenda}</p>
                         
//                         </div>
//                     </div>
//                 </body>
//                 </html>
//             `;

//             const iframe = document.createElement('iframe');
//             iframe.style.position = 'absolute';
//             iframe.style.width = '0px';
//             iframe.style.height = '0px';
//             iframe.style.border = 'none';
//             document.body.appendChild(iframe);

//             const doc = iframe.contentWindow.document;
//             doc.open();
//             doc.write(htmlContent);
//             doc.close();

//             iframe.contentWindow.focus();
//             iframe.contentWindow.print();

//             // Limpar o iframe após a impressão
//             iframe.contentWindow.onafterprint = () => {
//                 document.body.removeChild(iframe);
//             };

//             // Fallback para navegadores que não suportam onafterprint
//             setTimeout(() => {
//                 if (document.body.contains(iframe)) {
//                     document.body.removeChild(iframe);
//                 }
//             }, 1000);
//         })
//         .catch(error => {
//             console.error('Erro ao buscar dados:', error);
//         });
// }
