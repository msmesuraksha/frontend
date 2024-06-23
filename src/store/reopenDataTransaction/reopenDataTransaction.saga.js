import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import {
  fetchReopenTransSuccess,
  fetchReopenTransFailure,
} from "./reopenDataTransaction.action"

import { FETCH_REOPEN_TRANS_START } from "./reopenDataTransaction.type"

import { genrateReOpendata } from "../../helpers/fakebackend_helper"

export function* fetchReopenTransAsync(data) {
  try {
    const totalTransArray = yield call(genrateReOpendata, data.payload)
    yield put(fetchReopenTransSuccess(totalTransArray.data.response))
  } catch (error) {
    yield put(fetchReopenTransFailure(error))
  }
}



export function* onFetchReopenTrans() {
  yield takeLatest(FETCH_REOPEN_TRANS_START, fetchReopenTransAsync)
}

export function* ReopenTransSaga() {
  yield all([fork(onFetchReopenTrans)])
}
