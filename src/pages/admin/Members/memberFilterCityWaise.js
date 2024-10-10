import React, { useEffect, useState, useMemo } from "react";
import { Button, Card, CardBody, Row, Col, Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../../components/Common/TableContainer";
import { fetchCompanyCityStart, IsCompanyCityOpen, IsCompanyStateCityOpen } from "store/CompanyDetails/CompanyDetails.action";
import { selectComapnyCity } from "store/CompanyDetails/CompanyDetails.selecter";

import Breadcrumbs from "../../../components/Common/Breadcrumb";


export const MemberFilteredCityData = ({ cityData, selectedState, setSelectedCity, setStateOpen }) => {
    const dispatch = useDispatch();
    const [companyStateData, setCompanyStateData] = useState([])
    const selectComapnyCityData = useSelector(selectComapnyCity)
    useEffect(() => {
        dispatch(fetchCompanyCityStart({ "state": selectedState }))
    }, []);

    useEffect(() => {
        if (selectComapnyCityData) {
            const companyStateList = cityData.map((values, index) => {
                for (let i = 0; i < selectComapnyCityData.length; i++) {
                    if (values.name == selectComapnyCityData[i].city) {
                        return { state: values.name, statecount: selectComapnyCityData[i].totalCompanies }
                    }
                }
                return { state: values.name, statecount: 0 }
            })
            setCompanyStateData(companyStateList)
        }
    }, [selectComapnyCityData])


    function checkSelectData(city) {
        setSelectedCity(city)
        dispatch(IsCompanyCityOpen(false))
        dispatch(IsCompanyStateCityOpen(true))
    }


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
                Header: "City Name",
                accessor: "state",
                disableFilters: true,
                filterable: false,
                /*   Cell: cellProps => {
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
                            {cellProps.cell.row.original.statecount == 0 ? <Button disabled className="btn btn-sm btn-info">view Details</Button> : <Button onClick={() => checkSelectData(cellProps.cell.row.original)} className="btn btn-sm btn-info">view Details</Button>}

                        </div>
                    );
                },
            },
        ],
        []
    );

    function backMainModule() {
        setStateOpen(false)
        dispatch(IsCompanyCityOpen(false))
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Breadcrumbs title={`${selectedState}: Member List`} breadcrumbItem={`${selectedState}: Member List`} />
                    <Button style={{ float: 'right' }} className="'btn bg-primary p-2 backtoDashButton" onClick={() => backMainModule()}>Back to State table</Button>
                    <TableContainer
                        columns={columnsState}
                        // data={memberdata!= undefined && memberdata != [] ? memberdata:[]}
                        data={companyStateData.reverse()}
                        isGlobalFilter={true}
                        isAddOptions={false}
                        customPageSize={20}
                    />

                    <table>
                        <tr>
                            <th></th>
                        </tr>
                    </table>
                </CardBody>
            </Card>
        </React.Fragment >
    );
};


