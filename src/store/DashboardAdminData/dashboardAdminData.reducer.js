import {
  FETCH_DASHBOARD_ADMIN_DATA_START,
  FETCH_DASHBOARD_ADMIN_DATA_SUCCESS,
  FETCH_DASHBOARD_ADMIN_DATA_FAILED,
} from "./dashboardAdminData.type"

export const DASHBOARD_ADMIN_DATA_INITIAL_STATE = {
  dashboardAdminData: [],
  loading: false,
  error: null,
}

export const dashboardAdminDataReducer = (
  state = DASHBOARD_ADMIN_DATA_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_DASHBOARD_ADMIN_DATA_START:
      return { ...state, loading: true }
    case FETCH_DASHBOARD_ADMIN_DATA_SUCCESS:
      return { ...state, loading: false, dashboardAdminData: payload }
    case FETCH_DASHBOARD_ADMIN_DATA_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
