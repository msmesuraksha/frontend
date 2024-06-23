import {
  FETCH_LATEST_TRANS_START,
  FETCH_LATEST_TRANS_SUCCESS,
  FETCH_LATEST_TRANS_FAILED,
  APPROVE_REJECT_LATEST_TRANSACTION,
  APPROVE_REJECT_LATEST_TRANSACTION_FAIL,
  APPROVE_REJECT_LATEST_TRANSACTION_SUCCESS,
  SUBSCRIBE_PACKAGE,
  SUBSCRIBE_PACKAGE_FAIL,
  SUBSCRIBE_PACKAGE_SUCCESS,
  GET_SUBSCRIBE_PACKAGE,
  GET_SUBSCRIBE_PACKAGE_FAIL,
  GET_SUBSCRIBE_PACKAGE_SUCCESS,
  ESCLATET_TRANSACTION,
  ESCLATET_TRANSACTION_FAIL,
  ESCLATET_TRANSACTION_SUCCESS,
  REQ_FOR_ADDITIONAL_DOC,
  REQ_FOR_ADDITIONAL_DOC_SUCCESS,
  REQ_FOR_ADDITIONAL_DOC_FAIL,
  GET_ALL_PAYMENT_LOGS,
  GET_ALL_PAYMENT_LOGS_FAIL,
  GET_ALL_PAYMENT_LOGS_SUCCESS
} from "./latestTrans.type"

export const LATEST_TRANS_INITIAL_STATE = {
  latestTrans: [],
  approveRejectLatestTrans: [],
  requestedDoc: [],
  esclatedTransaction: [],
  getSubscribePackage: [],
  subscribePckg: [],
  loading: false,
  error: null,
  getAllLogs: [],
}

export const latestTransReducer = (
  state = LATEST_TRANS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_LATEST_TRANS_START:
      return { ...state, loading: false }
    case FETCH_LATEST_TRANS_SUCCESS:
      return { ...state, loading: true, latestTrans: payload }
    case FETCH_LATEST_TRANS_FAILED:
      return { ...state, loading: true, error: payload }
    case APPROVE_REJECT_LATEST_TRANSACTION:
      return { ...state, loading: true }
    case APPROVE_REJECT_LATEST_TRANSACTION_SUCCESS:
      return { ...state, loading: false, approveRejectLatestTrans: payload }
    case APPROVE_REJECT_LATEST_TRANSACTION_FAIL:
      return { ...state, loading: false, error: payload }
    case SUBSCRIBE_PACKAGE:
      return { ...state, loading: true }
    case SUBSCRIBE_PACKAGE_FAIL:
      return { ...state, loading: false, error: payload }
    case SUBSCRIBE_PACKAGE_SUCCESS:
      return { ...state, loading: false, subscribePckg: payload }

    case GET_SUBSCRIBE_PACKAGE:
      return { ...state, loading: true }
    case GET_SUBSCRIBE_PACKAGE_FAIL:
      return { ...state, loading: false, error: payload }
    case GET_SUBSCRIBE_PACKAGE_SUCCESS:
      return { ...state, loading: false, getSubscribePackage: payload }
    case ESCLATET_TRANSACTION:
      return { ...state, loading: true }
    case ESCLATET_TRANSACTION_FAIL:
      return { ...state, loading: false, error: payload }
    case ESCLATET_TRANSACTION_SUCCESS:
      return { ...state, loading: false, esclatedTransaction: payload }

    case REQ_FOR_ADDITIONAL_DOC:
      return { ...state, loading: true }
    case REQ_FOR_ADDITIONAL_DOC_FAIL:
      return { ...state, loading: false, error: payload }
    case REQ_FOR_ADDITIONAL_DOC_SUCCESS:
      return { ...state, loading: false, requestedDoc: payload }

    case GET_ALL_PAYMENT_LOGS:
      return { ...state, loading: true }
    case GET_ALL_PAYMENT_LOGS_FAIL:
      return { ...state, loading: false, error: payload }
    case GET_ALL_PAYMENT_LOGS_SUCCESS:
      return { ...state, loading: false, getAllLogs: payload }
    default:
      return state
  }
}
