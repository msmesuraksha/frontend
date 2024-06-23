import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { profileEditAdminSuccess, profileEditAdminFailure } from "./profileEditAdmin.action"
import { PROFILE_EDIT_ADMIN_START } from "./profileEditAdmin.type"

import { profileEditAdminAPI } from "helpers/fakebackend_helper"




export function* profileEditAdminAsync(payload) {
  try {
    const response = yield call(profileEditAdminAPI, payload.payload)
    yield put(profileEditAdminSuccess(response.data.response))
  } catch (error) {
    yield put(profileEditAdminFailure(error))
  }
}


export function* onProfileEditAdmin() {
  yield takeEvery(PROFILE_EDIT_ADMIN_START, profileEditAdminAsync)
}

export function* profileEditAdminSaga() {
  yield all([fork(onProfileEditAdmin)])
}
