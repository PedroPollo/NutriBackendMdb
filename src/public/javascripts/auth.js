// auth.js

function verificarAutenticacion() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Debes iniciar sesión primero');
        window.location.href = './index.html'; // Redirige a la página de login
        return;
    }

    // Opcional: Verificar el token en el servidor
    fetch('http://148.204.142.3:3002/api/usuarios/ruta-protegida', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (response.status === 403 || response.status === 401) {
            alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            localStorage.removeItem('token');
            window.location.href = './index.html'; // Ajusta la ruta según sea necesario
        }
    })
    .catch(() => {
        alert('Error al verificar la sesión. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token');
        window.location.href = './index.html';
    });
}

// Llama a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', verificarAutenticacion);
