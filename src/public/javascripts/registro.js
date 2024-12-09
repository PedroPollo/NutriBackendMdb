// archivo: /public/js/registro.js

// Escuchar el evento 'submit' del formulario
document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Recoge los datos del formulario
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Enviar los datos al backend
    fetch('http://148.204.142.3:3002/api/usuarios/registro', { // Asegúrate de que coincida con la ruta backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Registro exitoso');
        } else {
            alert('Error en el registro: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error en el servidor.');
    });
});
