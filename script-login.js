document.getElementById('email').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        login(event);
    }
});

document.getElementById('password').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        login(event);
    }
});

function login(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === 'test@test.com' && password === 'test123') {
        localStorage.setItem('loggedInUser', JSON.stringify({ email: email }));

        window.location.href = 'hub-de-apps.html';
    } else {
        alert('Correo o contraseña incorrectos');
    }
}

