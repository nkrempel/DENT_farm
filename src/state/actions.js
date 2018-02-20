import axios from 'axios';

export const addEggs = (payload) => {
    console.log("made it to add Eggs ")
    return (dispatch, getState, url) => {
        axios.post(`${url}transactions`, payload)
    }
  }
  
  export const fetchTransactions = () => {
  
    return (dispatch, getState, url) => {
      axios.get(`${url}transactions`)
        .then(({ data }) => {
          dispatch(loadTransactions(data));
        })
    }
  }
  
  export function loadTransactions(payload){
     return {
     type: 'LOAD_TRANSACTIONS',
     payload
     }
  }