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
import NavCapasWMS from './NavCapasWMS';
import NavCapasWFS from './NavCapasWFS';

class NavBar extends Component{

  constructor(props){
    super(props);
    this.toggleCapasWMS = this.toggleCapasWMS.bind(this);
    this.toggleCapasWFS = this.toggleCapasWFS.bind(this);
    this.toggleCollapse= this.toggleCollapse.bind(this);
    this.state = {
      isCapasWMSOpen: false,
      isCapasWFSOpen: false,
      isCollapseOpen: false
    }
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
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCapasWFS}>Capas WFS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCapasWMS}>Capas WMS</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
        <NavCapasWMS isCapasWMSOpen={this.state.isCapasWMSOpen} />
        <NavCapasWFS isCapasWFSOpen={this.state.isCapasWFSOpen} />

      </div>
    );
  }
}

export default NavBar;
