$(document).ready(function() {
// Splash screen
  $('.container').delay('3000').fadeIn('slow');

  var markers = [];
  var myMap = initMap();

//Função que ouve o click do restaurante
  $('#filter-button').on('click', function() {
    var filter = $('#filter-text').val();
    var restaurants = filterRestaurants(filter);
    showRestaurants(myMap, markers, restaurants);
  });

// Associa os data-attributes ao modal
  $('#restaurant-modal').on('show.bs.modal', function(event) {
    var origin = $(event.relatedTarget); //ao clicar na img
    var name = origin.data('name');
    var description = origin.data('description');
    var image = origin.data('image');
    var modal = $(this);
    modal.find('#restaurant-modal-label').text(name);
    modal.find('#restaurant-modal-img').attr('src', image);
    modal.find('#restaurant-modal-description').text(description);
  });
  
// Reinicia fotos e marcadores ao fechar o modal
  $('#restaurant-modal').on('hidden.bs.modal', function(event) {
    initState();
  })
  initState();
});

// Inicializa o mapa fazendo um filtro vazio
function initState() {
  $('#filter-text').val('');
  $('#filter-button').trigger('click');
}

// Desenha o mapa
function initMap() {
  console.log('initMap');
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -23.5576364,
      lng: -46.6628473
    },
    zoom: 14
  });
  return map;
}

// Filtra restaurantes de acordo com a palavra inserida no input
function filterRestaurants(filter) {
  var filteredList = $.grep(restaurantes, function(r, i) {
    if (filter === '') {
      return true;
    }
    else {
      return (r.type === filter);
    }
  })
  return filteredList;
}

// Mostra marcadores e fotos
function showRestaurants(mapa, markers, filteredList) {
  clearMarkers(markers);
  showMarkers(mapa, markers, filteredList);
  showPics(filteredList);
}

// Mostra marcadores no mapa
function showMarkers(mapa, markers, list) {
  list.forEach(function(restaurant) {
    var conf = {
      position: new google.maps.LatLng(
        restaurant.latitude,
        restaurant.longitude
      ),
      type: 'info'
    };
    var marker = new google.maps.Marker({
      position: conf.position,
      map: mapa
    });
    markers.push(marker);
  });
}

// Limpa os marcadores do mapa
function clearMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

// Insere as fotos dos restaurantes no container e as propriedades utilizadoas pelo modal
function showPics(restaurants) {
  var container = $('#restaurant-pics');
  container.html('');
  for (restaurant of restaurants) {
    var newImg = $('<img />', {
      class: 'img-thumbnail w-25',
      src: restaurant.image,
      alt: restaurant.name,
      'data-toggle': 'modal',
      'data-target': '#restaurant-modal',
      'data-name': restaurant.name,
      'data-description': restaurant.description,
      'data-image': restaurant.image
    });
    newImg.appendTo(container);
  }
}
