import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import todoApp from './reducer'

let store = createStore(todoApp);

let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
};

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);