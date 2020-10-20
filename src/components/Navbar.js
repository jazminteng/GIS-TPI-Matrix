import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import NavCapas from './NavCapas';

class NavBar extends Component{

  constructor(props){
    super(props);
    this.toggleCapas = this.toggleCapas.bind(this);
    this.toggleCollapse= this.toggleCollapse.bind(this);
    this.state = {
      isCapasOpen: false,
      isCollapseOpen: false
    }
  }

  toggleCapas(){
    this.setState({
      isCapasOpen: !this.state.isCapasOpen
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
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCapas}>Capas</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
        <NavCapas isCapasOpen={this.state.isCapasOpen} />

      </div>
    );
  }
}

export default NavBar;
