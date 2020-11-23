import TileWMS_base from './TileWMS_base';

const actividades_agropecuarias = TileWMS_base("Actividades Agropecuarias", "actividades_agropecuarias");
const actividades_economicas = TileWMS_base("Actividades Económicas", "actividades_economicas");
const complejo_de_energia_ene = TileWMS_base("Complejo de Enegía", "complejo_de_energia_ene");
const curso_de_agua_hid = TileWMS_base("Curso de Agua", "curso_de_agua_hid");
const curvas_de_nivel = TileWMS_base("Curvas de Nivel", "curvas_de_nivel");
const edif_construcciones_turisticas = TileWMS_base("Contrucciones Turísticas", "edif_construcciones_turisticas");
const edif_depor_y_esparcimiento = TileWMS_base("Deportes y Esparcimiento", "edif_depor_y_esparcimiento");
const edificio_de_salud_ips = TileWMS_base("Edificio de Salud", "edificio_de_salud_ips");
const edificio_de_seguridad_ips = TileWMS_base("Edificio de Seguridad", "edificio_de_seguridad_ips");
const edificio_publico_ips = TileWMS_base("Edificio Público", "edificio_publico_ips");
const edif_educacion = TileWMS_base("Edificios de Educación", "edif_educacion");
const edificios_ferroviarios = TileWMS_base("Edificios Ferroviarios", "edificios_ferroviarios");
const edif_religiosos = TileWMS_base("Edificios Religiosos", "edif_religiosos");
const ejido = TileWMS_base("Ejido", "ejido");
const espejo_de_agua_hid = TileWMS_base("Espejos de Agua", "espejo_de_agua_hid");
const estructuras_portuarias = TileWMS_base("Estruturas Portuarias", "estructuras_portuarias");
const infraestructura_aeroportuaria_punto = TileWMS_base("Infra. Aeroportuaria", "infraestructura_aeroportuaria_punto");
const infraestructura_hidro = TileWMS_base("Infraestructura Hidrográfica", "infraestructura_hidro");
const isla = TileWMS_base("Isla", "isla");
const pais_lim = TileWMS_base("Limite pais", "pais_lim");
const limite_politico_administrativo_lim = TileWMS_base("Límite Político Administrativo", "limite_politico_administrativo_lim");
const líneas_de_conducción_ene = TileWMS_base("Líneas de Conducción", "líneas_de_conducción_ene");
const localidades = TileWMS_base("Localidades", "localidades");
const marcas_y_señales = TileWMS_base("Marcas y Señales", "marcas_y_señales");
const muro_embalse = TileWMS_base("Muro Embalse", "muro_embalse");
const obra_de_comunicación = TileWMS_base("Obras de Comunicación", "obra_de_comunicación");
const obra_portuaria = TileWMS_base("Obras Portuarias", "obra_portuaria");
const otras_edificaciones = TileWMS_base("Otras Edificaciónes", "otras_edificaciones");
const provincias = TileWMS_base("Provincias", "provincias");
const puente_red_vial_puntos = TileWMS_base("Puente Red Vial Punto", "puente_red_vial_puntos");
const puntos_de_alturas_topograficas = TileWMS_base("Puntos de Alturas Topográfica", "puntos_de_alturas_topograficas");
const puntos_del_terreno = TileWMS_base("Puntos del Terreno", "puntos_del_terreno");
const red_ferroviaria = TileWMS_base("Red Ferroviaria", "red_ferroviaria");
const red_vial = TileWMS_base("Red Vial", "red_vial");
const salvado_de_obstaculo = TileWMS_base("Salvado de Obstáculo", "salvado_de_obstaculo");
const señalizaciones = TileWMS_base("Señalizaciones", "señalizaciones");
const sue_congelado = TileWMS_base("Suelo Congelado", "sue_congelado");
const sue_consolidado = TileWMS_base("Suelo Consolidado", "sue_consolidado");
const sue_costero = TileWMS_base("Suelo Costero", "sue_costero");
const sue_hidromorfologico = TileWMS_base("Suelo Hidromorfológico", "sue_hidromorfologico");
const sue_no_consolidado = TileWMS_base("Suelo No Consolidado", "sue_no_consolidado");
const veg_arborea = TileWMS_base("Vegetación Arborea", "veg_arborea");
const veg_arbustiva = TileWMS_base("Vegetación Arbustiva", "veg_arbustiva");
const veg_cultivos = TileWMS_base("Vegetación Cultivos", "veg_cultivos");
const veg_hidrofila = TileWMS_base("Vegetación Hidrófila", "veg_hidrofila");
const veg_suelo_desnudo = TileWMS_base("Vegetación Suelo Desnudo", "veg_suelo_desnudo");
const vias_secundarias = TileWMS_base("Vias Secundarias", "vias_secundarias");


export { default as Vector_Paises } from './countries';
export { default as osm_default } from './osm_default';

export { pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, 
    sue_congelado, ejido, veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial,  
    limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel, curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene,
    muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas, puente_red_vial_puntos,
    otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias, 
    infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, 
    edificio_de_seguridad_ips, edificio_de_salud_ips, edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas,
    actividades_agropecuarias, edif_construcciones_turisticas, localidades };