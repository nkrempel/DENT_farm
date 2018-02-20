import {
    LOAD_WORKERS,
    LOAD_ORDERS,
    LOAD_TRANSACTIONS
} from "./types";

const initialState = {
    workers: [],
    orders: [],
    trackerEntries: [],
    transactions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TRANSACTIONS:
        return { ...state, transactions: action.payload
        }
        case LOAD_WORKERS:
            return { ...state, workers: action.payload }
        case LOAD_ORDERS:
            return { ...state, orders: action.payload }
        default:
            return state;
    }
}

export default reducer;