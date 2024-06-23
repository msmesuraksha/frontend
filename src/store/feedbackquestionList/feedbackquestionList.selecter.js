import { createSelector } from 'reselect';
import { DebtorsReducer } from './feedbackquestionList.reducer';

const selectDebtorsReducer = (state) => state.FeedbackQuestionListReducer;


export const getFeebBackQuestionListSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.getFeedbackQuestionListReducer != undefined ? DebtorsReducer.getFeedbackQuestionListReducer : []
)
