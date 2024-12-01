$(document).ready(function () {
    // Validar formulario al enviar
    $('#registroForm').on('submit', function (event) {
        event.preventDefault(); // Prevenir el envío por defecto

        let esValido = true;

        // Validar email
        const email = $('#email').val();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#errorEmail').removeClass('d-none');
            esValido = false;
        } else {
            $('#errorEmail').addClass('d-none');
        }

        // Validar nombre
        const nombre = $('#nombre').val();
        if (!nombre.trim()) {
            $('#errorNombre').removeClass('d-none');
            esValido = false;
        } else {
            $('#errorNombre').addClass('d-none');
        }

        // Validar fecha de nacimiento
        const fechaNacimiento = $('#fechaNacimiento').val();
        if (!fechaNacimiento) {
            $('#errorFecha').removeClass('d-none');
            esValido = false;
        } else {
            $('#errorFecha').addClass('d-none');
            calcularEdad(fechaNacimiento); // Calcular edad si la fecha es válida
        }

        // Validar ingreso
        const ingreso = $('#ingreso').val();
        if (!ingreso || isNaN(ingreso) || ingreso <= 0) {
            $('#errorIngreso').removeClass('d-none');
            esValido = false;
        } else {
            $('#errorIngreso').addClass('d-none');
        }

        // Validar género
        const genero = $('#genero').val();
        if (!genero) {
            $('#errorGenero').removeClass('d-none');
            esValido = false;
        } else {
            $('#errorGenero').addClass('d-none');
        }

        // Validar grado académico
        const gradoAcademico = $('#gradoAcademico').val();
        if (!gradoAcademico || gradoAcademico.length === 0) {
            $('#errorGrado').removeClass('d-none');
            esValido = false;
        } else {
            $('#errorGrado').addClass('d-none');
        }

        // Si todo está bien, simular el envío
        if (esValido) {
            enviarFormulario();
        }
    });

    // Función para calcular la edad
    function calcularEdad(fecha) {
        const birthDate = new Date(fecha);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        $('#edad').val(age); // Actualizar el campo oculto de la edad
    }

    // Función para simular el envío del formulario
    function enviarFormulario() {
        // Recolectar los datos del formulario
        const datosFormulario = {
            email: $('#email').val(),
            nombre: $('#nombre').val(),
            fechaNacimiento: $('#fechaNacimiento').val(),
            edad: $('#edad').val(),
            genero: $('#genero').val(),
            gradoAcademico: $('#gradoAcademico').val(),
            ingreso: $('#ingreso').val(),
        };
        
        // Simular envío de datos
        alert("Formulario enviado correctamente.\n" + JSON.stringify(datosFormulario, null, 2));
        // Limpiar formulario después del envío
        limpiarFormulario();
    }

    // Función para limpiar los campos del formulario
    function limpiarFormulario() {
        // Resetear todos los campos del formulario
        $('#registroForm')[0].reset();

        // Limpiar específicamente el selector de género
        $('#genero').val(''); 
        $('#genero').trigger('change'); // Forzar un evento de cambio para actualizar la interfaz

        // Limpiar específicamente el selector múltiple de grado académico
        $('#gradoAcademico').val(null);
        $('#gradoAcademico').trigger('change'); // Forzar un evento de cambio para actualizar la interfaz

        // Limpiar el campo oculto de edad
        $('#edad').val('');

        // Asegurar que los mensajes de error estén ocultos
        $('.text-danger').addClass('d-none');
    }
});
