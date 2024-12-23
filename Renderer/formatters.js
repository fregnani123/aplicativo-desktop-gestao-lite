

// Método para formatar código EAN
function formatarCodigoEAN(inputElement) {
    let value = inputElement.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Limita o comprimento para 13 caracteres
    if (value.length > 13) {
        value = value.substring(0, 13);
    }

    inputElement.value = value;
}


//**********************************************************************************************************/
//************ Formata os campos do fornecedor  ************



