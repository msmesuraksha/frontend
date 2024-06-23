import {
  FETCH_REOPEN_TRANS_START,
  FETCH_REOPEN_TRANS_SUCCESS,
  FETCH_REOPEN_TRANS_FAILED,

} from "./reopenDataTransaction.type"
import { createAction } from "reducer/reducer.utils"

export const fetchReopenTransStart = (data) =>
  createAction(FETCH_REOPEN_TRANS_START, data)

export const fetchReopenTransSuccess = latestTransArray => {
  return createAction(FETCH_REOPEN_TRANS_SUCCESS, latestTransArray)
}

export const fetchReopenTransFailure = error =>
  createAction(FETCH_REOPEN_TRANS_FAILED, error)


