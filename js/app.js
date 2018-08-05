$(document).ready(function() {
  console.log('ready');

  var markers = [];
  var myMap = initMap();

  $('#filter-button').on('click', function() {
    console.log('clickListener');

    var filter = $('#filter-text').val();
    var restaurants = filterRestaurants(filter);
    showRestaurants(myMap, markers, restaurants);
  });

  $('#filter-button').trigger('click');

  console.log('end ready');
});


//Função que desenha o mapa

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

function filterRestaurants(filter) {
  console.log('filterRestaurants');
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

//mostra marcadores e fotos
function showRestaurants(mapa, markers, filteredList) {
  console.log('showRestaurants')
  clearMarkers(markers);
  showMarkers(mapa, markers, filteredList);
  console.log(filteredList);
}

function showMarkers(mapa, markers, list) {
  console.log('showMarkers');
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

function clearMarkers(markers) {
  console.log('clearMarkers');
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showPics() {
  
}
