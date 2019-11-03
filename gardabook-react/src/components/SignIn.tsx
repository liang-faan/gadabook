import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons'

import { webClientId } from '../settings'
import styles from './styles/SignIn'
import { Props, State } from './datatypes/SignIn'
import logoIcon from './images/logo-icon.png'
import { getCognitoToken } from '../actions/authActionCreators'

class SignIn extends Component<Props, State> {
  onClickGoogleLogin = () => {
    const params = {
      scopes: 'profile email',
      webClientId: webClientId,
      offline: true,
    }
    console.log(params)
    const onSuccess = data => {
      const code = data.serverAuthCode
      this.props.getCognitoToken(code)
      console.log('SUCCESSFUL LOGIN')
      console.log(JSON.stringify(data))
      // get cognito token
    }
    const onFailure = (msg: Object) => {
      console.log('FAILED LOGIN')
      console.log(msg)
    }
    // window.plugins.googleplus.trySilentLogin(params, onSuccess, onFailure)
    window.plugins.googleplus.login(params, onSuccess, onFailure)
  }

  onClickGoogleLogout = () => {
    const onSuccess = (data: Object) => {
      console.log('SUCCESSFUL LOGIN')
      console.log(JSON.stringify(data))
    }
    const onFailure = (msg: Object) => {
      console.log('FAILED LOGIN')
      console.log(msg)
    }
    window.plugins.googleplus.logout(onSuccess, onFailure)
  }

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
          <div className={classes.google} onClick={this.onClickGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} size={'2x'} />
            <div className={classes.signInText}>SIGN IN WITH GOOGLE</div>
          </div>
        </div>
      )
    }

    const SignUp = () => {
      return (
        <div onClick={this.onClickGoogleLogout}>
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
          {window.plugins && window.plugins.googleplus && <SignInButtons />}
          {window.plugins && window.plugins.googleplus && <SignUp />}
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
  { getCognitoToken }
)(injectSheet(styles)(SignIn))

// function isAvailable() {
//   window.plugins.googleplus.isAvailable(function (avail: Object) {
//     alert(avail)
//   })
// }

// function trySilentLogin() {
//   window.plugins.googleplus.trySilentLogin(
//     {},
//     function (obj: Obj) {
//       const imgElement = document.querySelector('#image') as HTMLImageElement
//       imgElement.src = obj.imageUrl
//       imgElement.style.visibility = 'visible'
//       document.querySelector('#feedback').innerHTML =
//         'Silent hi, ' + obj.displayName + ', ' + obj.email
//     },
//     function (msg: String) {
//       document.querySelector('#feedback').innerHTML = 'error: ' + msg
//     }
//   )
// }
// function disconnect() {
//   window.plugins.googleplus.disconnect(
//     function (msg: string) {
//       const imgElement = document.querySelector('#image') as HTMLImageElement
//       imgElement.style.visibility = 'hidden'
//       document.querySelector('#feedback').innerHTML = msg
//     },
//     function (msg: string) {
//       document.querySelector('#feedback').innerHTML = msg
//     }
//   )
// }
// window.onerror = function (what, line, file) {
//   alert(what + '; ' + line + '; ' + file)
// }
// function handleOpenURL(url: String) {
//   document.querySelector('#feedback').innerHTML =
//     'App was opened by URL: ' + url
// }
