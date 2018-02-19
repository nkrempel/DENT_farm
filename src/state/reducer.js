import { LOAD_ORDERS } from "./types";


const initialState = {
    workers: [],
    orders: [],
    trackerEntries: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_ORDERS: 
        return {...state, orders: action.payload }
      default:
          return state;
    }
}

export default reducer;