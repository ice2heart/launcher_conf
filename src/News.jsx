import React, { Component } from 'react';
const uuidv1 = require('uuid/v1');



class NewsItem extends Component {
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onChange(this.props.data.id, name, value);
    }

    ondRemove() {
        this.props.onRemove(this.props.data.id);
    }

    render() {
        return (
            <div className='NewsItem'>
                <form>
                    <input type="text" name="header" key={'header' + this.props.data.id} value={this.props.data.header || ''} onChange={this.handleChange.bind(this)} />
                    <textarea value={this.props.data.text || ''} name="text" onChange={this.handleChange.bind(this)} />
                    <input type="datetime-local" name="date" value={this.props.data.date} onChange={this.handleChange.bind(this)} />
                    <input type="url" name="link" value={this.props.data.link  || ''} onChange={this.handleChange.bind(this)} />
                    <input type="text" name="mode" value={this.props.data.mode || ''} onChange={this.handleChange.bind(this)} />
                    <input type="text" name="args" value={this.props.data.args || ''} onChange={this.handleChange.bind(this)} />
                    <button onClick={this.ondRemove.bind(this)} type='button'>Remove ⌫</button>
                </form>

            </div>
        )
    }
}

class News extends Component {
    updatedNews(id, name, value) {
        let news = this.props.news;
        news = news.map(element => {
            if (element.id === id)
                element[name] = value;
            return element
        });
        this.props.onChange(news);
    }

    addNews() {
        this.props.onChange([...this.props.news, { id: uuidv1() }]);
    }

    removeNews(id) {
        let news = this.props.news.filter((i) => i.id !== id);
        this.props.onChange(news);
    }

    render() {
        let items = this.props.news.map((news) => <NewsItem key={news.id} data={news} onChange={this.updatedNews.bind(this)} onRemove={this.removeNews.bind(this)} />);
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