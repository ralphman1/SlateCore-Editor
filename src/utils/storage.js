import lscache from "lscache"
import throttle from "lodash/throttle"

import {DEFAULT_EDITOR_STATE} from "../constants/defaults"


export const loadContent = () => {
  return lscache.get("composer-content-state") || DEFAULT_EDITOR_STATE
}


export const loadTextContent = () => {
  return lscache.get("composer-content-text") || ""
}




export const storeContentState = json => {
  lscache.set("composer-content-state", json)
}


export const saveContent = throttle((document, state, callbackStatus) => {
  storeContentState(state.toJSON())
  lscache.set("composer-content-text", state.document.text)
  callbackStatus && callbackStatus("ok")
}, 3000)


export const setDraftStatusHelper = () => {
  return "pending"
}
