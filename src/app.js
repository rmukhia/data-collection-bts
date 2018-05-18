import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import reducers from './reducers/reducer';
import Start from './components/start-test';
import Section from './components/section';
import DestinationCalculator from './components/destination-calculator';
import DiscountCalculator from './components/discount-calculator';
import ReasonCalculator from './components/reason';
import EndSurvey from './components/end-survey';


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
        <Route exact path="/" render={props => <Start {...props} nextPage="/section1" />} />
        <Route path="/section1" render={props => <Section {...props} dataFile="section1.json" nextPage="/section2" />} />
        <Route path="/section2" render={props => <Section {...props} dataFile="section2.json" nextPage="/destination-calculator" />} />
        <Route path="/destination-calculator" render={props => <DestinationCalculator {...props} nextPage="/discount-calculator" />} />
        <Route path="/discount-calculator" render={props => <DiscountCalculator {...props} nextPage="/reason" />} />
        <Route path="/reason" render={props => <ReasonCalculator {...props} nextPage="/end" />} />
        <Route path="/end" render={props => <EndSurvey {...props} nextPage="/" />} />
      </div>
    </Router>
  </Provider>
);

export default App;
