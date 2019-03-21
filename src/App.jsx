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
        // var json = JSON.stringify(data);
        // var blob = new Blob([json], { type: "application/json" });
        // var url = URL.createObjectURL(blob);

        // var a = document.createElement('a');
        // a.download = "packagelist.json";
        // a.href = url;
        // a.textContent = "Download new packagelist.json";
        // document.body.appendChild(a);
      } catch (error) {
        console.error(error);
      }
    });
    reader.readAsText(jsonFile);
  }
  onChange(changeEvent) {
    changeEvent.stopPropagation();
    changeEvent.preventDefault();
    this.readJsonFile(changeEvent.target.files[0]);
  }
  onChangeNews(news) {
    console.log(news)
    // this.setState({ new_news: news });
    let data = this.state.data;
    data.news = news;
    this.setState({data:data});
  }
  render() {
    let news;
    if (this.state.data) {
      news = <News news={this.state.data.news} onChange={this.onChangeNews.bind(this)} />
    }
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className='jsonInput'>
          <input type="file" id="jsonFile" name="jsonFile" onChange={this.onChange.bind(this)} />
        </div>
        <div className='loadedData'>
          {news}
        </div>
      </div>
    );
  }
}

export default App;
