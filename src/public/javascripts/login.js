
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Recoge los datos del formulario
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    // Obtener los valores de los campos del formulario
    const correo_ins = document.querySelector('input[name="correo_ins"]').value;
    const contr = document.querySelector('input[name="contr"]').value;

    // Verifica si los campos están vacíos
    if (!correo_ins || !contr) {
        document.getElementById('error-message').style.display = 'block';
        return;
    } else {
        document.getElementById('error-message').style.display = 'none';
    }

    // Realizar la petición al servidor para el inicio de sesión
    fetch('http://localhost:3002/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo_ins, contr })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if(correo_ins=="a@gmail.com"){//--Aquí se specifica el correo del admin--
                localStorage.setItem('token', data.token);
                window.location.href = 'inicio_admin.html';
            }else{
                // Guardar el token en localStorage o sessionStorage
                localStorage.setItem('token', data.token);
                window.location.href = 'inicio.html'; // Redireccionar a la página protegida
            }
            
        } else {
            // Mostrar mensaje de error si la contraseña es incorrecta
            document.getElementById('conmal').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error en el inicio de sesión:', error);
    });
});