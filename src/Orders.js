import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink
} from 'react-router-dom';
import { connect } from 'react-redux';
import { postOrder, getOrders } from './state/actions';
import './App.css';

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reference: '',
      type: 'Chicken',
      count: 0
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)

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
    this.props.postOrder({ reference: this.state.reference, type: this.state.type, count: this.state.count })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div class="container">
          <div className="row">
            <div className="col-sm-8">
              <div class="card text-white bg-primary">
                <div class="card-body">
                  <h5 class="card-title">Enter order details:</h5>
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
                      <input type="number" min="6" placeholder="Multiples of 6" step="6" name="count" id="eggCountId" required onChange={this.onInputChange}></input>
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

        <div class="container">
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-sm-8">
              <div class="card text-blue border-primary">
                <div class="card-body">
                  <h5 class="card-title">Existing Order Details</h5>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Order#</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Cust Ref</th>
                        <th scope="col">Type</th>
                        <th scope="col">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.orders.map((order, idx) => {
                        let extDate = new Date(order.createdAt * 1000)
                        let dspMonth = extDate.toLocaleString("en", { month: "short" })
                        let dspDay = extDate.getDate(), dspYear = extDate.getFullYear(), dspHour = extDate.getHours(), dspMins = extDate.getMinutes(), dspSecs = extDate.getSeconds(), dspAMPM = (dspHour >= 12) ? "PM" : "AM";
                        return (
                          <tr key={idx}>
                            <th scope="row">{order.id}</th>
                            <td>{dspMonth} {dspDay}, {dspYear}, {dspHour}:{dspMins}:{dspSecs} {dspAMPM}</td>
                            <td>{order.reference}</td>
                            <td>{order.type}</td>
                            <td>{order.count}</td>
                          </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
    )
  }
}

const mapStateToProps = ({ orders }) => {
  return {
    orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postOrder: function (payload) {
      dispatch(postOrder(payload))
    },
    getOrders: function () {
      dispatch(getOrders())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
