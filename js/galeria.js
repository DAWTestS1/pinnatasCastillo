$(document).ready(function () {
    // Cargar productos desde el archivo JSON
    $.getJSON('productos.json', function (data) {
      const productos = data.productos;
      const $productList = $('#product-list');
  
      // Limpiar cualquier contenido previo
      $productList.empty();
  
      // Iterar sobre los productos y generar HTML dinámico
      productos.forEach(producto => {
        const productHTML = `
          <div class="col-sm-6 col-lg-4 all ${producto.categoria}">
            <div class="box" id="galeriaBox">
              <div>
                <div class="img-box" id="imgGaleria">
                  <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="detail-box" id="detailGaleria">
                  <h5>${producto.nombre}</h5>
                  <p>${producto.descripcion}</p>
                  <div class="options">
                    <h6>$${producto.precio}</h6>
                    <a href="#" class="btn btn-warning rounded-circle p-2">
                      <i class="bi bi-cart-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        $productList.append(productHTML); // Agregar el producto al contenedor
      });

        

     // Función para abrir el pop-up al hacer clic en una imagen
    $('.img-box img').on('click', function () {
      const imageSrc = $(this).attr('src'); // Obtener la URL de la imagen
      $('#popup-image').attr('src', imageSrc); // Configurar la imagen en el pop-up
      $('#popup-container').css('display', 'flex'); // Mostrar el pop-up
    });
  });


    $('.filters_pinnatas .nav-link').on('click', function () {
      const filter = $(this).data('filter'); // Obtén el filtro seleccionado
  
      // Cambia la clase activa
      $('.filters_pinnatas .nav-link').removeClass('active');
      $(this).addClass('active');
  
      if (filter === '*') {
        // Mostrar todos los productos si se selecciona "All"
        $('.producto').show();
      } else {
        // Mostrar solo los productos que coincidan con el filtro
        $('.producto').hide(); // Oculta todos
        $(filter).fadeIn(); // Muestra los que coinciden
      }
    });
  });
   // Función para cerrar el pop-up
  $('#close-popup').on('click', function () {
    $('#popup-container').css('display', 'none'); // Ocultar el pop-up
  });

  // Cerrar el pop-up al hacer clic fuera de la imagen
  $('#popup-container').on('click', function (e) {
    if (e.target === this) {
      $(this).css('display', 'none'); // Ocultar el pop-up
    }
  });

  