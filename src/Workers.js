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
    fetchWorkers
} from './state/actions';
import './App.css';

class Workers extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            selectedWorker: {}
        }
        this.handleShowDetails = this.handleShowDetails.bind(this);
    }
    
    handleShowDetails(e) {
        e.preventDefault()
        console.log(`button clicked for ${e.target.id}`)
        let workerObj = this.props.workers.find((obj) => {return obj.id === e.target.id})
        console.log(workerObj)
        this.setState({selectedWorker: workerObj, showModal: true})
    }

    componentDidMount() {
        this.props.fetchWorkerData()
    }


    render() {
        return (
            <div>
                <div className="row">
                {this.props.workers.map((worker) => (
                <div key={worker.id} className="col-sm-4">   
                <div className="card" style={{width: '18rem'}}>
                    <img className="card-img" src={`https://picsum.photos/200/200?image=${Math.floor(Math.random()*1000)}`} alt="Card image cap" />
                        <div className="card-img-overlay">
                            <h1 className="card-title">{worker.name}</h1>
                            
                            <button id={worker.id} onClick={this.handleShowDetails} className="btn btn-primary">Details</button>
                        </div>
                        
                
                </div>
                </div>))}
                </div>
                <ReactModal 
           isOpen={this.state.showModal}
           ariaHideApp={false}
           shouldCloseOnOverlayClick={true}
           contentLabel="Minimal Modal Example"
        >
           <h1>Name: {this.state.selectedWorker.name}</h1>
           <h2>Type:</h2> <p>{this.state.selectedWorker.type}</p>
           <h2>Breed:</h2> <p>{this.state.selectedWorker.breed}</p>
           <h2>Egg Color:</h2> <p>{this.state.selectedWorker.eggColor}</p>
           <h2>Purchased Date:</h2> <p>{this.state.selectedWorker.purchaseDate}</p>
           <h2>Primary Responsibility:</h2> <p>{this.state.selectedWorker.workerType}</p>
           <img src={`https://picsum.photos/200/200?image=${Math.floor(Math.random()*1000)}`} alt="Card image cap" />
          <button className="btn btn-primary" onClick={() => {this.setState({showModal: false})}}>Back to List</button>
        </ReactModal>
            </div>
                )
    }
}

const mapStateToProps = state =>{
    return {
        workers: state.workers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWorkerData: () => dispatch(fetchWorkers())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Workers);

