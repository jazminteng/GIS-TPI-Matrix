

import { Fill, RegularShape, Stroke, Style } from 'ol/style';

const estrellaStyle = [new Style({
    image: new RegularShape({
      fill: new Fill({ color: 'yellow' }),
      stroke: new Stroke({ color: 'black', width: 2 }),
      points: 5,
      radius: 10,
      radius2: 4,
      angle: 0
    })
  })];

export {estrellaStyle};