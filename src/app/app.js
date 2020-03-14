import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Root from '../root/Root';
import Landing from '../landing/landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Switch>
            <Route
              exact
              path={'/'}
              component={Landing}
            />
            <Route
              exact
              path={'/adoption'}
              component={Root}
            />  
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
