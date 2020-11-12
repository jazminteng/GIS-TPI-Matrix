import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Table, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import '../css/Resultado.css';

class Resultado extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    console.log("ponele que llegue");
    const colname = [];
    const filatabla = [];
    if (this.props.resultado !== ''){
      const resultado = this.props.resultado.data.resultado;
      console.log('esto');
      console.log(resultado);
      for (const index in resultado[0]) {
        colname.push(
              <th>{index}</th>
        );
      }
      resultado.forEach(fila => {
        const items = [];
        for (const index in fila) {
          items.push(
            <td>{fila[index]}</td>
          )
        }
        filatabla.push(<tr>{items}</tr>);
      });
    } 
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Resultado de la consulta</BreadcrumbItem>
        </Breadcrumb>
        <Container className="themed-container" fluid={true} id='tab'>
          <Table responsive striped bordered>
              <thead>
                  <tr>
                  {colname}
                  </tr>
              </thead>
              <tbody>
                {filatabla}
              </tbody>
          </Table>
        </Container>
      </div>
    );

  }
}

export default Resultado;