import {
  POST_ORDER,
  LOAD_ORDERS,
  GET_ORDERS
} from './types';
import axios from 'axios';

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
const loadOrders = payload => {
  return {
    type: LOAD_ORDERS,
    payload
  }
}
