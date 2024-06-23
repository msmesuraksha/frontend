import {
  USER_ACTIVE_DEACTIVATE_START,
  USER_ACTIVE_DEACTIVATE_SUCCESS,
  USER_ACTIVE_DEACTIVATE_FAILED,
} from "./memberActiveDeactivate.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const userActiveDeactivateStart = (data) => createAction(USER_ACTIVE_DEACTIVATE_START, data)

export const userActiveDeactivateSuccess = (data) => createAction(USER_ACTIVE_DEACTIVATE_SUCCESS, data)

export const userActiveDeactivateFailure = error => createAction(USER_ACTIVE_DEACTIVATE_FAILED, error)
