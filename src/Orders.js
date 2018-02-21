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

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'Open',
      reference: '',
      type: 'Chicken',
      count: 6,
      filterStatus: 'Open'
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onAction = this.onAction.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount() {
    this.props.getOrders()
  }

  onInputChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.postOrder({ status: this.state.status, reference: this.state.reference, type: this.state.type, count: this.state.count })
    this.setState({ reference: '', type: 'Chicken', count: 6 })
  }

  onAction(e) {
    e.preventDefault()
    this.props.putOrder({ id: e.target.id, status: e.target.name })
  }

  onFilterChange(e) {
    e.preventDefault()
    this.setState({ filterStatus: e.target.value })
  }

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.onSubmit}>
        <div className="container ord-entry-ctn">
          <div className="row">
            <div className="col-sm-8">
              <div className="card text-blue border-primary ord-entry-card">
                <div className="card-body">
                  <h5 className="card-title">Enter order details:</h5>
                  <div className="col-sm-4"></div>
                  <div className="row">
                    <div className="col-sm-4">
                      <label for="custRefId">Customer reference:</label>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" name="reference" id="custRefId" value={this.state.reference} required onChange={this.onInputChange}></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <label for="eggTypeId" >Egg type:</label>
                    </div>
                    <div className="col-sm-4">
                      <select name="type" id="eggTypeId" defaultValue="Chicken" onChange={this.onInputChange}>
                        <option value="Chicken" >Chicken</option>
                        <option value="Duck" >Duck</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <label for="eggCountId">Egg count:</label>
                    </div>
                    <div className="col-sm-4">
                      <input type="number" min="6" placeholder="Multiples of 6" step="6" name="count" id="eggCountId" value={this.state.count} required onChange={this.onInputChange}></input>
                    </div>
                  </div>
                  <div className="col-sm-11">
                  </div>
                </div>
              </div>
              <div className="row">&nbsp;</div>
              <button type="submit" className="btn btn-primary" id="sbmBtnId">Create Order</button>
            </div>
          </div>
        </div>

        {this.props.isLoading ? (
          <img style={{ width: '300px', height: '150px' }} src={require('./images/egg_loader.gif')} />
        ) : (
            <div className="ordersCtn">
              <div className="row">&nbsp;</div>
              <div className="row">
                <div className="col-sm-11">
                  <div className="card text-blue border-primary">
                    <div className="orders-card-body">
                      <h5 className="card-title">Existing Order Details</h5>
                      <div className="radFilterBy" id="radBox">Filter by:&nbsp;
                    <input className="radFilterBy" type="radio" value="All" id="radAll" onChange={this.onFilterChange} checked={this.state.filterStatus === 'All'} />
                        <label for="radAll">All</label>
                        <input className="radFilterBy" type="radio" value="Open" id="radOpen" onChange={this.onFilterChange} checked={this.state.filterStatus === 'Open'} />
                        <label for="radOpen">Open</label>
                        <input className="radFilterBy" type="radio" value="Completed" id="radCompleted" onChange={this.onFilterChange} checked={this.state.filterStatus === 'Completed'} />
                        <label for="radCompleted">Completed</label>
                        <input className="radFilterBy" type="radio" value="Canceled" id="radCanceled" onChange={this.onFilterChange} checked={this.state.filterStatus === 'Canceled'} />
                        <label for="radCanceled">Canceled</label>
                      </div>
                      <table className="table table-striped table-bordered">
                        <thead>
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
                              let extDate = new Date(order.createdAt * 1000)
                              let dspMonth = extDate.toLocaleString("en", { month: "short" })
                              let dspDay = extDate.getDate(), dspYear = extDate.getFullYear(), dspHour = extDate.getHours(), dspMins = extDate.getMinutes(), dspSecs = extDate.getSeconds(), dspAMPM = (dspHour >= 12) ? "PM" : "AM";
                              return (
                                <tr key={idx}>
                                  <th scope="row">{order.id}</th>
                                  <td>{dspMonth} {dspDay}, {dspYear}, {dspHour}:{dspMins}:{dspSecs} {dspAMPM}</td>
                                  <td>{order.status}</td>
                                  <td>{order.reference}</td>
                                  <td>{order.type}</td>
                                  <td>{order.count}</td>
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
            </div>)}

      </form>
    )
  }
}

const mapStateToProps = ( state ) => {
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
