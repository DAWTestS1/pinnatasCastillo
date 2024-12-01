$(document).ready(function () {
    // Cargar productos desde el archivo JSON
    $.getJSON('productos.json', function (data) {
      const productos = data.productos;
      
      // Dividir productos por categoría
      const piñatas = productos.filter(p => p.categoria === 'pinnata');
      const centrosDeMesa = productos.filter(p => p.categoria === 'Decoracion');
      const bolsitas = productos.filter(p => p.categoria === 'Bolsitas');
  
      // Función para obtener 3 productos aleatorios de una categoría
      function getRandomProducts(categoryArray) {
        const shuffled = categoryArray.sort(() => 0.5 - Math.random()); // Mezcla aleatoria
        return shuffled.slice(0, 3); // Toma los primeros 3 elementos
      }
  
      // Obtener 3 productos aleatorios de cada categoría
      const selectedPiñatas = getRandomProducts(piñatas);
      const selectedCentrosDeMesa = getRandomProducts(centrosDeMesa);
      const selectedBolsitas = getRandomProducts(bolsitas);
  
      // Combina los 3 arrays
      const selectedProducts = selectedPiñatas.concat(selectedCentrosDeMesa, selectedBolsitas);
  
      const $productList = $('#product-list');
      $productList.empty(); // Limpiar cualquier contenido previo
  
      // Iterar sobre los productos seleccionados y generar HTML dinámico
      selectedProducts.forEach(producto => {
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
    });
  });
  