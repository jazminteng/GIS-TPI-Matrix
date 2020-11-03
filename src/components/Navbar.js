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

class NavBar extends Component{

  constructor(props){
    super(props);
    this.toggleCapasWMS = this.toggleCapasWMS.bind(this);
    this.toggleCapasWFS = this.toggleCapasWFS.bind(this);
    this.toggleCollapse= this.toggleCollapse.bind(this);
    this.toggleDropdown= this.toggleDropdown.bind(this);
    this.state = {
      isCapasWMSOpen: false,
      isCapasWFSOpen: false,
      isCollapseOpen: false,
      isDropdownOpen: false,
      dropdownValue: 'Consultar',
    }
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
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCapasWFS}>Capas WFS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleCapasWMS}>Capas WMS</NavLink>
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
        <NavCapasWMS isCapasWMSOpen={this.state.isCapasWMSOpen} />
        <NavCapasWFS isCapasWFSOpen={this.state.isCapasWFSOpen} />

      </div>
    );
  }
}

export default NavBar;
