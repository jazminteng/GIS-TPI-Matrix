import React, { Component } from 'react';
import '../css/NavCapasWMS.css';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { provincias, red_vial, espejo_de_agua_hid, veg_arborea, veg_cultivos, veg_hidrofila } from '../layers/index';


class NavCapasWMS extends Component{

  constructor(props){
    super(props);
    this.mostrarCapa = this.mostrarCapa.bind(this);
    this.handleClassName = this.handleClassName.bind(this);
    this.state = {
    }
  }

  handleClassName(capax){
    this.setState({
      capax: !this.state.capax
    });
    console.log('nose por que hace falta esto');
  }

  mostrarCapa(capa){
    console.log('llegue',capa);
    capa.setVisible(!capa.getVisible());
    console.log(capa.getVisible());
    this.handleClassName();
  }

  render(){
    let classProvincias = provincias.getVisible() ? "active" : "inactive";
    let classRed_vial= red_vial.getVisible() ? "active" : "inactive";
    let classEspejo_de_agua_hid= espejo_de_agua_hid.getVisible() ? "active" : "inactive";
    let classVeg_arborea= veg_arborea.getVisible() ? "active" : "inactive";
    let classVeg_cultivos= veg_cultivos.getVisible() ? "active" : "inactive";
    let classVeg_hidrofila = veg_hidrofila.getVisible() ? "active" : "inactive";

    if (this.props.isCapasWMSOpen){
      return (
        <div>
          <Nav>
            <NavItem>
              <NavLink className={classProvincias} id="provincias" onClick={()=>this.mostrarCapa(provincias)}>Provincias</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classRed_vial}  id="red_vial" onClick={()=>this.mostrarCapa(red_vial)}>Red vial</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classEspejo_de_agua_hid} activeClassName="active" id="espejo_de_agua_hid" onClick={()=>this.mostrarCapa(espejo_de_agua_hid)}>Espejo de agua hid</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classVeg_arborea} id="veg_arborea" onClick={()=>this.mostrarCapa(veg_arborea)}>Vegetación arborea</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classVeg_cultivos} id="veg_cultivos" onClick={()=>this.mostrarCapa(veg_cultivos)}>Vegetación cultivos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classVeg_hidrofila} id="veg_hidrofila" onClick={()=>this.mostrarCapa(veg_hidrofila)}>Vegetación hidrofila</NavLink>
            </NavItem>
          </Nav>
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

export default NavCapasWMS;