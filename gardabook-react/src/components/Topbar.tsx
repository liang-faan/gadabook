import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { Auth } from 'aws-amplify'

import styles from './styles/Topbar'
import { Props, State } from './datatypes/Topbar'
import logoIcon from './images/logo-icon.png'
import { googleSignInButton } from '@aws-amplify/ui'

class Topbar extends Component<Props, State> {
  onClickLogout = () => {
    const { googleSigninStatus, cognitoToken } = this.props
    if (googleSigninStatus) {
      // Make API request to logout to revoke token (cognitoToken)
    } else {
      // If username/password login
      Auth.currentSession()
        .then(data => {
          const amplifyCognitoToken = data.getIdToken().getJwtToken()
          // Make API request to logout to revoke token (amplifyCognitoToken)
          // Clear tokens with Amplify's built in function
          Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }
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
    googleSigninStatus: view.googleSigninStatus,
    cognitoToken: auth.cognitoToken,
  }
}

export default connect(
  mapStateToProps,
  {}
)(injectSheet(styles)(Topbar))
