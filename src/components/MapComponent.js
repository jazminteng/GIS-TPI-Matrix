import React from 'react';
import { Form, FormGroup, Input, FormFeedback, Button, Container, Label, Row, Col, ButtonGroup, DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// Objetos OpenLayers
import olMap from 'ol/Map';
import View from 'ol/View';
import Zoom from 'ol/control/Zoom';


import Overlay from 'ol/Overlay'
import Draw from 'ol/interaction/Draw'
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style'
import { Vector as VectorSource } from 'ol/source';
import { getLength} from 'ol/sphere';

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
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleBlur=this.handleBlur.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleModo = this.toggleModo.bind(this);
    this.toggleCapaActiva = this.toggleCapaActiva.bind(this);
    this.state = {
      isDropdownOpen: false,
      capaConsulta: 'Seleccionar capa',
      modo: 'Navegacion',
      verResultado: false,
      resultado: '',
      element:'',
      touched:{
        element: false,
      }
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
    this.map.on('click', clickEnMapa);

    // Cajita con el Ctrl+Click
    var dragBox = new DragBox({
      condition: platformModifierKeyOnly,
    });
    dragBox.on('boxend', function (evento) {
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
    this.map.addInteraction(dragBox);
    // Cambio de interaccion
    var seleccionarControl = function () {
      if (this.state.modo === "consulta") {
        this.map.addInteraction(dragBox);
        this.map.on('click', clickEnMapa);

      } else if (this.state.modo === "Navegacion") {
        this.map.removeInteraction(dragBox);
        this.map.un('click', clickEnMapa);
      }
    };

   
    /////////////////////////////////////////////////////////////////////////////////////////////

    // Defino el mensaje de ayuda a mostrarse
    var helpTooltipElement = document.createElement('p');

    var helpTooltip;
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip';
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });
    this.map.addOverlay(helpTooltip);

    // Si el puntero se mueve, cambio la posicion del mensaje de ayuda
    var pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }

      var helpMsg = 'Click to start drawing';

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

    };
    this.map.on('pointermove', pointerMoveHandler); // Agrego el listener


    // Defino el dibujito de la linea y el circulito
    const draw = new Draw({
      source: new VectorSource(),
      type: 'LineString',
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      }),
    });
    this.map.addInteraction(draw);  // Agrego la interaccion

      // Mensajito del kilometraje del vehiculo
      var measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      const measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
      });
      this.map.addOverlay(measureTooltip);

      // Formateo el kilometraje
      var formatLength = function (line) {
        var length = getLength(line);
        var output = Math.round(length * 10000) / 100 + ' ' + 'km';
        return output;
      };
      // Este actualiza el mensajito del kilometraje cuando se empieza a dibujar
      draw.on('drawstart', function (evt) {
        helpTooltipElement.classList.add('hidden');
        var sketch = evt.feature;
        sketch.getGeometry().on('change', function (evt) {
          var geom = evt.target;
          var tooltipCoord = geom.getLastCoordinate();
          measureTooltipElement.innerHTML = formatLength(geom);
          measureTooltip.setPosition(tooltipCoord);
        });
      });
  }

  handleBlur = (field)=>(evt)=>{
    this.setState({
        touched: {...this.state.touched,[field]:true}
    });
  }

  validate(element){
    const errors={
      element:'',
    };

    if (this.state.touched.element && element.length < 3)
        errors.element = 'Element Name should be >= 3 characters';
    else if (this.state.touched.element && element.length > 10)
        errors.element = 'Element Name should be <= 10 characters';
    return errors;
  }

  handleInputChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
        [name]: value
    });
  }

  handleSubmit(event){
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
    console.log(this.state.modo);
    this.setState({
      modo: event.currentTarget.id
    });
  }

  render() {
    const errors = this.validate(this.state.element);
    capaConsulta = this.state.capaConsulta;
    const activelayers = [];
    activelayers.push(<DropdownItem id='Seleccionar capa' onClick={this.toggleCapaActiva}>Seleccionar capa </DropdownItem>)
    for (const index in capasO) {
      if (capasO[index].getVisible()) {
        activelayers.push(<DropdownItem id={index} onClick={this.toggleCapaActiva}>{capasO[index].getProperties().title} </DropdownItem>)
      }
    }
    const input = [];
    if (this.state.modo === 'AddFeature') {
      input.push(
        <div>
          <Form onSubmit={this.handleSubmit}>                            
            <FormGroup row>
              <Label htmlFor='element' md={10}>Nombre del elemento</Label>
              <Col md={10}>
                <Input type='text' id='element' name='element'
                placeholder='Nombre del elemento' value={this.state.element}
                onChange={this.handleInputChange}
                    placeholder="Nombre del elemento"
                    value={this.state.element}
                    valid={errors.element ==='' && this.state.element !== ''}
                    invalid={errors.element !==''}
                    onBlur={this.handleBlur('element')}
                    onChange={this.handleInputChange}/>
                <FormFeedback>{errors.element}</FormFeedback>
              </Col>
              <Col>
                <Button type='submit' outline color="secondary">Agregar</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );
    
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

