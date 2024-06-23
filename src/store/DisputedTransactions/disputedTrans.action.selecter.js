import { createSelector } from 'reselect';

const selectdisputedTransReducer = (state) => state.disputedTransReducer;


export const selectdisputedTrans = createSelector(
    [selectdisputedTransReducer],
    (disputedTrans) => disputedTrans.disputedTrans
  );

  // export const selectdisputedTransMap = createSelector(
  //   [selectdisputedTrans],
  //   (disputedTrans) => disputedTrans.map((disputedTran) => {
  //           const {id:SrNo, amtPaid:DueAmount, invoiceId:InvoiceNo, status:Status} = disputedTran;
  //           const Debtor = "Mein";
  //           const Creditor = "Tum";
  //           return {SrNo, Debtor, Creditor, DueAmount, InvoiceNo, Status};
  //         })


  // );

  export const selectdisputedTransMap = createSelector(
    [selectdisputedTrans],
    (disputedTrans) => disputedTrans

  );
  export const selectDoardAdminDataLoading = createSelector(
    [selectdisputedTransReducer],
    (disputedTrans) => disputedTrans.loading
  );

  