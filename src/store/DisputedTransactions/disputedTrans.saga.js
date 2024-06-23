import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import {
  fetchDisputedTransSuccess,
  fetchDisputedTransFailure,
} from "./disputedTrans.action"

import { FETCH_DISPUTED_TRANSACTIONS_START } from "./disputedTrans.type"

import { getAllDisputedTransactions } from "../../helpers/fakebackend_helper"

export function* fetchDisputedTransAsync() {
  try {
    const disputedTransArray = yield call(getAllDisputedTransactions)
    yield put(fetchDisputedTransSuccess(disputedTransArray.data.response))
  } catch (error) {
    yield put(fetchDisputedTransFailure(error))
  }
}

export function* onFetchDisputedTrans() {
  yield takeLatest(FETCH_DISPUTED_TRANSACTIONS_START, fetchDisputedTransAsync)
}

export function* disputedTransSaga() {
  yield all([fork(onFetchDisputedTrans)])
}
