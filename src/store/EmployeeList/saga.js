import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { GET_ADMIN_DATA, SIGNUP_ADMIN_API_FAIL, SIGNUP_ADMIN_DATA, CHANGE_PASSWORD_WITH_OLD_PASSWORD, DELETE_ADMIN } from "./actionsTypes";
import {
  AdminApiSuccess, AdminApiFail, adminSignupUserSuccessful, adminSignupFailed, changePasswordUsingOldPass, changePasswordUsingOldPassSuccessful, changePasswordUsingOldPassfail,
  deleteAdminActionFail, deleteAdminActionSuccess
} from "./actions";
import { getAllAdminData, registerAdminData } from "../../helpers/fakebackend_helper";
import { changepassswordDataAPI, deleteAdminAPi } from "../../helpers/fakebackend_helper";
function* getAllAdminData2() {
  try {

    var response = yield call(getAllAdminData);
    // console.log("RESPONSE ADMIN DATA", response)
    yield put(AdminApiSuccess(GET_ADMIN_DATA, response));
  } catch (error) {
    yield put(AdminApiFail(GET_ADMIN_DATA, error));
  }
}
function* signupAdminData(action) {


  try {
    // 
    const response = yield call(registerAdminData, action.payload.user);
    yield put(adminSignupUserSuccessful(SIGNUP_ADMIN_DATA, response));
  } catch (error) {
    yield put(adminSignupFailed(SIGNUP_ADMIN_DATA, error));
  }
}
function* deleteAdminSaga(action) {

  try {
    // 
    const response = yield call(deleteAdminAPi, action.payload);
    yield put(deleteAdminActionSuccess(response));
  } catch (error) {
    yield put(deleteAdminActionFail(error));
  }
}

export function* watchGetAdminData() {
  yield takeEvery(SIGNUP_ADMIN_DATA, signupAdminData);
  yield takeEvery(GET_ADMIN_DATA, getAllAdminData2);
  yield takeEvery(CHANGE_PASSWORD_WITH_OLD_PASSWORD, changePasswordSaga);
  yield takeEvery(DELETE_ADMIN, deleteAdminSaga);


}

function* AdminListSaga() {
  yield all([fork(watchGetAdminData)]);
}

export default AdminListSaga;

function ApiCall(data) {
  axios.post('/api/admin/changePasswordUsingOldPass', data, '').then((response) => {
    setPost(response.data);
  }).catch(error => {
    setError(error);
  });
}
// CHANGE PASSWORD SAGA METHODS 
function* changePasswordSaga(action) {
  //   
  try {


    const response = yield call(ApiCall, action.payload.user);
    yield put(changePasswordUsingOldPassSuccessful(CHANGE_PASSWORD_WITH_OLD_PASSWORD, response));
  } catch (error) {

    yield put(changePasswordUsingOldPassfail(CHANGE_PASSWORD_WITH_OLD_PASSWORD, error));
  }
}