import React, { Component } from 'react';
import './App.css'; 
import routes from './routes/routes.js';
import Navbar from './components/Navbar/Navbar';
// import axios from 'axios';

export default class App extends Component {
  render() {
    let currentPath = document.location.hash;
    
    // if (currentPath !== '#/') {
    //   axios.get('/auth/me').then(res => {
    //     if (res.status === 200) {
          
    //     }
    //   }).catch(() => document.location.hash = '#/')
    // }

    return (
      <div className="app-outer">
        {currentPath === "#/" ? '' : <Navbar/>}
          <div className={currentPath === "#/" ? '' : "app-inner"}>
            {routes}
          </div>
      </div>
    );
  }
}