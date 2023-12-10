// tareas.js

// Agrega estas funciones en tu archivo JavaScript

function marcarComoCompletada(button) {
    // Encuentra la fila padre (tr) de este botón y actualiza su estilo o realiza acciones necesarias
    var tareaRow = button.closest('tr');
    tareaRow.style.textDecoration = 'line-through'; // Ejemplo: línea sobre la tarea completada
}

function eliminarTarea(button) {
    // Encuentra la fila padre (tr) de este botón y elimínala
    var tareaRow = button.closest('tr');
    tareaRow.remove();

    // Obtén la información de la tarea eliminada
    var tarea = tareaRow.cells[0].innerText;
    var fecha = tareaRow.cells[1].innerText;

    // Elimina la tarea del almacenamiento local
    eliminarTareaDelAlmacenamiento(tarea, fecha);
}

function agregarNuevaTarea() {
    var tareaInput = document.getElementById('tarea');
    var fechaInput = document.getElementById('fecha');

    var nuevaTarea = tareaInput.value;
    var nuevaFecha = fechaInput.value;

    // Validaciones adicionales según tus requisitos

    // Crea una nueva fila en la tabla
    var nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${nuevaTarea}</td>
        <td>${nuevaFecha}</td>
        <td>
            <button onclick="marcarComoCompletada(this)">Completada</button>
            <button onclick="eliminarTarea(this)">Eliminar</button>
        </td>
    `;

    // Agrega la nueva fila al cuerpo de la tabla
    document.getElementById('tareas-body').appendChild(nuevaFila);

    // Almacena la nueva tarea en el almacenamiento local
    agregarTareaAlAlmacenamiento(nuevaTarea, nuevaFecha);

    // Limpia los campos del formulario
    tareaInput.value = '';
    fechaInput.value = '';
}

function agregarTareaAlAlmacenamiento(tarea, fecha) {
    // Almacena la tarea en el almacenamiento local
    var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.push({ tarea: tarea, fecha: fecha });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function eliminarTareaDelAlmacenamiento(tarea, fecha) {
    // Elimina la tarea del almacenamiento local
    var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    var tareaIndex = tareas.findIndex(function (item) {
        return item.tarea === tarea && item.fecha === fecha;
    });

    if (tareaIndex !== -1) {
        tareas.splice(tareaIndex, 1);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}
