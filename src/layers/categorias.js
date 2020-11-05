import { pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, 
    sue_congelado, ejido, veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial,  
    limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel, curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene,
    muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas, puente_red_vial_puntos,
    otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias, 
    infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, 
    edificio_de_seguridad_ips, edificio_de_salud_ips, edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas,
    actividades_agropecuarias, edif_construcciones_turisticas, localidades } from '.';

export const CATEGORIAS = {
    habitacional: { title: "Habitacional y Cultural", capas: {edif_construcciones_turisticas, edif_depor_y_esparcimiento, edif_educacion, edif_religiosos, otras_edificaciones} },
    hidrografia: { title: "Hidrografía", capas: { curso_de_agua_hid, espejo_de_agua_hid, isla, pais_lim, obra_portuaria} },
    instituciones: { title: "Inst. Públicas y de Seguiridad", capas: {edificio_de_salud_ips, edificio_de_seguridad_ips, edificio_publico_ips} },
    limite: { title: "Límite Político", capas: { provincias, limite_politico_administrativo_lim, ejido, localidades } },
    relieve: { title: "Relieve", capas: {curvas_de_nivel, marcas_y_señales, puntos_de_alturas_topograficas, puntos_del_terreno } },
    suelos: { title: "Suelos", capas: {sue_congelado, sue_consolidado, sue_costero, sue_hidromorfologico, sue_no_consolidado } },
    transporte: { title: "Transporte", capas: { red_vial, edificios_ferroviarios, estructuras_portuarias, infraestructura_aeroportuaria_punto, infraestructura_hidro, muro_embalse, puente_red_vial_puntos, red_ferroviaria, salvado_de_obstaculo, señalizaciones, vias_secundarias } },
    vegetacion: { title: "Vegetación", capas: {veg_arborea, veg_arbustiva, veg_cultivos, veg_hidrofila, veg_suelo_desnudo} },
    otros: { title: "Otros", capas: {complejo_de_energia_ene, líneas_de_conducción_ene, actividades_economicas, actividades_agropecuarias, obra_de_comunicación} },
}