import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import url from '../cfg/url';

const layer = new Tile({ 
	source: new TileWMS({
    url: url,
    params: {
      'LAYERS': ['provincias'],
      'TRANSPARENT': false,
    },
    serverType: 'qgis'                                         
  }),
  opacity: 0.6,
  brightness: 0.2
})

export default layer;