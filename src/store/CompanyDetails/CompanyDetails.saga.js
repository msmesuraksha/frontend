import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import {
  fetchCompanyStateSuccess,
  fetchCompanyStateFailure,
  fetchCompanyCitySuccess,
  fetchCompanyCityFailure,
  fetchCompanyStateCitySuccess,
  fetchCompanyStateCityFailure

} from "./CompanyDetails.action"

import { FETCH_COMPANY_STATE_START, FETCH_COMPANY_CITY_START, FETCH_COMPANY_STATE_CITY_START } from "./CompanyDetails.type.js"

import { getCompanyStateAPI, getCompanyCityAPI, getCompanyStateCityAPI } from "../../helpers/fakebackend_helper"

export function* fetchCompanyStateAsync() {
  try {
    const response = yield call(getCompanyStateAPI)
    yield put(fetchCompanyStateSuccess(response.data.response))
  } catch (error) {
    yield put(fetchCompanyStateFailure(error))
  }
}

export function* fetchCompanyCityAsync(payload) {
  try {
    const response = yield call(getCompanyCityAPI, payload.payload)
    yield put(fetchCompanyCitySuccess(response.data.response))
  } catch (error) {
    yield put(fetchCompanyCityFailure(error))
  }
}

export function* fetchCompanyStateCityAsync(payload) {
  try {
    const response = yield call(getCompanyStateCityAPI, payload.payload)
    yield put(fetchCompanyStateCitySuccess(response.data.response))
  } catch (error) {
    yield put(fetchCompanyStateCityFailure(error))
  }
}

export function* onFetchCompanyState() {
  yield takeLatest(FETCH_COMPANY_STATE_START, fetchCompanyStateAsync)
  yield takeLatest(FETCH_COMPANY_CITY_START, fetchCompanyCityAsync)
  yield takeLatest(FETCH_COMPANY_STATE_CITY_START, fetchCompanyStateCityAsync)
}

export function* CompanyDetailsSaga() {
  yield all([fork(onFetchCompanyState)])
}
