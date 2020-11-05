import { provincias, red_vial, espejo_de_agua_hid, veg_arborea, veg_cultivos, veg_hidrofila, edif_construcciones_turisticas } from '../layers';

export const CATEGORIAS = {
    habitacional: { title: "Habitacional y Cultural", capas: {} },
    hidrografia: { title: "Hidrografía", capas: {} },
    instituciones: { title: "Inst. Públicas y de Seguiridad", capas: {} },
    limite: { title: "Límite Político", capas: { provincias } },
    relieve: { title: "Relieve", capas: {} },
    suelos: { title: "Suelos", capas: {} },
    transporte: { title: "Transporte", capas: { red_vial } },
    vegetacion: { title: "Vegetación", capas: {} },
    otros: { title: "Otros", capas: {} },
}