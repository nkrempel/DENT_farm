import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import {
    BrowserRouter as Router,
    Link,
    Route,
    NavLink
} from 'react-router-dom';
import {
    fetchWorkers,
    fetchTransactions,
    addWorker
} from './state/actions';
import WorkerCard from './WorkerCard';
import Worker from './Worker';
import './App.css';
import './Worker.css';

const initialState = { 
        showDetailModal: false,
        selectedWorker: {},
        showAddWorkerModal: false,
        newWorkerName: '',
        newWorkerType: 'Chicken',
        newWorkerBreed: '',
        newWorkerPurchaseDate: '',
        newWorkerEggColor: '',
        newWorkerPrimaryResponsibility: '',
        newWorkerImageURL: ''
    }

    const customStyles = {
        backgroudColor: 'antiquewhite',
        content : {
          top                   : '25%',
          left                  : '25%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-25%, -25%)' 
        }
      };

class Workers extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleShowDetails = this.handleShowDetails.bind(this);
        this.handleShowAddWorker = this.handleShowAddWorker.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddWorker = this.handleAddWorker.bind(this);
        this.handleCancelAdd = this.handleCancelAdd.bind(this);
    }

    handleInputChange(e) {
        console.log(`handle change for ${e.target.id}`)
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value})
    }
    handleCancelAdd(e) {
        e.preventDefault();
        console.log("Cancelling the adding of the new worker")
        this.setState(initialState)
    }

    handleAddWorker(e) {
        e.preventDefault()
        console.log("Inside Handle add Worker")
        let newWorker = new Worker(
            this.state.newWorkerName,
            this.state.newWorkerType,
            this.state.newWorkerBreed,
            this.state.newWorkerPurchaseDate,
            this.state.newWorkerEggColor,
            this.state.newWorkerPrimaryResponsibility,
            this.state.newWorkerImageURL,
            'Female'
        )
        console.log(newWorker)
        this.props.addWorker(newWorker)
        this.setState(initialState)
    }

    handleShowAddWorker(e) {
        e.preventDefault();
        this.setState({ showAddWorkerModal: true })

    }

    handleShowDetails(e) {
        e.preventDefault()
        let workerObj = this.props.workers.find((obj) => { return obj.id === e.target.id })
        console.log(workerObj)
        this.setState({ selectedWorker: workerObj, showDetailModal: true })
    }

    componentDidMount() {
        this.props.fetchWorkerData()
        this.props.fetchTransactionData()
    }

    componentDidUpdate() {
        //this.props.fetchWorkerData()
    }


    render() {
        return (
            <div>
                <div className="titleCard text-xl-center rounded">
                <div className="row">
                    <div className="col-11">
                    <h1>Meet the Workers!</h1> 
                    </div>
                    <div className="col-1 p-2">
                <Link className="btn btn-primary" to="/workers/add">Add</Link></div> 
                    </div>
                    </div>
                {this.props.isLoading ? (
                    <img style={{width: '300px', height: '150px'}}src={require('./images/egg_loader.gif')}/>
                ) : (

                    <div className="workerContainer">
                        <div className="row justify-content-center">
                        <div className="col-6">
                        {this.props.workers.map((worker) => {
                            let eggCount = 0;
                            this.props.transactions.map((trans) => {
                                if (trans.transType === 'Collect' && trans.typeId === worker.id) {
                                    eggCount += trans.eggCount
                                }})
                                return (
                                    <WorkerCard 
                                        key={worker.id}
                                        id={worker.id}
                                        image={worker.imageURL}
                                        name={worker.name}
                                        eggs={eggCount} />
                                )
                            })}
                            </div>
                            </div>
                            </div>

            )
            }
             

            </div>
                    )
    }
}

const mapStateToProps = state => {
    return {
        workers: state.workers,
        transactions: state.transactions,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWorkerData: () => dispatch(fetchWorkers()),
        fetchTransactionData: () => dispatch(fetchTransactions()),
        addWorker: (worker) => dispatch(addWorker(worker))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workers);

