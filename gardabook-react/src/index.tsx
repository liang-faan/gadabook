import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router } from 'react-router-dom'
import 'normalize.css'

import App from './components/App'
import rootReducer from './reducers'

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
const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))

const reactApp = () => {
  deviceReady()
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  )
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

  window.plugins.googleplus.login(
    {
      scopes: '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      webClientId: 'mywebapplicationclientid', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      offline: true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    },
    function(obj: Object) {
      alert(JSON.stringify(obj)) // do something useful instead of alerting
    },
    function(msg: Object) {
      alert('error: ' + msg)
    }
  )
}

function isAvailable() {
  window.plugins.googleplus.isAvailable(function(avail: Object) {
    alert(avail)
  })
}
function login() {
  window.plugins.googleplus.login(
    {},
    function(obj: Obj) {
      const imgElement = document.querySelector('#image') as HTMLImageElement
      imgElement.src = obj.imageUrl
      imgElement.style.visibility = 'visible'
      document.querySelector('#feedback').innerHTML =
        'Hi, ' + obj.displayName + ', ' + obj.email
    },
    function(msg: Object) {
      document.querySelector('#feedback').innerHTML = 'error: ' + msg
    }
  )
}
function trySilentLogin() {
  window.plugins.googleplus.trySilentLogin(
    {},
    function(obj: Obj) {
      const imgElement = document.querySelector('#image') as HTMLImageElement
      imgElement.src = obj.imageUrl
      imgElement.style.visibility = 'visible'
      document.querySelector('#feedback').innerHTML =
        'Silent hi, ' + obj.displayName + ', ' + obj.email
    },
    function(msg: String) {
      document.querySelector('#feedback').innerHTML = 'error: ' + msg
    }
  )
}
function logout() {
  window.plugins.googleplus.logout(
    function(msg: string) {
      const imgElement = document.querySelector('#image') as HTMLImageElement
      const feedbackElement = document.querySelector('#feedback')
      imgElement.style.visibility = 'hidden'
      feedbackElement.innerHTML = msg
    },
    function(msg: string) {
      const feedbackElement = document.querySelector('#feedback')
      feedbackElement.innerHTML = msg
    }
  )
}
function disconnect() {
  window.plugins.googleplus.disconnect(
    function(msg: string) {
      const imgElement = document.querySelector('#image') as HTMLImageElement
      imgElement.style.visibility = 'hidden'
      document.querySelector('#feedback').innerHTML = msg
    },
    function(msg: string) {
      document.querySelector('#feedback').innerHTML = msg
    }
  )
}
window.onerror = function(what, line, file) {
  alert(what + '; ' + line + '; ' + file)
}
function handleOpenURL(url: String) {
  document.querySelector('#feedback').innerHTML =
    'App was opened by URL: ' + url
}
