import {
  GET_FEEDBACKQUESTION,
  GET_FEEDBACKQUESTION_FAIL,
  GET_FEEDBACKQUESTION_SUCCESS,
  FEEDBACK_QUESTION_DEL,
  FEEDBACK_QUESTION_DEL_SUCCESS,
  FEEDBACK_QUESTION_DEL_FAIL
} from "./feedbackquestionList.actiontype"

import { createAction } from "store/utils/reducer/reducer.utils";

export const getFeebBackQuestionList = () => createAction(GET_FEEDBACKQUESTION)

export const getFeebBackQuestionListSuccess = (data) => createAction(GET_FEEDBACKQUESTION_SUCCESS, data)

export const getFeebBackQuestionListFail = (error) => createAction(GET_FEEDBACKQUESTION_FAIL, error)


export const feedbackquestionDel = (data) => createAction(FEEDBACK_QUESTION_DEL, data)

export const feedbackquestionDelSuccess = (data) => createAction(FEEDBACK_QUESTION_DEL_SUCCESS, data)

export const feedbackquestionDelFail = (error) => createAction(FEEDBACK_QUESTION_DEL_FAIL, error)

