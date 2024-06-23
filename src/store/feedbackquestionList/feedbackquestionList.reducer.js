import {
  GET_FEEDBACKQUESTION,
  GET_FEEDBACKQUESTION_FAIL,
  GET_FEEDBACKQUESTION_SUCCESS,
  FEEDBACK_QUESTION_DEL,
  FEEDBACK_QUESTION_DEL_SUCCESS,
  FEEDBACK_QUESTION_DEL_FAIL
} from "./feedbackquestionList.actiontype"

const INIT_STATE = {
  getFeedbackQuestionListReducer: [],
  feedBackquestionDel: [],
  getFeedbackQuestionListReducerFail: false,
}

export const FeedbackQuestionListReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FEEDBACKQUESTION:
      return { ...state, }
    case GET_FEEDBACKQUESTION_SUCCESS:
      return { ...state, getFeedbackQuestionListReducer: payload, }
    case GET_FEEDBACKQUESTION_FAIL:
      return { ...state, error: payload, }
    case FEEDBACK_QUESTION_DEL:
      return { ...state, }
    case FEEDBACK_QUESTION_DEL_SUCCESS:
      return { ...state, feedBackquestionDel: payload, }
    case FEEDBACK_QUESTION_DEL_FAIL:
      return { ...state, error: payload, }
    default:
      return state
  }
}
