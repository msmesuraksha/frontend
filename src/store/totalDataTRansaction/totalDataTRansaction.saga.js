import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import {
  fetchTotalTransSuccess,
  fetchTotalTransFailure,
} from "./totalDataTRansaction.action"

import { FETCH_TOTAL_TRANS_START } from "./totalDataTRansaction.type"

import { genrateAllTransation } from "../../helpers/fakebackend_helper"

export function* fetchTotalTransAsync(data) {
  try {
    const totalTransArray = yield call(genrateAllTransation, data.payload)
    yield put(fetchTotalTransSuccess(totalTransArray.data.response))
  } catch (error) {
    yield put(fetchTotalTransFailure(error))
  }
}



export function* onFetchTotalTrans() {
  yield takeLatest(FETCH_TOTAL_TRANS_START, fetchTotalTransAsync)
}

export function* TotalTransSaga() {
  yield all([fork(onFetchTotalTrans)])
}
