function alertMsg(msg, type = 'info',time) {
    // Define as cores ou estilos baseados no tipo da mensagem
    const colors = {
        info: 'blue',
        success: 'green',
        warning: 'orange',
        error: 'red'
    };

    // Cria um container de alerta
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'absolute';
    alertDiv.style.fontSize = '1.4rem';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.padding = '50px 70px';
    alertDiv.style.borderRadius = '10px';
    alertDiv.style.backgroundColor = colors[type] || colors.info;
    alertDiv.style.color = 'white';
    alertDiv.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    alertDiv.style.fontSize = '18px';
    alertDiv.style.textAlign = 'center';
    alertDiv.style.zIndex = '99999';
    alertDiv.classList.add('alertDiv');
    alertDiv.style.display = 'block'; // Torna o alerta visível

    // Define o texto da mensagem
    alertDiv.textContent = msg;

    // Adiciona o alerta ao corpo do documento
    document.body.appendChild(alertDiv);

    // Remove o alerta após 3 segundos
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, time);
}
