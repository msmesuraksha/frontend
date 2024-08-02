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
    }).filter((value) => {

      const pHArray = value.latestTanss.pHArray
      let CREDITOR = 0
      let DEBTOR = 0

      for (let i = 0; i < pHArray.length; i++) {
        if (pHArray[i].requestor == "CREDITOR") {
          CREDITOR++
        }
        if (pHArray[i].requestor == "DEBTOR") {
          DEBTOR++
        }
      }

      if (CREDITOR > 0 && DEBTOR == 0) {
        return false
      } else {
        return true
      }


      /* 
      
         if (value.latestTanss.pHArray.length == 1) {
       if (value.latestTanss.pHArray[0].requestor == "CREDITOR") {
         return false
       }

       if (value.latestTanss.pHArray[0].requestor == "DEBTOR") {
         return true
       }

     } else if (value.latestTanss.pHArray.length > 1) {
       return true
     }
      
      */

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
