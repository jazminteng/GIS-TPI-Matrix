import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import NavCapasWMS from './NavCapasWMS';
import NavCapasWFS from './NavCapasWFS';
import CATEGORIAS from '../shared/categorias';

class NavBar extends Component{

  constructor(props){
    super(props);
    this.toggleCapasWMS = this.toggleCapasWMS.bind(this);
    this.toggleCapasWFS = this.toggleCapasWFS.bind(this);
    this.toggleCollapse= this.toggleCollapse.bind(this);
    this.toggleDropdown= this.toggleDropdown.bind(this);
    this.toggleCategoria= this.toggleCategoria.bind(this);



    this.state = {
      isCapasWMSOpen: false,
      isCapasWFSOpen: false,
      isCollapseOpen: false,
      isDropdownOpen: false,
      categoria: '',
      capas: {},
      dropdownValue: 'Consultar',
    }
  }

  toggleCategoria(event){
    this.setState({
      categoria: event.target.id,
    });
  }

  toggleDropdown(event){
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
      dropdownValue: event.currentTarget.textContent
    });
  }

  toggleCapasWMS(){
    this.setState({
      isCapasWMSOpen: !this.state.isCapasWMSOpen
    });
  }

  toggleCapasWFS(){
    this.setState({
      isCapasWFSOpen: !this.state.isCapasWFSOpen
    });
  }

  toggleCollapse(){
    this.setState({
      isCollapseOpen: !this.state.isCollapseOpen
    });
  }

  render(){
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Bievenido a mapita</NavbarBrand>
          <NavbarToggler onClick={this.toggleCollapse} />
          <Collapse isOpen={this.state.isCollapseOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="habitacional"> Habitacional y Cultural </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="hidrografia"> Hidrografía </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="instituciones"> Inst. Públicas y de Seguiridad </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="limite"> Límite Político </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="relieve"> Relieve </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="suelos"> Suelos </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="transporte"> Transporte </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="vegetacion"> Vegetación </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCategoria} id="otros" > Otros </NavLink>
              </NavItem>
            </Nav>
            <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle 
                tag="span"
                data-toggle="dropdown"
                onClick={this.toggleDropdown}>
                {this.state.dropdownValue}
              </DropdownToggle>
              <DropdownMenu right
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
                <DropdownItem onClick={this.toggleDropdown}>Ola</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>k</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>ases</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>todo</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>bien</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>en casa?</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>que</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>ganas</DropdownItem>
                <DropdownItem onClick={this.toggleDropdown}>de morir</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Collapse>
        </Navbar>
        <NavCapasWMS capas={this.state.capas} />
        <NavCapasWFS isCapasWFSOpen={this.state.isCapasWFSOpen} />

      </div>
    );
  }
}

export default NavBar;
