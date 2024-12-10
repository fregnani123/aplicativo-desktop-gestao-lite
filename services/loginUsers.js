document.addEventListener('DOMContentLoaded', function () {
 const usersFocus = document.querySelector('#username');
 usersFocus.focus();

    const loginForm = document.getElementById('formLogin');
    console.log(loginForm)

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log(`Username: ${username}, Password: ${password}`); // Debugging output

   
        if (username === 'adm' && password === 'adm') {
            window.location.href = '../public/menu.html';
            console.log('Login successful');
        } else {
            console.log('Invalid username or password');
        }
    });
});
