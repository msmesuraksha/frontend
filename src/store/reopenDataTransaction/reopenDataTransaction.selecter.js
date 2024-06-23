import { createSelector } from 'reselect';

const selectReopenTansReducer = (state) => state.ReopenTransReducer;

export const selectReopenTans = createSelector(
  [selectReopenTansReducer],
  (TansecationSlice) => TansecationSlice.ReopenTrans
);

export const selectReopneData = createSelector(
  [selectReopenTans],
  (reopenTans) => {
    return reopenTans.map((item) => {
      const sellerName = item?.defaulterEntry?.creditor?.companyName;
      const buyerName = item?.defaulterEntry?.debtor?.companyName;
      const complaintNumber = item?.defaulterEntry?.complaintNumber != undefined ? item.defaulterEntry?.complaintNumber : ''
      const reopenTans = item
      return { buyerName, sellerName, reopenTans, complaintNumber };
    }).reverse()
  }
);

export const selectReopenLoading = createSelector(
  [selectReopenTansReducer],
  (categoriesSlice) => categoriesSlice.loading
);

