import { createSelector } from 'reselect';

const selectApprovedTransReducer = (state) => state.approvedTransReducer;

export const selectApprovedTrans = createSelector(
  [selectApprovedTransReducer],
  (approvedSlice) => approvedSlice.approvedTrans
);

export const selectApprovedTransMap = createSelector(
  [selectApprovedTrans],
  (latestTans) => {
    return latestTans.map((item) => {
      const sellerName = item?.defaulterEntry?.creditor?.companyName;
      const buyerName = item?.defaulterEntry?.debtor?.companyName;
      const complaintNumber = item?.defaulterEntry?.complaintNumber != undefined ? item.defaulterEntry?.complaintNumber : ''
      const latestTanss = item
      return { buyerName, sellerName, latestTanss, complaintNumber };
    })
  }
  //   {
  //  if (!approvedTrans || approvedTrans.length === 0) return [];

  //     return approvedTrans.map((approvedSlice) => {
  //       const { id: orderId, amtPaid: total, status: Status, defaulterEntry } = approvedSlice;
  //       const methodIcon = "fab fa-cc-paypal";
  //       const paymentMethod = "Paypal";
  //       const orderdate = defaulterEntry?.invoices?.[0]?.dueDate || '07 Oct, 2019';
  //       const paymentStatus = "Paid";
  //       const buyerName = defaulterEntry?.debtor?.companyName || 'TEST';
  //       const sellerName = defaulterEntry?.creditorCompanyId?.companyName || "TEST";

  //       return { orderId, buyerName, sellerName, orderdate, total, paymentStatus, methodIcon, Status, paymentMethod };
  //     });
  //   }
);

export const selectLoading = createSelector(
  [selectApprovedTransReducer],
  (approvedSlice) => approvedSlice.loading
);

