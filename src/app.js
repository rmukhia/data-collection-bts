import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';


import reducers from './reducers/reducer';
import Section1 from './components/section-1';
import Section2 from './components/section-2';


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
        <Route path="/section1" component={Section1} />
        <Route path="/section2" component={Section2} />
      </div>
    </Router>
  </Provider>
);

export default App;
