import React, { Component } from 'react';

export default class Form extends Component {
  state = {
    form: {
      name: '',
      phone: '',
      message: ''
    }
  }

  componentWillMount() {
    if (this.props.active) {
      this.setState({
        form: this.props.active
      })
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }))
  }

  onFormSubmit(e) {
    e.preventDefault();

    const data = localStorage.getItem('sms-ids')
    const items = JSON.parse(data)
    console.log(items)
    if (items) {
      const isExist =  items.find(item => item.phone === this.state.form.phone)
      if (!isExist) {
        items.push(this.state.form)
      }
      else {
        const indexItem = items.indexOf(isExist)
        items[indexItem] = this.state.form
      }
      localStorage.setItem('sms-ids', JSON.stringify(items))
    }
    else {
      localStorage.setItem('sms-ids', JSON.stringify([
        this.state.form
      ]))
    }
    alert("save!")
    this.props.onClose()
  }

  render() {
    return (
      <form  onSubmit={this.onFormSubmit.bind(this)}>
        <div>
          <label>IDS Name</label>
          <input name="name" placeholder="IDS name" autoComplete='no' onChange={this.handleInputChange.bind(this)} value={this.state.form.name} />
        </div>
        <div>
          <label>IDS Phone Number</label>
          <input name="phone" type='tel' readOnly={this.props.active && this.props.active.phone} placeholder="IDS Phone Number" autoComplete='no' onChange={this.handleInputChange.bind(this)} value={this.state.form.phone} />
        </div>
        <div>
          <label>IDS Message Template</label>
          <input name="message" placeholder="IDS Message Template" autoComplete='no' onChange={this.handleInputChange.bind(this)} value={this.state.form.message} />
        </div>
        <div>
          <button className='button' type='submit'>Save</button>
          <button className='button' type='button' onClick={this.props.onClose}>Close</button>
        </div>
      </form>
    );
  }
}