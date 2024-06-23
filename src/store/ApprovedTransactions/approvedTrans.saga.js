import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import {
  fetchApprovedTransSuccess,
  fetchApprovedTransFailure,
} from "./approvedTrans.action"

import { FETCH_APPROVED_TRANSACTIONS_START } from "./approvedTrans.type"

import { getAllApprovedTransactions } from "../../helpers/fakebackend_helper"

export function* fetchApprovedTransAsync() {
  try {
    const approvedTransArray = yield call(getAllApprovedTransactions)
    yield put(fetchApprovedTransSuccess(approvedTransArray.data.response))
  } catch (error) {
    yield put(fetchApprovedTransFailure(error))
  }
}
export function* fetchAllTransactions() {
  try {
    const approvedTransArray = yield call(getAllApprovedTransactions)
    yield put(fetchApprovedTransSuccess(approvedTransArray.data.response))
  } catch (error) {
    yield put(fetchApprovedTransFailure(error))
  }
}


export function* onFetchApprovedTrans() {
  yield takeLatest(FETCH_APPROVED_TRANSACTIONS_START, fetchApprovedTransAsync)
}

export function* approvedTransSaga() {
  yield all([fork(onFetchApprovedTrans)])
}
