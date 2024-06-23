import { createSelector } from 'reselect';

const selectdashboardAdminDataReducer = (state) => state.dashboardAdminDataReducer;

export const selectdashDoardAdminData = createSelector(
    [selectdashboardAdminDataReducer],
    (boardAdminData) => boardAdminData.dashboardAdminData
  );

  export const selectdashboardAdminDataMap = createSelector(
    [selectdashDoardAdminData],
    (dashboardAdminData) => dashboardAdminData
  );
  export const selectDoardAdminDataLoading = createSelector(
    [selectdashboardAdminDataReducer],
    (boardAdminData) => boardAdminData.loading
  );

  