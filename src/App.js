import React, { Component } from 'react'
import store from './redux'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Routes from './routes'
import history from './history'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <>
                        <Routes />
                    </>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App
