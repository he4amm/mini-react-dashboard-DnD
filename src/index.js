import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';

let storeInstance = store()

ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
