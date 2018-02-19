import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument('http://5a7c85554c1e2d00124a5e0d.mockapi.io/ppm/')),
    )
  )

export default store;
