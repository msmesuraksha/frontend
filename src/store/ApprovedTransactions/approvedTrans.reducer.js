import {
  FETCH_APPROVED_TRANSACTIONS_START,
  FETCH_APPROVED_TRANSACTIONS_SUCCESS,
  FETCH_APPROVED_TRANSACTIONS_FAILED,
} from "./approvedTrans.type"

export const APPROVED_TRANSACTIONS_INITIAL_STATE = {
  approvedTrans: [],
  loading: false,
  error: null,
}

export const approvedTransReducer = (
  state = APPROVED_TRANSACTIONS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_APPROVED_TRANSACTIONS_START:
      return { ...state, loading: true }
    case FETCH_APPROVED_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, approvedTrans: payload }
    case FETCH_APPROVED_TRANSACTIONS_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
