import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { purple300 } from 'material-ui/styles/colors';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

import App from './app';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: purple300,
  },
  appBar: {
    height: 50,
  },
});

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
