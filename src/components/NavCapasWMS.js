import React, { Component } from 'react';
import '../css/NavCapas.css';
import { Nav, Button} from 'reactstrap';

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
      items.push(<Button className={capas[index].getVisible() ? "capa-activa" : "capa-inactiva"} id={index} onClick={() => this.mostrarCapa(capas[index])}>{capas[index].getProperties().title}</Button>)
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