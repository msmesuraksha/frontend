import {
  FETCH_TOTAL_TRANS_START,
  FETCH_TOTAL_TRANS_SUCCESS,
  FETCH_TOTAL_TRANS_FAILED,

} from "./totalDataTRansaction.type"
import { createAction } from "reducer/reducer.utils"

export const fetchTotalTransStart = (data) =>
  createAction(FETCH_TOTAL_TRANS_START, data)

export const fetchTotalTransSuccess = latestTransArray => {
  return createAction(FETCH_TOTAL_TRANS_SUCCESS, latestTransArray)
}

export const fetchTotalTransFailure = error =>
  createAction(FETCH_TOTAL_TRANS_FAILED, error)


