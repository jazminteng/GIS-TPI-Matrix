import React from 'react';
import { Form, FormGroup, Input, FormFeedback, Button, Container, Label, Row, Col, ButtonGroup, DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, Breadcrumb, BreadcrumbItem, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
// Objetos OpenLayers
import olMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source'

//import { clickEnMapa, dragBox } from '../interactions/consulta'
import { helpTooltip, pointerMoveHandler, measureTooltip, draw } from '../interactions/medicion'

import { urlLeyenda, rutasBack } from '../cfg/url'

// Interacciones
import { DragBox, Draw } from 'ol/interaction';
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

import NavBar from './Navbar';

// este array solo se usa para agregarlas al mapa
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

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleModo = this.toggleModo.bind(this);
    this.toggleCapaActiva = this.toggleCapaActiva.bind(this);
    this.sendGeom = this.sendGeom.bind(this);

    this.clickNewGeom = (evento) => {
      this.geom = evento.coordinate;
    }

    this.state = {
      isDropdownOpen: false,
      capaConsulta: 'Seleccionar capa',
      modo: 'Navegacion',
      verResultado: false,
      resultado: '',
      element: '',
      touched: {
        element: false,
      }
    }
  }

  // Renderiza de nuevo el componente Mapa para que refresque la lista de leyendas y sus simbologias
  reRender = () => this.forceUpdate();

  componentDidMount() {
    this.setState({
      verResultado: false,
    });

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
    this.clickEnMapa = evento => {
      if (this.state.capaConsulta !== "Seleccionar capa") {
        axios.post(rutasBack.consultaPunto, {
          coordinates: evento.coordinate,
          tabla: this.state.capaConsulta,
          pixel: view.getResolution()
        })
          .then(response => {
            this.setState({
              verResultado: true,
            });
            this.props.setResultado(response);
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
    this.dragBox.on('boxend', evento => {
      if (this.state.capaConsulta !== "Seleccionar capa") {
        axios.post(rutasBack.consultaCaja, {
          coordinates: evento.target.box_.getGeometry().getCoordinates(),
          tabla: this.state.capaConsulta
        })
          .then(response => {
            this.setState({
              verResultado: true,
            });
            this.props.setResultado(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    // Dibujo de feature nueva
    this.sourceFeature = new VectorSource({ wrapX: false });
    this.layerFeature = new VectorLayer({
      source: this.sourceFeature,
    });
    this.puntoFeature = new Draw({
      source: this.sourceFeature,
      type: 'Point'
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  validate(element) {
    const errors = {
      element: '',
    };

    if (this.state.touched.element && element.length < 3)
      errors.element = 'Element Name should be >= 3 characters';
    else if (this.state.touched.element && element.length > 10)
      errors.element = 'Element Name should be <= 10 characters';
    return errors;
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Current State is: ' + JSON.stringify(this.state));
    event.preventDefault();
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

    this.map.un('click', this.clickNewGeom);

    this.map.removeLayer(this.layerFeature);
    this.map.removeInteraction(this.puntoFeature);

    if (event.currentTarget.id === "Consulta") {
      this.map.on('click', this.clickEnMapa);
      this.map.addInteraction(this.dragBox);

    } else if (event.currentTarget.id === "Distancia") {
      this.map.addOverlay(helpTooltip);
      this.map.on('pointermove', pointerMoveHandler);
      this.map.addOverlay(measureTooltip);
      this.map.addInteraction(draw);
    } else if (event.currentTarget.id === "AddFeature") {
      this.map.on('click', this.clickNewGeom);


      this.map.addLayer(this.layerFeature)
      this.puntoFeature.on('drawstart', evento => {
        this.sourceFeature.clear();
      })
      this.map.addInteraction(this.puntoFeature);
    }

    this.setState({
      modo: event.currentTarget.id
    });
  }

  sendGeom(event) {
    if (this.geom) {
      axios.post(rutasBack.nuevoPunto, {
        coordinates: this.geom,
        name: this.state.element
      })
        .then(response => {
          console.log(response);    // Revisar que hacer con el okey (status 200)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const capasActivas = []; // Nombre de las capas activas
    for (const index in capasO) {
      if (capasO[index].getVisible()) capasActivas.push(index)
    }

    const input = [];
    if (this.state.modo === 'AddFeature') {
      const errors = this.validate(this.state.element);
      input.push(
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label htmlFor='element' md={10}>Nombre del elemento</Label>
            <Col md={10}>
              <Input type='text' id='element' name='element'
                placeholder='Nombre del elemento' value={this.state.element}
                onChange={this.handleInputChange}
                placeholder="Nombre del elemento"
                value={this.state.element}
                valid={errors.element === '' && this.state.element !== ''}
                invalid={errors.element !== ''}
                onBlur={this.handleBlur('element')}
                onChange={this.handleInputChange} />
              <FormFeedback>{errors.element}</FormFeedback>
            </Col>
            <Col>
              <Button type='submit' outline color="secondary" onClick={this.sendGeom}>Agregar</Button>
            </Col>
          </FormGroup>
        </Form>
      );

    }

    const dropdown = [];
    if (this.state.modo === 'Consulta') {
      const activelayers = [];
      activelayers.push(<DropdownItem id='Seleccionar capa' onClick={this.toggleCapaActiva}>Seleccionar capa </DropdownItem>)
      capasActivas.forEach(index => {
        activelayers.push(<DropdownItem id={index} onClick={this.toggleCapaActiva}>{capasO[index].getProperties().title} </DropdownItem>)
      })

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
        //  No es necesario el condicional ?
        dropdown.push(
          <Row>
            <Link to={this.state.verResultado ? '/resultado' : '#'} >Ver Resultado</Link>
          </Row>);
      }
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
            <Col xs="12" sm="3" >
              <Row>
                <ButtonGroup vertical>
                  <Button outline color="secondary" onClick={this.toggleModo} id='Navegacion'>Modo Navegacion</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} id='Distancia'>Medir distancia</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} id='Consulta'>Modo Consulta</Button>
                  <Button outline color="secondary" onClick={this.toggleModo} id='AddFeature'>Ingresar Elementos</Button>
                </ButtonGroup>
              </Row>

              <hr class="my-4"></hr>
              {dropdown}
              {input}

              <img src={urlLeyenda(capasActivas)} alt="No hay capas activas" />

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

