import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CSVReader from 'react-csv-reader';
import tagImages from './ImageTagger.js';
import {CSVLink} from 'react-csv';

class App extends Component {
  constructor() {
    super();
    this.state = {file: null, taggingData: [["S3 Key", "tag", "probability"]], tagging: false};
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
        <button disabled={this.state.file == null || this.state.tagging} onClick={this.handleTagImages.bind(this)}>Tag Images</button>
        <p style={{marginTop: "30px"}}>{"Tagged " + (this.state.taggingData.length - 1) + " Images"}</p>
        
        <CSVLink data={this.state.taggingData} style={{display: (!this.state.tagging && this.state.taggingData.length > 1) ? "block" : "none"}}>Download me</CSVLink>
        
        
      </div>
    );
  }
  //Sets choosen file to state
  handleFileChange(file) {
    this.setState({file: file});
  }

  handleFileError(error) {
    console.log(error);
  }

  //Handles calling of tagging Api
  handleTagImages() {
    //Sets state to show tagging is in process
    this.setState({tagging: true});

    let urlsPerCall = 128;
    let urls = this.state.file.slice(1, 1500)
    let lastCall = false;

    //Loops through urls and calls api for each increment
    for (let i = 0; i < Math.ceil(urls.length / urlsPerCall); i++) {
      //Checks if it is the last call to be made
      if ((i + 1) * urlsPerCall > urls.length) {
        lastCall = true;
      }
      //Sends url to ImageTagger to be sent to the api
      tagImages(urls.slice(i * urlsPerCall, (i * urlsPerCall) + urlsPerCall), this.handleTaggingResponse.bind(this), lastCall);
    }
  }

  //Success callback with tagged data
  handleTaggingResponse(data, lastCall) {
    this.setState({taggingData: this.state.taggingData.concat(data), tagging: !lastCall})
  }
}

export default App;