import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD, FORGET_PASSWORD_WITH_TOKEN,CHANGE_PASSWORD_THROUGH_LINK } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError , changePasswordThroughUrlSuccess, changePasswordThroughUrlFail } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeForgetPwd,
  postJwtForgetPwd,
  changePassAPI,
  postJwtForgetPwdWithToken
} from "../../../helpers/fakebackend_helper"


//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    
     if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtForgetPwd, {
        emailId: user.email,
      })
            
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Reset link are sended to your mailbox, check there first"
          )
        )
      }
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}
function* forgetUserWithToken({ payload: { user, history } }) {
  try {
           
     if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtForgetPwdWithToken, {
        password: user.password,
        token:user.token
      })
             
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Password reset seccussfully."
          )
        )
      }
    }
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}


function* changePasswordfirsttime(user, history) {
  const pay = user.payload

  try {
    const response = yield call(changePassAPI, pay.user)
    yield put(changePasswordThroughUrlSuccess(response))
    if (response.data.success) {
      // history('/companies');
      alert("Please Re login with your new password")
      const newLocation = "/login"
      window.location.href = newLocation
    }
    else {

      alert(response.data.message)
    }

  } catch (error) {
    yield put(changePasswordThroughUrlSuccess(error))
  }
}
export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser),
  yield takeEvery(FORGET_PASSWORD_WITH_TOKEN, forgetUserWithToken)
  yield takeEvery(CHANGE_PASSWORD_THROUGH_LINK, changePasswordfirsttime)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga
