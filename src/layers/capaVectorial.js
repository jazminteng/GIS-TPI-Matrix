import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source'

// Capa destinada a vectores
const vectorSource = new VectorSource({ wrapX: false });
const vectorLayer = new VectorLayer({
    source: vectorSource,
});

export { vectorSource, vectorLayer }
