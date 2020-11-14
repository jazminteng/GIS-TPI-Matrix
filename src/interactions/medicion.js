import Overlay from 'ol/Overlay'
import Draw from 'ol/interaction/Draw'
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style'
import { Vector as VectorSource } from 'ol/source';
import { getLength } from 'ol/sphere';


// Defino el mensaje de ayuda a mostrarse
var helpTooltipElement = document.createElement('p');

var helpTooltip;
helpTooltipElement = document.createElement('div');
helpTooltipElement.className = 'ol-tooltip';
helpTooltip = new Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left',
});


// Si el puntero se mueve, cambio la posicion del mensaje de ayuda
var pointerMoveHandler = function (evt) {
    if (evt.dragging) {
        return;
    }

    var helpMsg = 'Click to start drawing';

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

};


// Defino el dibujito de la linea y el circulito
const draw = new Draw({
    source: new VectorSource(),
    type: 'LineString',
    style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2,
        }),
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 0.7)',
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
        }),
    }),
});


// Mensajito del kilometraje del vehiculo
var measureTooltipElement = document.createElement('div');
measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
const measureTooltip = new Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center',
});


// Formateo el kilometraje
var formatLength = function (line) {
    var length = getLength(line);
    var output = Math.round(length * 10000) / 100 + ' ' + 'km';
    return output;
};
// Este actualiza el mensajito del kilometraje cuando se empieza a dibujar
draw.on('drawstart', function (evt) {
    helpTooltipElement.classList.add('hidden');
    var sketch = evt.feature;
    sketch.getGeometry().on('change', function (evt) {
        var geom = evt.target;
        var tooltipCoord = geom.getLastCoordinate();
        measureTooltipElement.innerHTML = formatLength(geom);
        measureTooltip.setPosition(tooltipCoord);
    });
});

export { helpTooltip, pointerMoveHandler, measureTooltip, draw }

