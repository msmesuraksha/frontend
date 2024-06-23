import { createSelector } from 'reselect';

const selectDeactivateReducer = (state) => state.RequestDeactivateDataReducer;

export const selectRequestDeactivateDate = createSelector(
  [selectDeactivateReducer],
  (requestDeactivateSlice) => requestDeactivateSlice.requestDeactivateData != undefined ? requestDeactivateSlice.requestDeactivateData : []
);

export const selectTotalDataMap = createSelector(
  [selectRequestDeactivateDate],
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

export const selectRequestDeactivateLoading = createSelector(
  [selectDeactivateReducer],
  (categoriesSlice) => categoriesSlice.loading
);

