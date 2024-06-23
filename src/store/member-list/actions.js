import {MEMBER_API_SUCCESS,MEMBER_API_FAIL,GET_MEMBER_DATA,GET_ALL_COMPANY_LIST_SUCCESS,GET_ALL_COMPANY_LIST,GET_ALL_COMPANY_LIST_FAIL
} from "./actionsTypes";
import { createAction } from "reducer/reducer.utils"

//Get Member list  API
export const MemberApiSuccess = (actionType, data) => ({
    type: MEMBER_API_SUCCESS,
    payload: { actionType, data },
});

export const getMemberData = () => ({
    type: GET_MEMBER_DATA
});

export const MemberApiFail = (actionType, error) => ({
    type: MEMBER_API_FAIL,
    payload: { actionType, error },
});



// charts data

export const getcompanyList = (data) =>
createAction(GET_ALL_COMPANY_LIST,data)

export const getcompanyListSuccess = latestTransArray => {
return createAction(GET_ALL_COMPANY_LIST_SUCCESS, latestTransArray)
}

export const getcompanyListFail = error =>
createAction(GET_ALL_COMPANY_LIST_FAIL, error)

  
 

