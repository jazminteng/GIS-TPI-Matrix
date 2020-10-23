import TileWMS_base from './TileWMS_base'




const provincias = TileWMS_base("provincias");
const red_vial = TileWMS_base("red_vial");
const espejo_de_agua_hid = TileWMS_base("espejo_de_agua_hid");




// export { default as Vector_Paises } from './countries';
export { default as osm_default } from './osm_default';

export { provincias, red_vial, espejo_de_agua_hid };