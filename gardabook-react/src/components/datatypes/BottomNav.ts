import { updateCurrentNavLocation } from '../../actions/navActionCreators'

export interface Props {
  classes: {
    [key: string]: string
  }
  currentNavLocation: String
  updateCurrentNavLocation(navLocation: String): Object
}

export interface State {}
