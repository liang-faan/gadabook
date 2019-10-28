import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { HashRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'normalize.css'

import App from './components/App'
import rootReducer from './reducers'

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-southeast-1_Yc1XAOUfh',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '29llvpvj8sqhh8k5o1781p81k1',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
})

const federated = {
  google_client_id:
    '761641708289-ttd7sc03mjkrno4b4vk6m1tru9iiog3i.apps.googleusercontent.com', // Enter your google_client_id here
  // facebook_app_id: '686536215202827', // Enter your facebook_app_id here
  amazon_client_id: '', // Enter your amazon_client_id here
}

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

// import * as serviceWorker from './serviceWorker';
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
  const AppWithAuth = withAuthenticator(_App)

  // ReactDOM.render(<AppWithAuth federated={federated} />,
  //   document.getElementById('root')
  // )
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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

function deviceReady() {
  //I get called when everything's ready for the plugin to be called!
  console.log('Device is ready!')
  // login()
}
