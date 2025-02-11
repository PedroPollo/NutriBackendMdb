document.addEventListener('DOMContentLoaded', () => {
    const idEncuesta = window.location.pathname.split('/').pop(); // Obtén el ID de la encuesta de la URL
    fetch(`/api/respuestas/ver/${idEncuesta}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        const contenedor = document.getElementById('detalle-respuestas');
        
        if (data.message) {
            contenedor.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        // Obtener nombre, descripción y respuestas de la encuesta
        const { nombre, descripcion, respuestas } = data;
        console.log("respuestas:",respuestas)
        // Calcular el total de respuestas registradas
        
        const totalRespuestas = respuestas.length > 0 ? respuestas[0].respuestas.length : 0;
        
        // Actualizar el encabezado con el nombre y descripción + total de respuestas
        const encabezado = document.querySelector('h1 strong');
        const descripcionElemento = document.querySelector('h1 small');
        const totalDeRespuestas = document.querySelector('h3 small');
        if (encabezado) encabezado.textContent = `Resultados de la encuesta: ${nombre}`;
        if (descripcionElemento) descripcionElemento.textContent = `${descripcion}`;
        if (totalRespuestas) totalDeRespuestas.textContent = `Total de encuestas aplicadas: ${totalRespuestas}`;
        // Generar dinámicamente el contenido con las preguntas y respuestas
        respuestas.forEach(item => {
            const bloque = document.createElement('div');

            if (item.tipo === "opcion-multiple") {
                // Calcular cuántas veces se seleccionó cada opción
                const conteoOpciones = {};
                item.opciones.forEach(opcion => {
                    conteoOpciones[opcion] = 0; // Inicializamos el conteo
                });

                item.respuestas.forEach(respuesta => {
                    if (conteoOpciones[respuesta]) {
                        conteoOpciones[respuesta]++;
                    } else {
                        conteoOpciones[respuesta] = 1;
                    }
                });

                // Calcular el total de respuestas
                const totalRespuestasPregunta = item.respuestas.length;

                // Generar la sección con barras de progreso
                bloque.innerHTML = `
                    <h2 class="font-bold text-lg mb-3">Pregunta: ${item.pregunta}</h2>
                    <ul class="list-unstyled">
                        ${Object.entries(conteoOpciones)
                            .map(([opcion, conteo]) => {
                                const porcentaje = ((conteo / totalRespuestasPregunta) * 100).toFixed(1); // Porcentaje
                                return `
                                    <li class="mb-3">
                                        <div class="d-flex justify-content-between mb-1">
                                            <span>${opcion}</span>
                                            <span>${conteo} (${porcentaje}%)</span>
                                        </div>
                                        <div class="progress" style="max-width: 50%;">
                                            <div class="progress-bar" role="progressbar" style="width: ${porcentaje}%" aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100" text-align= "left">
                                                ${porcentaje}%
                                            </div>
                                        </div>
                                    </li>
                                `;
                            })
                            .join('')}
                    </ul>
                `;

            } else {
                // Mostrar respuestas como lista normal para otros tipos de preguntas
                bloque.innerHTML = `
                    <h2 class="font-bold text-lg mb-3">Pregunta: ${item.pregunta}</h2>
                    <ul>
                        ${item.respuestas.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                `;
            }

            contenedor.appendChild(bloque);
        });

    })
    .catch(error => {
        console.error('Error al cargar respuestas:', error);
        const contenedor = document.getElementById('detalle-respuestas');
        contenedor.innerHTML = `<p>Error al cargar las respuestas</p>`;
    });
});
