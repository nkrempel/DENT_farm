import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
