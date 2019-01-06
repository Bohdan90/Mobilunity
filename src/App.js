import React, { Component } from 'react';
import './App.css';
import './containers/EntityList';
import EntityList from "./containers/EntityList";

class App extends Component {
  render() {
    return (
     <EntityList/>
    );
  }
}

export default App;
