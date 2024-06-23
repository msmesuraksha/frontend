import {
  DEACTIVATE_ACCEPT_START,
  DEACTIVATE_ACCEPT_SUCCESS,
  DEACTIVATE_ACCEPT_FAILED,
} from "./MemberDeactivateAccept.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const userDeactivateAcceptStart = (data) => {
  debugger
  return createAction(DEACTIVATE_ACCEPT_START, data)

}

export const userDeactivateAcceptSuccess = (data) => createAction(DEACTIVATE_ACCEPT_SUCCESS, data)

export const userDeactivateAcceptFailure = error => createAction(DEACTIVATE_ACCEPT_FAILED, error)
