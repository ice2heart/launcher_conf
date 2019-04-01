import React, { Component } from 'react';
const uuidv1 = require('uuid/v1');


class Package extends Component {
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
            <div className='package'>
                <form>
                    <input type="url" name="href" value={this.props.data.href || ''} onChange={this.handleChange.bind(this)} />
                    <input type="text" name="name" value={this.props.data.name || ''} onChange={this.handleChange.bind(this)} />
                    <button onClick={this.ondRemove.bind(this)} type='button'>Remove ⌫</button>
                </form>
            </div>
        )
    }
}

class Packages extends Component {
    onUpdate(id, name, value) {
        let data = this.props.list;
        data = data.map(element => {
            if (element.id === id)
                element[name] = value;
            return element
        });
        this.props.onChange(data);
    }
    onRemove(id) {
        let dataList = this.props.list.filter((i) => i.id !== id);
        this.props.onChange(dataList);
    }
    onAdd() {
        this.props.onChange([...this.props.list, { id: uuidv1() }]);
    }
    render() {
        let dataList = this.props.list.map((i) =>
            <Package key={i.id} data={i} onRemove={this.onRemove.bind(this)} onChange={this.onUpdate.bind(this)} />
        );
        return (
            <div className='packages'>
                {dataList}
                <button onClick={this.onAdd.bind(this)}>
                    Add mod
                </button>
            </div>
        )
    }
}

export default Packages;