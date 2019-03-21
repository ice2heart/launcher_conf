import React, { Component } from 'react';
const uuidv1 = require('uuid/v1');



class NewsItem extends Component {
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        console.log(target.value)
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(name, value);
        this.props.onChange(name, value);
    }

    ondRemove() {
        this.props.onRemove(this.props.data.id);
    }

    render() {
        return (
            <div className='NewsItem'>
                <form>
                    <input type="text" name="header" key={'header' + this.props.data.id} value={this.props.data.header} onChange={this.handleChange.bind(this)} />
                    <textarea value={this.props.data.text} name="text" onChange={this.handleChange.bind(this)} />
                    <input type="datetime-local" name="date" value={this.props.data.date} onChange={this.handleChange.bind(this)} />
                    <input type="url" name="link" value={this.props.data.link} onChange={this.handleChange.bind(this)} />
                    <input type="text" name="mode" value={this.props.data.mode} onChange={this.handleChange.bind(this)} />
                    <input type="text" name="args" value={this.props.data.args} onChange={this.handleChange.bind(this)} />
                    <button onClick={this.ondRemove.bind(this)} type='button'>Remove ⌫</button>
                </form>

            </div>
        )
    }
}

class News extends Component {
    constructor(props) {
        super(props);
        this.state = { news: props.news }
    }
    updatedNews(news, name, value) {
        news[name] = value;
        console.log(this.state.news)
        this.setState({ news: this.state.news });
        this.props.onChange(this.state.news);
    }

    addNews() {
        // this.setState({ news: [...this.state.news, { id: uuidv1() }] });
        this.props.onChange( [...this.state.news, { id: uuidv1() }]);
    }

    removeNews(id) {
        let news = this.state.news.filter((i) => i.id !== id);
        this.setState({news: news});
        this.props.onChange(news);
    }

    render() {
        let items = this.state.news.map((news) => <NewsItem key={news.id} data={news} onChange={this.updatedNews.bind(this, news)} onRemove={this.removeNews.bind(this)} />);
        return (
            <div>
                {items}
                <button onClick={this.addNews.bind(this)}>
                    Add News
                </button>
            </div>
        )
    }
}

export default News;