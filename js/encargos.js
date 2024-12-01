$(document).ready(function () {
  // Mostrar/ocultar opciones de decoración adicional
  $('input[name="decoracionAdi"]').change(function () {
    if ($('#decoracionSi').is(':checked')) {
      $('#opcionesDecoracion').show();
    } else {
      $('#opcionesDecoracion').hide();
    }
  });

  // Mostrar/ocultar cantidad de bolsitas
  $('input[name="bolsitas"]').change(function () {
    if ($('#bolsitasSi').is(':checked')) {
      $('#cantidadBolsitas').show(); // Muestra el input de cantidad de bolsitas
    } else {
      $('#cantidadBolsitas').hide(); // Oculta el input de cantidad de bolsitas
    }
  });

  // Mostrar/ocultar cantidad de centros de mesa
  $('input[name="centrosMesa"]').change(function () {
    if ($('#centrosSi').is(':checked')) {
      $('#cantidadCentros').show(); // Muestra el input de cantidad de centros
    } else {
      $('#cantidadCentros').hide(); // Oculta el input de cantidad de centros
    }
  });

  // Validación para el campo de correo electrónico
  $('#emailCliente').on('blur', function () {
    const email = $(this).val();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
    }
  });

  // Validación general del formulario
  $('form').on('submit', function (e) {
    e.preventDefault(); // Prevenir el envío del formulario hasta validación

    let isValid = true; // Bandera para controlar si el formulario es válido

    // Validar campo de tema de piñata (obligatorio)
    if ($('#temaPinata').val().trim() === "") {
      alert("Por favor, ingresa el tema o personaje de la piñata.");
      isValid = false; // Cambiar bandera a falso si hay error
    }

    // Validar si se selecciona una opción en el campo de decoración adicional
    const decoracionAdi = $('input[name="decoracionAdi"]:checked').val();
    if (!decoracionAdi) {
      alert("Por favor, selecciona si deseas agregar decoración adicional.");
      isValid = false;
    }

    // Si se seleccionó "Sí" en decoración adicional, validar los campos dependientes
    if (decoracionAdi === 'si') {
      const bolsitas = $('input[name="bolsitas"]:checked').val();
      const palitoPinnata = $('input[name="palitoPinnata"]:checked').val();
      const centrosMesa = $('input[name="centrosMesa"]:checked').val();

      if (!bolsitas) {
        alert("Por favor, selecciona si deseas agregar bolsitas.");
        isValid = false;
      }

      if (!palitoPinnata) {
        alert("Por favor, selecciona si deseas agregar el palito para la piñata.");
        isValid = false;
      }

      if (!centrosMesa) {
        alert("Por favor, selecciona si deseas agregar centros de mesa.");
        isValid = false;
      }

      // Validar campos de cantidad de bolsitas y centros de mesa si se seleccionó "Sí"
      if (bolsitas === 'si' && $('#cantidadBolsitas').val().trim() === "") {
        alert("Por favor, ingresa la cantidad de bolsitas.");
        isValid = false;
      }

      if (centrosMesa === 'si' && $('#cantidadCentros').val().trim() === "") {
        alert("Por favor, ingresa la cantidad de centros de mesa.");
        isValid = false;
      }
    }

    // Validar campos de correo electrónico y nombre completo
    const email = $('#emailCliente').val();
    if (!email) {
      alert("Por favor, ingresa un correo electrónico.");
      isValid = false;
    }
    const nombre = $('#nombreCliente').val();
    if (nombre === null || nombre === undefined) {
      console.log("El campo nombre está vacío o no se puede acceder");
    }
    console.log("Nombre ingresado:", nombre);
    
  
    console.log("Nombre ingresado:", nombre); // Para depuración

    if (nombre.trim() === "") {
      alert("Por favor, ingresa tu nombre completo.");
      isValid = false;
    }

    // Validar fecha de entrega
    const fechaEntrega = $('#fechaEntrega').val();
    const fechaActual = new Date(); // Fecha actual

    // Convertir la fecha de entrega a un objeto Date
    const fechaEntregaObj = new Date(fechaEntrega);

    if (!fechaEntrega) {
      alert("Por favor, ingresa la fecha de entrega.");
      isValid = false;
    }

    // Validar que la fecha de entrega sea mayor que la actual
    if (fechaEntregaObj <= fechaActual) {
      alert("La fecha de entrega debe ser mayor a la fecha actual.");
      isValid = false;
    }

    // Si todo está validado correctamente, enviar el formulario
    if (isValid) {
      alert("Formulario enviado correctamente.");      
      this.submit();
    }
  });
});

