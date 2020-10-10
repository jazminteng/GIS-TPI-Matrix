import ReactDOM from 'react-dom';
import React from 'react';
import { Button } from 'reactstrap';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';
import olMap from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Zoom from 'ol/control/Zoom';
import {ScaleLine, defaults as defaultControls} from 'ol/control';

require('ol/ol.css');

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    this.moveToSaladas = this.moveToSaladas.bind(this);

  }

  componentDidMount() {
    const view = new View({
      center: [-58.986666666667, -27.451388888889],
      zoom: 30,
      minZoom: 19,
      maxZoom: 37,
      projection: new Projection({
        code: 'EPSG:4326',
        units: 'm'
      })
    });

    var scaleBarSteps = 4;
    var scaleBarText = true;

    function scaleControl() {
      const control = new ScaleLine({
        bar: true,
        steps: scaleBarSteps,
        text: scaleBarText,
        minWidth: 140,
      });
      return control;
    }


    this.map = new olMap({
      view: view,
      controls: [new Zoom(), scaleControl()],
      layers: [new Tile({ source: new OSM() })],
      target: this.refs.mapContainer
    });
  }

  moveToSaladas() {
    this.map.getView().setCenter([-58.625, -28.256]);
    this.map.getView().setZoom(33);
  }

  render() {
    console.log('-> render App')
    return (
      <div>
        <h4> Mapa </h4>
        <Button color='primary' onClick={this.moveToSaladas}> Vamos a Saladas? </Button>
        <div id="mapContainer" ref="mapContainer"> </div>
      </div>
    );
  }
}

