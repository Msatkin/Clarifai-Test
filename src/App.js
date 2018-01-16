import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import entities from './data/entities.csv';
import CSVReader from 'react-csv-reader';

class App extends Component {
  constructor() {
    super();
    this.state = {file: null};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Clarifai Test!</h1>
        </header>
        <CSVReader
          label="Select CSV with Image Urls  "
          onFileLoaded={this.handleFileChange.bind(this)}
          onError={this.handleFileError.bind(this)}
        />
      </div>
    );
  }

  handleFileChange(file) {
    console.log(file)
    this.setState({file: file});
  }

  handleFileError(error) {
    console.log(error);
  }
}

export default App;