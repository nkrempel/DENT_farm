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
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


const mockAPI = 'http://5a8b1a993d92490012370bca.mockapi.io/'



class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
    }
    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnd = this.handleChangeEnd.bind(this)
  }

  componentDidMount(){
    this.props.fetchTransactions()
  }

  handleChangeStart(date){
    // this.setState({startDate: moment(date).format('MM-DD-YYYY')
    this.setState({startDate: moment(date)
    })
  }
  handleChangeEnd(date){
    // this.setState({endDate: moment(date).format('D-MMM-YY')
    this.setState({endDate: date
    })
  }
  // datePickerChecker(){
  //   if(this.state.startDate === this.state.endDate){
  //     console.log("date enabled")
  //     return "false"
  //   } else if (this.state.startDate < this.state.endDate){
  //     console.log("date disabled")
  //     return "false"
  //   } else {
  //     return "true"
  //   }
  //   }
  

render() {
  let chartData = [] 
  this.props.transactions.map ( item => { 
    chartData.push ({ x: moment.unix(item.createdAt).format('D-MMM-YY'), y:item.eggCount}) 
    // console.log(moment.unix(item.createdAt))
  }) 


  console.log(this.state)
  return <div>
      <div className="card">
      <h1 className="card">Inventory</h1>
     
     
      <div className="center">
        {/* <label id="startDate">Start Date</label>
        <input id='startDate' onChange={(e) => {this.setState({startDate: moment(e.target.value).format('D-MMM-YY')})}} type="date"/> 
        <label id="endDate">End Date</label>
        <input id='endDate' defaultValue="2018-02-21" onChange={(e) => {this.setState({endDate: moment(e.target.value).format('D-MMM-YY')})}} type="date"/>  */}
      <DatePicker
        selected={this.state.startDate}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        // disabled={this.datePickerChecker}
        onChange={this.handleChangeStart}
        placeholderText="Start Date"
    />

    <DatePicker
        selected={this.state.endDate}
        selectsEnd
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onChange={this.handleChangeEnd}
        // disabled={this.datePickerChecker}
        placeholderText="End Date"
    />
  
      </div>
  
        <p>Eggs Per Day</p>
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
              xDomainRange={[moment(this.state.startDate).format('D-MMM-YY'), moment(this.state.endDate).format('D-MMM-YY')]} 
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