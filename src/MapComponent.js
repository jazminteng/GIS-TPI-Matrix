import React from 'react';
import { Button } from 'reactstrap';

// Objetos OpenLayers
import olMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';

//Funciones OpenLayers
import { toStringHDMS } from 'ol/coordinate';
import Overlay from 'ol/Overlay';
// import { transform } from 'ol/proj';

// Interacciones
import { DragBox, Select } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';

// Capas
import {
  osm_default,
  pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva,
  sue_congelado, ejido, veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial,
  limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel, curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene,
  muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas, puente_red_vial_puntos,
  otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
  infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips,
  edificio_de_seguridad_ips, edificio_de_salud_ips, edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas,
  actividades_agropecuarias, edif_construcciones_turisticas, localidades
} from './layers';

// Controles
import { scaleControl } from './controls';
// import { ZoomToExtent } from 'ol/control'

// require('ol/ol.css'); no hace falta esto aca xd

import NavBar from './components/Navbar'

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capas: [osm_default, pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, sue_congelado, ejido,
        veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial, limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel,
        curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene, muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas,
        puente_red_vial_puntos, otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
        infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, edificio_de_seguridad_ips, edificio_de_salud_ips,
        edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas, actividades_agropecuarias, edif_construcciones_turisticas, localidades]
    }
  }

  componentDidMount() {

    const view = new View({
      center: [-58.986666666667, -27.451388888889],
      zoom: 13,
      minZoom: 2,
      maxZoom: 20,
      projection: 'EPSG:4326',
    });

    this.map = new olMap({
      view: view,
      controls: [new Zoom(), scaleControl()],
      layers: this.state.capas,
      target: this.refs.mapContainer
    });
    provincias.setVisible(true);

    //funcion para el evento click en el mapa
    var clickEnMapa = function (evento) {
      //muestro por consola las coordenadas del evento
      console.log('click', evento.coordinate);
      //consultar(evento.coordinate);
    };

    // Cajita con el Ctrl+Click
    var dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });
    dragBox.on('boxend', function (evento) {
      console.log('boxend', this.getGeometry().getCoordinates());
      //consultar(selectInteraction.getGeometry().getCoordinates());
    });

    // Cambio de interaccion
    var seleccionarControl = function () {
      if (this.state.modo == "consulta") {
        this.map.addInteraction(dragBox);
        this.map.on('click', clickEnMapa);

      } else if (this.state.modo == "navegacion") {
        this.map.removeInteraction(dragBox);
        this.map.un('click', clickEnMapa);
      }
    };


  }

  render() {
    return (
      <div>

        {/* Navbar */}
        <NavBar />

        {/* Mapa */}
        <div id="mapContainer" ref="mapContainer"> </div>

      </div>
    );
  }
}

