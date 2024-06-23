import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./login/actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./login/actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../helpers/fakebackend_helper";
import { success } from "toastr";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {

  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        userName: user.email,
        password: user.password,
      });
      if (response != undefined && response != null) {

        if (response.data.success) {
          sessionStorage.setItem("authUser", JSON.stringify(response.data.response));
          sessionStorage.setItem("IspopupOpen", JSON.stringify(true));
          sessionStorage.setItem("tokenemployeeRegister", response.data.response.token)
          sessionStorage.setItem("refreshToken", response.data.response.refreshToken)
          sessionStorage.setItem("adminRole", response.data.response.adminRole)
          yield put(loginSuccess(response.data.response));
          history('/dashboard');
        } else {

          if (response.data.passwordChangeNeeded == true) {
            // window.alert(response.data.message);
            sessionStorage.setItem("tokenemployeeRegister", response.data.passwordChangeToken)
            history('/change-new-password');

          }
          window.alert(response.data.message);

        }

      }
    }

  } catch (error) {
    yield put(apiError(error));
  }
}

// function* logoutUser({ payload: { history } }) {
//   try {
//     sessionStorage.removeItem("authUser");

//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(fireBaseBackend.logout);
//       yield put(logoutUserSuccess(response));
//     }
//     console.log("history",history)
//     history("/login");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* logoutUser({ payload: { history } }) {
  try {
    sessionStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history('/login');
    window.location.reload()
  } catch (error) {
    yield put(apiError(error));
  }
}


function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      );
      sessionStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      sessionStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
