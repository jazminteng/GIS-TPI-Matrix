import React, { Component } from 'react';
import '../css/NavCapasWMS.css';
import {
  Nav,
  NavLink,
} from 'reactstrap';

class NavCapasWMS extends Component {
  constructor(props) {
    super(props);
    this.mostrarCapa = this.mostrarCapa.bind(this);
  }

  mostrarCapa(capa) {
    capa.setVisible(!capa.getVisible());
    this.props.rerender();
    this.forceUpdate();
  }

  render() {
    const items = [];
    const capas = this.props.capas;

    for (const index in capas) {
      items.push(<NavLink className={capas[index].getVisible() ? "Navactive" : "Navinactive"} id={index} onClick={() => this.mostrarCapa(capas[index])}>{capas[index].getProperties().title}</NavLink>)
    }

    return (
      <div>
        <Nav color="light">
          {items}
        </Nav>
      </div>
    );

  }
}

export default NavCapasWMS;