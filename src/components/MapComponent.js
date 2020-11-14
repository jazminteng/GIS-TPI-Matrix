import React from 'react';
import { Button, Container, Row, Col, ButtonGroup, DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// Objetos OpenLayers
import olMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';

//import { clickEnMapa, dragBox } from '../interactions/consulta'
import { helpTooltip, pointerMoveHandler, measureTooltip, draw } from '../interactions/medicion'

// Interacciones
import { DragBox } from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import axios from 'axios';


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

// Controles
import { scaleControl } from '../controls';

import '../css/MapComponent.css';


const capas = [osm_default, pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, sue_congelado, ejido,
  veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial, limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel,
  curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene, muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas,
  puente_red_vial_puntos, otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
  infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, edificio_de_seguridad_ips, edificio_de_salud_ips,
  edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas, actividades_agropecuarias, edif_construcciones_turisticas, localidades];

const capasO = {
  osm_default, pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, sue_congelado, ejido,
  veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial, limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel,
  curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene, muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas,
  puente_red_vial_puntos, otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
  infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, edificio_de_seguridad_ips, edificio_de_salud_ips,
  edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas, actividades_agropecuarias, edif_construcciones_turisticas, localidades
};

var capaConsulta = "";


export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleModo = this.toggleModo.bind(this);
    this.toggleCapaActiva = this.toggleCapaActiva.bind(this);
    this.state = {
      isDropdownOpen: false,
      capaConsulta: 'Seleccionar capa',
      modo: 'Navegacion',
      verResultado: false,
      resultado: '',
    }
  }

  componentDidMount() {
    this.setState({
      verResultado: false,
    });
    let currentComponent = this;

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
      layers: capas,
      target: this.refs.mapContainer
    });
    provincias.setVisible(true);

    //funcion para el evento click en el mapa
    this.clickEnMapa = function (evento) {
      if (capaConsulta !== "Seleccionar capa") {
        axios.post('http://localhost:3001/punto', {
          coordinates: evento.coordinate,
          tabla: capaConsulta,
          pixel: view.getResolution()
        })
          .then((response) => {
            console.log(response);
            currentComponent.setState({
              verResultado: true,
            });
            currentComponent.props.setResultado(response);
          })
          .catch((error) => {
            console.log(error);

          });

      }
    };

    // Cajita con el Ctrl+Click
    this.dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });
    this.dragBox.on('boxend', function (evento) {
      if (capaConsulta !== "Seleccionar capa") {
        axios.post('http://localhost:3001/caja', {
          coordinates: this.getGeometry().getCoordinates(),
          tabla: capaConsulta
        })
          .then(function (response) {
            console.log(response);
            currentComponent.setState({
              verResultado: true,
            });
            currentComponent.props.setResultado(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }

  toggleDropdown(event) {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  toggleCapaActiva(event) {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
      capaConsulta: event.currentTarget.id
    });
  }

  toggleModo(event) {
    this.map.removeInteraction(this.dragBox);
    this.map.un('click', this.clickEnMapa);

    this.map.removeOverlay(helpTooltip);
    this.map.un('pointermove', pointerMoveHandler);
    this.map.removeOverlay(measureTooltip);
    this.map.removeInteraction(draw); 

    if (event.currentTarget.id === "Consulta") {
      this.map.on('click', this.clickEnMapa);
      this.map.addInteraction(this.dragBox);

    } else if (event.currentTarget.id === "Distancia") {
      this.map.addOverlay(helpTooltip);
      this.map.on('pointermove', pointerMoveHandler);
      this.map.addOverlay(measureTooltip);
      this.map.addInteraction(draw);
    }

    this.setState({
      modo: event.currentTarget.id
    });
  }

  render() {

    capaConsulta = this.state.capaConsulta;
    const activelayers = [];
    activelayers.push(<DropdownItem id='Seleccionar capa' onClick={this.toggleCapaActiva}>Seleccionar capa </DropdownItem>)
    for (const index in capasO) {
      if (capasO[index].getVisible()) {
        activelayers.push(<DropdownItem id={index} onClick={this.toggleCapaActiva}>{capasO[index].getProperties().title} </DropdownItem>)
      }
    }
    const dropdown = [];
    if (this.state.modo === 'Consulta') {
      dropdown.push(
        <Row>
          <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown} >
            <DropdownToggle caret outline color="secondary" onClick={this.toggleDropdown}>
              {this.state.capaConsulta !== 'Seleccionar capa'
                ? capasO[this.state.capaConsulta].getProperties().title
                : "Seleccionar capa"}
            </DropdownToggle>
            <DropdownMenu
              modifiers={{
                setMaxHeight: {
                  enabled: true,
                  order: 890,
                  fn: (data) => {
                    return {
                      ...data,
                      styles: {
                        ...data.styles,
                        overflow: 'auto',
                        maxHeight: '200px',
                      },
                    };
                  },
                },
              }}>
              {activelayers}
            </DropdownMenu>
          </ButtonDropdown>
        </Row>

      );
      if (this.state.verResultado) {
        dropdown.push(
          <Row>
            <Link className={this.state.verResultado ? "link" : "disabled-link"} to={this.state.verResultado ? '/resultado' : '#'} >Ver Resultado </Link>
          </Row>);
      }
    }

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Home</BreadcrumbItem>
        </Breadcrumb>
        <Container className="themed-container" fluid={true}>
          <Row>
            <Col xs="12" sm="9">
              {/* Mapa */}
              <div id="mapContainer" ref="mapContainer"> </div>
            </Col>
            <Col xs="12" sm="3">
              <Row>
                <ButtonGroup vertical>
                  <Button outline color="secondary" onClick={this.toggleModo} id='Navegacion'>Modo Navegacion</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} id='Distancia'>Medir distancia</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} id='Consulta'>Modo Consulta</Button>
                </ButtonGroup>
              </Row>
              <hr class="my-4"></hr>
              {dropdown}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

