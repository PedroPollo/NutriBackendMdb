// Cargar usuarios pendientes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/usuarios/pendientes')
        .then(response => response.json())
        .then(usuarios => {
            const tbody = document.getElementById('usuarios-pendientes');
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.nom_usuario} ${usuario.apellidos_usuario}</td>
                    <td>${usuario.identificador}</td>
                    <td>${usuario.correo_ins}</td>
                    <td>${usuario.aceptado ? 'Aceptado' : 'Pendiente'}</td>
                    <td>
                        <button class="btn btn-success" onclick="actualizarEstado('${usuario._id}', true)">Aceptar</button>
                        <button class="btn btn-danger" onclick="actualizarEstado('${usuario._id}', false)">Rechazar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
         
});

function actualizarEstado(id, aceptado) {
    fetch(`/api/usuarios/actualizar-estado/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aceptado })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Eliminar la fila del usuario actualizado en lugar de recargar la página
        const row = document.querySelector(`button[onclick="actualizarEstado('${id}', ${aceptado})"]`).closest('tr');
        if (row) {
            row.remove();
        }
    })
    .catch(err => {
        console.error('Error al actualizar estado:', err);
        alert('Error al actualizar el estado del usuario.');
    });
}
