import { takeLatest, call, put, all, fork } from "redux-saga/effects"

import {
  fetchAllDocumentNeedSuccess,
  fetchAllDocumentNeedFailure,
  fetchAllOtherStatusSuccess,
  fetchAllOtherStatusFailure,
} from "./allDocumentNeedTrans.action"

import { FETCH_ALL_DOCUMENT_NEED_START, FETCH_ALL_OTHER_STATUS_START } from "./allDocumentNeedTrans.type"

import { genrateAllDocumentNeed, getAllOtherDocumentNeed } from "../../helpers/fakebackend_helper"

export function* fetchAllDocumentNeedAsync(data) {
  try {
    const totalTransArray = yield call(genrateAllDocumentNeed)
    yield put(fetchAllDocumentNeedSuccess(totalTransArray.data.response))
  } catch (error) {
    yield put(fetchAllDocumentNeedFailure(error))
  }
}

export function* fetchAllOtherStatusAsync(data) {
  try {
    const totalTransArray = yield call(getAllOtherDocumentNeed, data.payload)
    yield put(fetchAllOtherStatusSuccess(totalTransArray.data.response))
  } catch (error) {
    yield put(fetchAllOtherStatusFailure(error))
  }
}



export function* onFetchAllDocumentNeedTrans() {
  yield takeLatest(FETCH_ALL_DOCUMENT_NEED_START, fetchAllDocumentNeedAsync)
  yield takeLatest(FETCH_ALL_OTHER_STATUS_START, fetchAllOtherStatusAsync)
}

export function* AllDocumentNeedSaga() {
  yield all([fork(onFetchAllDocumentNeedTrans)])
}
