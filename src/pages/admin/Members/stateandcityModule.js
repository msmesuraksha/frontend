import React, { useEffect, useState, useMemo } from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../../components/Common/TableContainer";
import { fetchCompanyStateCityStart, IsCompanyCityOpen, IsCompanyStateCityOpen } from "store/CompanyDetails/CompanyDetails.action";
import { selectComapnyStateCity } from "store/CompanyDetails/CompanyDetails.selecter";

import Breadcrumbs from "../../../components/Common/Breadcrumb";


export const MemberStateCityData = ({ selectedState, selectedCity }) => {
    const dispatch = useDispatch();

    const [companyStateData, setCompanyStateData] = useState([])
    const selectComapnyStateCityData = useSelector(selectComapnyStateCity)


    useEffect(() => {
        dispatch(fetchCompanyStateCityStart({
            "state": selectedState,
            "city": selectedCity.state
        }))
    }, [selectedCity]);


    const columns = useMemo(
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
                Header: "Customer Name",
                accessor: "CustomerName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <span>{cellProps.cell.row.original.user?.[0]?.name}</span>;
                },
            },
            {
                Header: "Company Name",
                accessor: "companyName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <span>{cellProps.cell.row.original.companyName}</span>;
                },
            },
            {
                Header: "Address",
                accessor: "address1",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <span>
                        {cellProps.cell.row.original.city},
                        <br />
                        {cellProps.cell.row.original.state}
                    </span>;
                },
            },
            {
                Header: "Email Address",
                accessor: "emailId",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <span>{cellProps.cell.row.original.emailId}</span>;
                },
            },
            {
                Header: "Phone No.",
                accessor: "phoneNumber",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <span>{cellProps.cell.row.original.phoneNumber}</span>;
                },
            },
            {
                Header: "GST No.",
                accessor: "gstin",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <span>{cellProps.cell.row.original.gstin}</span>;
                },
            },
        ],
        []
    );

    function backMainModule() {
        dispatch(IsCompanyCityOpen(true))
        dispatch(IsCompanyStateCityOpen(false))
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Breadcrumbs title={`${selectedState} - ${selectedCity.state} : Member List`} breadcrumbItem={`${selectedState} - ${selectedCity.state} : Member List`} />
                    <Button style={{ float: 'right' }} className="'btn bg-primary p-2 backtoDashButton" onClick={() => backMainModule()}>Back to City table</Button>
                    {selectComapnyStateCityData && <TableContainer
                        columns={columns}
                        // data={memberdata!= undefined && memberdata != [] ? memberdata:[]}
                        data={selectComapnyStateCityData.reverse()}
                        isGlobalFilter={true}
                        isAddOptions={false}
                        customPageSize={20}
                    />}

                    <table>
                        <tr>
                            <th></th>
                        </tr>
                    </table>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};


