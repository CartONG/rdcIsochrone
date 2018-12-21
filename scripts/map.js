let transportMode = 'foot-walking'
let zds = null
let zdsLayer = null
let isoLayers = null

const map = L.map('map', { zoomControl: false }).setView([-1.669686, 23.642578], 5)
const streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2FydG9saXZpZXIiLCJhIjoiY2ptN2F4Y2huMDFqMjNrbW1oM2Z0cmJnayJ9.hgdKRVi2rOaI1LRAq-oj7A'
}).addTo(map)

new L.Control.Zoom({ position: 'topright' }).addTo(map)


$("#transport_mode").prop("disabled", true);
// Change on area  selector
$(document).on('change','#zds',function(){
    zds = $('#zds').val()
    showZDS(zds);
    $("#transport_mode").prop("disabled", false);
    $('#transport_mode').selectpicker('refresh');
});
// Change on transport mode selector
$(document).on('change','#transport_mode',function(){
    transportMode = $('#transport_mode').val()
    showISO(zds)
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
  const zds = omnivore.geojson('data/'+pcode+'_zone_sante.geojson', null, customLayer1)
  zds.addTo(zdsLayer)
  map.fitBounds(eval('informations.'+pcode+'.bbox'));

  const customLayer2 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: myIcon});
  }})
  const healthCenters = omnivore.geojson('data/'+pcode+'_health_center.geojson', null, customLayer2)
  healthCenters.addTo(zdsLayer)
  zdsLayer.addTo(map)
  showISO(pcode)
}


function showISO(pcode){
  console.log(pcode);
  if (map.hasLayer(isoLayers)) {
    map.removeLayer(isoLayers)
  }
  isoLayers = L.layerGroup()
  if (transportMode == 'foot-walking') {
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
    const pieton900 = omnivore.geojson('data/'+pcode+'_pieton_900.geojson', null, customLayer1).addTo(isoLayers)
    const customLayer2 = L.geoJson(null, {
        style: myStyle2
    })
    const pieton1800 = omnivore.geojson('data/differences/'+pcode+'_pieton_1800.geojson', null, customLayer2).addTo(isoLayers)
    const customLayer3 = L.geoJson(null, {
        style: myStyle3
    })
    const pieton3600 = omnivore.geojson('data/differences/'+pcode+'_pieton_3600.geojson', null, customLayer3).addTo(isoLayers)
    const customLayer4 = L.geoJson(null, {
        style: myStyle4
    })
    const pieton14400 = omnivore.geojson('data/differences/'+pcode+'_pieton_14400.geojson', null, customLayer4).addTo(isoLayers)
    const customLayer5 = L.geoJson(null, {
        style: myStyle5
    })
    const pieton28800 = omnivore.geojson('data/differences/'+pcode+'_pieton_28800.geojson', null, customLayer5).addTo(isoLayers)
  }
  else if (transportMode == 'cycling-regular') {
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
    const velo900 = omnivore.geojson('data/'+pcode+'_velo_900.geojson', null, customLayer1).addTo(isoLayers)
    const customLayer2 = L.geoJson(null, {
        style: myStyle2
    })
    const velo1800 = omnivore.geojson('data/differences/'+pcode+'_velo_1800.geojson', null, customLayer2).addTo(isoLayers)
    const customLayer3 = L.geoJson(null, {
        style: myStyle3
    })
    const velo3600 = omnivore.geojson('data/differences/'+pcode+'_velo_3600.geojson', null, customLayer3).addTo(isoLayers)
    const customLayer4 = L.geoJson(null, {
        style: myStyle4
    })
    const velo14400 = omnivore.geojson('data/differences/'+pcode+'_velo_14400.geojson', null, customLayer4).addTo(isoLayers)
  }
  else if (transportMode == 'driving-car') {
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
    const voiture900 = omnivore.geojson('data/'+pcode+'_voiture_900.geojson', null, customLayer1).addTo(isoLayers)
    const customLayer2 = L.geoJson(null, {
        style: myStyle2
    })
    const voiture1800 = omnivore.geojson('data/differences/'+pcode+'_voiture_1800.geojson', null, customLayer2).addTo(isoLayers)
    const customLayer3 = L.geoJson(null, {
        style: myStyle3
    })
    const voiture3600 = omnivore.geojson('data/differences/'+pcode+'_voiture_3600.geojson', null, customLayer3).addTo(isoLayers)
  }
    isoLayers.addTo(map)
    fillInfo(pcode)
}

function fillInfo(pcode){
  console.log(pcode);
  let string = `<div class="col-10 offset-1 legend-title">
    <span>`+eval('informations.'+zds+'.nom')+`</span>
  </div>
  <div class="col-12 text-center pop-infos">
    <strong>Estimated population : `+eval('informations.'+zds+'.population')+` people</strong>
  </div>
  <div class="col-12 text-center pop-infos">
    <strong>Health centers : `+eval('informations.'+zds+'.healthCenters')+`</strong>
  </div>
  <div class="col-12 text-center pop-infos">
    <div id="accordion">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">`
          if (transportMode == 'driving-car') {
            string += '<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'
          } else {
            string += '<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">'
          }
            string += `<strong>Car Accessibility</strong>
            </button>
          </h5>
        </div>`
        if (transportMode == 'driving-car') {
          string += '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">'
        } else {
          string += '<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">'
        }
        string += `<div class="card-body">
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
                  <td><div class='legend-square'><div class="square1800"></div>15 min</div></td>
                  <td>`+eval('informations.'+zds+'.stats.car[0]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.car[0]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square3600"></div>30 min</div></td>
                  <td>`+eval('informations.'+zds+'.stats.car[1]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.car[1]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square28800"></div>1 hour</div></td>
                  <td>`+eval('informations.'+zds+'.stats.car[2]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.car[2]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">`
          if (transportMode == 'cycling-regular'){
            string += '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">'
          } else {
            string += '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">'
          }
            string += `<strong>Cycle Accessibility</strong>
            </button>
          </h5>
        </div>`
        if (transportMode == 'cycling-regular'){
          string += '<div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">'
        } else {
          string += '<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">'
        }
        string += `<div class="card-body">
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
                  <td><div class='legend-square'><div class="square1800"></div>15 min</div></td>
                  <td>`+eval('informations.'+zds+'.stats.cycle[0]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.cycle[0]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square3600"></div>30 min</div></td>
                  <td>`+eval('informations.'+zds+'.stats.cycle[1]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.cycle[1]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square14400"></div>1 hour</div></td>
                  <td>`+eval('informations.'+zds+'.stats.cycle[2]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.cycle[2]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square28800"></div>4 hour</div></td>
                  <td>`+eval('informations.'+zds+'.stats.cycle[3]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.cycle[3]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">`
          if (transportMode == 'foot-walking'){
            string += '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">'
          } else {
            string += '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">'
          }
          string += `<strong>Foot Accessibility</strong>
            </button>
          </h5>
        </div>`
        if (transportMode == 'foot-walking'){
          string += '<div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordion">'
        } else {
          string += '<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">'
        }
        string += `<div class="card-body">
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
                  <td><div class='legend-square'><div class="square900"></div>15 min</div></td>
                  <td>`+eval('informations.'+zds+'.stats.foot[0]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.foot[0]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square1800"></div>30 min</div></td>
                  <td>`+eval('informations.'+zds+'.stats.foot[1]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.foot[1]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square3600"></div>1 hour</div></td>
                  <td>`+eval('informations.'+zds+'.stats.foot[2]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.foot[2]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square14400"></div>4 hour</div></td>
                  <td>`+eval('informations.'+zds+'.stats.foot[3]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.foot[3]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
                <tr>
                  <td><div class='legend-square'><div class="square28800"></div>8 hour</div></td>
                  <td>`+eval('informations.'+zds+'.stats.foot[4]')+`</td>
                  <td>`+eval('Math.round(informations.'+zds+'.stats.foot[4]/informations.'+zds+'.population*100)')+` %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    To get more informations on isochrones calculation (average speed on each way type), read the <a href="https://github.com/GIScience/openrouteservice-docs" target="_blank">ORS Documentation</a>
  </div>`
  $('.app-presentation').hide()
  $('#zds-info').html(string)

  if (!$('.opened').is(':hidden')){
    showMenu()
  }
}

let informations = {
  CD7402ZS01:{
    nom: 'Kalemie',
    population: 90163,
    healthCenters: 28,
    bbox: [[-5.905653, 28.02063],[-6.810535, 29.516144]],
    stats: {
      foot:[77725, 80169, 80495, 82293, 82437],
      cycle: [80184, 82019, 82114, 82354],
      car: [79500, 80336, 80503],
    }
  },
  CD6210ZS01:{
    nom: 'Fizi',
    population: 283890,
    healthCenters: 36,
    bbox: [[-3.812187, 28.649597],[-5.036227, 29.424133]],
    stats: {
      foot:[100157, 131723, 152939, 206625, 208225],
      cycle: [146011, 165517, 189400, 208787],
      car: [163837, 193063, 202871],
    }
  },
}
