import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink,
} from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios'

const mockAPI = 'http://5a8b1a993d92490012370bca.mockapi.io/'

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Inventory: []
    }
  }


  componentDidMount(){
      this.getEggs()
  }

  getEggs(){
      axios.get(`${mockAPI}`).then(({data}) =>
      this.setState({Inventory : data })
      
    )
  }

  render() {
      console.log(this.state)
    return (
      <div className="card">
       {this.props.getEggs[0]
       }
      </div>
    );
  }
}

const mapStateToProps = ({ transactions }) => {
  return {
    transactions: transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEggs: function() {
        dispatch(this.getEggs())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);