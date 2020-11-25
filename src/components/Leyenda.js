import React, { Component } from 'react';

import CardTitle from 'reactstrap/lib/CardTitle';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';

import { urlLeyenda } from '../cfg/url'

class Leyenda extends Component {
  constructor(props){
    super(props);
  }

  rerender = () => this.forceUpdate();

  render() {

    return (
      <div>
        <CardTitle htmlFor='leyenda' className="font-weight-bold align-me" md={10}>Leyenda</CardTitle>
        <Card style={{ height: "50vh" }}>
          <CardBody className="leyenda" >
            <img src={urlLeyenda(this.props.capasActivas)} alt="No hay capas activas" />
          </CardBody>
        </Card>
      </div>
    );

  }
}

export default Leyenda;


