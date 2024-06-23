import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import { fetchDashboardAdminDataSuccess, fetchDashboardAdminDataFailure,} from "./dashboardAdminData.action"

import { FETCH_DASHBOARD_ADMIN_DATA_START } from "./dashboardAdminData.type"

import { getDashboardAdminData } from "../../helpers/fakebackend_helper"


export function* fetchDashboardAdminDataAsync() {
  try {
    const dashboardAdminDataArray = yield call(getDashboardAdminData)
    yield put(fetchDashboardAdminDataSuccess(dashboardAdminDataArray.data.response))
  } catch (error) {
    yield put(fetchDashboardAdminDataFailure(error))
  }
}

export function* onFetchDashboardAdminData() {
  yield takeLatest(FETCH_DASHBOARD_ADMIN_DATA_START, fetchDashboardAdminDataAsync)
}

export function* dashboardAdminDataSaga() {
  yield all([fork(onFetchDashboardAdminData)])
}
