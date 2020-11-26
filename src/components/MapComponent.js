import React from 'react';
import { Button, Container, Row, Col, ButtonGroup } from 'reactstrap';

import olMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';
import { DragBox } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';

import { helpTooltip, pointerMoveHandler, measureTooltip, draw } from '../interactions/medicion'
import puntoDraw from '../interactions/puntoNewFeature';
import { scaleControl } from '../controls';
import { vectorSource, vectorLayer } from '../layers/capaVectorial'
import { estrellaStyle } from '../styles/estrella'

import '../css/MapComponent.css';

import axios from 'axios';

import { rutasBack } from '../cfg/url'

import NavBar from './Navbar';
import Consulta from './Consulta';
import AddFeature from './AddFeature';
import Leyenda from './Leyenda';

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
} from '../layers';

// este array solo se usa para agregarlas al mapa
const capas = [osm_default, pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, sue_congelado, ejido,
  veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial, limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel,
  curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene, muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas,
  puente_red_vial_puntos, otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
  infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, edificio_de_seguridad_ips, edificio_de_salud_ips,
  edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas, actividades_agropecuarias, edif_construcciones_turisticas, localidades];

const capasO = {
  pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, sue_congelado, ejido,
  veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial, limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel,
  curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene, muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas,
  puente_red_vial_puntos, otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
  infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, edificio_de_seguridad_ips, edificio_de_salud_ips,
  edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas, actividades_agropecuarias, edif_construcciones_turisticas, localidades
};

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModo = this.toggleModo.bind(this);
    this.sendGeom = this.sendGeom.bind(this);
    this.capaConsulta = 'Seleccionar capa';

    this.state = {
      modo: 'Navegacion',
      verResultado: false,
      resultado: ''
    }

    provincias.setVisible(true);
  }

  componentDidMount() {
    vectorSource.clear();
    const view = new View({
      center: [-58.986666666667, -27.451388888889],
      zoom: 8,
      minZoom: 2,
      maxZoom: 20,
      projection: 'EPSG:4326',
    });

    this.map = new olMap({
      view: view,
      controls: [new Zoom(), scaleControl()],
      layers: capas,
      target: this.refs.mapContainer
    });

    this.map.getViewport().style.cursor = 'move';

    this.map.addLayer(vectorLayer);

    // Consulta con Click
    this.clickEnMapa = evento => {
      if (this.capaConsulta !== "Seleccionar capa") {
        axios.post(rutasBack.consultaPunto, {
          coordinates: evento.coordinate,
          tabla: this.capaConsulta,
          pixel: view.getResolution()
        })
          .then(this.resultadoConsulta)
          .catch((error) => {
            console.log(error);
          });
      }
    };

    // Consulta con Ctrl+Click
    this.dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });
    this.dragBox.on('boxend', evento => {
      if (this.capaConsulta !== "Seleccionar capa") {
        axios.post(rutasBack.consultaCaja, {
          coordinates: evento.target.box_.getGeometry().getCoordinates(),
          tabla: this.capaConsulta
        })
          .then(this.resultadoConsulta)
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  // Renderiza de nuevo el componente Mapa para que refresque la lista de leyendas y sus simbologias
  reRender = () => {
    this.forceUpdate();
  };

  setearCapaConsulta = (capaConsulta) => {
    this.capaConsulta = capaConsulta;
  }

  resultadoConsulta = (response) => {
    vectorSource.clear()
    if (response.data.resultado !== undefined) response.data.resultado.forEach((fila) => vectorSource.addFeature(new GeoJSON().readFeatures(fila.geojson)[0]))
    this.props.setResultado(response);
    this.setState({
      verResultado: true,
    });
  }

  cerrarModal = () => {
    this.setState({
      modal: false
    })
  }

  clickNewGeom = (evento) => {
    this.geom = evento.coordinate;
    this.setState({
      modal: true
    })
  }

  sendGeom(nombre) {
    if (this.geom) {
      axios.post(rutasBack.nuevoPunto, {
        coordinates: this.geom,
        name: nombre
      })
        .then(response => {
          //console.log(response);    // Revisar que hacer con el okey (status 200)
          this.consultaFavoritos();
        })
        .catch(error => {
          console.log(error);
          this.consultaFavoritos();
        });
    }
  }

  consultaFavoritos = () => {
    axios.get(rutasBack.favoritos)
      .then(response => {
        vectorSource.clear()
        if (response.data !== undefined) {
          response.data.forEach((fila) => {
            const feature = new GeoJSON().readFeatures(fila.geojson)[0];
            feature.setStyle(estrellaStyle)
            vectorSource.addFeature(feature)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleModo(event) {
    vectorSource.clear();


    this.map.removeInteraction(this.dragBox);
    this.map.un('click', this.clickEnMapa);

    this.map.removeOverlay(helpTooltip);
    this.map.removeOverlay(measureTooltip);
    this.map.un('pointermove', pointerMoveHandler);
    this.map.removeInteraction(draw);

    this.map.un('click', this.clickNewGeom);

    this.map.removeInteraction(puntoDraw);

    if (event.currentTarget.id === "Consulta") {

      this.map.on('click', this.clickEnMapa);
      this.map.addInteraction(this.dragBox);

      this.map.getViewport().style.cursor = 'auto';

    } else if (event.currentTarget.id === "Distancia") {
      this.map.addOverlay(helpTooltip);
      this.map.addOverlay(measureTooltip);

      this.map.on('pointermove', pointerMoveHandler);
      this.map.addInteraction(draw);

      this.map.getViewport().style.cursor = 'none';

    } else if (event.currentTarget.id === "AddFeature") {
      this.consultaFavoritos();

      this.map.on('click', this.clickNewGeom);
      this.map.addInteraction(puntoDraw);

      this.map.getViewport().style.cursor = 'none';

    } else {
      this.map.getViewport().style.cursor = 'move';
    }

    this.setState({
      modo: event.currentTarget.id,
      verResultado: false
    });
  }

  render() {
    const capasActivas = []; // Nombre de las capas activas
    for (const index in capasO) {
      if (capasO[index].getVisible()) capasActivas.push(index)
    }

    return (
      <div>
        <NavBar rerender={this.reRender} />

        <Container className="themed-container" fluid={true}>
          <Row>
            <Col xs="12" sm="9">
              {/* Mapa */}
              <div id="mapContainer" ref="mapContainer"> </div>
            </Col>
            <Col xs="12" sm="3">
              <Row className="justify-content-center" style={{ height: "25hv" }}>
                <ButtonGroup vertical>
                  <Button outline color="secondary" onClick={this.toggleModo} className={this.state.modo === 'Navegacion' ? "Modoactive" : "Modoinactive"} id='Navegacion' block>Modo Navegacion</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} className={this.state.modo === 'Distancia' ? "Modoactive" : "Modoinactive"} id='Distancia' block>Medir distancia</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} className={this.state.modo === 'Consulta' ? "Modoactive" : "Modoinactive"} id='Consulta' block>Modo Consulta</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} className={this.state.modo === 'AddFeature' ? "Modoactive" : "Modoinactive"} id='AddFeature' block>Agregar puntos favoritos</Button>
                </ButtonGroup>
              </Row>


              {this.state.modo === 'Consulta' &&
                <hr class="my-2"></hr>
              }
              {this.state.modo === 'Consulta' &&
                <Consulta capasActivas={capasActivas} capasO={capasO} setearCapa={this.setearCapaConsulta} verResultado={this.state.verResultado} />
              }

              {this.state.modal == true &&
                <AddFeature sendGeom={this.sendGeom} cerrarModal={this.cerrarModal} />
              }

              <hr class="my-2"></hr>

              <Leyenda capasActivas={capasActivas} />

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

