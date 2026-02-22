document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.login__input');      
    const loginButton = document.querySelector('.login__button');
    const loginForm = document.querySelector('.login-form');

    // Habilitar/desabilitar botão baseado no comprimento do nome
    input.addEventListener('input', function() {
        if (input.value.trim().length >= 4) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    });

    // Manipular envio do formulário
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede recarregamento da página
        
        const username = input.value.trim(); // CORREÇÃO: use 'input' em vez de 'usernameInput'
        if (username.length >= 4) {
            localStorage.setItem('username', username); // CORREÇÃO: salve o valor, não o elemento
            window.location.href = 'Pages/memorygame.html';
        }
    });
});