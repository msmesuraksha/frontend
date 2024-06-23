import {
  FETCH_ALL_DOCUMENT_NEED_START,
  FETCH_ALL_DOCUMENT_NEED_SUCCESS,
  FETCH_ALL_DOCUMENT_NEED_FAILED,
  FETCH_ALL_OTHER_STATUS_START,
  FETCH_ALL_OTHER_STATUS_SUCCESS,
  FETCH_ALL_OTHER_STATUS_FAILED,

} from "./allDocumentNeedTrans.type"
import { createAction } from "reducer/reducer.utils"

export const fetchAllDocumentNeedStart = (data) =>
  createAction(FETCH_ALL_DOCUMENT_NEED_START, data)

export const fetchAllDocumentNeedSuccess = latestTransArray => {
  return createAction(FETCH_ALL_DOCUMENT_NEED_SUCCESS, latestTransArray)
}

export const fetchAllDocumentNeedFailure = error =>
  createAction(FETCH_ALL_DOCUMENT_NEED_FAILED, error)

// get all transactions for other status


export const fetchAllOtherStatusStart = (data) =>
  createAction(FETCH_ALL_OTHER_STATUS_START, data)

export const fetchAllOtherStatusSuccess = latestTransArray => {
  return createAction(FETCH_ALL_OTHER_STATUS_SUCCESS, latestTransArray)
}

export const fetchAllOtherStatusFailure = error =>
  createAction(FETCH_ALL_OTHER_STATUS_FAILED, error)


