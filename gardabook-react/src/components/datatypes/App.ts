export interface Props {
  classes: {
    [key: string]: string
  }
  updateCurrentNavLocation(navLocation: String): Object
  getCognitoToken(navLocation: String): Object
  googleSigninStatus: Boolean
  loadingScreen: Boolean
}

export interface State {
  googleLogin: Boolean
}
