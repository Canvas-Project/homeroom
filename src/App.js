import React, { Component } from 'react';
import './App.css'; 
import routes from './routes/routes.js';

export default class App extends Component {
  render() {
    return (
      <div>
        {routes}
      </div>
    );
  }
}