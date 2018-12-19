const map = L.map('map', { zoomControl: false }).setView([-1.669686, 23.642578], 5)
const streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2FydG9saXZpZXIiLCJhIjoiY2ptN2F4Y2huMDFqMjNrbW1oM2Z0cmJnayJ9.hgdKRVi2rOaI1LRAq-oj7A'
}).addTo(map)

// Change on area mode selector
$(document).on('change','#transport_mode',function(){
    const selection = $('#transport_mode').val()
    getISO(selection);
});

async function getISO(mode){
  try {
    const response = await axios.get('https://api.openrouteservice.org/isochrones?api_key=5b3ce3597851110001cf6248edbd93501e3346eeb81f1570b81d29ff&locations=29.0700847,-2.0704033&profile='+mode+'&range=900,1800,3600&smoothing=0.5&options=%7Bmaximum_speed:70%7D');
    showOnMap(response.data.features);
  } catch (error) {
    console.error(error);
  }
}

let isoLayers
function showOnMap(jsonArray){
  if (map.hasLayer(isoLayers)) {
    map.removeLayer(isoLayers)
  }
  isoLayers = L.layerGroup()
  const myStyle1 = {
    "weight": 1,
    "color": "#15d670",
    "opacity": 0.7,
    "fillColor": "#15d670",
    "fillOpacity": 0.6
  };
  const myStyle2 = {
    "weight": 1,
    "color": "#ee973e",
    "opacity": 0.7,
    "fillColor": "#ee973e",
    "fillOpacity": 0.6
  };
  const myStyle3 = {
    "weight": 1,
    "color": "#f01d12",
    "opacity": 0.7,
    "fillColor": "#f01d12",
    "fillOpacity": 0.6
  };
  console.log(jsonArray[0].geometry.coordinates);
  const customLayer1 = L.geoJson(jsonArray[0], {
      style: myStyle1
  }).addTo(isoLayers)
  // const customLayer2 = L.geoJson(jsonArray[1], {
  //     style: myStyle2
  // })

  let polygon1 = turf.polygon(jsonArray[0].geometry.coordinates, {
    "fill": "#F00",
    "fill-opacity": 0.1
  });
  let polygon2 = turf.polygon(jsonArray[1].geometry.coordinates, {
    "fill": "#00F",
    "fill-opacity": 0.1
  });
  let difference = turf.difference(polygon2, polygon1);
  const customLayer2 = L.geoJson(difference, {
      style: myStyle2
  }).addTo(isoLayers)

  polygon1 = turf.polygon(jsonArray[1].geometry.coordinates, {
    "fill": "#F00",
    "fill-opacity": 0.1
  });
  polygon2 = turf.polygon(jsonArray[2].geometry.coordinates, {
    "fill": "#00F",
    "fill-opacity": 0.1
  });
  difference = turf.difference(polygon2, polygon1);
  const customLayer3 = L.geoJson(difference, {
      style: myStyle3
  }).addTo(isoLayers)

  // const customLayer3 = L.geoJson(jsonArray[2], {
  //     style: myStyle3
  // }).addTo(isoLayers)
  map.addLayer(isoLayers)
}
