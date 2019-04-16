import React, { Component } from 'react';

export default class List extends Component {
  state = {
    items: []
  }

  componentWillMount() {
    const data = localStorage.getItem('sms-ids')
    if (data) {
      this.setState({
        items: JSON.parse(data)
      })
    }
  }

  handleDeletePress(item) {
    const data = localStorage.getItem('sms-ids')
    const items = JSON.parse(data)
    if (items) {
      const indexItem = items.indexOf(item)
      items.splice(indexItem, 1)
      this.setState({
        items
      })
      localStorage.setItem('sms-ids', JSON.stringify(items))
    }
  }

  _renderItems() {
    if (this.state.items.length === 0) {
      return (
        <tr>
          <td rowSpan={3}>Tidak ada kontak</td>
        </tr>
      )
    }

    return this.state.items.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>
          <a href={this.getSmsUrl(item)} className='button'>Send</a>
          <button onClick={() => this.props.editPress(item)} className='button'>Edit</button>
          <button onClick={this.handleDeletePress.bind(this, item)} className='button'>Delete</button>
        </td>
      </tr>
    ))
  }

  getSmsUrl(data) {
    return `sms:${data.phone}?body=${data.message}`
  }


  render() {
    return (
      <table width='100%' border='1'>
        <tbody>
          {this._renderItems()}
        </tbody>
      </table>
    );
  }
}