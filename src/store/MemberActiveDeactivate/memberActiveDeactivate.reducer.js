import {
  USER_ACTIVE_DEACTIVATE_START,
  USER_ACTIVE_DEACTIVATE_SUCCESS,
  USER_ACTIVE_DEACTIVATE_FAILED,
} from "./memberActiveDeactivate.type"

export const REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE = {
  userActiveDeactivateList: {},
  userActiveDeactivateListSuccess: [],
  loading: false,
  error: null,
}

export const userActiveDeactivateReducer = (
  state = REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case USER_ACTIVE_DEACTIVATE_START:
      return { ...state, loading: true, userActiveDeactivateList: payload }
    case USER_ACTIVE_DEACTIVATE_SUCCESS:
      return { ...state, loading: false, userActiveDeactivateListSuccess: payload }
    case USER_ACTIVE_DEACTIVATE_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
