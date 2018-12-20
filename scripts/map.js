let transportMode = 'foot-walking'
let zdsLayer = null
let isoLayers = null

const map = L.map('map', { zoomControl: false }).setView([-1.669686, 23.642578], 5)
const streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2FydG9saXZpZXIiLCJhIjoiY2ptN2F4Y2huMDFqMjNrbW1oM2Z0cmJnayJ9.hgdKRVi2rOaI1LRAq-oj7A'
}).addTo(map)

new L.Control.Zoom({ position: 'topright' }).addTo(map)

// Change on area  selector
$(document).on('change','#zds',function(){
    const selection = $('#zds').val()
    showZDS(selection);
});
// Change on transport mode selector
$(document).on('change','#transport_mode',function(){
    transportMode = $('#transport_mode').val()
    showISO(transportMode)
});

const myIcon = L.icon({
  iconUrl: 'static/img/hospital.png',
  iconSize: [32, 32],
});


function showZDS(pcode){

  if (map.hasLayer(zdsLayer)) {
    map.removeLayer(zdsLayer)
  }
  zdsLayer = L.layerGroup()

  const myStyle = {
    "weight": 4,
    "color": "#fff",
    "opacity": 0.7,
    "fillColor": "#fff",
    "fillOpacity": 0
  };

  const customLayer1 = L.geoJson(null, {
      style: myStyle
  })
  const zds = omnivore.geojson('data/zone_sante.geojson', null, customLayer1)
  zds.addTo(zdsLayer)
  map.fitBounds([
    [-5.905653, 28.02063],
    [-6.810535, 29.516144]
  ]);

  const customLayer2 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: myIcon});
  }})
  const healthCenters = omnivore.geojson('data/health_center.geojson', null, customLayer2)
  healthCenters.addTo(zdsLayer)
  zdsLayer.addTo(map)
  showISO(transportMode)
  fillInfo(pcode)
}


function showISO(mode){
  if (map.hasLayer(isoLayers)) {
    map.removeLayer(isoLayers)
  }
  isoLayers = L.layerGroup()
  if (mode == 'foot-walking') {
    const myStyle1 = {
      "weight": 1,
      "color": "#8AEAB7",
      "opacity": 0.7,
      "fillColor": "#8AEAB7",
      "fillOpacity": 0.6
    };
    const myStyle2 = {
      "weight": 1,
      "color": "#15d670",
      "opacity": 0.7,
      "fillColor": "#15d670",
      "fillOpacity": 0.6
    };
    const myStyle3 = {
      "weight": 1,
      "color": "#ee973e",
      "opacity": 0.7,
      "fillColor": "#ee973e",
      "fillOpacity": 0.6
    };
    const myStyle4 = {
      "weight": 1,
      "color": "#F34A41",
      "opacity": 0.7,
      "fillColor": "#F34A41",
      "fillOpacity": 0.6
    };
    const myStyle5 = {
      "weight": 1,
      "color": "#C0170E",
      "opacity": 0.7,
      "fillColor": "#C0170E",
      "fillOpacity": 0.6
    };

    const customLayer1 = L.geoJson(null, {
        style: myStyle1
    })
    const pieton900 = omnivore.geojson('data/pieton_900.geojson', null, customLayer1).addTo(isoLayers)
    const customLayer2 = L.geoJson(null, {
        style: myStyle2
    })
    const pieton1800 = omnivore.geojson('data/differences/pieton_1800.geojson', null, customLayer2).addTo(isoLayers)
    const customLayer3 = L.geoJson(null, {
        style: myStyle3
    })
    const pieton3600 = omnivore.geojson('data/differences/pieton_3600.geojson', null, customLayer3).addTo(isoLayers)
    const customLayer4 = L.geoJson(null, {
        style: myStyle4
    })
    const pieton14400 = omnivore.geojson('data/differences/pieton_14400.geojson', null, customLayer4).addTo(isoLayers)
    const customLayer5 = L.geoJson(null, {
        style: myStyle5
    })
    const pieton28800 = omnivore.geojson('data/differences/pieton_28800.geojson', null, customLayer5).addTo(isoLayers)
  }
  else if (mode == 'cycling-regular') {
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
      "color": "#F34A41",
      "opacity": 0.7,
      "fillColor": "#F34A41",
      "fillOpacity": 0.6
    };
    const myStyle4 = {
      "weight": 1,
      "color": "#C0170E",
      "opacity": 0.7,
      "fillColor": "#C0170E",
      "fillOpacity": 0.6
    };
    const customLayer1 = L.geoJson(null, {
        style: myStyle1
    })
    const velo900 = omnivore.geojson('data/velo_900.geojson', null, customLayer1).addTo(isoLayers)
    const customLayer2 = L.geoJson(null, {
        style: myStyle2
    })
    const velo1800 = omnivore.geojson('data/differences/velo_1800.geojson', null, customLayer2).addTo(isoLayers)
    const customLayer3 = L.geoJson(null, {
        style: myStyle3
    })
    const velo3600 = omnivore.geojson('data/differences/velo_3600.geojson', null, customLayer3).addTo(isoLayers)
    const customLayer4 = L.geoJson(null, {
        style: myStyle4
    })
    const velo14400 = omnivore.geojson('data/differences/velo_14400.geojson', null, customLayer4).addTo(isoLayers)
  }
  else if (mode == 'driving-car') {
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
      "color": "#C0170E",
      "opacity": 0.7,
      "fillColor": "#C0170E",
      "fillOpacity": 0.6
    };
    const customLayer1 = L.geoJson(null, {
        style: myStyle1
    })
    const voiture900 = omnivore.geojson('data/voiture_900.geojson', null, customLayer1).addTo(isoLayers)
    const customLayer2 = L.geoJson(null, {
        style: myStyle2
    })
    const voiture1800 = omnivore.geojson('data/differences/voiture_1800.geojson', null, customLayer2).addTo(isoLayers)
    const customLayer3 = L.geoJson(null, {
        style: myStyle3
    })
    const voiture3600 = omnivore.geojson('data/differences/voiture_3600.geojson', null, customLayer3).addTo(isoLayers)
  }
    isoLayers.addTo(map)
}

function fillInfo(pcode){
  let string = `<div class="col-10 offset-1 legend-title">
    <span>Kalemie</span>
  </div>
  <div class="col-12 text-center pop-infos">
    <strong>Estimated population : 90163 people</strong>
  </div>
  <div class="col-12 text-center pop-infos">
    <strong>Health centers : 28</strong>
  </div>
  <div class="col-12 text-center pop-infos">
    <div id="accordion">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <strong>Car Accessibility</strong>
            </button>
          </h5>
        </div>
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            <table class="table table-infor">
              <thead>
                <tr>
                  <th scope="col">Time distance</th>
                  <th scope="col">Concerned people</th>
                  <th scope="col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15 min</td>
                  <td>79500</td>
                  <td>88,23 %</td>
                </tr>
                <tr>
                  <td>30 min</td>
                  <td>80336</td>
                  <td>89,10 %</td>
                </tr>
                <tr>
                  <td>1 hour</td>
                  <td>80503</td>
                  <td>89,29 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>Cycle Accessibility</strong>
            </button>
          </h5>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
          <div class="card-body">
            <table class="table table-infor">
              <thead>
                <tr>
                  <th scope="col">Time distance</th>
                  <th scope="col">Concerned people</th>
                  <th scope="col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15 min</td>
                  <td>80184</td>
                  <td>88,93 %</td>
                </tr>
                <tr>
                  <td>30 min</td>
                  <td>82019</td>
                  <td>90,96 %</td>
                </tr>
                <tr>
                  <td>1 hour</td>
                  <td>82114</td>
                  <td>91,07 %</td>
                </tr>
                <tr>
                  <td>4 hour</td>
                  <td>82354</td>
                  <td>91,33 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>Foot Accessibility</strong>
            </button>
          </h5>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
          <div class="card-body">
            <table class="table table-infor">
              <thead>
                <tr>
                  <th scope="col">Time distance</th>
                  <th scope="col">Concerned people</th>
                  <th scope="col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15 min</td>
                  <td>77725</td>
                  <td>86,20 %</td>
                </tr>
                <tr>
                  <td>30 min</td>
                  <td>80169</td>
                  <td>88,91 %</td>
                </tr>
                <tr>
                  <td>1 hour</td>
                  <td>80495</td>
                  <td>89,28 %</td>
                </tr>
                <tr>
                  <td>4 hour</td>
                  <td>82293</td>
                  <td>91,27 %</td>
                </tr>
                <tr>
                  <td>8 hour</td>
                  <td>82437</td>
                  <td>91,43 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`
  $('.legend-panel').html(string)



  if (!$('.opened').is(':hidden')){
    showMenu()
  }
}
