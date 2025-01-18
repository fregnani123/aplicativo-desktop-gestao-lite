// inputTotalLiquido.value;
    // inputTotalPago.value;  // soma dos valores inseridos nas formas de pagamentos.
    // inputTroco.value;  // diminuição  inputTotalPago.value - inputTotalLiquido.value; 
// Função genérica para formatar valores em moeda brasileira com limite máximo

// divPIX 
// divCartaoDebito 
// divCartaoCredito 
// divDesconto  


// Função para permitir navegação entre os campos com setas para cima e para baixo
function navegarCampos(evento, campos) {
    let index = campos.indexOf(document.activeElement);
  
    if (evento.key === 'ArrowDown') {
      // Mover para o próximo campo
      index = (index + 1) % campos.length;
    } else if (evento.key === 'ArrowUp') {
      // Mover para o campo anterior
      index = (index - 1 + campos.length) % campos.length;
    }
  
    const campoDestino = campos[index];
    campoDestino.focus();
  
    // Garante que o cursor vai para o final do campo ao focar
    const length = campoDestino.value.length;
    campoDestino.setSelectionRange(length, length);
  }
  
  // Função para formatar os campos como moeda
  function formatarMoeda(elemento) {
    try {
      // Define o limite máximo (exemplo: R$ 1.000.000,00)
      const limiteMaximo = 1000000.00;
  
      // Remove todos os caracteres que não sejam dígitos
      let value = elemento.value.replace(/\D/g, '');
  
      // Converte o valor para o formato de moeda brasileira
      if (value) {
        value = parseInt(value, 10) / 100; // Divide por 100 para obter o valor decimal
  
        // Verifica se o valor excede o limite máximo
        if (value > limiteMaximo) {
          value = limiteMaximo; // Ajusta para o valor máximo permitido
        }
  
        // Formata para moeda brasileira
        value = value.toFixed(2)
          .replace('.', ',') // Troca o ponto decimal por vírgula
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos como separador de milhar
      } else {
        value = "0,00"; // Valor padrão se o campo estiver vazio
      }
  
      // Atualiza o valor do campo formatado
      elemento.value = value;
  
      // Move o cursor para o final
      elemento.setSelectionRange(value.length, value.length);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  // Adiciona o evento a todos os campos de pagamento
  const camposPagamento = [
    document.getElementById('valorDinheiro'),
    document.getElementById('PIX'),
    document.getElementById('Cartao-Debito'),
    document.getElementById('Cartao-Credito'),
    document.getElementById('total-pago')
  ];
  
  // Itera pelos campos e associa o evento 'input' à função genérica
  camposPagamento.forEach(campo => {
    if (campo) {
      campo.addEventListener('input', () => formatarMoeda(campo));
  
      // Garante que o cursor começa no lado direito ao focar no campo
      campo.addEventListener('focus', () => {
        const length = campo.value.length;
        campo.setSelectionRange(length, length);
      });
  
      // Adiciona navegação por teclas de seta (apenas para cima e para baixo)
      campo.addEventListener('keydown', (evento) => {
        // Só permite navegação com as setas para cima e para baixo
        if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown') {
          navegarCampos(evento, camposPagamento);
        }
      });
    }
  });

  function getFormasDePagamento() {
    const formasDePagamento = [];

    const valorDinheiro = parseCurrency(document.getElementById('valorDinheiro').value);
    const valorPIX = parseCurrency(document.getElementById('PIX').value);
    const valorCartaoDebito = parseCurrency(document.getElementById('Cartao-Debito').value);
    const valorCartaoCredito = parseCurrency(document.getElementById('Cartao-Credito').value);

    if (valorDinheiro > 0) {
        formasDePagamento.push({ tipo: 'Dinheiro', valor: valorDinheiro.toFixed(2) });
    }
    if (valorPIX > 0) {
        formasDePagamento.push({ tipo: 'PIX', valor: valorPIX.toFixed(2) });
    }
    if (valorCartaoDebito > 0) {
        formasDePagamento.push({ tipo: 'Cartão Débito', valor: valorCartaoDebito.toFixed(2) });
    }
    if (valorCartaoCredito > 0) {
        formasDePagamento.push({ tipo: 'Cartão Crédito', valor: valorCartaoCredito.toFixed(2) });
    }

    return formasDePagamento;
}

// Função para converter valores monetários para números
function parseCurrency(value) {
    const parsedValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return isNaN(parsedValue) ? 0 : parsedValue;
}

  
  function calcularValores() {
    // Seleciona e obtém os valores de todos os campos
    const camposPagamentoCalc = [
      document.getElementById('valorDinheiro').value,
      document.getElementById('PIX').value,
      document.getElementById('Cartao-Debito').value,
      document.getElementById('Cartao-Credito').value,
    ];
  
    // Converte os valores para números e soma com reduce
    const totalPago = camposPagamentoCalc.reduce((total, valor) => {
      // Remove caracteres não numéricos e converte para número
      const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
      return total + valorNumerico;
    }, 0); // Começa a soma com 0

    inputTotalPago.value = converteMoeda(totalPago)  ;
  
    return totalPago;
  }

// Função genérica para calcular e atualizar o troco
function atualizarTroco() {
    // Formatar o total líquido
    const totalLiquidoFormatado = parseFloat(inputTotalLiquido.value.replace(/\./g, '').replace(',', '.')) || 0;
    
    // Calcular o troco
    const trocoCliente = calcularValores() - totalLiquidoFormatado;
  
    // Atualizar o campo de troco
    inputTroco.value = trocoCliente < 0 ? '0,00' : converteMoeda(trocoCliente);
  }
  
  // Adicionando o evento de 'input' a todos os campos de pagamento
  const camposPagamentoTroco = [
    valorDinheiro,
    PIX,
    CartaoCredito,
    CartaoDebito
  ];

  // Itera pelos campos e associa o evento 'input' à função genérica
  camposPagamentoTroco.forEach(campo => {
    if (campo) {
      campo.addEventListener('input', atualizarTroco);
    }
  });

 // Adicionar evento de tecla no campo de desconto
inputdescontoPorcentagem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        aplicarDesconto();
    }
});


// Função para aplicar o desconto
function aplicarDesconto() {
    try {
        // Remove caracteres inválidos, permitindo apenas números e um único ponto decimal
        let value = inputdescontoPorcentagem.value;

        // Substitui caracteres que não sejam números ou pontos
        value = value.replace(/[^0-9.]/g, '');

        // Garante que apenas o primeiro ponto seja mantido
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join(''); // Remove pontos adicionais
        }

        // Limita a duas casas decimais
        if (value.indexOf('.') !== -1) {
            value = value.slice(0, value.indexOf('.') + 3); // mantém duas casas após o ponto
        }

        // Atualiza o campo de entrada com o valor limpo e com no máximo 2 casas decimais
        inputdescontoPorcentagem.value = value;

        // Chama a função de cálculo com os valores
        descontoVenda(inputTotalLiquido, inputdescontoPorcentagem);

    } catch (error) {
        console.error(error.message);
    }
}


   
 