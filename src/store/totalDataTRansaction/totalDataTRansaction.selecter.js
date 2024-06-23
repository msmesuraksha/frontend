import { createSelector } from 'reselect';

const selectTotlaTansReducer = (state) => state.TotalTransReducer;

export const selectTotalTans = createSelector(
  [selectTotlaTansReducer],
  (TansecationSlice) => TansecationSlice.totalTrans
);

export const selectTotalDataMap = createSelector(
  [selectTotalTans],
  (totalTrans) => {

    return totalTrans.map((item) => {
      const sellerName = item?.defaulterEntry?.creditor?.companyName;
      const buyerName = item?.defaulterEntry?.debtor?.companyName;
      const complaintNumber = item?.defaulterEntry?.complaintNumber != undefined ? item?.defaulterEntry?.complaintNumber : ''
      const totalTrans = item
      return { buyerName, sellerName, totalTrans, complaintNumber };
    })
  }
);

export const selectTotalLoading = createSelector(
  [selectTotlaTansReducer],
  (categoriesSlice) => categoriesSlice.loading
);

