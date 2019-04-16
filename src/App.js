import React, { Component, Fragment } from 'react';

import Form from './components/Form';
import List from './components/List';

import './App.css';

class App extends Component {
  state = {
    isFormOpen: false,
    active: null
  }

  handleToggleForm(toggle) {
    this.setState({
      isFormOpen: toggle,
    })
  }

  handleEditPress(item) {
    this.setState({
      isFormOpen: true,
      active: item
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Auto Send</h1>
        
        {this.state.isFormOpen && <Form active={this.state.active} onClose={this.handleToggleForm.bind(this, false)} />}
        {!this.state.isFormOpen && (
          <Fragment>
            <button className="button" onClick={this.handleToggleForm.bind(this, true)}>Add</button>
            <List editPress={this.handleEditPress.bind(this)} />
        </Fragment>
        )}
      </div>
    )
  }
}

export default App;
