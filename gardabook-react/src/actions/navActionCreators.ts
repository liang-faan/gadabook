import { UPDATE_CURRENT_NAV_LOCATION } from './index'

export const updateCurrentNavLocation = (navLocation: String) => {
  return {
    type: UPDATE_CURRENT_NAV_LOCATION,
    payload: navLocation,
  }
}
