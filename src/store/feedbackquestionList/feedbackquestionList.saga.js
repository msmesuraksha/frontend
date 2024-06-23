import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_FEEDBACKQUESTION, FEEDBACK_QUESTION_DEL
} from "./feedbackquestionList.actiontype";
import {

  getFeebBackQuestionListFail,
  getFeebBackQuestionListSuccess,
  feedbackquestionDelSuccess,
  feedbackquestionDelFail

} from "./feedbackquestionList.actions";

import { getFeebBackQuestionListAPI, feedBackquestionDelet } from "helpers/fakebackend_helper";


function* getFeedbackQuestionSaga() {
  try {
    const response = yield call(getFeebBackQuestionListAPI)
    yield put(getFeebBackQuestionListSuccess(response.data.response))
  } catch (error) {
    yield put(getFeebBackQuestionListFail(error))
  }
}

function* feedBackquestionDel(payload) {
  try {
    const response = yield call(feedBackquestionDelet, payload.payload)
    yield put(feedbackquestionDelSuccess(response.data.response))
  } catch (error) {
    yield put(feedbackquestionDelFail(error))
  }
}
function* FeedbackQuestionListSaga() {
  yield takeEvery(GET_FEEDBACKQUESTION, getFeedbackQuestionSaga)
  yield takeEvery(FEEDBACK_QUESTION_DEL, feedBackquestionDel)
}

export default FeedbackQuestionListSaga;
