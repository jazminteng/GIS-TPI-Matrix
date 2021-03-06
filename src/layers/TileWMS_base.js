import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { rutaServicio } from '../cfg/url';

const TileWMS_base = (titulo_capa, nombre_capa) => {
    const capa = new Tile({
        title: titulo_capa,
        visible: false,
        source: new TileWMS({
            url: rutaServicio,
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