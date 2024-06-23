import {
  FETCH_COMPANY_STATE_START,
  FETCH_COMPANY_STATE_SUCCESS,
  FETCH_COMPANY_STATE_FAILED,
  FETCH_COMPANY_CITY_START,
  FETCH_COMPANY_CITY_SUCCESS,
  FETCH_COMPANY_CITY_FAILED,
  FETCH_COMPANY_STATE_CITY_START,
  FETCH_COMPANY_STATE_CITY_SUCCESS,
  FETCH_COMPANY_STATE_CITY_FAILED,
  IS_COMPANY_CITY_OPEN,
  IS_COMPANY_STATE_CITY_OPEN
} from "./CompanyDetails.type"
import { createAction } from "reducer/reducer.utils"

//State

export const fetchCompanyStateStart = () => createAction(FETCH_COMPANY_STATE_START)

export const fetchCompanyStateSuccess = CompanyStateArray => createAction(FETCH_COMPANY_STATE_SUCCESS, CompanyStateArray)

export const fetchCompanyStateFailure = error => createAction(FETCH_COMPANY_STATE_FAILED, error)

//City

export const fetchCompanyCityStart = (data) => createAction(FETCH_COMPANY_CITY_START, data)

export const fetchCompanyCitySuccess = CompanyCityArray => createAction(FETCH_COMPANY_CITY_SUCCESS, CompanyCityArray)

export const fetchCompanyCityFailure = error => createAction(FETCH_COMPANY_CITY_FAILED, error)

export const IsCompanyCityOpen = (boolean) => createAction(IS_COMPANY_CITY_OPEN, boolean)

//State and City

export const fetchCompanyStateCityStart = (data) => createAction(FETCH_COMPANY_STATE_CITY_START, data)

export const fetchCompanyStateCitySuccess = CompanyStateCityArray => createAction(FETCH_COMPANY_STATE_CITY_SUCCESS, CompanyStateCityArray)

export const fetchCompanyStateCityFailure = error => createAction(FETCH_COMPANY_STATE_CITY_FAILED, error)

export const IsCompanyStateCityOpen = (boolean) => {
  return createAction(IS_COMPANY_STATE_CITY_OPEN, boolean)
} 
