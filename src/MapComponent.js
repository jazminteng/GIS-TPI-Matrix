import ReactDOM from 'react-dom';
import React from 'react';
import { Button } from 'reactstrap';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';
import olMap from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Zoom from 'ol/control/Zoom';

require('ol/ol.css');

export default class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          count:0
        }
        this.countPlus = this.countPlus.bind(this);

        this.view = new View({
            center: [-58.986666666667,-27.451388888889],
            zoom: 30,
            minZoom: 19,
            maxZoom: 37,
            projection: new Projection({
                code: 'EPSG:4326',
                units: 'm'
            })
        });
    }

    componentDidMount() {
        this.map =  new olMap({
            view: this.view,
            controls: [ new Zoom() ],
            layers: [new Tile({ source: new OSM() })],
            target: this.refs.mapContainer
        });
    }

    countPlus(){
      this.setState({
        count: this.state.count+1
      });
    }

    render() {
        console.log('-> render App')
        return (
            <div>
              <h4> Mapa </h4>
              <p> Aqui va algun estado {this.state.count}</p>
              <Button color='primary' onClick={this.countPlus}> Count++ </Button>
              <div id="mapContainer" ref="mapContainer"> </div>
            </div>
        );
    }
}

