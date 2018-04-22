import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Store from './store'
import Workspace from './components/Workspace';

class App extends Component {
  constructor(props) {
    super(props)
    this.store = new Store();
  }
  render() {
    return (
      <div className="App">
        <div>
          <Workspace store={this.store} workspace={this.store.workspace} />
        </div>
      </div>
    );
  }
}

export default observer(App)
