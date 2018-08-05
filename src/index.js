import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import { ScatterProvider } from "./scatter";
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
    <Provider store={store}>
        <ScatterProvider>
            {providerState => <App {...providerState} /> } 
        </ScatterProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
