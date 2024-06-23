import {
  FETCH_DISPUTED_TRANSACTIONS_START,
  FETCH_DISPUTED_TRANSACTIONS_SUCCESS,
  FETCH_DISPUTED_TRANSACTIONS_FAILED,
} from "./disputedTrans.type"

export const DISPUTED_TRANSACTIONS_INITIAL_STATE = {
  disputedTrans: [],
  loading: false,
  error: null,
}

export const disputedTransReducer = (
  state = DISPUTED_TRANSACTIONS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_DISPUTED_TRANSACTIONS_START:
      return { ...state, loading: true }
    case FETCH_DISPUTED_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, disputedTrans: payload }
    case FETCH_DISPUTED_TRANSACTIONS_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
