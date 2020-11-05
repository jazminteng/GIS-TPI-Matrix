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
    this.forceUpdate();
  }

  render() {
    const items = [];
    const capas = this.props.capas;

    for (const index in capas) {
      console.log(index);
      items.push(<NavLink className={capas[index].getVisible() ? "active" : "inactive"} id={index} onClick={() => this.mostrarCapa(capas[index])}>{capas[index].getProperties().title}</NavLink>)
    }

    return (
      <div>
        <Nav>
          {items}
        </Nav>
      </div>
    );

  }
}

export default NavCapasWMS;