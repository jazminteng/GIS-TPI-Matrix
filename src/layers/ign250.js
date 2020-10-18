import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

const layer = new Tile({ 
	source: new TileWMS({
    url: 'http://localhost/cgi-bin/qgis_mapserv.fcgi?map=/home/jt/UBUNTU-ISI20/openlayers/qgisserver-servicio/matrix.qgs',
    params: {
      'LAYERS': ['provincias', 'edif_depor_y_esparcimiento'],
      'TRANSPARENT': true,
    },
    serverType: 'qgis'                                         
  })
})

export default layer;