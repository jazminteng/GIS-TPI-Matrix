import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import url from '../cfg/url';

const layer = new Tile({ 
	source: new TileWMS({
    url: url,
    params: {
      'LAYERS': ['provincias', 'edif_depor_y_esparcimiento'],
      'TRANSPARENT': true,
    },
    serverType: 'qgis'                                         
  }),
  opacity: 0.6,
  brightness: 0.2
})

export default layer;