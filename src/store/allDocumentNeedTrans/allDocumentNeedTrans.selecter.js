import { createSelector } from 'reselect';

const selectAllDocumentNeedReducer = (state) => state.AllDocumentNeedReducer;

export const selectAllDocumentNeedTans = createSelector(
  [selectAllDocumentNeedReducer],
  (TansecationSlice) => TansecationSlice.allDocumentNeed
);

export const selectAllOtherDocumentNeedTans = createSelector(
  [selectAllDocumentNeedReducer],
  (TansecationSlice) => TansecationSlice.allOtherStatus
);

export const selectAllDocumentNeedMap = createSelector(
  [selectAllDocumentNeedTans],
  (allDocumentNeed) => {
    // return allDocumentNeed
    return allDocumentNeed.map((item) => {
      const sellerName = item?.defaulterEntry?.creditor?.companyName;
      const buyerName = item?.defaulterEntry?.debtor?.companyName;

      const complaintNumber = item?.defaulterEntry?.complaintNumber != undefined ? item?.defaulterEntry?.complaintNumber : ''
      const allDocumentNeed = item
      return { buyerName, sellerName, allDocumentNeed, complaintNumber };
    })
  }
);

export const selectCloseTicketMap = createSelector(
  [selectAllDocumentNeedTans],
  (allDocumentNeed) => {
    return allDocumentNeed.map((item) => {
      const sellerName = item?.defaulterEntry?.creditor?.companyName;
      const buyerName = item?.defaulterEntry?.debtor?.companyName;
      const complaintNumber = item?.defaulterEntry?.complaintNumber != undefined ? item?.defaulterEntry?.complaintNumber : ''
      const allDocumentNeed = item
      return { buyerName, sellerName, allDocumentNeed, complaintNumber };
    }).filter((item) => {
      const condition1 = item.allDocumentNeed.pHArray[0]?.status !== "DOCUMENTS_NEEDED";
      const condition2 = item.allDocumentNeed.pHArray[0]?.status !== "APPROVED";
      return condition1 && condition2;
    })
  }
);


export const selectAllOtherDocumentMap = createSelector(
  [selectAllOtherDocumentNeedTans],
  (allDocumentNeed) => {
    // return allDocumentNeed
    return allDocumentNeed.map((item) => {
      const sellerName = item?.defaulterEntry?.creditor?.companyName;
      const buyerName = item?.defaulterEntry?.debtor?.companyName;
      const complaintNumber = item?.defaulterEntry?.complaintNumber != undefined ? item?.defaulterEntry?.complaintNumber : ''
      const allDocumentNeed = item
      return { buyerName, sellerName, allDocumentNeed, complaintNumber };
    })
  }
);

export const selectAllDocumentNeedLoading = createSelector(
  [selectAllDocumentNeedReducer],
  (categoriesSlice) => categoriesSlice.loading
);

