import {
  FETCH_ALL_DOCUMENT_NEED_START,
  FETCH_ALL_DOCUMENT_NEED_SUCCESS,
  FETCH_ALL_DOCUMENT_NEED_FAILED,
  FETCH_ALL_OTHER_STATUS_START,
  FETCH_ALL_OTHER_STATUS_SUCCESS,
  FETCH_ALL_OTHER_STATUS_FAILED,
} from "./allDocumentNeedTrans.type"

export const ALL_DOCUMENT_NEED_INITIAL_STATE = {
  allDocumentNeed: [],
  allOtherStatus: [],
  loading: false,
  error: null,
}

export const AllDocumentNeedReducer = (
  state = ALL_DOCUMENT_NEED_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_DOCUMENT_NEED_START:
      return { ...state, loading: false }
    case FETCH_ALL_DOCUMENT_NEED_SUCCESS:
      return { ...state, loading: true, allDocumentNeed: payload }
    case FETCH_ALL_DOCUMENT_NEED_FAILED:
      return { ...state, loading: false, error: payload }
    case FETCH_ALL_OTHER_STATUS_START:
      return { ...state, loading: false }
    case FETCH_ALL_OTHER_STATUS_SUCCESS:
      return { ...state, loading: true, allOtherStatus: payload }
    case FETCH_ALL_OTHER_STATUS_FAILED:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
