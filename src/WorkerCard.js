import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import './Worker.css';

class WorkerCard extends Component {
    render() {
        const {image, name, eggs, id} = this.props;
        return (
            <div className="workerCard">
                <div className="media">
                    <img className="media-left" width="200" alt="Image" src={image} />
                        <div className="media-body">
                            <h4 className="card-title">{name}</h4>
                            <p className="card-text">Total Egg Production: {eggs}</p>
                            <Link className="btn btn-primary" to={`/workers/${id}`}>Details</Link>
                        </div>
                </div>
                </div>
                )
    }
}

export default WorkerCard;
