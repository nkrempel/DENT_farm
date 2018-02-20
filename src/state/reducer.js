import {
    LOAD_WORKERS,
    LOAD_ORDERS,
    LOAD_TRANSACTIONS,
    IS_LOADING
} from "./types";

const initialState = {
    workers: [],
    orders: [],
    trackerEntries: [],
    transactions: [],
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TRANSACTIONS:
            return { ...state, transactions: action.payload}
        case LOAD_WORKERS:
            return { ...state, workers: action.payload }
        case LOAD_ORDERS:
            return { ...state, orders: action.payload }
        case IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state;
    }
}

export default reducer;