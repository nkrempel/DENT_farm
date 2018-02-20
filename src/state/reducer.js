import { LOAD_WORKERS } from "./types";



const initialState = {
    workers: [],
    orders: [],
    trackerEntries: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_WORKERS:
            return {...state, workers: action.payload}
        default:
            return state;
    }
}

export default reducer;