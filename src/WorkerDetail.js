import React, { Component } from 'react';
import moment from 'moment';
import {
    connect
} from 'react-redux'
import {
    Link
} from 'react-router-dom';
import {BarChart} from 'react-easy-chart'
import {
    fetchWorkers
} from './state/actions'

import './Worker.css';


const getLastTwoWeeks = () => {
    let retArr = [];
    for (let i=14; i > 0; i--) {

        let date = new Date()
        date.setDate(date.getDate() - i)
        //console.log(date)
        retArr.push(moment(date).format('MMM D'))
    }
    return retArr
}

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
        //console.log(this.props.match.params.id)
        let worker = {}
        worker = this.props.workers.find((obj) => {return obj.id === this.props.match.params.id})
        //console.log(worker)
        let totalEggCount = 0;
        this.props.transactions.map((trans) => {
            if (trans.transType === 'Collect' && trans.typeId === worker.id) {
                totalEggCount += trans.eggCount
            }})
        let lastTwoWeeks = [];
        lastTwoWeeks = getLastTwoWeeks();
        console.log(lastTwoWeeks);
        let chartData = []
        let workerTransForDate = this.props.transactions.filter((transaction) => {
            return (transaction.transType === 'Collect' 
                    && transaction.typeId === worker.id)
        })
        console.log(workerTransForDate)
        lastTwoWeeks.map((date) => {
            let count = 0;
            console.log(`Inside Date map for ${date}`)
            workerTransForDate.map((transaction) => {
                    let formattedDate = moment.unix(transaction.transactionDate).format('MMM D')
                    console.log(formattedDate)
                    if (date === formattedDate) {
                        count += transaction.eggCount;
                    }
                })
            chartData.push({x: date, y:count})   

        })
        //console.log("logging ChartData")
        console.log(chartData)

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
                <hr />
                <div className="row">
                    <div className="col-12 text-left">
                        <h2>Production data for {worker.name}</h2>
                    </div>
                </div>
                <div className="row">
                <div className="col-3 text-right">
                        <h5>Lifetime Egg Production:</h5>
                    </div>
                    <div className="col-9 text-left">
                        <p>{totalEggCount}</p>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                <h3>Egg Production for last 14 days</h3>
                <div className="col-12">
                <BarChart
                    axisLabels={{ x: 'Date', y: 'Count' }} 
                    axes
                    height={300}
                    width={750}
                    yTickNumber={5}
                    barWidth={5}
                    xType={'text'}
                    data={chartData}
                />
                
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
