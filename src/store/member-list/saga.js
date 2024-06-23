import { call, put, takeEvery, all, fork, takeLatest } from "redux-saga/effects";
import { GET_MEMBER_DATA, GET_ALL_COMPANY_LIST } from "./actionsTypes";
import { MemberApiSuccess, MemberApiFail, getcompanyListSuccess, getcompanyListFail } from "./actions";
import { getAllMemberData, getAllCompanyListAPi } from "../../helpers/fakebackend_helper";
function* getAllMemberData2() {
    try {
        var response = yield call(getAllMemberData);
        yield put(MemberApiSuccess(GET_MEMBER_DATA, response.data.response));
    } catch (error) {
        yield put(MemberApiFail(GET_MEMBER_DATA, error));
    }
}

function* getAllCompanyListSaga() {
    try {
        var response = yield call(getAllCompanyListAPi);
        yield put(getcompanyListSuccess(response.data.response));
    } catch (error) {
        yield put(getcompanyListFail(error));
    }
}

export function* watchGetMemberData() {
    yield takeEvery(GET_MEMBER_DATA, getAllMemberData2);
    yield takeEvery(GET_ALL_COMPANY_LIST, getAllCompanyListSaga);
}

function* MemberListSaga() {
    yield all([fork(watchGetMemberData)]);
}

export default MemberListSaga;