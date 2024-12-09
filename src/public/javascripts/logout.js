document.getElementById('logout-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace recargue la página

    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');

    // Redirigir a la página de inicio de sesión
    window.location.href = './index.html'; // Ajusta la ruta si es necesario
});