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
  })
})

export default layer;