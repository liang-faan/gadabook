import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import styles from './styles/SignUp'
import { Props, State } from './datatypes/SignUp'
import logoIcon from './images/logo-icon.png'

class SignUp extends Component<Props, State> {
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

    const SignUpForm = () => {
      return (
        <div className={classes.signInForm}>
          <div className={classes.fieldContainer}>
            <div className={classes.underlinedContainer}>
              <FontAwesomeIcon icon={faEnvelope} size={'lg'} />
              <div className={classes.fieldText}>
                <input
                  type="text"
                  className={classes.textInput}
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.underlinedContainer}>
              <FontAwesomeIcon icon={faUser} size={'lg'} />
              <div className={classes.fieldText}>
                <input
                  type="text"
                  className={classes.textInput}
                  placeholder="Username"
                />
              </div>
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.underlinedContainer}>
              <FontAwesomeIcon icon={faLock} size={'lg'} />
              <div className={classes.fieldText}>
                <input
                  type="password"
                  className={classes.textInput}
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.underlinedContainer}>
              <FontAwesomeIcon icon={faLock} size={'lg'} />
              <div className={classes.fieldText}>
                <input
                  type="password"
                  className={classes.textInput}
                  placeholder="Password Confirmation"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    const SignUpButtons = () => {
      return (
        <div className={classes.signInButtonsContainer}>
          <div className={classes.signIn}>
            <div className={classes.signInText}>SIGN UP</div>
          </div>
          <div className={classes.or}>OR</div>
          <div className={classes.google}>
            <FontAwesomeIcon icon={faGoogle} size={'2x'} />
            <div className={classes.signInText}>SIGN UP WITH GOOGLE</div>
          </div>
        </div>
      )
    }

    const SignUp = () => {
      return (
        <div>
          Already have an account?&nbsp;
          <span className={classes.link}>SIGN IN</span>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Title />
          <SignUpForm />
          <SignUpButtons />
          <SignUp />
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
)(injectSheet(styles)(SignUp))
