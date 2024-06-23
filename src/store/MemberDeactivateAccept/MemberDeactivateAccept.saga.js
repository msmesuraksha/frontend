import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { userDeactivateAcceptSuccess, userDeactivateAcceptFailure } from "./MemberDeactivateAccept.action"
import { DEACTIVATE_ACCEPT_START } from "./MemberDeactivateAccept.type"

import { activeDeactivateAcceptAPI } from "helpers/fakebackend_helper"




export function* memberDeactivateAcceptAsync(payload) {
  debugger
  try {
    const response = yield call(activeDeactivateAcceptAPI, payload.payload)
    yield put(userDeactivateAcceptSuccess(response.data.response))
  } catch (error) {
    yield put(userDeactivateAcceptFailure(error))
  }
}


export function* onDeactivateAccept() {
  yield takeEvery(DEACTIVATE_ACCEPT_START, memberDeactivateAcceptAsync)
}

export function* DeactivateAcceptSaga() {
  yield all([fork(onDeactivateAccept)])
}
