import {
  FETCH_DASHBOARD_ADMIN_DATA_START,
  FETCH_DASHBOARD_ADMIN_DATA_SUCCESS,
  FETCH_DASHBOARD_ADMIN_DATA_FAILED,
} from "./dashboardAdminData.type"
import { createAction } from "reducer/reducer.utils"

export const fetchDashboardAdminDataStart = () =>
  createAction(FETCH_DASHBOARD_ADMIN_DATA_START)

export const fetchDashboardAdminDataSuccess = dashboardAdminDataArray => {
  return createAction(FETCH_DASHBOARD_ADMIN_DATA_SUCCESS, dashboardAdminDataArray)
}

export const fetchDashboardAdminDataFailure = error =>
  createAction(FETCH_DASHBOARD_ADMIN_DATA_FAILED, error)
