import ReactDOM from 'react-dom';
import React from 'react';

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

        this.view = new View({
            center: [-41925.302985762304, 4789880.268977703],
            zoom: 12,
            minZoom: 2,
            maxZoom: 28,
            projection: new Projection({
                code: 'EPSG:3857',
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

    render() {
        console.log('-> render App')
        return (
            <div id="mapContainer" ref="mapContainer"> </div>
        );
    }
}

