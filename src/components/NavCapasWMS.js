import React, { Component } from 'react';
import '../css/NavCapasWMS.css';
import {
  Nav,
  NavLink,
} from 'reactstrap';

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
    const capas = this.props.capas;

    for (const index in capas) {
      console.log(index);
      items.push(<NavLink className={capas[index].getVisible() ? "active" : "inactive"} id={index} onClick={()=>this.mostrarCapa(capas[index])}>{capas[index].getProperties().title}</NavLink>)
    }

    if (this.props.capas !== null){
      return (
        <div>
          <Nav>
            {items}
          </Nav>
        </div>
      );
    } else {
      return(<div class ="noand"></div>)
    }
  }
}

export default NavCapasWMS;