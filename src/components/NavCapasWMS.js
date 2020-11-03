import React, { Component } from 'react';
import '../css/NavCapasWMS.css';
import {
  Nav,
  NavLink,
} from 'reactstrap';
import { provincias, red_vial, espejo_de_agua_hid, veg_arborea, veg_cultivos, veg_hidrofila }from '../layers/index';


const capas = { provincias, red_vial, espejo_de_agua_hid, veg_arborea, veg_cultivos, veg_hidrofila };


class NavCapasWMS extends Component{
  constructor(props){
    super(props);
    this.mostrarCapa = this.mostrarCapa.bind(this);
  }

  mostrarCapa(capa){
    capa.setVisible(!capa.getVisible());
    this.forceUpdate();
  }

  render(){
    const items = [];

    for (const index in capas) {
      items.push(<NavLink className={capas[index].getVisible() ? "active" : "inactive"} id={index} onClick={()=>this.mostrarCapa(capas[index])}>{capas[index].getProperties().title}</NavLink>)
    }

    if (this.props.isCapasWMSOpen){
      return (
        <div>
          <Nav>
            {items}
          </Nav>
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

export default NavCapasWMS;