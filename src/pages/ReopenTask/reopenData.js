import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import withRouter from "components/Common/withRouter"

import {
    Button,
    Card,
    CardBody,
    Container,
} from "reactstrap"
import InvoiceModal from "pages/Dashboard/InvoicePopupModal"

import * as moment from "moment";
import { useSelector, useDispatch } from "react-redux"

import Breadcrumbs from "../../components/Common/Breadcrumb";

import TableContainer from "../../components/Common/TableContainer"
import { Link, useNavigate } from 'react-router-dom';

import { selectReopneData, selectReopenLoading } from "store/reopenDataTransaction/reopenDataTransaction.selecter"

import { fetchReopenTransStart } from "store/reopenDataTransaction/reopenDataTransaction.action"

import { Spinner } from "pages/admin/spinner/spinner"

export const ReopnTask = props => {
    const [modal1, setModal1] = useState(false)
    const [selected, setSelected] = useState('')
    const dispatch = useDispatch()

    const selectLoading = useSelector(selectReopenLoading)

    useEffect(() => {
        dispatch(fetchReopenTransStart({
            "status": ['RE_OPENED'],
            "roleBasedFilter": true
        }))
    }, [])

    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);

    const toggleViewModal = () => setModal1(!modal1)




    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedLevel, setSelectedLevel] = useState("")
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }
    // const history = useHistory();
    const navigate = useNavigate();
    const viewModel = (value) => {

        // setModal1(true)
        // history.push({
        //   pathname: '/LatestTranaction-View-Details',
        //   state: { selected: value.cell.row.original }
        // });
        navigate('/LatestTranaction-View-Details', { state: { selected: value } });
        setSelected(value)
    }
    const isReferDisabled = selectedLevel === ""
    var CurrentDate = moment().format('DD-MM-YYYY');
    CurrentDate = moment([CurrentDate])

    const columns = useMemo(
        () => [
            {
                Header: "Sr No",
                accessor: "",
                filterable: false,
                disableFilters: true,
                Cell: cellProps => {
                    return <div
                        className="company-name-cell "
                    >
                        {cellProps.data.length - cellProps.cell.row.index}
                    </div>;
                },
            },
            {
                Header: "complaint no.",
                accessor: "complaintNumber",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div>
                        {/* {console.log("cellProps.cell.row.original.debtor.companyName",cellProps.cell.row.original.debtor.companyName )} */}
                        {cellProps.cell?.row?.original?.complaintNumber}
                    </div>


                },
            },
            {
                Header: "Seller Name",
                accessor: "sellerName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className="d-flex">
                            {cellProps.cell?.row?.original?.sellerName}
                        </div>
                    );
                },
            },
            {
                Header: "Buyer Name",
                accessor: "buyerName",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className="d-flex">
                            {cellProps.cell?.row?.original?.buyerName}
                        </div>
                    );
                },
            },

            {
                Header: "Amount",
                accessor: "",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className='text-end'>

                            {cellProps.cell.row.original?.reopenTans?.defaulterEntry != undefined ? numberFormat(cellProps.cell.row.original?.reopenTans?.defaulterEntry?.totalAmount) : ''}
                        </div>
                    );
                },
            },
            {
                Header: "Due Since*",
                accessor: "",

                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return <div style={{ width: "20px" }}> <DueSinceApprove {...cellProps} /></div>
                }
            },

            {
                Header: "STATUS / OPINION",
                accessor: "",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {

                    return (
                        <div className="d-flex">

                            <strong className="" style={{ color: "#ff471a" }}>{cellProps.cell.row.original?.reopenTans != undefined && cellProps.cell.row.original?.reopenTans?.pHArray != undefined ? cellProps.cell.row.original.reopenTans?.defaulterEntry?.latestStatus == "RE_OPENED" ? "RE-OPENED" : "" : ''}
                            </strong>
                        </div>
                    );
                },
            },
            {
                Header: "Payment Status",
                accessor: "Status",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className="d-flex">
                            <strong className="" style={{ color: cellProps.cell.row.original.reopenTans != undefined ? cellProps.cell.row.original.reopenTans.defaulterEntry.status == "PENDING" ? " #ff471a" : "#5cd65c" : "" }}> {cellProps.cell.row.original.reopenTans != undefined ? cellProps.cell.row.original.reopenTans.defaulterEntry.status : ""}</strong>
                        </div>
                    );
                },
            },

            {
                Header: "View Details",
                disableFilters: true,
                accessor: "view",
                Cell: cellProps => {
                    return (
                        <Button
                            type="button"
                            color="primary"
                            className="btn-sm btn-rounded"
                            onClick={() => viewModel(cellProps.cell.row.original.reopenTans)}
                        >
                            View Details
                        </Button>
                    )
                },
            },
        ],
        []
    )


    const latestTransactiondata = useSelector(selectReopneData)
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(latestTransactiondata)
    }, [latestTransactiondata])

    const daysSinceRefe = (cellValue, referenceDate) => {

        if (cellValue != undefined) {
            // Split the date string into day, month, and year components
            const [dayStr, monthStr, yearStr] = cellValue.split('-');

            // Convert the string components into integers
            const day = parseInt(dayStr, 10);
            const month = parseInt(monthStr, 10) - 1; // Months are zero-based (0 = January, 1 = February, ...)
            const year = parseInt(yearStr, 10);

            // Create a new Date object using the parsed components
            const currentDate = new Date(year, month, day);
            const timeDifference = referenceDate - currentDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return daysDifference;
        }
        return '';
    };

    const DueSinceApprove = (cell) => {

        const valueFordate = cell.row.original.reopenTans.defaulterEntry != null && cell.row.original.reopenTans.defaulterEntry != undefined ? cell.row.original.reopenTans.defaulterEntry.dueFrom : ''
        const today = new Date();
        const daysSince = daysSinceRefe(valueFordate, today);

        const newDate = valueFordate != undefined ? valueFordate.split("-").reverse().join("-") : "";
        const currentDate = new Date(newDate);
        let e = ""

        const calculateDateDifference = () => {
            const differenceInMilliseconds = today - currentDate;
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            e = differenceInDays
            return differenceInDays;

        };
        const divStyle = {
            padding: '3px'
        };

        return (
            <div className="" style={{ padding: "2px 2px", fontSize: "12px", width: "90px", margin: "0px" }}>
                <div className=" text-center  p-1 rounded " style={{
                    background: calculateDateDifference() < 30 ? "#FDFDFD" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#ffff80" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #ff944d" : " #ff4d4d",
                    color: calculateDateDifference() < 30 ? "#000" : calculateDateDifference() >= 30 && calculateDateDifference() < 90 ? "#000" : calculateDateDifference() > 90 && calculateDateDifference() < 180 ? " #FAFAFA" : " #FAFAFA"
                }}>
                    <div className="text-capitalize">
                        {calculateDateDifference()}  &nbsp;
                        <span className="ml-1">Days</span> </div>
                    <div className="text-capitalize" >{cell.row.original.reopenTans.defaulterEntry == null ? '' : cell.row.original.reopenTans.defaulterEntry.dueFrom}</div>
                </div>
            </div>
        );
    };



    return (
        <React.Fragment>
            <InvoiceModal isOpen={modal1} toggle={toggleViewModal} selected={selected} />
            {/* <ConfirmModal isOpen={isModalOpen} toggle={toggleModal} /> */}
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Reopen Request's" breadcrumbItem="Reopen Request's" />
                    <Card>
                        <CardBody>
                            {selectLoading == false ? <Spinner /> : <TableContainer
                                columns={columns}
                                data={filteredData}
                                isGlobalFilter={true}
                                isAddOptions={false}
                                customPageSize={20}
                            />}
                            <p className="">Due Since : The number of due days is calculated from date of oldest invoice.
                            </p>

                        </CardBody>
                    </Card>
                </Container>
            </div>

        </React.Fragment>
    )
}


