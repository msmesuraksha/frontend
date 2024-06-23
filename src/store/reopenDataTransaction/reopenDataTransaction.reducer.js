import {
  FETCH_REOPEN_TRANS_START,
  FETCH_REOPEN_TRANS_SUCCESS,
  FETCH_REOPEN_TRANS_FAILED,
} from "./reopenDataTransaction.type"

export const REOPEN_TRANS_INITIAL_STATE = {
  ReopenTrans: [],
  loading: false,
  error: null,
}

export const ReopenTransReducer = (
  state = REOPEN_TRANS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_REOPEN_TRANS_START:
      return { ...state, loading: false }
    case FETCH_REOPEN_TRANS_SUCCESS:
      return { ...state, loading: true, ReopenTrans: payload }
    case FETCH_REOPEN_TRANS_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
