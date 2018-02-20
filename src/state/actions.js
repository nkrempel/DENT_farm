import {
  POST_ORDER,
  LOAD_ORDERS,
  LOAD_WORKERS
} from './types';
import axios from 'axios';

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
export const postOrder = (orderObj) => {

  return (dispatch, getState, url) => {
    axios.post(`${url}orders`, orderObj)
      .then(({ data }) => {
        dispatch(getOrders());
      })
  }
}

export const getOrders = () => {

  return (dispatch, getState, url) => {
    axios.get(`${url}orders`)
      .then(({ data }) => {
        dispatch(loadOrders(data));
      })
  }
}
export const getEggs = () => {

  return (dispatch, getState, url) => {
    axios.get(`${url}transactions`)
      .then(({ data }) => {
        dispatch(loadInventory(data));
      })
  }
}
const loadOrders = payload => {
  return {
    type: LOAD_ORDERS,
    payload
  }
}
const loadInventory = payload => {
  return {
    type: GET_INVENTORY,
    payload
  }
}
