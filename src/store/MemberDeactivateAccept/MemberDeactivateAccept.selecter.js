import { createSelector } from 'reselect';
import moment from 'moment'
const selectUserActiveDeactivateReducer = (state) => state.userActiveDeactivateReducer;


export const selectUserActiveDeactivateList = createSelector(
  [selectUserActiveDeactivateReducer],
  (userActiveDeactivate) => []
);

