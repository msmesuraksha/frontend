import {
  DEACTIVATE_ACCEPT_START,
  DEACTIVATE_ACCEPT_SUCCESS,
  DEACTIVATE_ACCEPT_FAILED,
} from "./MemberDeactivateAccept.type"

export const DEACTIVATE_ACCEPT_IN_STATE = {
  DeactivateListAccept: {},
  DeactivateListAcceptSuccess: [],
  loading: false,
  error: null,
}

export const DeactivateAcceptReducer = (
  state = DEACTIVATE_ACCEPT_IN_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case DEACTIVATE_ACCEPT_START:
      return { ...state, loading: true, DeactivateListAccept: payload }
    case DEACTIVATE_ACCEPT_SUCCESS:
      return { ...state, loading: false, DeactivateListAcceptSuccess: payload }
    case DEACTIVATE_ACCEPT_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
