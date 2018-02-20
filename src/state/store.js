import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument('http://5a8b1a993d92490012370bca.mockapi.io/')),
    )
  )

export default store;
