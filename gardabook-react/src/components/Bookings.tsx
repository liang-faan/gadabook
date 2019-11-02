import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import { faStar } from '@fortawesome/free-regular-svg-icons'

import styles from './styles/Bookings'
import { Props, State } from './datatypes/Bookings'
import Topbar from './Topbar'
import BottomNav from './BottomNav'
import { getBookingList } from '../actions/bookingActionCreators'

class Bookings extends Component<Props, State> {
  componentDidMount() {
    this.props.getBookingList()
  }

  getUniqueDates = bookingList => {
    let datetimes = []
    bookingList.forEach(booking => {
      const d = moment(booking.bookingDate)
      datetimes.push(d)
    })
    datetimes
      .sort((a, b) => {
        return a.diff(b)
      })
      .reverse()
    datetimes = datetimes.map(datetime => {
      const d = moment(datetime)
      return d.format('D/M/YYYY')
    })
    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }
    datetimes = datetimes.filter(unique)
    return datetimes
  }

  render() {
    const { bookingList, classes } = this.props

    const datetimes = this.getUniqueDates(bookingList)

    const FilterSelector = props => (
      <div className={classes.filterSelector}>
        <div className={classes.filterText}>Any {props.type}</div>
        <FontAwesomeIcon icon={faChevronDown} size={'sm'} />
      </div>
    )

    const SearchSection = () => {
      return (
        <div className={classes.searchSection}>
          <div className={classes.searchSectionTop}>
            <input
              className={classes.searchBar}
              type="text"
              placeholder="Search Bookings"
            />
            <div className={classes.qrScanner}>
              <FontAwesomeIcon icon={faQrcode} size={'lg'} />
              &nbsp;Scan
            </div>
          </div>
          <div className={classes.searchSectionBottom}>
            <div className={classes.scrollContainer}>
              <FilterSelector type={'tag'} />
              <FilterSelector type={'day'} />
              <FilterSelector type={'time'} />
              <FilterSelector type={'location'} />
              <FilterSelector type={'tag'} />
              <FilterSelector type={'tag'} />
              <FilterSelector type={'tag'} />
              <FilterSelector type={'tag'} />
              <div className={classes.filterSelectorRightFill}>&nbsp;</div>
            </div>
          </div>
        </div>
      )
    }

    const Listings = () => {
      const DateComponent = (props: any) => {
        return <div className={classes.date}>{props.date}</div>
      }

      const Listing = props => {
        const {
          address,
          catalogueName,
          duration,
          providerLastName,
          providerFirstName,
          tags,
          time,
        } = props
        return (
          <div className={classes.listing}>
            <div className={classes.listingRow1}>
              <div
                className={classes.owner}
              >{`${providerFirstName} ${providerLastName}`}</div>
              <div className={classes.tags}>
                {tags.map(tag => {
                  return (
                    <div className={classes.tag} key={tag.tagId}>
                      {tag.status === 'Active' ? tag.descritpion : null}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={classes.listingRow2}>
              <div className={classes.owner}>{`${catalogueName}`}</div>
              <div className={classes.tag}>{duration}</div>
            </div>
            <div className={classes.listingRow3}>
              <div className={classes.owner}>{`${time} @ ${address}`}</div>
              {/* <div className={classes.tag}>
                <FontAwesomeIcon icon={faStar} />
              </div> */}
            </div>
          </div>
        )
      }
      return (
        <div className={classes.listings}>
          {datetimes.map(datetime => {
            return (
              <Fragment key={datetime}>
                <DateComponent date={datetime} />

                {bookingList.map(data => {
                  const { availability, bookingDate, bookingId } = data
                  const d = moment(bookingDate)
                  if (datetime !== d.format('D/M/YYYY')) {
                    return
                  }
                  const {
                    address,
                    name: catalogueName,
                    provider,
                    rate,
                    rateUnit,
                    tag: tags,
                  } = availability.catalogue
                  const {
                    lastName: providerLastName,
                    firstName: providerFirstName,
                  } = provider

                  const dateTime = moment(bookingDate)
                  const time = dateTime.format('LT')

                  let duration = `${rate.toFixed(2)} ${rateUnit}`
                  duration += rate !== 1 ? 's' : ''

                  return (
                    <Listing
                      providerFirstName={providerFirstName}
                      providerLastName={providerLastName}
                      catalogueName={catalogueName}
                      address={address}
                      time={time}
                      tags={tags}
                      duration={duration}
                      key={bookingId}
                    />
                  )
                })}
              </Fragment>
            )
          })}
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <Topbar />
        <SearchSection />
        <Listings />
        <BottomNav />
      </div>
    )
  }
}

function mapStateToProps({ booking }) {
  return {
    bookingList: booking.list,
  }
}

export default connect(
  mapStateToProps,
  { getBookingList }
)(injectSheet(styles)(Bookings))
