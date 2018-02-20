import axios from 'axios';
import { LOAD_WORKERS } from './types';




export const fetchWorkers = () => {

    return (dispatch, getState, url) => {
        axios.get(`http://5a8b1a993d92490012370bca.mockapi.io/workers`)

        .then(({data}) => {
            console.log(data)
            dispatch(loadWorkers(data))
        })
    }
}

const loadWorkers = payload => {
    return {
        type: LOAD_WORKERS, payload
    }
}