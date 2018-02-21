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
import {BarChart} from 'react-easy-chart'
import InfiniteCalendar from 'react-infinite-calendar';
import {Bar, Line } from 'react-chartjs-2';

const mockAPI = 'http://5a8b1a993d92490012370bca.mockapi.io/'



class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      inputDate: '',
        chartData: {
          labels: [],
          dataset: [],
        },
        // backgroundColor

    }
  }
  
  
  
  componentDidMount(){
    this.getEggs()
  }
  

  getEggs(){
    axios.get(`${mockAPI}transactions`).then(({data}) => 
    { 
      this.setState({inventory : data }) 
    } 
  ) 
}

render() {
  let chartData = [] 
  this.state.inventory.map ( item => { 
    chartData.push ({ x: convertDate(item.createdAt), y:item.eggCount}) 
    
  }) 

// var today = new Date();
// var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

  console.log(chartData)
  return <div>
      <div className="card">
      <h1 className="card">Inventory</h1>
      <div className="center">
        {/* <input onChange={(e) => {this.setState({inputDate: e.target.value})}} type="date"/> */}
        {/* <InfiniteCalendar width={600} height={200} selected={today} disabledDays={[0, 6]} minDate={lastWeek} /> */}
      </div>
        <p>Last 7 days</p>
        <BarChart axisLabels={{ x: 'My x Axis', y: 'My y Axis' }} axes colorBars height={250} width={650} barWidth={20} xTickNumber={5} yTickNumber={3} xType={'time'} 
        xDomainRange={['17-Feb-18', '20-Feb-18']} data={chartData} />
     

        {/* graphJS */}
      {/* <Bar 
        data={chartData}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true
        }}
        /> */}
      </div>
      
    </div>
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

let currentTime = new Date();
const currentDate =  new Date (dateFormat)

const dateFormat = date => {
  console.log(date)
  let myDate = new Date(date)
  console.log(myDate)
  let dd = myDate.getDate() 
  let mm= myDate.getMonth()+1; 
  const yy = myDate.getFullYear() - 2000 
  console.log(`${mm} ${dd} ${yy}`)
  let newMM = '' 
  
  if(dd<10) 
  { 
    dd=`0${dd}` 
  } 
  

  switch(mm){ 
    case 1: 
    newMM = 'Jan' 
    case 2: 
    newMM = 'Feb' 
    case 3: 
    newMM = 'Mar' 
    case 4: 
    newMM = 'Apr' 
    case 5: 
    newMM = 'May' 
    case 6: 
    newMM = 'Jun' 
    case 7: 
    newMM = 'Jul' 
    case 8: 
    newMM = 'Aug' 
    case 9: 
    newMM = 'Sep' 
    case 10: 
    newMM = 'Oct' 
    case 11: 
    newMM = 'Nov' 
    case 12: 
    newMM = 'Dec' 
    console.log(mm)

  } 
  
  let reformatedDate =`${dd}-${newMM}-${yy}` 
  console.log(reformatedDate)
  return reformatedDate 
} 


const convertDate = date => { 
  let myDate = new Date(date * 1000) 
  let dd = myDate.getDate() 
  let mm= myDate.getMonth()+1; 
  const yy = myDate.getFullYear() - 2000 
  let newMM = '' 
  
  if(dd<10) 
  { 
    dd=`0${dd}` 
  } 
  
  // if(mm<10) 
  // { 
  //   mm=`0${mm}` 
  // } 
  switch(mm){ 
    case 1: 
    newMM = 'Jan' 
    case 2: 
    newMM = 'Feb' 
    case 3: 
    newMM = 'Mar' 
    case 4: 
    newMM = 'Apr' 
    case 5: 
    newMM = 'May' 
    case 6: 
    newMM = 'Jun' 
    case 7: 
    newMM = 'Jul' 
    case 8: 
    newMM = 'Aug' 
    case 9: 
    newMM = 'Sep' 
    case 10: 
    newMM = 'Oct' 
    case 11: 
    newMM = 'Nov' 
    case 12: 
    newMM = 'Dec' 
    default: 
    newMM = "Feb"
  } 
  
  let reformatedDate =`${dd}-${newMM}-${yy}` 
  console.log(reformatedDate)
  return reformatedDate 
} 



export default connect(mapStateToProps, mapDispatchToProps)(Inventory);