import React from 'react';
import './App.css';
import MapComponent from './MapComponent';
import {BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MapComponent/>
      </div>
    </BrowserRouter>
  );
}

export default App;
