import {
  PROFILE_EDIT_ADMIN_START,
  PROFILE_EDIT_ADMIN_SUCCESS,
  PROFILE_EDIT_ADMIN_FAILED,
} from "./profileEditAdmin.type"

export const REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE = {
  profileEditList: {},
  profileEditListSuccess: [],
  loading: false,
  error: null,
}

export const ProfileEditReducer = (
  state = REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case PROFILE_EDIT_ADMIN_START:
      return { ...state, loading: true, profileEditList: payload }
    case PROFILE_EDIT_ADMIN_SUCCESS:
      return { ...state, loading: false, profileEditListSuccess: payload }
    case PROFILE_EDIT_ADMIN_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
