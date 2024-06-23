import {
  FETCH_REQUEST_DEACTIVATE_START,
  FETCH_REQUEST_DEACTIVATE_SUCCESS,
  FETCH_REQUEST_DEACTIVATE_FAILED,
} from "./requestDeactiveData.type"

export const REQUEST_DEACTIVATE_INITIAL_STATE = {
  requestDeactivateData: [],
  loading: false,
  error: null,
}

export const RequestDeactivateDataReducer = (
  state = REQUEST_DEACTIVATE_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_REQUEST_DEACTIVATE_START:
      return { ...state, loading: false }
    case FETCH_REQUEST_DEACTIVATE_SUCCESS:
      return { ...state, loading: true, requestDeactivateData: payload }
    case FETCH_REQUEST_DEACTIVATE_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
