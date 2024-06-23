import { MEMBER_API_SUCCESS, MEMBER_API_FAIL, GET_MEMBER_DATA, GET_ALL_COMPANY_LIST, GET_ALL_COMPANY_LIST_FAIL, GET_ALL_COMPANY_LIST_SUCCESS } from "./actionsTypes";

const INIT_STATE = {
  memberData: null,
  getAllCompanies: [],
  loading: false,
  user: null
};


const MemberList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MEMBER_DATA:
      return {
        ...state,
        loading: false,
        memberData: action.payload,


      };

    case MEMBER_API_FAIL:
      return {
        ...state,
        loading: false,
        memberData: null,
      };

    case MEMBER_API_SUCCESS:

      return {
        ...state,
        loading: true,
        memberData: action.payload.data,
      };


    case GET_ALL_COMPANY_LIST:


      return { ...state, loading: false, getAllCompanies: action.payload }
    case GET_ALL_COMPANY_LIST_FAIL:


      return { ...state, loading: false }
    case GET_ALL_COMPANY_LIST_SUCCESS:


      return { ...state, loading: true, getAllCompanies: action.payload }

    default:
      return state;
  }
};



export default MemberList;
