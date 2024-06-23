import {
  ADD_FEEDBACK_QUESTION_START,
  ADD_FEEDBACK_QUESTION_SUCCESS,
  ADD_FEEDBACK_QUESTION_FAILED,
} from "./addFeedbackQuestion.type"

export const REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE = {
  addFeedbackQuestionList: [],
  addFeedbackQuestionListSuccess: [],
  loading: false,
  error: null,
}

export const AddFeedbackQuestionReducer = (
  state = REPORT_COMPANY_SEARCH_VIEW_DETAIL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case ADD_FEEDBACK_QUESTION_START:
      return { ...state, loading: true, addFeedbackQuestionList: payload }
    case ADD_FEEDBACK_QUESTION_SUCCESS:
      return { ...state, loading: false, addFeedbackQuestionListSuccess: payload }
    case ADD_FEEDBACK_QUESTION_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
