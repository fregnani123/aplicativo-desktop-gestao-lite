
//consverte Moeda valor fixo, sem interação usuário.
function converteMoeda(value) {

    // Converte para string com duas casas decimais
    value = value.toFixed(2);

    // Converte para formato brasileiro: substitui o ponto decimal por vírgula e adiciona pontos de milhares
    value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return value; // Retorna o valor formatado
}


// Formata valor em moeda brasileira
function converteMoeda(valor) {
    return valor
        .toFixed(2)
        .replace('.', ',')
        .replace(/\d(?=(\d{3})+,)/g, '$&.');
}

// Formata valor com separador de milhar
function formatCurrency(value) {
    return value
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
