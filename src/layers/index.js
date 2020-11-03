import TileWMS_base from './TileWMS_base';


const provincias = TileWMS_base("Provincias", "provincias");
const red_vial = TileWMS_base('Red vial', "red_vial");
const espejo_de_agua_hid = TileWMS_base("Espejo de agua", "espejo_de_agua_hid");
const veg_arborea = TileWMS_base('Vegetación arborea', 'veg_arborea');
const veg_cultivos = TileWMS_base('Vegetación cultivos', 'veg_cultivos');
const veg_hidrofila = TileWMS_base('Vegetación hidrofila', 'veg_hidrofila');
const edif_construcciones_turisticas = TileWMS_base('edif_construcciones_turisticas');


export { default as Vector_Paises } from './countries';
export { default as osm_default } from './osm_default';

export { provincias, red_vial, espejo_de_agua_hid, veg_arborea, veg_cultivos, veg_hidrofila, edif_construcciones_turisticas };