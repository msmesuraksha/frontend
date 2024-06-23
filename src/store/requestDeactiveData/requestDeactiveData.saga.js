import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import {
  fetchRequestDeactivateSuccess,
  fetchRequestDeactivateFailure,
} from "./requestDeactiveData.action"

import { FETCH_REQUEST_DEACTIVATE_START } from "./requestDeactiveData.type"

import { getRequestDeactivateAPI } from "../../helpers/fakebackend_helper"

export function* fetchRequestDeactivateAsync() {
  try {
    const requestDeactivateArray = yield call(getRequestDeactivateAPI)
    yield put(fetchRequestDeactivateSuccess(requestDeactivateArray.data.response))
  } catch (error) {
    yield put(fetchRequestDeactivateFailure(error))
  }
}



export function* onRequestDeactivateData() {
  yield takeLatest(FETCH_REQUEST_DEACTIVATE_START, fetchRequestDeactivateAsync)
}

export function* FetchRequestDeactivateSaga() {
  yield all([fork(onRequestDeactivateData)])
}
