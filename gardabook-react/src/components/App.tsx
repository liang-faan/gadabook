import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, RouteProps } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import injectSheet, { ThemeProvider } from 'react-jss'

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

import './styles/transitions.css'

import { updateCurrentNavLocation } from '../actions/navActionCreators'
import { BOOKINGS, EXPLORE } from '../reducers/navReducers'

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

  render() {
    const { classes } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Route
          render={({ location }) => (
            <div ref={this.doc} className={classes.root}>
              <TransitionGroup component={null}>
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={300}
                >
                  <Switch location={location}>
                    {/* <Splash /> */}
                    {/* <SignIn /> */}
                    {/* <SignUp /> */}
                    {/* <SignUpSuccess /> */}

                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/" component={Explore} />
                    <Route path="/bookings" component={Bookings} />
                    <Route path="/List" component={List} />
                    <Route path="/Listings" component={Listings} />
                    <Route path="/Notifications" component={Notifications} />
                    <Route render={() => <div>Not Found</div>} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
        />
      </ThemeProvider>
    )
  }
}

function mapStateToProps() {
  return {}
}

// @ts-ignore
export default withRouter(connect(
  mapStateToProps,
  { updateCurrentNavLocation }
)(injectSheet(styles(theme))(App)) as React.ComponentType<any>)
