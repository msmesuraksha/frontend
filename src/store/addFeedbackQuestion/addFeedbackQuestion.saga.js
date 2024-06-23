import { takeLatest, call, put, all, fork, takeEvery } from "redux-saga/effects"

import { addFeedbackQuestionSuccess, addFeedbackQuestionFailure } from "./addFeedbackQuestion.action"
import { ADD_FEEDBACK_QUESTION_START } from "./addFeedbackQuestion.type"

import { addQuestionApi } from "helpers/fakebackend_helper"




export function* addFeedbackQuestionAsync(payload) {
  try {
    const response = yield call(addQuestionApi, payload.payload)
    // console.log("responseresponseresponse",response)
    if (response != undefined) {
      yield put(addFeedbackQuestionSuccess(response.data.message))

    }
  } catch (error) {
    yield put(addFeedbackQuestionSuccess(error))
  }
}


export function* onaddFeedbackQuestion() {
  yield takeEvery(ADD_FEEDBACK_QUESTION_START, addFeedbackQuestionAsync)
}

export function* AddQuestionFeedbackQuestionSaga() {
  yield all([fork(onaddFeedbackQuestion)])
}
