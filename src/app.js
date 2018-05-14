import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import reducers from './reducers/reducer';
import Section from './components/section';
import DestinationCalculator from './components/destination-calculator';
import Discount from './components/discount';


import './App.css';

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

window.store = store;

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <AppBar
          title="Project 1"
        />
        <Route path="/section1" render={props => <Section {...props} dataFile="section1.json" nextPage="/section2" />} />
        <Route path="/section2" render={props => <Section {...props} dataFile="section2.json" nextPage="/destination-calculator" />} />
        <Route path="/destination-calculator" render={props => <DestinationCalculator {...props} nextPage="/discount" />} />
        <Route path="/discount" render={props => <Discount {...props} nextPage="/reason" />} />
      </div>
    </Router>
  </Provider>
);

export default App;
