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
    this.toggleC0= this.toggleC0.bind(this);
    this.toggleC1= this.toggleC1.bind(this);
    this.state = {
      isCapasOpen: false,
      isC1Open: false,
      isC0Open: false
    }
  }

  toggleCapas(){
    this.setState({
      isCapasOpen: !this.state.isCapasOpen
    });
  }

  toggleC0(){
    this.setState({
      isC0Open: !this.state.isC0Open
    });
  }

  toggleC1(){
    this.setState({
      isC1Open: !this.state.isC1Open
    });
  }


  /*const [isOpen, setIsOpen] = useState(false);

  const [capas, setCapas] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const activarCapas = () => setCapas(!capas);*/

  render(){
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Bievenido a mapita</NavbarBrand>
          <NavbarToggler onClick={this.toggleC0} />
          <Collapse isOpen={this.state.isC0Open} navbar>
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
