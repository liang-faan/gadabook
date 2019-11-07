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
import Explore from './Explore'
import Bookings from './Bookings'
import List from './List'
import Listings from './Listings'
import Notifications from './Notifications'
import ListingDetails from './ListingDetails'
import LoadingModal from './LoadingModal'

import './styles/transitions.css'

import { updateCurrentNavLocation } from '../actions/navActionCreators'
import { BOOKINGS, EXPLORE } from '../reducers/navReducers'
import {
  loginWithGoogle,
  updateShowGoogleLogin,
  updateCognitoToken,
} from '../actions/authActionCreators'

class App extends Component<Props & RouteProps, State> {
  doc: any
  constructor(props: Props) {
    super(props)
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
    this.props.loginWithGoogle()
  }

  render() {
    const {
      classes,
      signinType,
      loadingScreen,
      showGoogleLogin,
      updateShowGoogleLogin,
      updateCognitoToken,
    } = this.props

    let googleLogin = false
    if (window.plugins && window.plugins.googleplus) {
      googleLogin = true
    }

    const MainApp = () => {
      console.log('JER')
      if (signinType === 'COGNITO') {
        Auth.currentSession().then(data => {
          const amplifyCognitoToken = data.getIdToken().getJwtToken()
          updateCognitoToken(amplifyCognitoToken)
        })
      }
      updateShowGoogleLogin(false)
      return (
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
    }

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
          {(signinType === 'GOOGLE' && <MainApp />) || <AmplifyMainApp />}
          {(googleLogin && showGoogleLogin && <SignInButtons />) || null}
        </div>
      </ThemeProvider>
    )
  }
}

function mapStateToProps({ view, auth }) {
  return {
    signinType: auth.signinType,
    loadingScreen: view.loadingScreen,
    showGoogleLogin: auth.showGoogleLogin,
  }
}

// @ts-ignore
export default withRouter(connect(
  mapStateToProps,
  {
    updateCurrentNavLocation,
    loginWithGoogle,
    updateShowGoogleLogin,
    updateCognitoToken,
  }
)(injectSheet(styles(theme))(App)) as React.ComponentType<any>)
