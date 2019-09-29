import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import styles from './styles/ListingDetails'
import { Props, State } from './datatypes/ListingDetails'

import Topbar from './Topbar'
import BottomNav from './BottomNav'

class ListingDetails extends Component<Props, State> {
  render() {
    const { classes } = this.props
    const Details = () => {
      return (
        <div className={classes.detailsContainer}>
          <div className={classes.details1}>
            <div className={classes.backButton}>
              <FontAwesomeIcon icon={faChevronLeft} size={'lg'} />
              &nbsp;back
            </div>
          </div>
          <div className={classes.details2}>
            <div className={classes.title}>An interesting listing</div>
            <div className={classes.owner}>by Stonefruit Pte Ltd</div>
            <div className={classes.detailsItem}>@ a very cool location</div>
            <div className={classes.detailsItem}>15 Oct 2019</div>
            <div className={classes.detailsItem}>
              2:30 PM - 5:30 PM (more timings available)
            </div>
            <div className={classes.tagAndLike}>
              <FontAwesomeIcon icon={faStar} />
              &nbsp;superlistingtag
            </div>
          </div>
          <div className={classes.details3}>
            <div className={classes.scrollContainer}>
              <div className={classes.heading}>Description</div>
              <div className={classes.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                quis iaculis sapien. Nunc vitae porttitor purus, eget volutpat
                quam. Aliquam elementum condimentum viverra. Fusce maximus
                commodo turpis sit amet convallis. Nunc ipsum felis, pharetra
                nec erat ut, feugiat molestie ante. Suspendisse aliquam sit amet
                orci quis ultricies. Donec iaculis purus et mauris maximus, non
                scelerisque dui aliquam. Mauris pellentesque nisi id egestas
                mollis. Vestibulum nec iaculis ligula, a pretium dui. Nam luctus
                mauris nibh, sed rhoncus turpis vulputate id. Fusce iaculis
                magna vitae massa condimentum, quis feugiat arcu mollis. orci
                quis ultricies. Donec iaculis purus et mauris maximus, non
                scelerisque dui aliquam. Mauris pellentesque nisi id egestas
                mollis. Vestibulum nec iaculis ligula, a pretium dui. Nam luctus
                mauris nibh, sed rhoncus turpis vulputate id. Fusce iaculis
                magna vitae massa condimentum, quis feugiat arcu mollis.
              </div>
              <div className={classes.heading}>Cost</div>
              <div>$50 (payment is arranged by listing owner</div>
            </div>
          </div>
        </div>
      )
    }

    const BookNow = () => {
      return (
        <div className={classes.bookNow}>
          <div className={classes.bookNowText}>BOOK NOW</div>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <Topbar />
        <Details />
        <BookNow />
        <BottomNav />
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(
  mapStateToProps,
  {}
)(injectSheet(styles)(ListingDetails))
