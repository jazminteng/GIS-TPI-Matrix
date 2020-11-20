import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import MapComponent from './MapComponent';
import NavBar from './Navbar';
import Resultado from './Resultado';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state={
        resultado:'',
    }
  }
  setModel = resultado => this.setState({ resultado});
  setResultado(resultado){
      this.setState({
        resultado: resultado
      });  
  }
  render() {

    return (
        <div>
            <Switch>
                <Route exact path="/resultado">
                    <Resultado resultado={this.state.resultado}/>
                </Route>
                <Route exact path="/">
                    <MapComponent setResultado = {this.setModel}/>
                </Route>
                <Redirect to="/" />
            </Switch>
        </div>
    );

  }
}

export default Main;