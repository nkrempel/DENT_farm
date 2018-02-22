import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink,
} from 'react-router-dom';
import './App.css';
import { fetchTransactions, getOrders } from './state/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { BarChart } from 'react-easy-chart';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mockAPI = 'http://5a8b1a993d92490012370bca.mockapi.io/';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      chartData: [],
      showToolTip: false,
      top: ``,
      left: ``,
      y: '',
      x: ''

      // eggTypeSource: '',
    }
    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnd = this.handleChangeEnd.bind(this)
    this.mouseOverHandler = this.mouseOverHandler.bind(this)
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
    this.mouseOutHandler = this.mouseOutHandler.bind(this)

    // this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchTransactions();
    this.props.getOrders();
  }

  handleChangeStart(date) {
    // this.setState({startDate: moment(date).format('MM-DD-YYYY')
    this.setState({
      startDate: moment(date),
    });
  }
  handleChangeEnd(date) {
    // this.setState({endDate: moment(date).format('D-MMM-YY')
    this.setState({
      endDate: date,
    });
  }
  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x,
    });
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({ top: `${e.y - 10}px`, left: `${e.x + 10}px` });
    }
  }
  mouseOutHandler() {
    this.setState({ showToolTip: false });
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

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x
    });
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({ top: `${e.y - 10}px`, left: `${e.x + 10}px` });
    }
  }

  mouseOutHandler() {
    this.setState({ showToolTip: false });
  }


  render() {
    let totalCollection = 0;
    let totalCompletedOrders = 0;
    let openOrders = 0;

    this.props.transactions.map(trans => {
      if (trans.transType === 'Collect') {
        totalCollection += trans.eggCount;
      } else {
        totalCompletedOrders += trans.eggCount;
      }
    });

    console.log(`totalCollection - ${totalCollection} `)
    console.log(`totalCompletedOrders - ${totalCompletedOrders} `)



    this.props.orders.map(order => {
      if (order.status === 'Open') {
        openOrders += parseInt(order.count);
      }
    });

    console.log(`openOrders - ${openOrders}`)
    let onHandInventory = totalCollection - totalCompletedOrders;
    let availableInventory = onHandInventory - openOrders;
    let chartData = [];
    let sortData = this.props.transactions.slice();
    sortData.sort(function (a, b) {
      return a.transactionDate - b.transactionDate;
    });
    let currentDate = 0;
    let firstPass = true;
    let dateEggCount = 0;
    console.log(sortData);
    let sortDataLength = sortData.length;

    sortData.map((item, idx) => {
      if (item.transType === 'Collect') {
        if (firstPass) {
          currentDate = moment.unix(item.transactionDate).format('D-MMM-YY');
          firstPass = false;
          dateEggCount = dateEggCount + item.eggCount;
          // console.log('first pass current count ' + dateEggCount);
        } else if (
          currentDate === moment.unix(item.transactionDate).format('D-MMM-YY')
        ) {
          dateEggCount = dateEggCount + item.eggCount;
          // console.log('current count ' + dateEggCount);
          if ((idx = sortDataLength - 1)) {
            chartData.push({
              x: currentDate,
              y: dateEggCount,
            });
          }
        } else {
          chartData.push({
            x: currentDate,
            y: dateEggCount,
          });
          dateEggCount = item.eggCount;
          currentDate = moment.unix(item.transactionDate).format('D-MMM-YY');
        }
      }
    });

    console.log(this.props.transactionDate)
    return (
      <div>
        <div className="card inv-card">
          <h1>Inventory</h1>
          <div className="row justify-content-md-center">
            <div className="col-3 text-right">
              <h4>Total Onhand Inventory:</h4>
            </div>
            <div className="col-3 text-left">
              <h4> {onHandInventory}</h4>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-3 text-right">
              <h4>Available Inventory:</h4>
            </div>
            <div className="col-3 text-left">
              <h4>{availableInventory}</h4>
            </div>
          </div>
          <div className="center mt-5">
            <DatePicker
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
              placeholderText="Start Date"
            />

            <DatePicker
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
              placeholderText="End Date"
            />
          </div>

          <p>Eggs Per Day</p>
          {this.state.showToolTip ?
            <p>{this.state.y} eggs were collected on {this.state.x}.</p> :
            <p>&nbsp;</p>
          }
          <BarChart
            axisLabels={{ x: 'Day', y: 'Count' }}
            axes
            grid
            colorBars
            height={250}
            width={650}
            barWidth={20}
            xTickNumber={5}
            yTickNumber={5}
            datePattern="%d-%b-%y"
            xType={'time'}
            xDomainRange={[
              moment(this.state.startDate).format('D-MMM-YY'),
              moment(this.state.endDate).format('D-MMM-YY'),
            ]}
            data={chartData}
            mouseOverHandler={this.mouseOverHandler}
            mouseOutHandler={this.mouseOutHandler}
            mouseMoveHandler={this.mouseMoveHandler}
            yDomainRange={[0, 40]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions()),
    getOrders: () => dispatch(getOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
