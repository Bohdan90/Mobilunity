import React, { Component } from 'react';
import './App.css';
import './components/EntityList';
import EntityList from "./components/EntityList";

class App extends Component {
  render() {
    return (
     <EntityList/>
    );
  }
}

export default App;
