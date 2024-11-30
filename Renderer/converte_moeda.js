function converteMoeda(value) {

    // Converte para string com duas casas decimais
    value = value.toFixed(2);

    // Converte para formato brasileiro: substitui o ponto decimal por vírgula e adiciona pontos de milhares
    value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return value; // Retorna o valor formatado
}
