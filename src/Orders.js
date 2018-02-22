import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink
} from 'react-router-dom';
import { connect } from 'react-redux';
import { postOrder, getOrders, putOrder } from './state/actions';
import './App.css';
import moment from 'moment';

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'Open',
      reference: '',
      type: 'Chicken',
      count: 6,
      orderDate: '',
      filterStatus: 'Open'
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onAction = this.onAction.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount() {
    let rightNow = moment(Date.now()).format('YYYY-MM-DDTHH:mm')
    this.setState({orderDate:rightNow})
    this.props.getOrders()
  }

  onInputChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    let ordDate = moment(this.state.orderDate).format('X')
    this.props.postOrder({ status: this.state.status, reference: this.state.reference, type: this.state.type, count: this.state.count, orderDate: ordDate})
    let rightNow = moment(Date.now()).format('YYYY-MM-DDTHH:mm')
    this.setState({ reference: '', type: 'Chicken', count: 6, orderDate: rightNow })
  }

  onAction(e) {
    e.preventDefault()
    this.props.putOrder({ id: e.target.id, status: e.target.name })
  }

  onFilterChange(e) {
    this.setState({ filterStatus: e.target.value })
  }

  render() {
    return (
      <div>
        <form className="form-body col-sm-11" onSubmit={this.onSubmit}>
          <div className="card border-primary ord-entry-card">
            <h5 className="card-title mt-2">Enter order details:</h5>
            <div className="form-row ref-date">
              <div className="form-group col-sm-6 ref-date">
                <label htmlFor="custRefId">Customer reference:</label>
                <input className="form-control" type="text" name="reference" id="custRefId" value={this.state.reference} required onChange={this.onInputChange}></input>
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="orderDate">Order Date/Time</label>
                <input className="form-control" type="datetime-local" name="orderDate" id="orderDate" value={this.state.orderDate} onChange={this.onInputChange} placeholder="Choose Date" />
              </div>
            </div>
            <div className="form-row egg-chars">
              <div className="form-group col-sm-2 egg-chars">
                <label htmlFor="eggTypeId" >Egg type:</label>
                <select className="form-control" name="type" id="eggTypeId" defaultValue="Chicken" onChange={this.onInputChange}>
                  <option value="Chicken" >Chicken</option>
                  <option value="Duck" >Duck</option>
                </select>
              </div>
              <div className="form-group col-sm-2 egg-chars">
                <label htmlFor="eggCountId">Egg count:</label>
                <input className="form-control" type="number" min="6" placeholder="Multiples of 6" step="6" name="count" id="eggCountId" value={this.state.count} required onChange={this.onInputChange}></input>
              </div>
              <div className="form-row">&nbsp;
                <div className="form-group col-sm-3">
                </div>
              </div>
            </div>
          </div>
          <div className="row">&nbsp;</div>
          <button type="submit" className="btn btn-primary" id="sbmBtnId">Create Order</button>
        </form>

        <div>
          {
            this.props.isLoading ?
              (
                <img style={{ width: '300px', height: '150px' }} src={require('./images/egg_loader.gif')} />
              )
              :
              (
                <div className="ordersCtn">
                  <div className="row">&nbsp;</div>
                  <div className="row">
                    <div className="col-sm-11">
                      <div className="card border-primary">
                        <div className="orders-card-body">
                          <h5 className="card-title mt-2">Existing Order Details</h5>
                          <div className="radFilterBy" id="radBox">Filter by:&nbsp;
                            <input className="radFilterBy" type="radio" value="All" name="radFilter" id="radAll" onChange={this.onFilterChange} checked={this.state.filterStatus === 'All'} />
                            <label htmlFor="radAll">All</label>
                            <input className="radFilterBy" type="radio" value="Open" name="radFilter" id="radOpen" onChange={this.onFilterChange} checked={this.state.filterStatus === 'Open'} />
                            <label htmlFor="radOpen">Open</label>
                            <input className="radFilterBy" type="radio" value="Completed" name="radFilter" id="radCompleted" onChange={this.onFilterChange} checked={this.state.filterStatus === 'Completed'} />
                            <label htmlFor="radCompleted">Completed</label>
                            <input className="radFilterBy" type="radio" value="Canceled" name="radFilter" id="radCanceled" onChange={this.onFilterChange} checked={this.state.filterStatus === 'Canceled'} />
                            <label htmlFor="radCanceled">Canceled</label>
                          </div>
                          <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                              <tr>
                                <th scope="col">Order#</th>
                                <th scope="col">Ordered</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cust Ref</th>
                                <th scope="col">Type</th>
                                <th scope="col">Count</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.orders.map((order, idx) => {
                                if (order.status === this.state.filterStatus || this.state.filterStatus === 'All') {
                                  let dspDate = moment(new Date(order.orderDate * 1000)).format('MM/DD/YYYY hh:mm A')
                              // let extDate = new Date(order.orderDate * 1000)
                                  // let dspMonth = extDate.toLocaleString("en", { month: "short" })
                                  // let dspDay = extDate.getDate(), dspYear = extDate.getFullYear(), dspHour = extDate.getHours(), dspMins = extDate.getMinutes(), dspSecs = extDate.getSeconds(), dspAMPM = (dspHour >= 12) ? "PM" : "AM";
                                  return (
                                    <tr key={idx}>
                                      <td class="px-0">{order.id}</td>
                                      {/* <td>{dspMonth} {dspDay}, {dspYear}, {dspHour}:{dspMins}:{dspSecs} {dspAMPM}</td> */}
                                      <td class="px-1">{dspDate}</td>
                                      <td class="px-0">{order.status}</td>
                                      <td class="px-1">{order.reference}</td>
                                      <td class="px-1">{order.type}</td>
                                      <td class="px-0">{order.count}</td>
                                      {order.status === 'Open' ?
                                        <td> <button id={order.id} className="btn btn-primary complete-btn" name="Completed" onClick={this.onAction} >Complete</button>
                                          <button id={order.id} className="btn btn-warning" name="Canceled" onClick={this.onAction} >Cancel</button>
                                        </td> : <td>&nbsp;</td>
                                      }
                                    </tr>
                                  )
                                }
                              })
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postOrder: function (payload) {
      dispatch(postOrder(payload))
    },
    getOrders: function () {
      dispatch(getOrders())
    },
    putOrder: function (payload) {
      dispatch(putOrder(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
