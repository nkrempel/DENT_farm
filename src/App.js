import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink
} from 'react-router-dom';
import Home from './Home';
import Tracker from './Tracker';
import Inventory from './Inventory';
import Orders from './Orders';
import Workers from './Workers';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router><div className="App">
          <div className="row">
            <div class="col-3 " >
              <img style={{height: '32vh', width: '20vw'}} src={require('./images/chicken-thumbs-up.jpg')} />
             
            </div>
            <div class="col-9 align-self-center" >
              
              <h1>The Farmer and Del's Egg Tracker</h1>
            </div>  
          </div>
          <div className="row">
            <div class="col-3 " >
            <ul className="navMenu">
            <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/workers">Meet the Workers</NavLink></li>
              <li><NavLink to="/tracker">Daily Tracker</NavLink></li>
              <li><NavLink to="/inventory">Current Inventory</NavLink></li>
              <li><NavLink to="/orders">Orders</NavLink></li>
              
            </ul>
            </div>
            <div class="col-9 " >
              <Route exact path="/" component={Home} />
              <Route path="/workers" component={Workers} />
              <Route path="/tracker" component={Tracker} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/orders" component={Orders} />
            </div>  
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
