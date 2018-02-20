

const initialState = {
    workers: [],
    orders: [],
    trackerEntries: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_TRANSACTIONS':
        return {
        ...state, transactions: action.payload
        }
        default:
            return state;
        
    }
}

export default reducer;