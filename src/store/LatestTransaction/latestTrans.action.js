import {
  FETCH_LATEST_TRANS_START,
  FETCH_LATEST_TRANS_SUCCESS,
  FETCH_LATEST_TRANS_FAILED,
  APPROVE_REJECT_LATEST_TRANSACTION,
  APPROVE_REJECT_LATEST_TRANSACTION_FAIL,
  APPROVE_REJECT_LATEST_TRANSACTION_SUCCESS,
  SUBSCRIBE_PACKAGE_FAIL,
  SUBSCRIBE_PACKAGE_SUCCESS,
  SUBSCRIBE_PACKAGE,
  GET_SUBSCRIBE_PACKAGE_FAIL,
  GET_SUBSCRIBE_PACKAGE_SUCCESS,
  GET_SUBSCRIBE_PACKAGE,
  ESCLATET_TRANSACTION,
  ESCLATET_TRANSACTION_FAIL,
  ESCLATET_TRANSACTION_SUCCESS,
  REQ_FOR_ADDITIONAL_DOC_SUCCESS,
  REQ_FOR_ADDITIONAL_DOC_FAIL,
  REQ_FOR_ADDITIONAL_DOC,
  GET_ALL_PAYMENT_LOGS,
  GET_ALL_PAYMENT_LOGS_FAIL,
  GET_ALL_PAYMENT_LOGS_SUCCESS

} from "./latestTrans.type"
import { createAction } from "reducer/reducer.utils"

export const fetchLatestTransStart = (data) =>
  createAction(FETCH_LATEST_TRANS_START, data)

export const fetchLatestTransSuccess = latestTransArray => {
  return createAction(FETCH_LATEST_TRANS_SUCCESS, latestTransArray)
}

export const fetchLatestTransFailure = error =>
  createAction(FETCH_LATEST_TRANS_FAILED, error)

export const approveRejectLatestTrans = (data) =>
  createAction(APPROVE_REJECT_LATEST_TRANSACTION, data)

export const approveRejectLatestTransSuccess = latestTransArray => {
  return createAction(APPROVE_REJECT_LATEST_TRANSACTION_SUCCESS, latestTransArray)
}

export const approveRejectLatestTransFailure = error =>
  createAction(APPROVE_REJECT_LATEST_TRANSACTION_FAIL, error)

export const subscribeToPackage = (data) =>
  createAction(SUBSCRIBE_PACKAGE, data)

export const subscribeToPackageSuccess = latestTransArray => {
  return createAction(SUBSCRIBE_PACKAGE_SUCCESS, latestTransArray)
}

export const subscribeToPackageFailure = error =>
  createAction(SUBSCRIBE_PACKAGE_FAIL, error)

export const getSubscriptionPckg = () =>
  createAction(GET_SUBSCRIBE_PACKAGE)

export const getSubscriptionPckgSuccess = (latestTransArray) =>
  createAction(GET_SUBSCRIBE_PACKAGE_SUCCESS, latestTransArray)

export const getSubscriptionPckgFail = error => {
  createAction(SUBSCRIBE_PACKAGE_FAIL, error)
}

export const requestForAdditionalDoc = (data) =>
  createAction(REQ_FOR_ADDITIONAL_DOC, data)

export const requestForAdditionalDocSuccess = (latestTransArray) =>
  createAction(REQ_FOR_ADDITIONAL_DOC_SUCCESS, latestTransArray)

export const requestForAdditionalDocFail = error => {
  createAction(REQ_FOR_ADDITIONAL_DOC_FAIL, error)
}



export const esclateTransaction = (data) =>
  createAction(ESCLATET_TRANSACTION, data)

export const esclateTransactionSuccess = (latestTransArray) =>
  createAction(ESCLATET_TRANSACTION_SUCCESS, latestTransArray)

export const esclateTransactionFail = error => {
  createAction(ESCLATET_TRANSACTION_FAIL, error)
}


export const getAllLogs = (data) =>
  createAction(GET_ALL_PAYMENT_LOGS, data)

export const getAllLogsSuccess = latestTransArray => {
  return createAction(GET_ALL_PAYMENT_LOGS_SUCCESS, latestTransArray)
}

export const getAllLogsFail = error => {
  createAction(GET_ALL_PAYMENT_LOGS_FAIL, error)
}
