document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.username === username);
        
        if (!usuario || usuario.password !== password) {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            return;
        }
        
        localStorage.setItem('loggedUser', JSON.stringify({ name: usuario.name, rol: usuario.rol }));
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        errorMessage.textContent = 'Error al iniciar sesión: ' + error.message;
    }
});