import {
  ADD_FEEDBACK_QUESTION_START,
  ADD_FEEDBACK_QUESTION_SUCCESS,
  ADD_FEEDBACK_QUESTION_FAILED,
} from "./addFeedbackQuestion.type"
import { createAction } from "store/utils/reducer/reducer.utils"



export const addFeedbackQuestionStart = (data) => createAction(ADD_FEEDBACK_QUESTION_START, data)


export const addFeedbackQuestionSuccess = (data) => createAction(ADD_FEEDBACK_QUESTION_SUCCESS, data)

export const addFeedbackQuestionFailure = error => createAction(ADD_FEEDBACK_QUESTION_FAILED, error)
