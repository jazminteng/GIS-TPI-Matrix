import React, { Component } from 'react';
import '../css/NavCapasWMS.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from 'reactstrap';
import NavCapasWMS from './NavCapasWMS';
import { CATEGORIAS } from '../layers/categorias';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleCategoria = this.toggleCategoria.bind(this);
    this.state = {
      isCapasWMSOpen: false,
      isCapasWFSOpen: false,
      isCollapseOpen: false,
      categoria: '',
      capas: {},
    }
  }

  toggleCategoria(event) {
    if (event.target.id === this.state.categoria){
      this.setState({
        categoria: '',
        capas: null
      });
    }else{
      this.setState({
        categoria: event.target.id,
        capas: CATEGORIAS[event.target.id].capas
      });
    }
    
  }

  toggleCollapse() {
    this.setState({
      isCollapseOpen: !this.state.isCollapseOpen
    });
  }

  render() {
    const navlinks = [];

    for (const index in CATEGORIAS) {
      navlinks.push(<NavLink className={this.state.categoria===index ? "chill" : "no"} onClick={this.toggleCategoria} id={index}>{CATEGORIAS[index].title}</NavLink>)
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Bievenido a mapita</NavbarBrand>
          <NavbarToggler onClick={this.toggleCollapse} />

          <Collapse isOpen={this.state.isCollapseOpen} navbar>
            <Nav className="mr-auto" navbar>
              {navlinks}
            </Nav>
          </Collapse>
        </Navbar>
        
        {this.state.categoria !== '' &&
          <NavCapasWMS capas={this.state.capas} rerender={this.props.rerender}/>
        }

      </div>
    );
  }
}

export default NavBar;
