import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const layer = new Tile({ source: new OSM() })

export default layer;