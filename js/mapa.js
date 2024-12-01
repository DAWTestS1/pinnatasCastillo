const placeInput = document.getElementById("place-input");
let map;
let autocomplete;
let marker1;
let marker2;
let directionsService;
let directionsRenderer;
let infoWindow1;  // Variable para almacenar el infowindow del marcador inicial
let distanceInfoWindow;  // InfoWindow para mostrar la distancia




// Método para cargar el mapa con una posición inicial y borrar datos anteriores
window.initMap = function() {
    const coords = { lat: 9.975665, lng: -84.214561 };
    map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 11,
        center: coords
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true  // Evita que DirectionsRenderer agregue sus propios marcadores
    });
    directionsRenderer.setMap(map);

    // Borra el marcador del autocompletado y rutas previas si existen
    if (marker2) {
        marker2.setMap(null);
        marker2 = null;
    }
    directionsRenderer.set('directions', null);

    // Crear y mostrar el marcador inicial en la posición predeterminada
    marker1 = new google.maps.Marker({
        position: coords,
        map: map,
    });

     // Crear un infowindow para el marcador inicial con el nombre deseado
     infoWindow1 = new google.maps.InfoWindow({
        content: "<strong>Piñatas Castillo</strong>",  // Texto del marcador inicial
    });
    infoWindow1.open(map, marker1);  // Abre el infowindow en el marcador inicial

    searchGoogleMap(map);    
    getYourAproxLocation(map);

     // Evento de clic en el mapa para seleccionar el marcador 2
     map.addListener("click", (e) => {
        // Si ya existe un marcador 2, lo eliminamos
        if (marker2) {
            marker2.setMap(null);
        }

        // Crear el nuevo marcador en la posición del clic
        marker2 = new google.maps.Marker({
            position: e.latLng,
            map: map,
        });
        // Limpiar la ruta trazada
        directionsRenderer.set("directions", null);       
        placeInput.value="";
    });
}

const searchGoogleMap = (map) => {
    autocomplete = new google.maps.places.Autocomplete(placeInput);
    autocomplete.addListener("place_changed", () => {
        if (marker2) {
            marker2.setMap(null);
        }
        
        const place = autocomplete.getPlace();
        map.setCenter(place.geometry.location);
        map.setZoom(13);
        marker2 = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
        });
    });
}

// Método para obtener la localización actual
const getYourAproxLocation = (map) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                const coords = {
                    lat: latitude,
                    lng: longitude
                };
                
                map.setCenter(coords);
                map.setZoom(12);

                if (marker2) {
                    marker2.setMap(null);
                }
                
                marker2 = new google.maps.Marker({
                    position: coords,
                    map: map,
                });
            },
            () => {
                alert("El navegador tiene localización, pero ocurrió un error al obtener la ubicación.");
            }
        );
    } else {
        alert("No se cuenta con localización.");
    }
}

// Agregar el evento al botón calcular para calcular la ruta solo si ambas ubicaciones están definidas
document.getElementById("calc").addEventListener("click", () => {
    if (marker1 && marker2) {
        caclRuta();
    } else {
        alert("Por favor, selecciona un destino para calcular la ruta.");
    }
});

function caclRuta() {
    const request = {
        origin: marker1.getPosition(),
        destination: marker2.getPosition(),
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            
             // Calcular la distancia
             const distance = google.maps.geometry.spherical.computeDistanceBetween(
                marker1.getPosition(),
                marker2.getPosition()
            );

            // Mostrar la distancia en un InfoWindow en el medio de la ruta
            if (!distanceInfoWindow) {
                distanceInfoWindow = new google.maps.InfoWindow();
            }
            const midpoint = {
                lat: (marker1.getPosition().lat() + marker2.getPosition().lat()) / 2,
                lng: (marker1.getPosition().lng() + marker2.getPosition().lng()) / 2
            };
            distanceInfoWindow.setPosition(midpoint);
            const getMapSize = () => {
                const mapContainer = document.getElementById("googleMap"); // Contenedor del mapa
                const mapWidth = mapContainer.offsetWidth; // Obtener el ancho
                const mapHeight = mapContainer.offsetHeight; // Obtener la altura
                
                return { mapWidth, mapHeight };
            }
            distanceInfoWindow.setContent(`
                <div style="
                    max-width: ${getMapSize().mapWidth * 0.7}px; /* 70% del ancho del mapa */
                    min-width: 150px;
                    padding: 10px; 
                    background-color: white; 
                    border-radius: 8px;                     
                    font-family: Arial, sans-serif; 
                    color: #333;
                    text-align: center;
                    font-size: 14px;">
                    <strong style="color: #007BFF;">Distancia:</strong> ${(distance / 1000).toFixed(2)} km
                </div>
            `);        
                
            distanceInfoWindow.open(map);
            
        } else {
            alert("No se pudo encontrar una ruta.");
        }
    });
}

