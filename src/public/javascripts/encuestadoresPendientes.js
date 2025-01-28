// Cargar encuestadores pendientes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    fetch('/api/usuarios/pendientes-encuestadores')
        .then(response => response.json())
        .then(encuestadores => {
            const tbody = document.getElementById('encuestadores-pendientes');
            encuestadores.forEach(encuestador => {
                const nombre = encuestador.id_encuestador?.nombre || 'No disponible';
                const matricula = encuestador.id_encuestador?.matricula || 'No disponible';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nombre}</td>
                    <td>${matricula}</td>
                    <td>${encuestador.validador ? 'Validado' : 'Pendiente'}</td>
                    <td>
                        <button class="btn btn-success" onclick="actualizarEstado('${encuestador._id}', true)">Aceptar</button>
                        <button class="btn btn-danger" onclick="actualizarEstado('${encuestador._id}', false)">Rechazar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
});
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Por favor, inicia sesión primero.');
            return;
        }

        const response = await fetch('/api/usuarios/pendientes-encuestadores', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener encuestadores pendientes');
        }

        const encuestadores = await response.json();
        const tbody = document.getElementById('encuestadores-pendientes');
        encuestadores.forEach(encuestador => {
            const nombre = encuestador.id_encuestador?.nombre || 'No disponible';
            const matricula = encuestador.id_encuestador?.matricula || 'No disponible';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nombre}</td>
                <td>${matricula}</td>
                <td>${encuestador.validador ? 'Validado' : 'Pendiente'}</td>
                <td>
                    <button class="btn btn-success" onclick="actualizarEstado('${encuestador._id}', true)">Aceptar</button>
                    <button class="btn btn-danger" onclick="actualizarEstado('${encuestador._id}', false)">Rechazar</button>
                </td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los encuestadores pendientes.');
    }
});


// Actualizar el estado del encuestador
function actualizarEstado(id, aceptado) {
    fetch(`https://4z0r6nts-3002.usw3.devtunnels.ms/api/usuarios/actualizar-estado-encuestadores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aceptado })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Eliminar la fila del encuestador actualizado en lugar de recargar la página
        const row = document.querySelector(`button[onclick="actualizarEstado('${id}', ${aceptado})"]`).closest('tr');
        if (row) {
            row.remove();
        }
    })
    .catch(err => {
        console.error('Error al actualizar estado:', err);
        alert('Error al actualizar el estado del encuestador.');
    });
}
