import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, RouteProps } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import injectSheet, { ThemeProvider } from 'react-jss'
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import styles from './styles/App'
import theme from './styles/theme'
import { Props, State } from './datatypes/App'
import Splash from './Splash'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignUpSuccess from './SignUpSuccess'
import Explore from './Explore'
import Bookings from './Bookings'
import List from './List'
import Listings from './Listings'
import Notifications from './Notifications'
import ListingDetails from './ListingDetails'
import LoadingModal from './LoadingModal'
import { webClientId } from '../settings'

import './styles/transitions.css'

import { updateCurrentNavLocation } from '../actions/navActionCreators'
import { BOOKINGS, EXPLORE } from '../reducers/navReducers'
import { getCognitoToken } from '../actions/authActionCreators'

class App extends Component<Props & RouteProps, State> {
  doc: any
  constructor(props: Props) {
    super(props)
    let googleLogin = false
    if (window.plugins && window.plugins.googleplus) {
      googleLogin = true
    }
    this.state = {
      googleLogin,
    }
    this.doc = React.createRef()
  }

  componentDidMount() {
    // Handle mobile browser dynamic vh
    const vh = window.innerHeight * 0.01
    this.doc.current.style.setProperty('--vh', `${vh}px`)

    // Change current nav based on url path
    // TODO: remove when all paths are filled
    const pathname = this.props.location && this.props.location.pathname
    let navLocation
    if (pathname === '/explore') {
      navLocation = EXPLORE
    } else if (pathname === '/bookings') {
      navLocation = BOOKINGS
    } else {
      navLocation = '/'
    }
    this.props.updateCurrentNavLocation(navLocation)
  }

  componentDidUpdate() {
    Auth.currentAuthenticatedUser().then(res => console.log(res))
  }

  onClickGoogleLogin = () => {
    const params = {
      scopes: 'profile email',
      webClientId: webClientId,
      offline: true,
    }
    console.log(params)
    const onSuccess = data => {
      const code = data.serverAuthCode
      this.props.getCognitoToken(code)
      console.log('SUCCESSFUL LOGIN')
      console.log(JSON.stringify(data))
      // get cognito token
    }
    const onFailure = (msg: Object) => {
      console.log('FAILED LOGIN')
      console.log(msg)
    }
    // window.plugins.googleplus.trySilentLogin(params, onSuccess, onFailure)
    window.plugins.googleplus.login(params, onSuccess, onFailure)
  }

  render() {
    const { googleLogin } = this.state
    const { classes, googleSigninStatus, loadingScreen } = this.props

    const MainApp = () => (
      <Route
        render={({ location }) => (
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                {loadingScreen && <LoadingModal />}
                <Route exact path="/explore" component={Explore} />
                <Route exact path="/" component={Explore} />
                <Route path="/bookings" component={Bookings} />
                <Route path="/List" component={List} />
                <Route path="/Listings" component={Listings} />
                <Route path="/Notifications" component={Notifications} />
                {/* <Route render={() => <div>Not Found</div>} /> */}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    )

    const SignInButtons = () => {
      return (
        <div className={classes.signInButtonsContainer}>
          <div className={classes.google} onClick={this.onClickGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} size={'2x'} />
            <div className={classes.signInText}>SIGN IN WITH GOOGLE</div>
          </div>
        </div>
      )
    }

    const AmplifyMainApp = withAuthenticator(MainApp)

    return (
      <ThemeProvider theme={theme}>
        <div ref={this.doc} className={classes.root}>
          {(googleSigninStatus && <MainApp />) || <AmplifyMainApp />}
          {(googleLogin && <SignInButtons />) || <SignInButtons />}
        </div>
      </ThemeProvider>
    )
  }
}

function mapStateToProps({ view }) {
  return {
    googleSigninStatus: view.googleSigninStatus,
    loadingScreen: view.loadingScreen,
  }
}

// @ts-ignore
export default withRouter(connect(
  mapStateToProps,
  { updateCurrentNavLocation, getCognitoToken }
)(injectSheet(styles(theme))(App)) as React.ComponentType<any>)
