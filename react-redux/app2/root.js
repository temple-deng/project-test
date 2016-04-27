
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import AsyncApp from './AsyncApp'

const store = configureStore({
    selectedSubreddit: 'frontend',
    postsBySubreddit: {
        frontend: {
            isFetching: true,
            didInvalidate: false,
            items: []
        },
        reactjs: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [
                {
                    id: 42,
                    title: 'Confusion about Flux and Relay'
                },
                {
                    id: 500,
                    title: 'Creating a Simple Application Using React JS and Flux Architecture'
                }
            ]
        }
    }
})

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}