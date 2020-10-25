import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { provincias } from '../layers';

class NavCapasWFS extends Component{

  constructor(props){
    super(props);
    this.mostrarCapa = this.mostrarCapa.bind(this);
    this.state = {
    }
  }
  mostrarCapa(){
    console.log(provincias);
    console.log(provincias.getVisible());
    provincias.setVisible(!provincias.getVisible());
  }

  render(){
    if (this.props.isCapasWFSOpen){
      return (
        <div>
          <Nav>
            <NavItem>
              <NavLink href="#">Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="provincia" onClick={this.mostrarCapa}>Provincias</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Another Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled href="#">Disabled Link</NavLink>
            </NavItem>
          </Nav>
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

export default NavCapasWFS;