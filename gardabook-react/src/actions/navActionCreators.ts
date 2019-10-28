import { NAV_UPDATE_CURRENT_LOCATION } from './index'

export const updateCurrentNavLocation = (navLocation: String) => {
  return {
    type: NAV_UPDATE_CURRENT_LOCATION,
    payload: navLocation,
  }
}
