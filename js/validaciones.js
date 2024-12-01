$(document).ready(function() {
   $('input[name="decoracionAdi"]').change(function() {
     if ($('#decoracionSi').is(':checked')) {
       $('#opcionesDecoracion').show();
     } else {
       $('#opcionesDecoracion').hide();
     }
   });
 
   $('input[name="bolsitas"]').change(function() {
     if ($('#bolsitasSi').is(':checked')) {
       $('#cantidadBolsitas').show();
     } else {
       $('#cantidadBolsitas').hide();
     }
   });
 
   $('input[name="centrosMesa"]').change(function() {
     if ($('#centrosSi').is(':checked')) {
       $('#cantidadCentros').show();
     } else {
       $('#cantidadCentros').hide();
     }
   });
 
   // Validación del formulario
   $('form').submit(function(event) {
     var isValid = true;
 
     if ($('#temaPinata').val() === '') {
       isValid = false;
       alert('Por favor, ingresa el tema o personaje.');
     }
 
     if ($('#nombreCliente').val() === '') {
       isValid = false;
       alert('Por favor, ingresa tu nombre completo.');
     }
 
     if ($('#emailCliente').val() === '') {
       isValid = false;
       alert('Por favor, ingresa tu correo electrónico.');
     }
 
     if (!isValid) {
       event.preventDefault(); // Evitar el envío del formulario si no es válido
     }
   });
 });