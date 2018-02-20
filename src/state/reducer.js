import { 
    LOAD_WORKERS,
    LOAD_ORDERS
 } from "./types";

const initialState = {
    workers: [],
    orders: [],
    trackerEntries: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WORKERS:
            return {...state, workers: action.payload}
      case LOAD_ORDERS: 
        return {...state, orders: action.payload }
      default:
          return state;
    }
}

export default reducer;