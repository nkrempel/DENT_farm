import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink,
} from 'react-router-dom';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="homeCard">
        <h1>In the beginning</h1>
        <p className="text-left">
          Farmer and the Del started as a small hobby and has slowly grown over
          the years. It started with a small garden in the back yard, then it got a
          little bigger, then a little bigger. </p>
          <p className="text-left">
          I grew up in southern California
          far away from any real food production. Where my food came from or
          what happens to it along the way was the farthest thing from my mind
          growing up. It wasn't until I was in college before I gave it any
          thought at all. After learning about factory farms and meat processing my
          girlfriend (now wife) and I started our own garden in the backyard. It started small, and grew, and grew.
          </p>
        <img className="homeImg" src={require("./images/chicks.jpg")} ></img>
        <p className="text-left">Then it got real, my wife ordered some chickens….</p>
      </div>
    );
  }
}
export default Home;
