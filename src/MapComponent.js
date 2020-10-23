import React from 'react';
import { Button } from 'reactstrap';

// Objetos OpenLayers
import olMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';

//Funciones OpenLayers
import { toStringHDMS } from 'ol/coordinate';
import Overlay from 'ol/Overlay';
// import { transform } from 'ol/proj';

// Interacciones
import { DragBox, Select } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';

// Capas
import { osm_default, provincias, red_vial, espejo_de_agua_hid, veg_arborea, veg_cultivos, veg_hidrofila } from './layers';

// Controles
import { scaleControl } from './controls';
// import { ZoomToExtent } from 'ol/control'

// require('ol/ol.css'); no hace falta esto aca xd

import NavBar from './components/Navbar'

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const view = new View({
      center: [-58.986666666667, -27.451388888889],
      zoom: 13,
      minZoom: 2,
      maxZoom: 20,
      projection: 'EPSG:4326',
    });

    this.map = new olMap({
      view: view,
      controls: [new Zoom(), scaleControl()],
      layers: [osm_default, provincias, veg_hidrofila],
      target: this.refs.mapContainer
    });

    /*
    var overlay = new Overlay({
      element: document.getElementById('overlay'),
      positioning: 'bottom-center'
    });
    // Mostrar coordenadas con click
    this.map.on('click', function (event) {
      // extract the spatial coordinate of the click event in map projection units
      var coord = event.coordinate;
      // transform it to decimal degrees
      //var degrees = transform(coord, 'EPSG:3857', 'EPSG:4326');
      // format a human readable version
      var hdms = toStringHDMS(coord);
      // update the overlay element's content
      var element = overlay.getElement();
      element.innerHTML = hdms;
      // position the element (using the coordinate in the map's projection)
      overlay.setPosition(coord);
      // and add it to the map
      console.log(this.map);
      map.addOverlay(overlay);
    });
    // Cajita con el Ctrl+Click
    var dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });
    map.addInteraction(dragBox);

    this.moveToSaladas = this.moveToSaladas.bind(this);
      moveToSaladas() {
    // this.map.getView().setCenter([-58.625, -28.256]);
    this.view.setCenter([-58.625, -28.256]);
    this.map.getView().setZoom(15);
  }
  */
  }

  // <h4> Mapa </h4>
  // <Button color='primary' onClick={this.moveToSaladas}> Vamos a Saladas? </Button>

  render() {
    console.log('-> render App')
    console.log(provincias);
    return (
      <div>

        {/* Navbar */}
        <NavBar />

        {/* Mapa */}
        <div id="mapContainer" ref="mapContainer"> </div>


        {/* Elemento para el click */}
        <div id="overlay"></div>

      </div>
    );
  }
}

