export interface Props {
  classes: {
    [key: string]: string
  }
  updateCurrentNavLocation(navLocation: String): Object
  loginWithGoogle: Function
  signinType: String
  loadingScreen: Boolean
  showGoogleLogin: Boolean
  updateShowGoogleLogin: Function
  updateCognitoToken: Function
}

export interface State {
  googleLogin: Boolean
}
