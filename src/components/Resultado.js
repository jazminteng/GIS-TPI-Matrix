import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Table, Breadcrumb, BreadcrumbItem} from 'reactstrap';

class Resultado extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    console.log("ponele que llegue");
    if (this.props.resultado !== null){
        console.log(this.props.resultado.data.resultado);
    }
    const items = [];
    const resultado = this.props.resultado.data.resultado;

    for (const index in resultado) {
      items.push(
        <tr>
            <th scope="row">1</th>
            <td>{resultado[index].gid}</td>
            <td>{resultado[index].prov}</td>
            <td>{resultado[index].provincia}</td>
        </tr>
      );
      console.log(resultado[index]);
    }
    return (
      <div>
        <h1>
            Hola
        </h1>
        <Breadcrumb>
			<BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
			<BreadcrumbItem active>Resultado de la consulta</BreadcrumbItem>
		</Breadcrumb>
        <Table striped>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </Table>
      </div>
    );

  }
}

export default Resultado;