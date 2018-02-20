import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    NavLink
} from 'react-router-dom';
import {
    postTransaction,
    fetchWorkers,
    fetchTransactions
} from './state/actions';
import './App.css';
import { connect } from 'react-redux';
import { transaction } from './Transaction';


class Tracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eggs: 0,
            eggType: '',
            workerID: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeType = this.handleChangeType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleWorkerSelect = this.handleWorkerSelect.bind(this)
    }

    componentDidMount() {
        //console.log(this.props)
        this.props.fetchWorkers()
        this.props.fetchTransactions()
    }
    handleChange(e) {
        this.setState({ eggs: parseInt(e.target.value) })
    }
    handleChangeType(e) {
        this.setState({ eggType: (e.target.value) })
    }
    handleWorkerSelect(e) {
        let workerSelect = this.props.workers.find((obj) => { return e.target.value === obj.id })
        this.setState({ workerID: workerSelect.id })
    }

    handleSubmit(e) {
        e.preventDefault()
        let transaction

    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlSelect1">Type of Egg</label>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChangeType}>
                                <option>Chicken</option>
                                <option>Duck</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlSelect1">Transaction Type</label>
                            <select className="form-control" id="exampleFormControlSelect2">
                                <option>Add</option>
                                {/* <option>Remove</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlSelect1">Worker</label>
                            <select className="form-control" id="exampleFormControlSelect3" onSubmit={this.handleWorkerSelect}>
                                {this.props.workers.map((worker) => {
                                    if (worker.workerType === "workerType 2") {
                                        return (
                                            <option key={worker.id} value={worker.id}>{worker.name}</option>
                                        )
                                    }
                                })
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlSelect1">Transaction Amount</label>
                            <input type="number" className="form-control" id="exampleFormControlSelect"
                                onChange={this.handleChange}>
                            </input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Notes</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                    </div>
                    <button type="button" type="submit" className="btn btn-primary"
                        onClick={this.handleSubmit}
                    >Submit</button>
                </form>
                <div className="display-table">
                    <table className="table table-striped table-bordered">
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
                                if (this.props.transaction.transType === "add") {
                                    let worker = this.props.workers.find((obj) => { return transaction.typeId === obj.id })
                                    return (
                                        <tr>
                                            <th scope="row">{transaction.transId}</th>
                                            <td>{worker.type}</td>
                                            <td>{transaction.transType}</td>
                                            <td>{worker.name}</td>
                                            <td>{transaction.eggCount}</td>
                                            <td>{transaction.notes}</td>
                                        </tr>
                                    )
                                }
                            }
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
        postTransaction: eggs => dispatch(postTransaction(eggs)),
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
