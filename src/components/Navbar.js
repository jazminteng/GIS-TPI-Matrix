import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [capas, setCapas] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  const activarCapas = () => setCapas(!capas);

  function capasElement() {
    if (capas == true) { return ''; }
    return (<Navbar color="light" light expand="md">
    <NavbarBrand href="/">reactstrap</NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/components/">Muchas capas</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap">AHHH</NavLink>
        </NavItem>
      </Nav>
      <NavbarText>Capitas bien ricas</NavbarText>
    </Collapse>
  </Navbar>)
  }


return (
  <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret onClick={activarCapas}>
              Capas
              </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
                </DropdownItem>
              <DropdownItem>
                Option 2
                </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
                </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>Simple Text</NavbarText>
      </Collapse>
    </Navbar>

    {capasElement()}

  </div>
);
}

export default NavBar;
