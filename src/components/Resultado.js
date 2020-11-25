import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Table, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import '../css/Resultado.css';

class Resultado extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const colname = [];
    const filatabla = [];
    var keys = [];
    if (this.props.resultado !== ''){
      keys = Object.keys(this.props.resultado.data);
      if (keys.includes('resultado')){
        const resultado = this.props.resultado.data.resultado;
        for (const index in resultado[0]) {
          if(index !== "geojson")
          colname.push(
                <th>{index}</th>
          );
        }
        resultado.forEach(fila => {
          const items = [];
          for (const index in fila) {
            if(index !== "geojson")
            items.push(
              <td>{fila[index]}</td>
            )
          }
          filatabla.push(<tr>{items}</tr>);
        });
      }
      else {
        colname.push(<h4>No se ha encontrado resultado</h4>)
      }
    } 
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><Link to='/'>Mapa</Link></BreadcrumbItem>
          <BreadcrumbItem active>Resultado de la consulta</BreadcrumbItem>
        </Breadcrumb>
        <Container className="themed-container " fluid={true} id='tab'>
          <div class=" table-wrapper-scroll-y my-custom-scrollbar">
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
          </div>
        </Container>
      </div>
    );

  }
}

export default Resultado;