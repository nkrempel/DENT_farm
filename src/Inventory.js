import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink,
} from 'react-router-dom';
import './App.css';
import {fetchTransactions} from './state/actions'
import { connect } from 'react-redux';
import axios from 'axios'
import {BarChart} from 'react-easy-chart'
import moment from 'moment';


const mockAPI = 'http://5a8b1a993d92490012370bca.mockapi.io/'



class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
    }
  }

  componentDidMount(){
    this.props.fetchTransactions()
  }


render() {
  let chartData = [] 
  this.props.transactions.map ( item => { 
    chartData.push ({ x: moment.unix(item.createdAt).format('D-MMM-YY'), y:item.eggCount}) 
    // console.log(moment.unix(item.createdAt))
  }) 

// var today = new Date();
// var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

  console.log(this.state)
  return <div>
      <div className="card">
      <h1 className="card">Inventory</h1>
      <div className="center">
        <label id="startDate">Start Date</label>
        <input id='startDate' onChange={(e) => {this.setState({startDate: moment(e.target.value).format('D-MMM-YY')})}} type="date"/> 
        <label id="endDate">End Date</label>
        <input id='endDate' onChange={(e) => {this.setState({endDate: moment(e.target.value).format('D-MMM-YY')})}} type="date"/> 
        {/* <InfiniteCalendar width={600} height={200} selected={today} disabledDays={[0, 6]} minDate={lastWeek} /> */}
      </div>
        
        <p>Last 7 days</p>
        <BarChart 
              axisLabels={{ x: 'My x Axis', y: 'My y Axis' }} 
              axes 
              colorBars 
              height={250} 
              width={650} 
              barWidth={20} 
              xTickNumber={5} 
              yTickNumber={3} 
              datePattern="%d-%b-%y"
              xType={'time'} 
              xDomainRange={[this.state.startDate, this.state.endDate]} 
              data={chartData} />
     

  
      </div>
      
    </div>
  } 
} 

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};


const mapDispatchToProps = dispatch => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Inventory);