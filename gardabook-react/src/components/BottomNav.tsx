import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { updateCurrentNavLocation } from '../actions/navActionCreators'
import {
  BOOKINGS,
  EXPLORE,
  LIST,
  LISTINGS,
  NOTIFICATIONS,
  CREATE_BOOKING,
} from '../reducers/navReducers'

import {
  faSearch,
  faClipboardList,
  faClipboardCheck,
  faPlus,
  faBell,
} from '@fortawesome/free-solid-svg-icons'

import styles from './styles/BottomNav'
import { Props, State } from './datatypes/BottomNav'

class BottomNav extends Component<Props, State> {
  componentDidMount() {
    // console.log(this.props.location.pathname)
  }
  onClickLink = (navLocation: String) => () => {
    this.props.updateCurrentNavLocation(navLocation)
  }

  render() {
    const { classes, currentNavLocation } = this.props

    return (
      <div className={classes.bottomNav}>
        <Link to="/explore" onClick={this.onClickLink(EXPLORE)}>
          <div
            className={`${classes.navItem} ${
              currentNavLocation === EXPLORE ? classes.navItemSelected : ''
            }`}
          >
            <FontAwesomeIcon icon={faSearch} size={'lg'} />
            Explore
          </div>
        </Link>
        <Link to="/bookings" onClick={this.onClickLink(BOOKINGS)}>
          <div
            className={`${classes.navItem} ${
              currentNavLocation === BOOKINGS ? classes.navItemSelected : ''
            }`}
          >
            <FontAwesomeIcon icon={faClipboardCheck} size={'lg'} />
            Bookings
          </div>
        </Link>
        <Link to="/list" onClick={this.onClickLink(LIST)}>
          <div
            className={`${classes.navItem} ${classes.navItemPlus} ${
              false ? classes.navItemSelected : ''
            }`}
          >
            <div className={classes.faPlusContainer}>
              <FontAwesomeIcon icon={faPlus} size={'lg'} />
            </div>
            List
          </div>
        </Link>
        <Link to="/listings" onClick={this.onClickLink(LISTINGS)}>
          <div
            className={`${classes.navItem} ${
              false ? classes.navItemSelected : ''
            }`}
          >
            <FontAwesomeIcon icon={faClipboardList} size={'lg'} />
            Listings
          </div>
        </Link>
        <Link to="/notifications" onClick={this.onClickLink(NOTIFICATIONS)}>
          <div
            className={`${classes.navItem} ${
              false ? classes.navItemSelected : ''
            }`}
          >
            <FontAwesomeIcon icon={faBell} size={'lg'} />
            Notifications
          </div>
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    currentNavLocation: state.nav.current,
  }
}

export default connect(
  mapStateToProps,
  { updateCurrentNavLocation }
)(injectSheet(styles)(BottomNav))
