import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CSVReader from 'react-csv-reader';
import tagImages from './ImageTagger.js';
import {CSVLink} from 'react-csv';

class App extends Component {
  constructor() {
    super();
    this.state = {file: null, taggingData: []};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Clarifai Test!</h1>
        </header>

        <p>{(this.state.file != null) ? this.state.file.length + " Urls Loaded" : "Please Select a File"}</p>
        <CSVReader
          onFileLoaded={this.handleFileChange.bind(this)}
          onError={this.handleFileError.bind(this)}
        />
        <br/>
        <button disabled={this.state.file == null} onClick={this.handleTagImages.bind(this)}>Tag Images</button>
        <br/>
        <br/>
        <p>{"Tagged " + this.state.taggingData.length + " Images"}</p>
        <CSVLink data={this.state.taggingData}>Download me</CSVLink>
      </div>
    );
  }

  handleFileChange(file) {
    this.setState({file: file});
  }

  handleFileError(error) {
    console.log(error);
  }

  handleTagImages() {
    let urls = this.state.file.slice(1, 6)
    for (let i = 0; i < Math.ceil(urls.length / 5); i++) {
      tagImages(urls.slice(i, i + 5), this.handleTaggingResponse.bind(this));
    }
  }

  handleTaggingResponse(data) {
    this.setState({taggingData: this.state.taggingData.concat(data)})
    console.log(this.state);
  }
}

export default App;