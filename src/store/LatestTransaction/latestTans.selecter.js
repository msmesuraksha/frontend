import { createSelector } from 'reselect';

const selectLatestTansReducer = (state) => state.latestTransReducer;

export const selectLatestTans = createSelector(
  [selectLatestTansReducer],
  (TansecationSlice) => TansecationSlice.latestTrans
);

export const selectLatestTansMap = createSelector(
  [selectLatestTans],
  (latestTans) => {

    return latestTans.map((item) => {
      const sellerName = item?.defaulterEntry?.creditor?.companyName;
      const buyerName = item?.defaulterEntry?.debtor?.companyName;
      const complaintNumber = item?.defaulterEntry?.complaintNumber != undefined ? item.defaulterEntry?.complaintNumber : ''
      const latestTanss = item
      return { buyerName, sellerName, latestTanss, complaintNumber };
    }).reverse()
  }

);


export const selectIsLoading = createSelector(
  [selectLatestTansReducer],
  (categoriesSlice) => categoriesSlice.loading
);

export const getSubscriptionListReducer = createSelector(
  [selectLatestTansReducer],
  (TansecationSlice) => TansecationSlice.getSubscribePackage
);

export const getlogsSelector = createSelector(
  [selectLatestTansReducer],
  (TansecationSlice) => TansecationSlice.getAllLogs
);
