import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { userActiveDeactivateSuccess, userActiveDeactivateFailure } from "./memberActiveDeactivate.action"
import { USER_ACTIVE_DEACTIVATE_START } from "./memberActiveDeactivate.type"

import { activeDeactivateAPI } from "helpers/fakebackend_helper"




export function* userActiveDeactivateAsync(payload) {
  try {
    const response = yield call(activeDeactivateAPI, payload.payload)
    yield put(userActiveDeactivateSuccess(response.data.response))
  } catch (error) {
    yield put(userActiveDeactivateFailure(error))
  }
}


export function* onUserActiveDeactivate() {
  yield takeEvery(USER_ACTIVE_DEACTIVATE_START, userActiveDeactivateAsync)
}

export function* UserActiveDeactivateSaga() {
  yield all([fork(onUserActiveDeactivate)])
}
