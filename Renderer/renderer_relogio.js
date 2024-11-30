const relogioElement = document.querySelector('.square-time');
const dataElement = document.querySelector('.square-day');
const inputData = document.querySelector('#data-venda');

function atualizarRelogio() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const hora = String(dataAtual.getHours()).padStart(2, '0');
    const minuto = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundo = String(dataAtual.getSeconds()).padStart(2, '0');

    // Atualizar horário
    relogioElement.innerHTML = `${hora}:${minuto}`;
    inputData.value = `${dia}/${mes}/${ano}`

    const spanSeg = document.createElement('span');
    spanSeg.classList.add('segundo');
    spanSeg.textContent = segundo;
    relogioElement.appendChild(spanSeg);

    // Formatar e atualizar data
    const opcoesData = { weekday: 'long', day: 'numeric', month: 'short' };
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', opcoesData)
        .replace('.', ''); // Remover o ponto do mês

    dataElement.innerHTML = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}

setInterval(atualizarRelogio, 1000);
