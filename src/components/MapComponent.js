import React from 'react';
import { Button, Container, Row, Col, ButtonGroup, DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// Objetos OpenLayers
import olMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';

// Interacciones
import { DragBox } from 'ol/interaction';
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
} from '../layers';

// Controles
import { scaleControl } from '../controls';

import '../css/MapComponent.css';

import axios from 'axios';

const capas = [osm_default, pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, sue_congelado, ejido,
  veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial, limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel,
  curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene, muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas,
  puente_red_vial_puntos, otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
  infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, edificio_de_seguridad_ips, edificio_de_salud_ips,
  edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas, actividades_agropecuarias, edif_construcciones_turisticas, localidades];

const capasO = {osm_default, pais_lim, provincias, isla, sue_no_consolidado, sue_consolidado, sue_hidromorfologico, sue_costero, veg_arbustiva, sue_congelado, ejido,
    veg_suelo_desnudo, veg_arborea, veg_cultivos, veg_hidrofila, espejo_de_agua_hid, red_vial, limite_politico_administrativo_lim, vias_secundarias, curvas_de_nivel,
    curso_de_agua_hid, red_ferroviaria, líneas_de_conducción_ene, muro_embalse, señalizaciones, salvado_de_obstaculo, puntos_del_terreno, puntos_de_alturas_topograficas,
    puente_red_vial_puntos, otras_edificaciones, obra_portuaria, obra_de_comunicación, marcas_y_señales, infraestructura_hidro, estructuras_portuarias,
    infraestructura_aeroportuaria_punto, edif_religiosos, edificios_ferroviarios, edif_educacion, edificio_publico_ips, edificio_de_seguridad_ips, edificio_de_salud_ips,
    edif_depor_y_esparcimiento, complejo_de_energia_ene, actividades_economicas, actividades_agropecuarias, edif_construcciones_turisticas, localidades};

var capaConsulta = "";

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleCapaActiva = this.toggleCapaActiva.bind(this);
    this.state = {
      isDropdownOpen: false,
      capaConsulta: 'Modo Consulta',
      verResultado: false,
      resultado:'',
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
    var clickEnMapa = function (evento) {
      if (capaConsulta !== "Modo Consulta") {
        axios.post('http://localhost:3001/punto', {
          coordinates: evento.coordinate,
          tabla: capaConsulta,
          pixel: view.getResolution()
        })
          .then((response)=> {
            console.log(response);
            currentComponent.setState({
              verResultado: true,
            });
            currentComponent.props.setResultado(response);  
          })
          .catch((error)=> {
            console.log(error);
            
          });
        
      }
    };
    this.map.on('click', clickEnMapa);

    // Cajita con el Ctrl+Click
    var dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });
    dragBox.on('boxend', function (evento) {
      if (capaConsulta !== "Modo Consulta") {
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
    this.map.addInteraction(dragBox);
    // Cambio de interaccion
    var seleccionarControl = function () {
      if (this.state.modo === "consulta") {
        this.map.addInteraction(dragBox);
        this.map.on('click', clickEnMapa);

      } else if (this.state.modo === "navegacion") {
        this.map.removeInteraction(dragBox);
        this.map.un('click', clickEnMapa);
      }
    };


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

  render() {
    capaConsulta = this.state.capaConsulta;
    const activelayers = [];
    activelayers.push(<DropdownItem id='Modo Consulta' onClick={this.toggleCapaActiva}>Modo Consulta </DropdownItem>)
    for (const index in capasO) {
      if (capasO[index].getVisible()) {
        activelayers.push(<DropdownItem id={index} onClick={this.toggleCapaActiva}>{capasO[index].getProperties().title} </DropdownItem>)
      }
    }
    return (
      <div>
        <Breadcrumb>
            <BreadcrumbItem active>Home</BreadcrumbItem>
          </Breadcrumb>
        <Container>
          <Row>
            <Col xs="12" sm="9">
              {/* Mapa */}
              <div id="mapContainer" ref="mapContainer"> </div>
            </Col>
            <Col xs="12" sm="3">
              <Row>
                <ButtonGroup vertical>
                  <Button outline color="secondary">Modo Navegacion</Button>
                  <Button outline color="secondary">Medir distancia</Button>
                  <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown} >
                    <DropdownToggle caret outline color="secondary" onClick={this.toggleDropdown}>
                      {this.state.capaConsulta !== 'Modo Consulta' 
                        ? capasO[this.state.capaConsulta].getProperties().title
                        : "Modo Consulta"}
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
                </ButtonGroup>
              </Row>
              <Row>
                <Link className={this.state.verResultado ? "link" : "disabled-link"} to={this.state.verResultado ? '/resultado' : '#'} >Ver Resultado </Link>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

