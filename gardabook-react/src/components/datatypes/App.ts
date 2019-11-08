export interface Props {
  classes: {
    [key: string]: string
  }
  updateCurrentNavLocation(navLocation: String): Object
  loginWithGoogle: Function
  signinType: String
  cognitoToken: String
  logoutFlag: Boolean
  loadingScreen: Boolean
  showGoogleLogin: Boolean
  updateShowGoogleLogin: Function
  updateCognitoToken: Function
  updateLogoutFlag: Function
}

export interface State {
  googleLogin: Boolean
}
