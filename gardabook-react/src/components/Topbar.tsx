import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { Auth } from 'aws-amplify'

import styles from './styles/Topbar'
import { Props, State } from './datatypes/Topbar'
import logoIcon from './images/logo-icon.png'
import { updateShowGoogleLogin, signout } from '../actions/authActionCreators'

class Topbar extends Component<Props, State> {
  onClickLogout = () => {
    this.props.signout()
  }
  render() {
    const { classes, title } = this.props
    return (
      <div className={classes.topbar}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logoContainer}
            src={logoIcon}
            alt="Logo Icon"
          />
        </div>
        <div className={classes.page}>{title}</div>
        <div onClick={this.onClickLogout}>Logout</div>
        {/* <div className={classes.hamburger} onClick={this.onClickLogout}>
          <div className={classes.hamburgerLine}></div>
          <div className={classes.hamburgerLine}></div>
          <div className={classes.hamburgerLine}></div>
        </div> */}
      </div>
    )
  }
}

function mapStateToProps({ view, auth }) {
  return {
    signinType: view.signinType,
    cognitoToken: auth.cognitoToken,
  }
}

export default connect(
  mapStateToProps,
  { updateShowGoogleLogin, signout }
)(injectSheet(styles)(Topbar))
