import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode, faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import { faStar } from '@fortawesome/free-regular-svg-icons'

import styles from './styles/Explore'
import { Props, State } from './datatypes/Explore'
import Topbar from './Topbar'
import BottomNav from './BottomNav'
import { getCatalogueList } from '../actions/catalogueActionCreators'

class Explore extends Component<Props, State> {
  componentDidMount() {
    this.props.getCatalogueList()
  }

  getUniqueDates = catalogueList => {
    let datetimes = []
    catalogueList.forEach(catalogue => {
      const d = moment(catalogue.catalogueDate)
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
    const { catalogueList, classes } = this.props
    console.log(catalogueList)
    const datetimes = this.getUniqueDates(catalogueList)

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
                    <div className={classes.tag} key={tag}>
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

                {catalogueList.map(data => {
                  const {
                    pKey,
                    sKey,
                    unit: rateUnit,
                    rate,
                    address,
                    name: catalogueName,
                    tag,
                  } = data

                  const catalogueId = `${pKey}+${sKey}`

                  // TODO: temp as api does not have yet. use variables when available in api.
                  const catalogueDate = new Date()
                  const providerFirstName = 'Handsome'
                  const providerLastName = 'Guy'

                  const d = moment(catalogueDate)
                  if (datetime !== d.format('D/M/YYYY')) {
                    return
                  }

                  const dateTime = moment(catalogueDate)
                  const time = dateTime.format('LT')

                  let duration = `${(+rate).toFixed(2)} ${rateUnit}`
                  duration += rate !== 1 ? 's' : ''

                  return (
                    <Listing
                      providerFirstName={providerFirstName}
                      providerLastName={providerLastName}
                      catalogueName={catalogueName}
                      address={address}
                      time={time}
                      tags={[tag]}
                      duration={duration}
                      key={catalogueId}
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

function mapStateToProps({ catalogue }) {
  return {
    catalogueList: catalogue.list,
  }
}

export default connect(
  mapStateToProps,
  { getCatalogueList }
)(injectSheet(styles)(Explore))
