import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons'

import styles from './styles/SignIn'
import { Props, State } from './datatypes/SignIn'
import logoIcon from './images/logo-icon.png'

class SignIn extends Component<Props, State> {
  render() {
    const { classes } = this.props

    const Logo = () => {
      return (
        <div className={classes.logoIconContainer}>
          <img className={classes.logoIcon} src={logoIcon} alt="Logo Icon" />
        </div>
      )
    }

    const SignInForm = () => {
      return (
        <div className={classes.signInForm}>
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
        </div>
      )
    }

    const ForgetPassword = () => {
      return (
        <div>
          Forget your password?&nbsp;
          <span className={classes.link}>RESET PASSWORD</span>
        </div>
      )
    }

    const SignInButtons = () => {
      return (
        <div className={classes.signInButtonsContainer}>
          <div className={classes.signIn}>
            <div className={classes.signInText}>SIGN IN</div>
          </div>
          {/* <div className={classes.facebook}>
            <FontAwesomeIcon icon={faFacebookSquare} size={'2x'} />
            <div className={classes.signInText}>SIGN IN WITH FACEBOOK</div>
          </div> */}
          <div className={classes.google}>
            <FontAwesomeIcon icon={faGoogle} size={'2x'} />
            <div className={classes.signInText}>SIGN IN WITH GOOGLE</div>
          </div>
        </div>
      )
    }

    const SignUp = () => {
      return (
        <div>
          No account yet?&nbsp;
          <span className={classes.link}>SIGN UP</span>
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Logo />
          <SignInForm />
          <ForgetPassword />
          <SignInButtons />
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
)(injectSheet(styles)(SignIn))
