import {
  FETCH_REQUEST_DEACTIVATE_START,
  FETCH_REQUEST_DEACTIVATE_SUCCESS,
  FETCH_REQUEST_DEACTIVATE_FAILED,

} from "./requestDeactiveData.type"
import { createAction } from "reducer/reducer.utils"

export const fetchRequestDeactivateStart = () =>
  createAction(FETCH_REQUEST_DEACTIVATE_START)

export const fetchRequestDeactivateSuccess = latestTransArray => {
  return createAction(FETCH_REQUEST_DEACTIVATE_SUCCESS, latestTransArray)
}

export const fetchRequestDeactivateFailure = error =>
  createAction(FETCH_REQUEST_DEACTIVATE_FAILED, error)


