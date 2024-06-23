import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux"
import {
    Button,
    Card,
    CardBody,
} from "reactstrap";
import { ApprovedTranctionData } from "common/data/approvedTransactions";
import {
    Badge,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Input,
    FormFeedback,
    Label,
} from "reactstrap";

/* import {
    CheckBox,
    OrderId,
    BillingName,
    DueSince,
    Total,
    PaymentStatus,
    PaymentMethod,
    Status
} from "./ApprovedTransactionCol"; */

import TableContainer from "components/Common/TableContainer";
import ApprovedTranctionModel from "pages/admin/ApprovedTransaction/ApprovedTranModel";
import { toast, ToastContainer } from "react-toastify";

import * as moment from "moment";

import RequestForDeactivateModule from "./requestDeactivateModue";
import { fetchRequestDeactivateStart } from "store/requestDeactiveData/requestDeactiveData.action";
import { selectRequestDeactivateDate } from "store/requestDeactiveData/requestDeactiveData.selecter";

export const RequestDeactivateModule = props => {
    const [selectedData, setselectedData] = useState([]);
    const [modal1, setModal1] = useState(false);


    const toggleViewModal = () => setModal1(!modal1);



    const columns = useMemo(
        () => [
            /*       {
                    Header: "#",
                    filterable: false,
                    disableFilters: true,
                    Cell: cellProps => {
                      return <input type="checkbox" className="form-check-input" />;
                    },
                  }, */
            {
                Header: "Sr No",
                accessor: "SrNo",
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
                Header: "member Name",
                accessor: "name",
                disableFilters: true,
                Cell: cellProps => {
                    return (
                        <div className="d-flex  text-capitalize">
                            {cellProps.cell.row.original.name != undefined ? cellProps.cell.row.original.name : ""}
                        </div>
                    );
                },
            },
            {
                Header: "Email Address",
                accessor: "emailId",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className="d-flex text-capitalize">
                            {cellProps.cell.row.original.emailId != undefined ? cellProps.cell.row.original.emailId : ""}
                        </div>
                    );
                },
            },
            {
                Header: "PHONE NO.",
                accessor: "phoneNumber",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className="d-flex text-capitalize">
                            {cellProps.cell.row.original.phoneNumber != undefined ? cellProps.cell.row.original.phoneNumber : ""}
                        </div>
                    );
                },
            },

            {
                Header: "City",
                accessor: "city",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className="d-flex text-capitalize">

                            {cellProps.cell.row.original.city != undefined ? cellProps.cell.row.original.city : ""}
                        </div>
                    );
                },
            },
            {
                Header: "state",
                accessor: "state",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                    return (
                        <div className="d-flex text-capitalize">

                            {cellProps.cell.row.original.state != undefined ? cellProps.cell.row.original.state : ""}
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
                            onClick={() => {
                                setselectedData(cellProps.cell.row.original)
                                // toggleViewModal(!model1)
                                setModal1(true)

                            }}
                        >
                            View Details
                        </Button>
                    );
                },
            },
        ],
        []
    );
    const dispatch = useDispatch()
    const requestDeactivateData = useSelector(selectRequestDeactivateDate)
    useEffect(() => {
        dispatch(fetchRequestDeactivateStart())
    }, [])


    return (
        <React.Fragment>
            <div className="overflow-hidden mt-lg-4">..</div>
            {modal1 && <RequestForDeactivateModule isOpen={modal1} toggle={toggleViewModal} selected={selectedData} />}
            <Card>
                <div className="overflow-hidden mt-lg-2">..</div>
                {/* <h4 className="mb-sm-0 font-size-18 mr-4">Approved Transactions</h4> */}
                <CardBody>
                    <div className="mb-4 h4 card-title">Request For Deactivation</div>
                    <TableContainer
                        columns={columns}
                        data={requestDeactivateData}
                        isGlobalFilter={true}
                        isAddOptions={false}
                        customPageSize={20}
                    />
                </CardBody>
            </Card>
            <ToastContainer />
        </React.Fragment>
    );
};


