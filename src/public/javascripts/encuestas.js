document.addEventListener('DOMContentLoaded', function () {
    // Vincular eventos a los elementos HTML
    document.querySelector('#guardarEncuestaButton').addEventListener('click', guardarEncuesta);
    document.querySelector('#nueva_pregunta').addEventListener('click', nuevaPregunta);
    //document.querySelector('#cambiar_tipo').addEventListener('click', cambiarTipoPregunta);
    cargarEncuestas();
    let contadorPreguntas = 0; // Para llevar la cuenta de preguntas

    // Función para agregar una nueva pregunta
    function nuevaPregunta() {
      contadorPreguntas++;
      const preguntasContainer = document.getElementById('preguntas-container');

      // Crear contenedor de la nueva pregunta
      const preguntaDiv = document.createElement('div');
      preguntaDiv.classList.add('pregunta', 'mt-4');
      preguntaDiv.id = `pregunta-${contadorPreguntas}`;

      preguntaDiv.innerHTML = `
          <div class="col-sm-8">  
              <div class="form-group">
                  <label>Pregunta ${contadorPreguntas}</label>
                  <input type="text" class="form-control" placeholder="Escribe tu pregunta">
              </div>
              
              <div class="form-group">
                  <label>Tipo de pregunta</label>
                  <select class="form-control tipo-pregunta" id="cambiar_tipo_${contadorPreguntas}">
                      <option value="abierta">Abierta</option>
                      <option value="opcion-multiple">Opción múltiple</option>
                  </select>
              </div>
              
              <div id="opciones-container-${contadorPreguntas}" class="opciones-container"></div>

              <!-- Botón para eliminar la pregunta -->
              <button type="button" class="btn btn-danger mt-2" id="eliminar-pregunta-${contadorPreguntas}">Eliminar Pregunta</button>
          </div>  
      `;

      preguntasContainer.appendChild(preguntaDiv);

      // Agregar eventos usando addEventListener en lugar de onclick
      document.getElementById(`cambiar_tipo_${contadorPreguntas}`).addEventListener('change', function () {
          cambiarTipoPregunta(contadorPreguntas);
      });

      document.getElementById(`eliminar-pregunta-${contadorPreguntas}`).addEventListener('click', function () {
          eliminarPregunta(contadorPreguntas);
      });
  }

  // Función para manejar el cambio de tipo de pregunta
  function cambiarTipoPregunta(preguntaId) {
      const tipoPregunta = document.querySelector(`#pregunta-${preguntaId} .tipo-pregunta`).value;
      const opcionesContainer = document.getElementById(`opciones-container-${preguntaId}`);

      if (tipoPregunta === 'opcion-multiple') {
          if (!document.getElementById(`incisos-container-${preguntaId}`)) {
              const incisosContainer = document.createElement('div');
              incisosContainer.id = `incisos-container-${preguntaId}`;
              opcionesContainer.appendChild(incisosContainer);
          }

          const incisosContainer = document.getElementById(`incisos-container-${preguntaId}`);
          incisosContainer.innerHTML = `
              <div class="form-group inciso">
                  <label>Opción 1</label>
                  <input type="text" class="form-control" placeholder="Escribe la opción">
                  <button type="button" class="btn btn-danger btn-sm mt-1 eliminar-inciso">Eliminar</button>
              </div>
              <div class="form-group inciso">
                  <label>Opción 2</label>
                  <input type="text" class="form-control" placeholder="Escribe la opción">
                  <button type="button" class="btn btn-danger btn-sm mt-1 eliminar-inciso">Eliminar</button>
              </div>
          `;

          // Agregar botón para agregar más incisos
          const botonAgregar = document.createElement('button');
          botonAgregar.type = "button";
          botonAgregar.className = "external-event bg-warning mt-2";
          botonAgregar.textContent = "Agregar inciso";
          botonAgregar.addEventListener('click', function () {
              agregarInciso(preguntaId);
          });

          opcionesContainer.appendChild(botonAgregar);

          // Agregar evento para eliminar incisos
          incisosContainer.querySelectorAll('.eliminar-inciso').forEach(button => {
              button.addEventListener('click', function () {
                  eliminarInciso(button);
              });
          });
      } else {
          opcionesContainer.innerHTML = ''; // Quitar opciones si es pregunta abierta
      }
  }

  // Función para agregar un nuevo inciso
  function agregarInciso(preguntaId) {
      const incisosContainer = document.getElementById(`incisos-container-${preguntaId}`);
      const incisoCount = incisosContainer.getElementsByClassName('form-group').length + 1;

      const nuevoInciso = document.createElement('div');
      nuevoInciso.classList.add('form-group', 'inciso');
      nuevoInciso.innerHTML = `
          <label>Opción ${incisoCount}</label>
          <input type="text" class="form-control" placeholder="Escribe la opción">
          <button type="button" class="btn btn-danger btn-sm mt-1 eliminar-inciso">Eliminar</button>
      `;

      incisosContainer.appendChild(nuevoInciso);

      // Agregar evento para eliminar inciso
      nuevoInciso.querySelector('.eliminar-inciso').addEventListener('click', function () {
          eliminarInciso(nuevoInciso.querySelector('.eliminar-inciso'));
      });
  }

  // Función para eliminar una pregunta
  function eliminarPregunta(preguntaId) {
      const preguntaDiv = document.getElementById(`pregunta-${preguntaId}`);
      if (preguntaDiv) {
          preguntaDiv.remove();
      }
  }

  // Función para eliminar un inciso
  function eliminarInciso(boton) {
      const incisoDiv = boton.parentElement;
      incisoDiv.remove();
  }

  // Enlazar la función nuevaPregunta al botón correspondiente (si existe en el DOM)
  const botonNuevaPregunta = document.getElementById('boton-nueva-pregunta');
  if (botonNuevaPregunta) {
      botonNuevaPregunta.addEventListener('click', nuevaPregunta);
  }


  document.addEventListener('DOMContentLoaded', function () {
    const guardarEncuestaButton = document.querySelector('#guardarEncuestaButton');
    if (guardarEncuestaButton) {
        guardarEncuestaButton.addEventListener('click', guardarEncuesta);
    }
});

function guardarEncuesta() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Por favor, inicia sesión primero.');
        return;
    }

    const encuesta = {
        nombre: document.getElementById('nombre_encuesta').value,
        descripcion: document.getElementById('descripcion').value,
        preguntas: []
    };

    // Procesar preguntas
    const preguntasDivs = document.querySelectorAll('.pregunta');
    preguntasDivs.forEach(preguntaDiv => {
        const pregunta = {
            texto: preguntaDiv.querySelector('input[type="text"]').value,
            tipo: preguntaDiv.querySelector('.tipo-pregunta').value,
            opciones: []
        };

        if (pregunta.tipo === 'opcion-multiple') {
            const incisos = preguntaDiv.querySelectorAll('.opciones-container .form-group input');
            incisos.forEach(inciso => {
                if (inciso.value.trim() !== '') {
                    pregunta.opciones.push(inciso.value.trim());
                }
            });
        }

        encuesta.preguntas.push(pregunta);
    });

    // Validar antes de enviar
    if (!encuesta.nombre || !encuesta.descripcion || encuesta.preguntas.length === 0) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    fetch('http://localhost:3002/api/encuestas_new/crearEncuesta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(encuesta)
    })
        .then(response => {
            if (response.ok) {
                alert('Encuesta guardada exitosamente');
                // Opcional: redirigir o limpiar el formulario
                cargarEncuestas();
            } else {
                response.json().then(data => {
                    alert(`Error: ${data.message || 'No se pudo guardar la encuesta'}`);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al guardar la encuesta.');
        });
}



// Función para cargar encuestas en la tabla
async function cargarEncuestas() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Por favor, inicia sesión primero.');
            return;
        }

        const response = await fetch('http://localhost:3002/api/encuestas_new/obtener-encuestas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las encuestas');
        }

        const encuestas = await response.json();
        renderizarEncuestas(encuestas); // Llama a una función separada para renderizar
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar las encuestas');
    }
}
cargarEncuestas();
async function eliminarEncuesta(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) {
        try {
            const response = await fetch(`http://localhost:3002/api/encuestas_new/eliminarEncuesta/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Encuesta eliminada con éxito');
                // Actualizar la lista de encuestas
                cargarEncuestas();
            } else {
                const error = await response.json();
                alert('Error al eliminar la encuesta: ' + error.message);
            }
        } catch (error) {
            console.error('Error al eliminar encuesta:', error);
            alert('Ocurrió un error al eliminar la encuesta.');
        }
    }
}

function renderizarEncuestas(encuestas) {
    const tbody = document.querySelector('#example2 tbody');
    tbody.innerHTML = '';

    encuestas.forEach(encuesta => {
        const fila = document.createElement('tr');

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = encuesta.nombre;
        fila.appendChild(celdaNombre);

        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.textContent = encuesta.descripcion;
        fila.appendChild(celdaDescripcion);

        const celdaOpciones = document.createElement('td');

        const botonVer = document.createElement('button');
        botonVer.textContent = 'Ver';
        botonVer.classList.add('btn', 'btn-primary', 'mr-2');
        botonVer.setAttribute('data-toggle', 'modal');
        botonVer.setAttribute('data-target', '#modal_ver_form');
        botonVer.onclick = () => {
            verEncuesta(encuesta._id);
        };

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.classList.add('btn', 'btn-warning', 'mr-2');
        botonEditar.onclick = () => {
            editarEncuesta(encuesta._id);
        };
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        botonEliminar.onclick = () => eliminarEncuesta(encuesta._id);
        

        celdaOpciones.appendChild(botonVer);
        celdaOpciones.appendChild(botonEditar);
        celdaOpciones.appendChild(botonEliminar);
        fila.appendChild(celdaOpciones);

        tbody.appendChild(fila);
    });
}

// Llamar a la función para cargar las encuestas cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarEncuestas);

});