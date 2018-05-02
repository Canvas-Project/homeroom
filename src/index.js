import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {HashRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>
   , document.getElementById('root'));
