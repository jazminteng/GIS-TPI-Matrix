import { Tile as TileLayer, Image as ImageLayer } from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';

import url from '../cfg/url';

var layer = new ImageLayer({
  extent: [-13884991, 2870341, -7455066, 6338219],
  source: new ImageWMS({
    url: url,
    params: { 'LAYERS': 'matrix:provincias' },
    ratio: 1,
    serverType: 'geoserver',
  }),
});

export default layer;