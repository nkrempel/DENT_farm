import React, { Component } from 'react';
import {
    connect
} from 'react-redux'
import {
    Link
} from 'react-router-dom';
import {
    fetchWorkers
} from './state/actions'

import './Worker.css';

class WorkerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            worker: {}
        }
    }
    
    
    componentWillMount() {
        this.props.fetchWorkers()


    }

    render() {
        console.log(this.props.match.params.id)
        let worker = {}
        worker = this.props.workers.find((obj) => {return obj.id === this.props.match.params.id})
        console.log(worker)
        return (
            <div>
            {this.props.isLoading ? (
                <img src={require('./images/egg_loader.gif')} />
            ): (
                <div className="workerDetailCard">
                <div className="row">
                    <div className="col-11 text-center">
                    <h1>{worker.name}</h1>
                    </div>
                    <div className="col-1 text-left p-2">
                    <Link className="btn btn-primary"  onClick={(e) => {e.preventDefault(); this.props.history.goBack()}} to="">Back</Link>
                    </div>
                </div>
                <div className="row">
                <div className="col-3">
                <img style={{width: '200px'}}src={worker.imageURL} />
                </div>
                
                <div className="col-9">
                <div className="row">
                    <div className="col-3 text-right">
                        <h5>Name:</h5>
                    </div>
                    <div className="col-9 text-left">
                        <p>{worker.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 text-right">
                        <h5>Type:</h5>
                    </div>
                    <div className="col-9 text-left">
                        <p>{worker.type}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 text-right">
                        <h5>Breed:</h5>
                    </div>
                    <div className="col-9 text-left">
                        <p>{worker.breed}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 text-right">
                        <h5>Egg Color:</h5>
                    </div>
                    <div className="col-9 text-left">
                        <p>{worker.eggColor}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 text-right">
                        <h5>Primary Responsibility:</h5>
                    </div>
                    <div className="col-9 text-left">
                        <p>{worker.workerType}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 text-right">
                        <h5>Purchase Date:</h5>
                    </div>
                    <div className="col-9 text-left">
                        <p>{worker.purchaseDate}</p>
                    </div>
                </div>
                


                
                </div>
                </div>

                </div>
        )
    }
    </div>
        )
        
    }
}
const mapStateToProps = ({workers, transactions, isLoading}) => {
    return {
        workers,
        transactions,
        isLoading
    }
}
export default connect(mapStateToProps, {fetchWorkers})(WorkerDetail);
