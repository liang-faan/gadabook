import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import styles from './styles/SignUpSuccess'
import { Props, State } from './datatypes/SignUpSuccess'
import logoIcon from './images/logo-icon.png'

class SignUpSuccess extends Component<Props, State> {
  render() {
    const { classes } = this.props

    const Title = () => {
      return (
        <div className={classes.titleContainer}>
          <div className={classes.logoIconContainer}>
            <img className={classes.logoIcon} src={logoIcon} alt="Logo Icon" />
          </div>
          <div className={classes.title}>Create Account</div>
        </div>
      )
    }

    const Message = () => {
      return (
        <div className={classes.message}>
          Your account has been created successfully!
        </div>
      )
    }
    const ContinueButton = () => {
      return (
        <div className={classes.buttonsContainer}>
          <div className={classes.signIn}>
            <div className={classes.signInText}>CONTINUE</div>
          </div>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Title />
          <Message />
          <ContinueButton />
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
)(injectSheet(styles)(SignUpSuccess))
