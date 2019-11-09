import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import { faStar } from '@fortawesome/free-regular-svg-icons'

import styles from './styles/Booking'
import { Props, State } from './datatypes/Booking'
import Topbar from './Topbar'
import BottomNav from './BottomNav'
import { updateCurrentNavLocation } from '../actions/navActionCreators'

class Booking extends Component {
  render() {
    const { currentBooking, classes } = this.props

    const BookingInfo = () => (
      <div>
        {Object.keys(currentBooking).map(key => (
          <div key={key}>
            {key}: {currentBooking[key]}
            <br />
            <br />
          </div>
        ))}
      </div>
    )
    return (
      <div className={classes.root}>
        <Topbar title="BOOKING DETAILS" />
        <BookingInfo />
        <BottomNav />
      </div>
    )
  }
}

function mapStateToProps({ booking }) {
  return {
    currentBooking: booking.current,
  }
}

export default connect(
  mapStateToProps,
  { updateCurrentNavLocation }
)(injectSheet(styles)(Booking))
