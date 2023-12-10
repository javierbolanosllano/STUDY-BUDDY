document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],
        eventClick: function(info) {
            var title = prompt('Editar Título:', info.event.title);
            if (title) {
                info.event.setProp('title', title);
            }
        },
        eventMouseEnter: function(info) {
            if (info.event.extendedProps.description) {
                alert('Descripción: ' + info.event.extendedProps.description);
            }
        }
    });

    calendar.render();

    function agregarEvento() {
        var titulo = document.getElementById('txtTitulo').value;
        var fecha = document.getElementById('txtFecha').value;
        var horaInicio = document.getElementById('txtHoraInicio').value;
        var horaFin = document.getElementById('txtHoraFin').value;
        var descripcion = document.getElementById('txtDescripcion').value;
        var tipo = document.getElementById('txtTipo').value;

        if (titulo && fecha && horaInicio && tipo) {
            var nuevoEvento = {
                title: titulo,
                start: fecha + 'T' + horaInicio,
                end: fecha + (horaFin ? 'T' + horaFin : ''),
                description: descripcion,
                classNames: ['evento-' + tipo.toLowerCase()] // Asignar clase según el tipo
            };

            calendar.addEvent(nuevoEvento);
            guardarEventos(); // Guardar eventos en el almacenamiento local
            limpiarCampos();
        } else {
            alert('Por favor, complete todos los campos requeridos.');
        }
    }

    function borrarEvento() {
        var idEventoSeleccionado = document.getElementById('selectEvento').value;
        if (idEventoSeleccionado) {
            var event = calendar.getEventById(idEventoSeleccionado);
            if (event) {
                event.remove();
                guardarEventos(); // Guardar eventos actualizados en el almacenamiento local
                actualizarListaEventos();
                limpiarCampoSeleccion();
            } else {
                alert('No se pudo encontrar el evento con el ID: ' + idEventoSeleccionado);
            }
        } else {
            alert('Seleccione un evento para borrar.');
        }
    }
    

    function actualizarListaEventos() {
        var selectEvento = document.getElementById('selectEvento');
        selectEvento.innerHTML = '';

        calendar.getEvents().forEach(function(event) {
            var option = document.createElement('option');
            option.value = event.id;
            option.text = event.title;
            selectEvento.add(option);
        });
    }

    function limpiarCampoSeleccion() {
        document.getElementById('selectEvento').value = '';
    }

    function confirmarBorrarEvento() {
        var idEventoSeleccionado = document.getElementById('selectEvento').value;
        if (idEventoSeleccionado) {
            borrarEvento(idEventoSeleccionado);
            actualizarListaEventos();
            limpiarCampoSeleccion();
        } else {
            alert('Seleccione un evento para borrar.');
        }
    }

    function guardarEventos() {
        var eventos = calendar.getEvents().map(function(event) {
            return {
                title: event.title,
                start: event.start.toISOString(),
                end: event.end ? event.end.toISOString() : null,
                description: event.extendedProps.description,
                color: event.backgroundColor
            };
        });

        localStorage.setItem('eventos', JSON.stringify(eventos));
    }

    function cargarEventosGuardados() {
        var eventosGuardados = localStorage.getItem('eventos');
        if (eventosGuardados) {
            var eventos = JSON.parse(eventosGuardados);
            calendar.addEventSource(eventos);
        }
    }

    function limpiarCampos() {
        document.getElementById('txtTitulo').value = '';
        document.getElementById('txtFecha').value = '';
        document.getElementById('txtHoraInicio').value = '';
        document.getElementById('txtHoraFin').value = '';
        document.getElementById('txtTipo').value = 'estudio'; // Restablecer el tipo por defecto
        document.getElementById('txtDescripcion').value = '';
    }

    document.getElementById('btnAgregarEvento').addEventListener('click', agregarEvento);
    document.getElementById('btnBorrarEvento').addEventListener('click', function() {
        actualizarListaEventos();
        limpiarCampoSeleccion();
    });
    document.getElementById('btnConfirmarBorrarEvento').addEventListener('click', confirmarBorrarEvento);

    cargarEventosGuardados();
});
