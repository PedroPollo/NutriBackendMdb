// auth.js

function verificarAutenticacion() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Debes iniciar sesión primero');
        window.location.href = './index.html'; // Redirige a la página de login
        return;
    }

    // Opcional: Verificar el token en el servidor
    fetch('/api/usuarios/ruta-protegida', {
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
function cargarNombreUsuario() {
    const token = localStorage.getItem('token'); // Recupera el token del almacenamiento

    if (!token) {
        console.error('Token no encontrado. Redirigiendo al login...');
        window.location.href = './index.html'; // Redirige al login si no hay token
        return;
    }

    // Realiza la solicitud a la ruta protegida
    fetch('/api/usuarios/ruta-protegida', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Incluye el token en el encabezado de autorización
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo acceder a la ruta protegida.');
            }
            return response.json(); // Convierte la respuesta en JSON
        })
        .then(data => {
            if (data.nombre_usuario) {
                // Usa el nombre del usuario en la interfaz
                const nombreUsuarioDiv = document.getElementById('nom_empleado');
                if (nombreUsuarioDiv) {
                    nombreUsuarioDiv.textContent = data.nombre_usuario; // Muestra el nombre del usuario
                }
            } else {
                console.warn('No se recibió el nombre del usuario.');
            }
        })
        .catch(error => {
            console.error('Error al cargar el nombre del usuario:', error);
            alert('Hubo un problema al cargar los datos del usuario. Intenta iniciar sesión nuevamente.');
            localStorage.removeItem('token'); // Borra el token en caso de error
            window.location.href = './index.html'; // Redirige al login
        });
}

// Llama a la función después de verificar la autenticación
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacion();
    cargarNombreUsuario();
});

