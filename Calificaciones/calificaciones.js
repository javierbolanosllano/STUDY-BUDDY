document.addEventListener("DOMContentLoaded", function () {
    // Datos de calificaciones (ejemplo)
    var calificaciones = [
        { materia: "Antropología", calificacion: 90/10 },
        { materia: "Sociología del Consumo", calificacion: 85/10 },
        { materia: "Investigación de Mercados", calificacion: 95/10 },
        // Agrega más calificaciones según sea necesario
    ];

    // Obtener el cuerpo de la tabla
    var calificacionesBody = document.getElementById('calificaciones-body');

    // Cargar las calificaciones en la tabla
    calificaciones.forEach(function (calificacion) {
        var row = document.createElement('tr');
        var materiaCell = document.createElement('td');
        var calificacionCell = document.createElement('td');

        materiaCell.textContent = calificacion.materia;
        calificacionCell.textContent = calificacion.calificacion;

        row.appendChild(materiaCell);
        row.appendChild(calificacionCell);

        calificacionesBody.appendChild(row);
    });
});
