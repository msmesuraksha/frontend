import {
  FETCH_TOTAL_TRANS_START,
  FETCH_TOTAL_TRANS_SUCCESS,
  FETCH_TOTAL_TRANS_FAILED,
} from "./totalDataTRansaction.type"

export const TOTAL_TRANS_INITIAL_STATE = {
  totalTrans: [],
  loading: false,
  error: null,
}

export const TotalTransReducer = (
  state = TOTAL_TRANS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_TOTAL_TRANS_START:
      return { ...state, loading: false }
    case FETCH_TOTAL_TRANS_SUCCESS:
      return { ...state, loading: true, totalTrans: payload }
    case FETCH_TOTAL_TRANS_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
