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
// import DestinationCalculator from './components/destination-calculator';
// import DiscountCalculator from './components/discount-calculator';
// import ReasonCalculator from './components/reason';
import EndSurvey from './components/end-survey';

import DestinationCalculatorMorning from './components/destination-calculator/morning';
import DestinationCalculatorEvening from './components/destination-calculator/evening';

import DiscountCalculatorMorning1 from './components/discount-calculator/morning1';
import DiscountCalculatorMorning2 from './components/discount-calculator/morning2';
import DiscountCalculatorEvening1 from './components/discount-calculator/evening1';
import DiscountCalculatorEvening2 from './components/discount-calculator/evening2';

import ReasonCalculatorMorning1 from './components/reason/morning1';
import ReasonCalculatorMorning2 from './components/reason/morning2';
import ReasonCalculatorEvening1 from './components/reason/evening1';
import ReasonCalculatorEvening2 from './components/reason/evening2';

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

        <Route path="/section2" render={props => <Section {...props} dataFile="section2.json" nextPage="/destination-calculator/morning" />} />

        <Route path="/destination-calculator/morning" component={DestinationCalculatorMorning} />
        <Route path="/discount-calculator/morning1" component={DiscountCalculatorMorning1} />
        <Route path="/reason/morning1" component={ReasonCalculatorMorning1} />
        <Route path="/discount-calculator/morning2" component={DiscountCalculatorMorning2} />
        <Route path="/reason/morning2" component={ReasonCalculatorMorning2} />

        <Route path="/destination-calculator/evening" component={DestinationCalculatorEvening} />
        <Route path="/discount-calculator/evening1" component={DiscountCalculatorEvening1} />
        <Route path="/reason/evening1" component={ReasonCalculatorEvening1} />
        <Route path="/discount-calculator/evening2" component={DiscountCalculatorEvening2} />
        <Route path="/reason/evening2" component={ReasonCalculatorEvening2} />


        <Route path="/end" render={props => <EndSurvey {...props} nextPage="/" />} />
      </div>
    </Router>
  </Provider>
);

export default App;
