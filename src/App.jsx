import React, { Component } from 'react';
import './App.css';
import News from './News';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  readJsonFile(jsonFile) {
    var reader = new FileReader();
    reader.addEventListener('load', (loadEvent) => {
      try {
        let data = JSON.parse(loadEvent.target.result);
        data.news = data.news.map((i) => {
          i.id = uuidv1();

          i.date = new Date(Date(i.date)).toISOString();
          i.date = i.date.substring(0, i.date.length - 1);
          return i;
        })

        this.setState({ data: data });
      } catch (error) {
        console.error(error);
      }
    });
    reader.readAsText(jsonFile);
  }

  generateJson() {
    let json = JSON.stringify(this.state.data);
    let blob = new Blob([json], { type: "application/json" });
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', 'packagelist.json');
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(blobURL);
    }, 100);
  }

  onChange(changeEvent) {
    changeEvent.stopPropagation();
    changeEvent.preventDefault();
    this.readJsonFile(changeEvent.target.files[0]);
  }

  onChangeNews(news) {
    let data = this.state.data;
    data.news = news;
    this.setState({ data: data });
  }

  render() {
    let news;
    let downloadBtn;
    if (this.state.data) {
      news = <News news={this.state.data.news} onChange={this.onChangeNews.bind(this)} />
      downloadBtn = <button onClick={this.generateJson.bind(this)}>Generate JSON</button>
    }
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className='jsonInput'>
          <input type="file" id="jsonFile" name="jsonFile" onChange={this.onChange.bind(this)} />
          {downloadBtn}
        </div>
        <div className='loadedData'>
          {news}
        </div>
      </div>
    );
  }
}

export default App;
