import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
// import BaseLayout from './components/BaseLayout' import routes from
// './routes' import './Pc.less'; import {routePath} from './config';
import Pc from './pc'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/pc' component={Pc}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;