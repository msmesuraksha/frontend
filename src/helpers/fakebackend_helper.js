import axios from "axios"
import { del, get, post, put, addEmployeeAPImethod, loginPostMethod, getWithdata, postForLOgs, forgetPasswordthroughToken, addEmployeeAPImethodTwo } from "./api_helper"
import * as url from "./url_helper"

//Get all Admin
export const getAllAdminData = () => get(url.GET_ADMIN_DATA)
export const getSubscribtionpckgListAPI = () => get("/api/admin/getAllSubscriptionPkg")
//Get all member data
export const getAllMemberData = () => get(url.GET_MEMBER_DATA)
//Admin Signup  
export const registerAdminData = (data) => post(url.SIGNUP_ADMIN_DATA, data)
export const changePassAPI = (data) => forgetPasswordthroughToken("/api/admin/password-reset", data)
// change password
export const changepassswordDataAPI = () =>
  post(url.CHANGE_PASSWORD_WITH_OLD_PASSWORD, data)
// genrateAllTransation
export const genrateAllTransation = (data) => post(url.GET_LATEST_TRANSATION, data)
export const genrateReOpendata = (data) => post('/api/admin/getAllTransactionsForOtherStatus', data)
export const genrateAllDocumentNeed = (data) => post('/api/admin/getAllDocumentsNeededTransactionsForLoggedInUser', data)
export const getAllOtherDocumentNeed = (data) => post('/api/admin/getAllTransactionsForOtherStatus', data)

export const approveRejectLatestTranApiMethod = (data) => post("/api/admin/approveOrRejectPayment", data)
export const getAllLogsAPI = (data) => postForLOgs("/api/logs/getAllLogsByDefaulterEntry", data)
export const deleteAdminAPi = (data) => post("/api/admin/delete", data)
export const esclatedTransactionAPI = (data) => post("/api/admin/escalateRequest", data)
export const subscribePckgAPI = (data) => post("/api/admin/addSubscriptionPkg", data)
export const requestForAdditionalDocAPII = (data) => post("/api/admin/askForSupportingDocument", data)
// getAllApprovedTransactions
export const getAllApprovedTransactions = () =>
  get(url.GET_ALL_APPROVED_TRANSACTIONS)
// getAllDisputedTransactions
export const getAllDisputedTransactions = () =>
  get(url.GET_ALL_DISPUTED_TRANSACTIONS)

export const getDashboardAdminData = () => post(url.GET_DASHBOARD_ADMIN_DATA)

//ComapnyDatails Company State and City
export const getCompanyStateAPI = () => post("/api/admin/getCompanyCountStateWise")

export const getCompanyCityAPI = (data) => post("/api/admin/getCompanyCountCityWiseForState", data)

export const getCompanyStateCityAPI = (data) => post("/api/admin/getCompanylistStateCityWise", data)

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = sessionStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

// deactivate table data

export const getRequestDeactivateAPI = () => get("/api/admin/getAllAccountDeactivationRequests")

export const activeDeactivateAcceptAPI = (data) => post("/api/admin/deactivateUserAccountByUserId", data)

// Member Active or Deactivete

export const activeDeactivateAPI = (data) => post("/api/admin/activateDeactivateUser", data)

// Profile Edit APi

export const profileEditAdminAPI = (data) => post("/api/admin/updateAdminDetails", data)

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  // 
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => loginPostMethod(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)
//post forget password with token
const postJwtForgetPwdWithToken = data => {

  const urlWithToken = `${url.FORGET_PASSWORD_WITH_TOKEN}/${data.token}`
  const postData = { password: data.password }
  const checkData = {
    "passwordChangeToken": sessionStorage.getItem("tokenemployeeRegister"),
    "password": data.password
  }
  return post(url.FORGET_PASSWORD_WITH_TOKEN, checkData)
}
// const postJwtForgetPwdWithToken = data => post(url.FORGET_PASSWORD_WITH_TOKEN, data);

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)
export const getAllCompanyListAPi = () => get("/api/admin/getAllCompanies")

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const getselectedmails = selectedmails =>
  post(url.GET_SELECTED_MAILS, selectedmails)

//post setfolderonmails
export const setfolderonmails = (selectedmails, folderId, activeTab) =>
  post(url.SET_FOLDER_SELECTED_MAILS, { selectedmails, folderId, activeTab })

// get orders
export const getOrders = () => get(url.GET_ORDERS)

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// add feedback question
export const addQuestionApi = order => addEmployeeAPImethodTwo(url.ADD_FEEDBACK_QUESTION, order)

// add feedback question del
export const feedBackquestionDelet = data => addEmployeeAPImethod(url.DEL_FEEDBACK_QUESTION, data)

// feedback quesiotn fatch
export const getFeebBackQuestionListAPI = () => get("/api/questions/getAllQuestions")

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get crypto product
export const getCryptoProduct = () => get(url.GET_CRYPTO_PRODUCTS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get jobs
export const getJobList = () => get(url.GET_JOB_LIST)

// get Apply Jobs
export const getApplyJob = () => get(url.GET_APPLY_JOB)

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

// get contacts
export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

// update user
export const updateUser = user => put(url.UPDATE_USER, user)

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

// add jobs
export const addNewJobList = job => post(url.ADD_NEW_JOB_LIST, job)

// update jobs
export const updateJobList = job => put(url.UPDATE_JOB_LIST, job)

// delete jobs
export const deleteJobList = job =>
  del(url.DELETE_JOB_LIST, { headers: { job } })

// Delete Apply Jobs
export const deleteApplyJob = data =>
  del(url.DELETE_APPLY_JOB, { headers: { data } })

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project)

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)

// get maillist
export const getMailsLists = filter =>
  post(url.GET_MAILS_LIST, {
    params: filter,
  })

//update mail
export const updateMail = mail => put(url.UPDATE_MAIL, mail)

// get folderlist
export const selectFolders = () => get(url.SELECT_FOLDER)

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA)
export const getYearlyData = () => get(url.GET_YEARLY_DATA)
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA)

export const walletBalanceData = month =>
  get(`${url.GET_WALLET_DATA}/${month}`, { params: { month } })

export const getStatisticData = duration =>
  get(`${url.GET_STATISTICS_DATA}/${duration}`, { params: { duration } })

export const visitorData = duration =>
  get(`${url.GET_VISITOR_DATA}/${duration}`, { params: { duration } })

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS)

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  })
}
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  })
}

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  })
}

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  })
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtForgetPwdWithToken,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
}
