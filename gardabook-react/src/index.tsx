import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import 'normalize.css'

import App from './components/App'
import rootReducer from './reducers'

Amplify.configure({
  Auth: {
    region: 'ap-southeast-1',
    userPoolId: 'ap-southeast-1_n90l7WmwP',
    userPoolWebClientId: '61ioah5nfcf9ddieampclq53j8',
    mandatorySignIn: false,
    authenticationFlowType: 'USER_PASSWORD_AUTH', // required to get auth code
  },
})

declare global {
  interface Window {
    plugins: any
  }
}

interface Obj {
  imageUrl: string
  displayName: string
  email: string
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const reactApp = () => {
  const _App = () => {
    return (
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
  }
  deviceReady()
  ReactDOM.render(<_App />, document.getElementById('root'))
}

// @ts-ignore
if (window.cordova) {
  console.log('IN')
  document.addEventListener('deviceready', reactApp, false)
} else {
  console.log('OUT')
  reactApp()
}

function deviceReady() {
  //I get called when everything's ready for the plugin to be called!
  console.log('Device is ready!')
  // login()
}
