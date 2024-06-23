import {
  FETCH_APPROVED_TRANSACTIONS_START,
  FETCH_APPROVED_TRANSACTIONS_SUCCESS,
  FETCH_APPROVED_TRANSACTIONS_FAILED,
  GET_LATEST_TRANSACTIONS,
  GET_LATEST_TRANSACTIONS_FAILED,
  GET_LATEST_TRANSACTIONS_SUCCESS
} from "./approvedTrans.type"
import { createAction } from "reducer/reducer.utils"

export const fetchApprovedTransStart = () =>
  createAction(FETCH_APPROVED_TRANSACTIONS_START)

export const fetchApprovedTransSuccess = approvedTransArray => {
  return createAction(FETCH_APPROVED_TRANSACTIONS_SUCCESS, approvedTransArray)
}

export const fetchApprovedTransFailure = error =>
  createAction(FETCH_APPROVED_TRANSACTIONS_FAILED, error)

  export const GetAllTransacations = invoiceId => ({
    type: GET_LATEST_TRANSACTIONS,
    invoiceId,
  })
  
  export const GetAllTransacationsSuccess = invoices => ({
    type: GET_LATEST_TRANSACTIONS_SUCCESS,
    payload: invoices,
  })
  
  export const GetAllTransacationsFail = error => ({
    type: GET_LATEST_TRANSACTIONS_FAIL,
    payload: error,
  })
  