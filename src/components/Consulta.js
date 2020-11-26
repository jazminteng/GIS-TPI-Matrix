import React, { Component } from 'react';

import {
   Row, DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown} from 'reactstrap';
import { Link } from 'react-router-dom';

class Consulta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capaConsulta: 'Seleccionar capa'
    }
  }

  toggleDropdown = (event) => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  toggleCapaActiva = (event) => {
    this.props.setearCapa(event.currentTarget.id);
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
      capaConsulta: event.currentTarget.id,
    });
  }

  render() {
    const activelayers = [];
    activelayers.push(<DropdownItem id='Seleccionar capa' onClick={this.toggleCapaActiva}>Seleccionar capa </DropdownItem>)
    this.props.capasActivas.forEach(index => {
      activelayers.push(<DropdownItem id={index} onClick={this.toggleCapaActiva}>{this.props.capasO[index].getProperties().title} </DropdownItem>)
    })
    return (
      <Row className="justify-content-center">
        <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown} >
          <DropdownToggle caret outline color="secondary" className={this.state.capaConsulta == 'Seleccionar capa' && "bg-danger text-white"} onClick={this.toggleDropdown}>
            {this.state.capaConsulta == 'Seleccionar capa'
              ? "Seleccionar capa"
              : this.props.capasO[this.state.capaConsulta].getProperties().title}
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
        {this.props.verResultado &&
          //  No es necesario el condicional ?
          <Link to={this.props.verResultado ? '/resultado' : '#'} >
            <img src="/eye-disease.png"
              className="align-center"
              height="40"
              width="40" />
          </Link>
        }
      </Row>
    );

  }
}

export default Consulta;