import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import {
    connect
} from 'react-redux';
import {
    addWorker
} from './state/actions';
import Worker from './Worker'
import './Worker.css';

const chickenBreeds = [
    'Ameraucana',
    'Ameriflower',
    'Ancona',
    'Australorp',
    'Brahma',
    'Catalana',
    'Cuckoo Bluebar',
    'Delaware',
    'Favaucana',
    'Hamburg',
    'Leghorn (White)',
    'Rhode Island',
    'Star',
    'Wyandotte',
    'Other'
];
const duckBreeds = [
    'American Pekin',
    'Khaki Campbell',
    'Indian Runner',
    'Rouen',
    'Cayuga',
    'Welsh Harlequin',
    'Silver Appleyard',
    'Ancona',
    'Other'
]
const eggColors = [
    'White',
    'Cream',
    'Light Brown',
    'Brown',
    'Speckled',
    'Light Blue',
    'Sage Green',
    'Other'
]
const initialState = {
    newWorkerName: '',
    newWorkerType: 'Chicken',
    newWorkerBreed: '',
    newWorkerEggColor: '',
    newWorkerPurchaseDate: new Date(),
    newWorkerPrimaryResponsibility: '',
    newWorkerImageURL: ''
}

class NewWorkerForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCancelAdd = this.handleCancelAdd.bind(this);
        this.handleAddWorker = this.handleAddWorker.bind(this);
    }

    handleInputChange(e) {
        console.log(`handle change for ${e.target.id}`)
        this.setState({ [e.target.id]: e.target.value })
    }

    handleCancelAdd(e) {
        e.preventDefault();
        this.setState(initialState)
        this.props.history.goBack()
    }
    handleAddWorker(e) {
        e.preventDefault()
        console.log("Inside Handle add Worker")
        let newWorker = new Worker(
            this.state.newWorkerName,
            this.state.newWorkerType,
            document.getElementById("newWorkerBreed").value,
            this.state.newWorkerPurchaseDate,
            document.getElementById("newEggColor").value,
            document.getElementById("newWorkerPrimaryResponsibility").value,
            this.state.newWorkerImageURL,
            'Female'
        )
        console.log(newWorker)
        this.props.addWorker(newWorker)
        this.setState(initialState)
        this.props.history.push("/workers")
    }

    render() {
        console.log(this.props)
        return (
            <div className="row justify-content-md-center">
            <div className="col-8">
            <div className="workerCard">
                <form>
                    <div className="form-row">
                        <div className="col-6 text-left">
                            <label htmlFor="newWorkerName">Name:</label>
                            <input type="type" className="form-control" id="newWorkerName" value={this.state.newWorkerName} onChange={this.handleInputChange} placeholder="Enter name" />
                        </div>
                    </div>
                        <div className="col text-left">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="WorkerType" id="newWorkerType" value="Chicken" onChange={this.handleInputChange} checked={this.state.newWorkerType === 'Chicken' ? true : false} />
                                <label className="form-check-label" htmlFor="WorkerType">
                                    Chicken
                                        </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="WorkerType" id="newWorkerType" value="Duck" onChange={this.handleInputChange} checked={this.state.newWorkerType === 'Duck' ? true : false} />
                                <label className="form-check-label" htmlFor="WorkerType">
                                    Duck
                                        </label>
                            </div>
                        </div>
                    <div className="form-row">
                        
                        <div className="form-group col-md-4 text-left">
                            <label htmlFor="newWorkerBreed">Breed</label>
                            <select onChange={this.handleInputChange}
                            id="newWorkerBreed" className="form-control">
                                {this.state.newWorkerType === 'Chicken' ? 
                                    chickenBreeds.map((breed, idx) => (
                                        <option key={idx}>{breed}</option>
                                    )) :
                                    duckBreeds.map((breed, idx) => (
                                        <option key={idx}>{breed}</option>
                                    ))
                                }
                            </select>
                        </div>
                        </div>
                        
                        <div className="form-row">
                        
                        <div className="form-group col-md-4 text-left">
                            <label htmlFor="newEggColor">Egg Color:</label>
                            <select onChange={this.handleInputChange}
                            id="newEggColor" className="form-control">
                                {eggColors.map((color, idx) => (
                                    <option key={idx}>{color}</option>
                                ))
                            }
                            </select>
                        </div>
                        </div>

                        <div className="form-group text-left">
                            <label htmlFor="newWorkerPurchaseDate">Purchase Date:</label>
                            <input type="date" className="form-control" id="newWorkerPurchaseDate" onChange={this.handleInputChange} placeholder="Enter name" />

                        </div>
                        <div className="form-row">
                        
                        <div className="form-group col-md-4 text-left">
                            <label htmlFor="newWorkerPrimaryResponsibility">Primary Responsibility:</label>
                            <select onChange={this.handleInputChange}
                            id="newWorkerPrimaryResponsibility" className="form-control">
                                <option>Layer</option>
                                <option>Meat</option>
                            </select>
                        </div>
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="exampleInputEmail1">Image URL:</label>
                            <input type="text" className="form-control" id="newWorkerImageURL" value={this.state.newWorkerImageURL} onChange={this.handleInputChange} placeholder="Enter name" />

                        </div>
                        <button className="btn btn-primary" onClick={this.handleAddWorker}>Add</button>&nbsp;
                            <button className="btn btn-warning" onClick={this.handleCancelAdd}>Cancel</button>

                    </form>
            </div>
                            </div>
                            </div>
                )
    }
}


export default connect(null, {addWorker})(NewWorkerForm);
