import { createSelector } from 'reselect';
import moment from 'moment'
const selectCompanySearchViewReducer = (state) => state.AddFeedbackQuestionReducer;


export const selectCompanySearchVeiwDatilsList = createSelector(
  [selectCompanySearchViewReducer],
  (reportMeDefulter) => []
);

export const addFeedbackQuestionSelect = createSelector(
  [selectCompanySearchViewReducer],
  // (addFeedbackQuestionSuccess) => addFeedbackQuestionSuccess.addFeedbackQuestionListSuccess
  (addFeedbackQuestionSuccess) =>addFeedbackQuestionSuccess.addFeedbackQuestionListSuccess
);