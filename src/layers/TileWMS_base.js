import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import url from '../cfg/url';

const TileWMS_base = (nombre_capa) => {
    const capa = new Tile({
        source: new TileWMS({
            url: url,
            params: {
                'LAYERS': [nombre_capa],
                'TRANSPARENT': true
            },
            serverType: 'qgis'
        })
    })
    return capa;
}

export default TileWMS_base;