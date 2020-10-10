import { ScaleLine, defaults as defaultControls } from 'ol/control';

var scaleBarSteps = 4;
var scaleBarText = true;

export default function() {
    const control = new ScaleLine({
        bar: true,
        steps: scaleBarSteps,
        text: scaleBarText,
        minWidth: 140,
    });
    return control;
};