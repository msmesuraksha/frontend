import {
  ADMIN_API_SUCCESS, ADMIN_API_FAIL, GET_ADMIN_DATA,
  SIGNUP_ADMIN_API_FAIL, SIGNUP_ADMIN_API_SUCCESS, SIGNUP_ADMIN_DATA,
  CHANGE_PASSWORD_WITH_OLD_PASSWORD,
  CHANGE_PASSWORD_WITH_OLD_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_WITH_OLD_PASSWORD_FAIL
} from "./actionsTypes";

const INIT_STATE = {
  adminData: null,
  loading: false,
  registrationError: false,
  changepasswordError: false,

  user: null,
  data: null
};


const AdminList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ADMIN_DATA:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_API_FAIL:
      return {
        ...state,
        loading: false,
        adminData: null,
      };
    case ADMIN_API_SUCCESS:
      return {
        ...state,
        loading: false,
        adminData: action.payload,
      };
    case SIGNUP_ADMIN_DATA:
      return {
        ...state,
        loading: true,
        registrationError: null,
      };
    case SIGNUP_ADMIN_API_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
      };
    case SIGNUP_ADMIN_API_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      };
    case CHANGE_PASSWORD_WITH_OLD_PASSWORD:
      // 
      return {
        ...state,
        loading: true,
        changepasswordError: null,
      };
    case CHANGE_PASSWORD_WITH_OLD_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        changepasswordError: null,
      };
    case CHANGE_PASSWORD_WITH_OLD_PASSWORD_FAIL:
      return {
        ...state,
        data: null,
        loading: false,
        changepasswordError: action.payload,
      };
    default:
      return state;
  }
};



export default AdminList;
