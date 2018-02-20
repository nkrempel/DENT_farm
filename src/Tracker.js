import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    NavLink
} from 'react-router-dom';
import {
    addEggs,
    fetchWorkers,
    fetchTransactions
} from './state/actions'
import './App.css';
import { connect } from 'react-redux';
import { addEggs } from './state/actions';
import { fetchTransactions } from './state/actions';
import { fetchWorkers } from './state/actions';

class Tracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eggs: 0
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({eggs: parseInt(e.target.value)})
    }

    render() {
        return (
            <div>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="exampleFormControlSelect1">Type of Egg</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option>Chicken</option>
                                <option>Duck</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="exampleFormControlSelect1">Transaction Type</label>
                            <select class="form-control" id="exampleFormControlSelect2">
                                <option>Add</option>
                                {/* <option>Remove</option> */}
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="exampleFormControlSelect1">Worker</label>
                            <select class="form-control" id="exampleFormControlSelect3">
                                {this.props.workers.map((worker) => {
                                    if (this.props.workers.workerType === "layer"){
                                        return(
                                            <option>{worker.name}</option>
                                        )}
                                    })
                                }
                                {/* <option>Chicken</option>
                                <option>Duck</option> */}
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="exampleFormControlSelect1">Transaction Amount</label>
                            <input type="number" class="form-control" id="exampleFormControlSelect"
                            onChange={this.handleChange}>
                            </input>
                        </div>
                    </div>                   
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Notes</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                    </div>
                    <button type="button" type="submit" class="btn btn-primary"
                    onClick = {(e) => {e.preventDefault(); this.props.addEggs(this.state.eggs)}}
                    >Submit</button>                    
                </form>
                <div className="display-table">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Egg Type</th>
                                <th scope="col">Add</th>
                                <th scope="col">Worker</th>
                                <th scope="col">Number of Eggs</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.transactions.map((transaction) => {
                            if(this.props.transaction.transType === "add"){
                           return(
                            <tr>
                                <th scope="row">{transaction.transId}</th>
                                <td>{worker}</td>
                                <td>{transaction.transType}</td>
                                <td>{worker}</td>
                                <td>{transaction.eggCount}</td>
                                <td>{transaction.notes}</td>
                            </tr>
                           )}}
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        workers: state.workers,
        transactions: state.transactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addEggs: eggs =>  dispatch(addEggs(eggs)),
        fetchWorkers: () => dispatch(fetchWorkers()),
        fetchTransactions: () => dispatch(fetchTransactions())
    }
}
//map state to props
//map dispatch to props
//to fetch workers
//to fetch transactions
//also to add eggs
export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
