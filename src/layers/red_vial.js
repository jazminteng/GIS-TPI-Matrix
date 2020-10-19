import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import url from '../cfg/url';

const layer = new Tile({ 
	source: new TileWMS({
    url: url,
    params: {
      'LAYERS': ['red_vial'],
    },
    serverType: 'qgis'                                         
  }),
})

export default layer;