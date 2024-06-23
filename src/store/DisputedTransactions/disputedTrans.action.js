import {
  FETCH_DISPUTED_TRANSACTIONS_START,
  FETCH_DISPUTED_TRANSACTIONS_SUCCESS,
  FETCH_DISPUTED_TRANSACTIONS_FAILED,
} from "./disputedTrans.type"
import { createAction } from "reducer/reducer.utils"

export const fetchDisputedTransStart = () =>
  createAction(FETCH_DISPUTED_TRANSACTIONS_START)

export const fetchDisputedTransSuccess = disputedTransArray => {
  return createAction(FETCH_DISPUTED_TRANSACTIONS_SUCCESS, disputedTransArray)
}

export const fetchDisputedTransFailure = error =>
  createAction(FETCH_DISPUTED_TRANSACTIONS_FAILED, error)
