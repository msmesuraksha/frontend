import { all, call, fork } from "redux-saga/effects"

//Admin Registration
import AdminListSaga from "./EmployeeList/saga"
// import changePasswordSaga from "./EmployeeList/saga";
//Admin Member list saga
import MemberListSaga from "../../src/store/member-list/saga"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import jobsSaga from "./jobs/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import mailsSaga from "./mails/saga"
import contactsSaga from "./contacts/saga"
import dashboardSaga from "./dashboard/saga"
import dashboardSaasSaga from "./dashboard-saas/saga"
import dashboardCryptoSaga from "./dashboard-crypto/saga"
import dashboardBlogSaga from "./dashboard-blog/saga"
import dashboardJobSaga from "./dashboard-jobs/saga"
import { latestTransSaga } from "./LatestTransaction/latestTrans.saga"
import { approvedTransSaga } from "./ApprovedTransactions/approvedTrans.saga"
import { disputedTransSaga } from "./DisputedTransactions/disputedTrans.saga"
import { dashboardAdminDataSaga } from "./DashboardAdminData/dashboardAdminData.saga"
import { AddQuestionFeedbackQuestionSaga } from "./addFeedbackQuestion/addFeedbackQuestion.saga"
import FeedbackQuestionListSaga from "./feedbackquestionList/feedbackquestionList.saga"
import { CompanyDetailsSaga } from "./CompanyDetails/CompanyDetails.saga"
import { UserActiveDeactivateSaga } from "./MemberActiveDeactivate/memberActiveDeactivate.saga"
import { profileEditAdminSaga } from "./ProfileEditAdmin/profileEditAdmin.saga"
import { TotalTransSaga } from "./totalDataTRansaction/totalDataTRansaction.saga"
import { ReopenTransSaga } from "./reopenDataTransaction/reopenDataTransaction.saga"
import { AllDocumentNeedSaga } from "./allDocumentNeedTrans/allDocumentNeedTrans.saga"
import { FetchRequestDeactivateSaga } from "./requestDeactiveData/requestDeactiveData.saga"
import { DeactivateAcceptSaga } from "./MemberDeactivateAccept/MemberDeactivateAccept.saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AdminListSaga),
    // fork(changePasswordSaga),
    fork(MemberListSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(jobsSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(dashboardCryptoSaga),
    fork(dashboardBlogSaga),
    fork(dashboardJobSaga),
    fork(latestTransSaga),
    fork(approvedTransSaga),
    fork(disputedTransSaga),
    fork(dashboardAdminDataSaga),
    fork(AddQuestionFeedbackQuestionSaga),
    fork(FeedbackQuestionListSaga),
    fork(CompanyDetailsSaga),
    fork(UserActiveDeactivateSaga),
    fork(profileEditAdminSaga),
    fork(ReopenTransSaga),
    fork(TotalTransSaga),
    fork(AllDocumentNeedSaga),
    fork(FetchRequestDeactivateSaga),
    fork(DeactivateAcceptSaga)
  ])
}
