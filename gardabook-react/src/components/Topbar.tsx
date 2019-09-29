import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import styles from './styles/Topbar'
import { Props, State } from './datatypes/Topbar'
import logoIcon from './images/logo-icon.png'

class Topbar extends Component<Props, State> {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.topbar}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logoContainer}
            src={logoIcon}
            alt="Logo Icon"
          />
        </div>
        <div className={classes.page}>EXPLORE</div>
        <div className={classes.hamburger}>
          <div className={classes.hamburgerLine}></div>
          <div className={classes.hamburgerLine}></div>
          <div className={classes.hamburgerLine}></div>
        </div>
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
)(injectSheet(styles)(Topbar))
