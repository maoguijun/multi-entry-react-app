import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
// import BaseLayout from './components/BaseLayout' import routes from
// './routes' import './Pc.less'; import {routePath} from './config';
import PcDemo from './container/pcDemo'
import configureStore from './store';
const store = configureStore()

class Pc extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/pc/demo' component={PcDemo}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Pc;