import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faQrcode, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import styles from './styles/Explore'
import { Props, State } from './datatypes/Explore'

import Topbar from './Topbar'
import BottomNav from './BottomNav'

class Explore extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      img: '',
    }
  }

  onClickTakePicture = () => {
    console.log('click')

    const onSuccess = (imageData: string) => {
      this.setState({ img: imageData })
    }

    const onFail = (message: string) => {
      alert('Failed because: ' + message)
    }

    // @ts-ignore
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 25,
      // @ts-ignore
      destinationType: Camera.DestinationType.FILE_URI,
    })
  }

  render() {
    const { classes } = this.props

    const SearchSection = () => {
      return (
        <div className={classes.searchSection}>
          <div className={classes.searchSectionTop}>
            <input
              className={classes.searchBar}
              type="text"
              placeholder="Search Catalog"
            />
            <div
              className={classes.qrScanner}
              onClick={this.onClickTakePicture}
            >
              <FontAwesomeIcon icon={faQrcode} size={'lg'} />
              &nbsp;Scan
            </div>
          </div>
          <div className={classes.searchSectionBottom}>
            <div className={classes.scrollContainer}>
              <div className={classes.filterSelector}>
                <div className={classes.filterText}>Any tag</div>
                <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
              </div>
              <div className={classes.filterSelector}>
                <div className={classes.filterText}>Any day</div>
                <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
              </div>
              <div className={classes.filterSelector}>
                <div className={classes.filterText}>Any time</div>
                <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
              </div>
              <div className={classes.filterSelector}>
                <div className={classes.filterText}>Any location</div>
                <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
              </div>
              <div className={classes.filterSelector}>
                <div className={classes.filterText}>Any tag</div>
                <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
              </div>
              <div className={classes.filterSelector}>
                <div className={classes.filterText}>Any tag</div>
                <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
              </div>
              <div className={classes.filterSelector}>
                <div className={classes.filterText}>Any tag</div>
                <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
              </div>
              <div className={classes.filterSelectorRightFill}>&nbsp;</div>
            </div>
          </div>
        </div>
      )
    }

    const Listings = () => {
      const Date = (props: any) => {
        return <div className={classes.date}>{props.date}</div>
      }

      const Listing = () => {
        return (
          <div className={classes.listing}>
            <div className={classes.listingRow1}>
              <div className={classes.owner}>Stonefruit Pte Ltd</div>
              <div className={classes.tag}>tag</div>
            </div>
            <div className={classes.listingRow2}>
              <div className={classes.owner}>An interesting listing</div>
              <div className={classes.tag}>3 hrs</div>
            </div>
            <div className={classes.listingRow3}>
              <div className={classes.owner}>
                2:30 PM @ a very cool location
              </div>
              <div className={classes.tag}>
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className={classes.listings}>
          <Date date={'15 Oct 2019'} />
          <Listing />
          <Listing />
          <Listing />
          <Date date={'16 Oct 2019'} />
          <Listing />
          <Listing />
          <Listing />
          <Listing />
          <Listing />
          <Date date={'17 Oct 2019'} />
          <Listing />
          <Listing />
          <Listing />
          <Listing />
          <Listing />
          <Listing />
          <Listing />
          <Listing />
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <Topbar />
        <SearchSection />
        {this.state.img && <img src={this.state.img} alt="scan" />}
        <Listings />
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
)(injectSheet(styles)(Explore))