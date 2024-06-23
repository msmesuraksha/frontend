import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_WITH_TOKEN,
  CHANGE_PASSWORD_THROUGH_LINK,
  CHANGE_PASSWORD_THROUGH_LINK_FAIL,
  CHANGE_PASSWORD_THROUGH_LINK_SUCCESS
} from "./actionTypes"

export const userForgetPassword = (user, history) => {
        
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
  }
}
export const userForgetPasswordWithToken = (user, history) => {
        
  return {
    type: FORGET_PASSWORD_WITH_TOKEN,
    payload: { user, history },
  }
}
export const userForgetPasswordSuccess = message => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  }
}

export const userForgetPasswordError = message => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  }
}


export const changePasswordThroughUrl = (user, history) => {
        
  return {
    type: CHANGE_PASSWORD_THROUGH_LINK,
    payload: { user, history },
  }
}
export const changePasswordThroughUrlFail = (user, history) => {
        
  return {
    type: CHANGE_PASSWORD_THROUGH_LINK_FAIL,
    payload: { user, history },
  }
}
export const changePasswordThroughUrlSuccess = message => {
  return {
    type: CHANGE_PASSWORD_THROUGH_LINK_SUCCESS,
    payload: message,
  }
}

