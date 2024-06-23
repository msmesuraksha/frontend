import {
  PROFILE_EDIT_ADMIN_START,
  PROFILE_EDIT_ADMIN_SUCCESS,
  PROFILE_EDIT_ADMIN_FAILED,
} from "./profileEditAdmin.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const profileEditAdminStart = (data) => createAction(PROFILE_EDIT_ADMIN_START, data)

export const profileEditAdminSuccess = (data) => createAction(PROFILE_EDIT_ADMIN_SUCCESS, data)

export const profileEditAdminFailure = error => createAction(PROFILE_EDIT_ADMIN_FAILED, error)
