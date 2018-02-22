import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ReactModal from 'react-modal';
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
                            })})
                            </div>
                            </div>
                            </div>


                // <div>
                // <button onClick={this.handleShowAddWorker} className="btn btn-primary">Add Worker</button>
                // <div className="row">
                //     {this.props.workers.map((worker) => {
                //         let eggCount = 0;
                //         this.props.transactions.map((trans) => {
                //             if (trans.transType === 'Collect' && trans.typeId === worker.id) {
                //                 eggCount += trans.eggCount
                //             }
                //         })
                //         return (
                //             <div key={worker.id} className="col-3">
                //             <div className="card w-100" >
                //                 <img className="card-img-top" src={worker.imageURL} alt="Card image cap" />
                //                 <div className="card-body">
                //                     <h1 className="card-title">{worker.name}</h1>
                //                     <p className="card-text"><strong>Total Eggs Produced: </strong> {eggCount} </p>

                //                     <button id={worker.id} onClick={this.handleShowDetails} className="btn btn-primary">Details</button>
                //                 </div>

                //                 </div>
                //             </div>
                        
                //     )}
                //     )}
                        
                //     </div>
                // </div>
            )
            }
                <ReactModal
                    isOpen={this.state.showDetailModal}
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={() => { this.setState({ showDetailModal: false }) }}
                    contentLabel="Minimal Modal Example">
                    <div style={{backgroundColor: 'antiquewhite', margin: '0px'}}>
                    <div className="row">
                    <h1 className="text-center">Name: {this.state.selectedWorker.name}</h1>
                    </div>
                    <h2>Type:</h2> <p>{this.state.selectedWorker.type}</p>
                    <h2>Breed:</h2> <p>{this.state.selectedWorker.breed}</p>
                    <h2>Egg Color:</h2> <p>{this.state.selectedWorker.eggColor}</p>
                    <h2>Purchased Date:</h2> <p>{this.state.selectedWorker.purchaseDate}</p>
                    <h2>Primary Responsibility:</h2> <p>{this.state.selectedWorker.workerType}</p>
                    <img src={this.state.selectedWorker.imageURL} alt="Card image cap" />
                    <button className="btn btn-primary" onClick={() => { this.setState({ showDetailModal: false }) }}>Back to List</button>
                    </div>
                </ReactModal>
                <ReactModal
                    isOpen={this.state.showAddWorkerModal}
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={() => { this.setState({ showAddWorkerModal: false }) }}
                    contentLabel="Minimal Modal Example">
                    <form>
                        <div className="form-group">
                            <label htmlFor="newWorkerName">Name:</label>
                            <input type="email" className="form-control" id="newWorkerName" value={this.state.newWorkerName} onChange={this.handleInputChange} placeholder="Enter name" />
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="WorkerType" id="newWorkerType" value="Chicken" onChange={this.handleInputChange} checked={this.state.newWorkerType === 'Chicken'? true: false}/>
                                <label className="form-check-label" htmlFor="WorkerType">
                                    Chicken
                                </label>
                        </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="WorkerType" id="newWorkerType" value="Duck" onChange={this.handleInputChange} checked={this.state.newWorkerType === 'Duck'? true: false}/>
                                    <label className="form-check-label" htmlFor="WorkerType">
                                        Duck
                                </label>
                        </div>
                                <div className="form-group">
                                    <label htmlFor="newWorkerBreed">Breed:</label>
                                    <input type="text" className="form-control" id="newWorkerBreed" value={this.state.newWorkerBreed} onChange={this.handleInputChange} placeholder="Enter name" />
                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newWorkerEggColor">Egg Color:</label>
                                    <input type="text" className="form-control" id="newWorkerEggColor" value={this.state.newWorkerEggColor} onChange={this.handleInputChange}  placeholder="Enter egg Color" />
                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newWorkerPurchaseDate">Purchase Date:</label>
                                    <input type="date" className="form-control" id="newWorkerPurchaseDate" onChange={this.handleInputChange} placeholder="Enter name" />
                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newWorkerPrimaryResponsibility">Primary Responsibility:</label>
                                    <input type="text" className="form-control" id="newWorkerPrimaryResponsibility" value={this.state.newWorkerPrimaryResponsibility} onChange={this.handleInputChange} placeholder="Enter name" />
                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Image URL:</label>
                                    <input type="text" className="form-control" id="newWorkerImageURL" value={this.state.newWorkerImageURL} onChange={this.handleInputChange} placeholder="Enter name" />
                                    
                                </div>
                                <button className="btn btn-primary" onClick={this.handleAddWorker}>Add</button>&nbsp;
                            <button className="btn btn-primary" onClick={this.handleCancelAdd}>Cancel</button>

                    </form>
                            
                </ReactModal>
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

