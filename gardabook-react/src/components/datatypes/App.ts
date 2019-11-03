export interface Props {
  classes: {
    [key: string]: string
  }
  updateCurrentNavLocation(navLocation: String): Object
  signinStatus: Boolean
  loadingScreen: Boolean
}

export interface State {
  vh: number
}
