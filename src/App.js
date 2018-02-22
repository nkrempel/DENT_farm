import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink
  NavLink,
  Switch
} from 'react-router-dom';
import Home from './Home';
import Tracker from './Tracker';
import Inventory from './Inventory';
import Orders from './Orders';
import Workers from './Workers';
import WorkerDetail from './WorkerDetail';
import NewWorkerForm from './NewWorkerForm';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router><div className="App">
          <div className="row">
            <div className="col-3 " >
              <img style={{height: '32vh', width: '20vw'}} className="figure-img img-fluid rounded" src={require('./images/chicken-thumbs-up.jpg')} />
             
            </div>
            <div className="align-self-center" >
              <h1 className="titleCard text-xl-center rounded">The Farmer and Del's Egg Tracker</h1>
              {/* <h1><span class="badge badge-secondary">The Farmer and Del's Egg Tracker</span></h1> */}
            </div>  
          </div>
          <div className="row">
            <div className="rounded card-body col-2 " >
            <ul className="list-group list-group-flush navMenu">
              <li className="list-group-item"><NavLink to="/">Home</NavLink></li>
              <li className="list-group-item"><NavLink to="/workers">Meet the Workers</NavLink></li>
              <li className="list-group-item"><NavLink to="/tracker">Daily Tracker</NavLink></li>
              <li className="list-group-item"><NavLink to="/inventory">Current Inventory</NavLink></li>
              <li className="list-group-item"><NavLink to="/orders">Orders</NavLink></li>
              
            </ul>
            </div>
            <div className="col-9 " >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/workers" component={Workers} />
              <Route exact path="/workers/add" component={NewWorkerForm} />
              <Route path="/workers/:id" component={WorkerDetail} />
              <Route path="/tracker" component={Tracker} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/orders" component={Orders} />
            </Switch>
            </div>  
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
