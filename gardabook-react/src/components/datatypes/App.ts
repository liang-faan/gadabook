export interface Props {
  classes: {
    [key: string]: string
  }
  updateCurrentNavLocation(navLocation: String): Object
}

export interface State {
  vh: number
}
