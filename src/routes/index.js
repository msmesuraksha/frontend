import React from "react";
import { Navigate } from "react-router-dom";
import UserList from "../pages/admin/UserList";

import MembersList from "../pages/admin/Members/memberlist/MembersList";
import MemberFilteredData from "../pages/admin/Members/memberFilteredData";
import RegisteredCompanyList from "../pages/admin/Members/RegisteredCompany/RegisteredCompanyList";
import DiputedBillings from "../pages/admin/DisputedBillings/DiputedBillings";
import ApprovedTranction from "../pages/admin/ApprovedTransaction/ApprovedTranction";
// Pages Component
import Chat from "../pages/Chat/Chat";
import ReportedInvoice from "./../pages/ReportedDefauter/ReportedInvoice"

// File Manager
import FileManager from "../pages/FileManager/index";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// setting page for reset password
import Settings from "pages/Dashboard-Blog/Settings";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

// //Tasks
import TasksList from "../pages/Tasks/tasks-list";
import TasksCreate from "../pages/Tasks/tasks-create";

// //Projects
import ProjectsGrid from "../pages/Projects/projects-grid";
import ProjectsList from "../pages/Projects/projects-list";
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview";
import ProjectsCreate from "../pages/Projects/projects-create";

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";
import EmailBasicTemplte from "../pages/Email/email-basic-templte";
import EmailAlertTemplte from "../pages/Email/email-template-alert";
import EmailTemplateBilling from "../pages/Email/email-template-billing";

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list";
import InvoiceDetail from "../pages/Invoices/invoices-detail";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwdLink from "../pages/Authentication/ForgetPasswordUsingLink";
import ChangePasswordThroughMail from "../pages/Authentication/ChangePasswordWithUrl";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Login2 from "../pages/AuthenticationInner/Login2";
import Register1 from "../pages/AuthenticationInner/Register";
import Register2 from "../pages/AuthenticationInner/Register2";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2";
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2";
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2";
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import LatestTranactionViewDetails from "../pages/Dashboard/LatesttransactionViewDetails";
import DashboardSaas from "../pages/Dashboard-saas/index";
import DashboardCrypto from "../pages/Dashboard-crypto/index";
import Blog from "../pages/Dashboard-Blog/index";
import DashboardJob from "../pages/DashboardJob/index";

//Crypto
import CryptoWallet from "../pages/Crypto/CryptoWallet/crypto-wallet";
import CryptoBuySell from "../pages/Crypto/crypto-buy-sell";
import CryptoExchange from "../pages/Crypto/crypto-exchange";
import CryptoLending from "../pages/Crypto/crypto-lending";
import CryptoOrders from "../pages/Crypto/CryptoOrders/crypto-orders";
import CryptoKYCApplication from "../pages/Crypto/crypto-kyc-application";
import CryptoIcoLanding from "../pages/Crypto/CryptoIcoLanding/index";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartistChart from "../pages/Charts/ChartistChart";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";
import ReCharts from "../pages/Charts/ReCharts";









//Tables



//Blog
import BlogList from "../pages/Blog/BlogList/index";
import BlogGrid from "../pages/Blog/BlogGrid/index";
import BlogDetails from "../pages/Blog/BlogDetails";

//Job
import JobGrid from "../pages/JobPages/JobGrid/index";
import JobDetails from "../pages/JobPages/JobDetails";
import JobCategories from "../pages/JobPages/JobCategories";
import JobList from "../pages/JobPages/JobList";
import ApplyJobs from "../pages/JobPages/ApplyJobs/index";
import CandidateList from "../pages/JobPages/CandidateList";
import CandidateOverview from "../pages/JobPages/CandidateOverview";






//Pages

import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";
import MemberCard from "../pages/admin/member-card/memberCard";
import FeedbackQuestionModel from "../pages/admin/FeedbackQuestion/FeedbackQuestion"

//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile";
import LatestTransactionPage from "pages/admin/LatestTransaction/LatestTransactionPage";

import { TotalData } from "pages/TotalData/totalData";
import { ReopnTask } from "pages/ReopenTask/reopenData";



import { AllDocumentNeed } from "pages/allDocumentNeed/allDocumentNeed";

import { CloseTicketsModule } from "pages/closeticktes/closetickets";

import { RequestDeactivateModule } from "pages/requestDeactivate/requestDeactivate";

import { StatusAndOpinionModule } from "pages/statusAndOpinion/statusAndOpinion";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard-saas", component: <DashboardSaas /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  { path: "/blog", component: <Blog /> },
  { path: "/dashboard-job", component: <DashboardJob /> },
  //BAfana Startt
  //Registration user
  { path: "/registration", component: <UserList /> },
  { path: "/members-list", component: <MembersList /> },
  { path: "/memberFilteredData", component: <MemberFilteredData /> },

  { path: "/registered-company", component: <RegisteredCompanyList /> },
  /*   { path: "/disputed-billings", component: <DiputedBillings /> }, */
  { path: "/approved-transaction", component: <ApprovedTranction /> },
  { path: "/company-history", component: <LatestTransactionPage /> },
  { path: "/subscription", component: <MemberCard /> },
  { path: "/feedbackQuestion", component: <FeedbackQuestionModel /> },
  { path: "/ReportedInvoice", component: <ReportedInvoice /> },
  { path: "/TotalData", component: <TotalData /> },

  { path: "/Reopen-Requests", component: <ReopnTask /> },

  { path: "/Old-ticket", component: <AllDocumentNeed /> },
  { path: "/close-ticket", component: <CloseTicketsModule /> },
  { path: "/status-opinion", component: <StatusAndOpinionModule /> },
  { path: "/request-deactivate", component: <RequestDeactivateModule /> },





  //Crypto
  { path: "/crypto-wallet", component: <CryptoWallet /> },
  { path: "/crypto-buy-sell", component: <CryptoBuySell /> },
  { path: "/crypto-exchange", component: <CryptoExchange /> },
  { path: "/crypto-lending", component: <CryptoLending /> },
  { path: "/crypto-orders", component: <CryptoOrders /> },
  { path: "/crypto-kyc-application", component: <CryptoKYCApplication /> },

  //chat
  { path: "/chat", component: <Chat /> },

  //File Manager
  { path: "/apps-filemanager", component: <FileManager /> },

  // //calendar
  { path: "/calendar", component: <Calendar /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  /// Password Reset setting page Settings


  //Ecommerce
  { path: "/ecommerce-product-detail/:id", component: <EcommerceProductDetail /> },
  { path: "/ecommerce-products", component: <EcommerceProducts /> },
  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/ecommerce-cart", component: <EcommerceCart /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/ecommerce-shops", component: <EcommerceShops /> },
  { path: "/ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/LatestTranaction-View-Details", component: <LatestTranactionViewDetails /> },

  //Email
  { path: "/email-inbox", component: <EmailInbox /> },
  { path: "/email-read", component: <EmailRead /> },
  { path: "/email-template-basic", component: <EmailBasicTemplte /> },
  { path: "/email-template-alert", component: <EmailAlertTemplte /> },
  { path: "/email-template-billing", component: <EmailTemplateBilling /> },

  //Invoices
  { path: "/invoices-list", component: <InvoicesList /> },
  { path: "/invoices-detail/:id", component: <InvoiceDetail /> },
  { path: "/invoices-detail", component: <InvoiceDetail /> },

  // Tasks
  { path: "/tasks-list", component: <TasksList /> },
  { path: "/tasks-create", component: <TasksCreate /> },

  //Projects
  { path: "/projects-grid", component: <ProjectsGrid /> },
  { path: "/projects-list", component: <ProjectsList /> },
  { path: "/projects-overview", component: <ProjectsOverview /> },
  { path: "/projects-overview/:id", component: <ProjectsOverview /> },
  { path: "/projects-create", component: <ProjectsCreate /> },

  //Blog
  { path: "/blog-list", component: <BlogList /> },
  { path: "/blog-grid", component: <BlogGrid /> },
  { path: "/blog-details", component: <BlogDetails /> },

  //job
  { path: "/job-grid", component: <JobGrid /> },
  { path: "/job-details", component: <JobDetails /> },
  { path: "/job-categories", component: <JobCategories /> },
  { path: "/job-list", component: <JobList /> },
  { path: "/job-apply", component: <ApplyJobs /> },
  { path: "/candidate-list", component: <CandidateList /> },
  { path: "/candidate-overview", component: <CandidateOverview /> },

  // Contacts
  { path: "/contacts-grid", component: <ContactsGrid /> },
  { path: "/contacts-list", component: <ContactsList /> },
  { path: "/contacts-profile", component: <ContactsProfile /> },

  //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartist-charts", component: <ChartistChart /> },
  { path: "/chartjs-charts", component: <ChartjsChart /> },
  { path: "/e-charts", component: <EChart /> },
  { path: "/sparkline-charts", component: <SparklineChart /> },
  { path: "/charts-knob", component: <ChartsKnob /> },
  { path: "/re-charts", component: <ReCharts /> },





  // Maps
 





  {
    path: "/",
    exact: true,
    component: < Navigate to="/login" />,
  },
];

const authProtectedRoutesTwo = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard-saas", component: <DashboardSaas /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  { path: "/blog", component: <Blog /> },
  { path: "/dashboard-job", component: <DashboardJob /> },

  { path: "/Reopen-Requests", component: <ReopnTask /> },

  { path: "/Old-ticket", component: <AllDocumentNeed /> },
  { path: "/close-ticket", component: <CloseTicketsModule /> },
  { path: "/status-opinion", component: <StatusAndOpinionModule /> },
  //BAfana Startt
  //Registration user
  { path: "/registration", component: <UserList /> },
  { path: "/members-list", component: <MembersList /> },
  { path: "/memberFilteredData", component: <MemberFilteredData /> },

  { path: "/registered-company", component: <RegisteredCompanyList /> },
  /*  { path: "/disputed-billings", component: <DiputedBillings /> }, */
  { path: "/approved-transaction", component: <ApprovedTranction /> },
  { path: "/company-history", component: <LatestTransactionPage /> },
  { path: "/ReportedInvoice", component: <ReportedInvoice /> },
  { path: "/LatestTranaction-View-Details", component: <LatestTranactionViewDetails /> },
  { path: "/profile", component: <UserProfile /> },

  /*   { path: "/TotalData", component: <TotalData /> }, */
];

const authProtectedRoutesLOne = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/dashboard-saas", component: <DashboardSaas /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  { path: "/blog", component: <Blog /> },
  { path: "/dashboard-job", component: <DashboardJob /> },
  { path: "/Old-ticket", component: <AllDocumentNeed /> },
  { path: "/close-ticket", component: <CloseTicketsModule /> },
  { path: "/status-opinion", component: <StatusAndOpinionModule /> },
  //BAfana Startt
  //Registration user
  { path: "/registration", component: <UserList /> },
  { path: "/members-list", component: <MembersList /> },
  { path: "/memberFilteredData", component: <MemberFilteredData /> },

  { path: "/registered-company", component: <RegisteredCompanyList /> },
  /*  { path: "/disputed-billings", component: <DiputedBillings /> }, */
  { path: "/approved-transaction", component: <ApprovedTranction /> },
  { path: "/company-history", component: <LatestTransactionPage /> },
  { path: "/ReportedInvoice", component: <ReportedInvoice /> },
  { path: "/LatestTranaction-View-Details", component: <LatestTranactionViewDetails /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/Settings", component: <Settings /> },

  /*   { path: "/TotalData", component: <TotalData /> }, */
];


const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/changePassword", component: <ChangePasswordThroughMail /> },
  { path: "/change-new-password", component: <ForgetPwdLink /> },
  // { path: "/register", component: <Register /> },


  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
  { path: "/crypto-ico-landing", component: <CryptoIcoLanding /> },

  // Authentication Inner
  { path: "/user-login", component: <Login1 /> },
  { path: "/pages-login-2", component: <Login2 /> },
  { path: "/pages-register", component: <Register1 /> },
  { path: "/user-register", component: <Register2 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  { path: "/auth-recoverpw-2", component: <ForgetPwd2 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  { path: "/auth-two-step-verification-2", component: <TwostepVerification2 /> },
];

export { authProtectedRoutes, authProtectedRoutesLOne, authProtectedRoutesTwo, publicRoutes };
