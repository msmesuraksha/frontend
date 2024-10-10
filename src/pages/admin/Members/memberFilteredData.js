import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { Button, Card, CardBody, Row, Col, Container } from "reactstrap";
import { getMemberData as ongetMemberData } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import TableContainer from "../../../components/Common/TableContainer";
import { City, Country, State } from "country-state-city";
import index from "pages/Dashboard-Blog";

import { fetchCompanyStateStart, fetchCompanyCityStart, IsCompanyCityOpen, IsCompanyStateCityOpen } from "store/CompanyDetails/CompanyDetails.action";
import { selectComapnyStateMap, selectComapnyCityOpen, selectComapnyStateCityOpen } from "store/CompanyDetails/CompanyDetails.selecter";


import { MemberFilteredCityData } from "./memberFilterCityWaise";
import { MemberStateCityData } from "./stateandcityModule";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import DatamapsIndia from 'react-datamaps-india'
import Select from 'react-select';
import { use } from "i18next";
import { flatMap } from "lodash";

const MemberFilteredData = props => {

  const dispatch = useDispatch();
  const [cityData, setCityData] = useState();
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(countryData[100]);
  const [selectedState, setSelectedState] = useState("");
  const [stateData, setStateData] = useState();
  const [selectedCity, setSelectedCity] = useState("")
  const [salutationState, setsalutationState] = useState([])

  const [salutationCity, setSalutationCity] = useState([])

  const [companyStateData, setCompanyStateData] = useState([])

  const selectComapnyState = useSelector(selectComapnyStateMap)
  const isCityOpen = useSelector(selectComapnyCityOpen)
  const isStateCityOpen = useSelector(selectComapnyStateCityOpen)

  const [stateOpen, setStateOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [allViewOpen, setallViewOpen] = useState(false)

  function checktable(state) {
    setSelectedState(state)
    setStateOpen(true)
    dispatch(IsCompanyCityOpen(true))
  }

  useEffect(() => {
    dispatch(IsCompanyCityOpen(false))
  }, [])

  useEffect(() => {
    dispatch(IsCompanyStateCityOpen(false))
  }, [])

  useEffect(() => {
    if (stateData && selectComapnyState) {
      const companyStateList = stateData.map((values, index) => {
        for (let i = 0; i < selectComapnyState.length; i++) {
          if (values.name == selectComapnyState[i].state) {
            return { state: values.name, statecount: selectComapnyState[i].totalCompanies }
          }
        }
        return { state: values.name, statecount: 0 }
      })
      setCompanyStateData(companyStateList)
    }

  }, [selectComapnyState])

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF'
    })
  }

  useEffect(() => {
    if (stateData) {
      const selectState = stateData.filter((state) => state.name == selectedState)
      setCityData(City.getCitiesOfState(country?.isoCode, selectState[0]?.isoCode));
    }

  }, [selectedState]);


  useEffect(() => {
    if (stateData) {
      const stateDatalist = stateData.map((value, index) => {
        return { label: value.name, value: value.name }
      })
      setsalutationState(stateDatalist)
    }
  }, [stateData]);


  useEffect(() => {
    if (cityData) {
      const stateDatalist = cityData.map((value, index) => {
        return { label: value.name, value: value.name }
      })
      setSalutationCity(stateDatalist)
    }
  }, [cityData]);


  useEffect(() => {
    dispatch(ongetMemberData());
    dispatch(fetchCompanyStateStart())

  }, []);



  const columnsState = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <div
            className="company-name-cell"
          >
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;
        },
      },
      {
        Header: "State Name",
        accessor: "state",
        filterable: false,
        disableFilters: true,
        /*  Cell: cellProps => {
           return <span>{cellProps.cell.row.original.state}</span>;
         }, */
      },
      {
        Header: "Reported member",
        accessor: "lael",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <span>{cellProps.cell.row.original.statecount}</span>;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">
              {cellProps.cell.row.original.statecount == 0 ? <Button disabled className="btn btn-sm btn-info">view Details</Button> : <Button onClick={() => checktable(cellProps.cell.row.original.state)} className="btn btn-sm btn-info">view Details</Button>}

            </div>
          );
        },
      },
    ],
    []
  );



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Statewise Member Count" breadcrumbItem="Statewise Member Count" />
          {!stateOpen && <Card>
            <CardBody>
              <TableContainer
                columns={columnsState}
                // data={memberdata!= undefined && memberdata != [] ? memberdata:[]}
                data={companyStateData.reverse()}
                isGlobalFilter={true}
                isAddOptions={false}
                customPageSize={40}
              />
              <table>
                <tr>
                  <th></th>
                </tr>
              </table>
            </CardBody>
          </Card>

          }

          {cityData && isCityOpen && <MemberFilteredCityData cityData={cityData} selectedState={selectedState} setSelectedCity={setSelectedCity} setStateOpen={setStateOpen} />}

          {isStateCityOpen && <MemberStateCityData selectedState={selectedState} selectedCity={selectedCity} />}
        </Container>
      </div>



    </React.Fragment>
  );
};

MemberFilteredData.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(MemberFilteredData);
