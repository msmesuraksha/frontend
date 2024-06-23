import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux"
import { Button, Card, CardBody, } from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";
import { Disputeddata } from "../../../common/data/disputedData";
import { approveRejectLatestTrans } from "store/LatestTransaction/latestTrans.action"
// import { approveRejectLatestTrans, esclateTransaction, requestForAdditionalDoc, getAlwlLogs } from "store/LatestTransaction/latestTrans.action"
import * as moment from "moment";

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
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import {
  CheckBox,
  SrNo,
  Debtor,
  Creditor,
  DueAmount,
  InvoiceNo,
  Status
} from "./disputedCol";
import ExcelDownloader from "../exportFile";
import TableContainer from "../../../components/Common/TableContainer";
import DisputedViewModal from "../DisputedBillings/DisputedViewModal";
import { fetchDisputedTransStart } from "store/DisputedTransactions/disputedTrans.action"
import { selectdisputedTransMap } from "store/DisputedTransactions/disputedTrans.action.selecter";
import Dashboard from "pages/Dashboard/LatestTranaction";
import { numberFormat } from "pages/Dashboard/sellerDocViewModule";
const DiputedBillings = props => {
  const [showReferModal, setShowReferModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showInProcessModal, setShowInProcessModal] = useState(false);
  const [selected, setselected] = useState();
  const [modal1, setModal1] = useState(false);
  const handleReferClick = () => { setShowReferModal(true) };
  const handleConfirmRefer = () => { setShowReferModal(false) };

  const toggleViewModal = () => setModal1(!modal1);
  const handleApproveClick = (item) => {
    setselected(item)
    setShowApproveModal(true)
  };
  const handleInProcessClick = () => { setShowInProcessModal(true) };
  const handleConfirmApprove = (status) => {

    const payload = {
      "status": status,
      "payments": [
        {
          "paymentId": selected.id,
        }

      ]

    }

    const numberFormat = (value) =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(value);

    dispatch(approveRejectLatestTrans(payload))
    setShowApproveModal(false)
  };
  const handleConfirmInProcess = () => { setShowInProcessModal(false) };

  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   filterable: false,
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <input type="checkbox" className="form-check-input" />;
      //   },
      // },

      {
        Header: "Buyer",
        accessor: "Debtor",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Debtor {...cellProps} />;
        },
      },
      {
        Header: "Seller",
        accessor: "Creditor",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Creditor {...cellProps} />;
        },
      },
      {
        Header: "Due Amount",
        accessor: "DueAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueAmount {...cellProps} />;
        },
      },
      {
        Header: "InvoiceNo",
        accessor: "InvoiceNo",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            // <InvoiceNo {...cellProps} />
            <div>

            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "Status",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Status {...cellProps} />;
        },
      },

      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">

              <div className="d-flex flex-column align-items-center me-3" onClick={handleApproveClick} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-check-circle font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve" />
              </div>
              <div className="d-flex flex-column align-items-center" onClick={handleInProcessClick} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-close-circle font-size-18 text-danger mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject" />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );


  const column = useMemo(
    () => [

      {
        Header: "Reference No.",
        accessor: "",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return (
            <div className="d-flex">

              {/* {console.log("cellProps.cell.row.original",cellProps.cell.row.original)} */}
              {cellProps.cell.row.original.defaulterEntry != undefined && cellProps.cell.row.original.defaulterEntry.debtor != undefined ? "BAF" + "-" + cellProps.cell.row.original.defaulterEntry.debtor._id.slice(-6).toUpperCase() : ''}
            </div>
          );
        },
      },
      {
        Header: "Buyer Name",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className="d-flex">
              {cellProps.cell.row.original.defaulterEntry != undefined && cellProps.cell.row.original.defaulterEntry.debtor != undefined ? cellProps.cell.row.original.defaulterEntry.debtor.companyName : ''}
            </div>
          );
        },
      },
      {
        Header: "Seller Name",
        accessor: "",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <div className="d-flex">
              {cellProps.cell.row.original.defaulterEntry != undefined && cellProps.cell.row.original.defaulterEntry.debtor != undefined ? cellProps.cell.row.original.defaulterEntry.creditorCompanyId.companyName : ""}
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
            <div className="d-flex">

              {cellProps.cell.row.original != undefined && cellProps.cell.row.original.defaulterEntry != undefined ? numberFormat(cellProps.cell.row.original.defaulterEntry.totalAmount) : ''}
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
          const a = moment(cellProps.cell.row.original.defaulterEntry != null && cellProps.cell.row.original.defaulterEntry != undefined ? cellProps.cell.row.original.defaulterEntry.createdAt : '');
          const b = moment()
          const c = moment(b).diff(a)
          const d = moment.duration(c)

          return (

            <div className="" style={{ padding: "5px 5px" }}>
              <div className=" text-center bg-success p-1 rounded text-light">
                <div className="text-capitalize">
                  {
                    d.days()

                  } Days </div>
                <div className="text-capitalize" >{moment(cellProps.cell.row.original.defaulterEntry == null ? '' : cellProps.cell.row.original.defaulterEntry.createdAt).format("DD-MM-YYYY")}</div>
              </div>
            </div>
          )
        }
      },

      {
        Header: "Payment Status",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className="d-flex">
              {/* {console.log("HARHSIT", cellProps.cell.row.original)} */}
              {cellProps.cell.row.original != undefined && cellProps.cell.row.original.defaulterEntry != undefined ? cellProps.cell.row.original.defaulterEntry.status : ''}

              {/* {cellProps.cell.row.original.defaulterEntry != undefined ? cellProps.cell.row.original.defaulterEntry.status : ""} */}
            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "Status",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className="d-flex">
              {cellProps.cell.row.original != undefined ? cellProps.cell.row.original.status : "'"}
            </div>
          );
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">

              <div className="d-flex flex-column align-items-center me-3" onClick={() => handleApproveClick(cellProps.cell.row.original)} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-check-circle font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve" />
              </div>
              <InvoiceNo {...cellProps} />

              {/* <div className="d-flex flex-column align-items-center" onClick={handleInProcessClick} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-close-circle font-size-18 text-danger mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Reject" />
              </div> */}
            </div>
          );
        },
      },

      // {
      //   Header: "View Details",
      //   disableFilters: true,
      //   accessor: "view",
      //   Cell: cellProps => {
      //     return (
      //       <Button
      //         type="button"
      //         color="primary"
      //         className="btn-sm btn-rounded"
      //         onClick={() => viewModel(cellProps)}
      //       >
      //         View Details
      //       </Button>
      //     )
      //   },
      // },


    ],
    []
  )
  const dispatch = useDispatch()
  const disputedTransactiondata = useSelector(selectdisputedTransMap)
  useEffect(() => {
    dispatch(fetchDisputedTransStart())
  }, [])
  const [isDisputedModal, setisDisputedModal] = useState(true);

  return (
    <React.Fragment>
      <DisputedViewModal isOpen={modal1} toggle={toggleViewModal} />
      <Card>
        <CardBody>
          <br />
          <br />
          <br />
          <div className="mb-4 h4 card-title"></div>
          <div className="mb-4 h4 card-title">Disputed Billing</div>
          {<ExcelDownloader />}
          <TableContainer
            columns={column}
            data={disputedTransactiondata}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={20}
          />



          {/* <Dashboard isDisputedModal={isDisputedModal}/> */}
        </CardBody>
      </Card>
      <Modal isOpen={showReferModal} toggle={() => setShowReferModal(false)}>
        <ModalHeader toggle={() => setShowReferModal(false)}>Confirm Refer to Senior</ModalHeader>
        <ModalBody>
          Are you sure you want to refer this project to a senior?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShowReferModal(false)}>Cancel</Button>
          <Button color="danger" onClick={handleConfirmRefer}>Refer</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={showApproveModal} toggle={() => setShowApproveModal(false)}>
        <ModalHeader toggle={() => setShowApproveModal(false)}>Confirm Approval</ModalHeader>
        <ModalBody>
          Are you sure you want to approve this disputed bill?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => handleConfirmApprove("APPROVE")}>Approve</Button>
          <Button color="danger" onClick={() => handleConfirmApprove("DECLINE")}>Reject</Button>

          <Button color="secondary" onClick={() => setShowApproveModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>









      <Modal isOpen={showInProcessModal} toggle={() => setShowInProcessModal(false)}>
        <ModalHeader toggle={() => setShowInProcessModal(false)}>Confirm In Process</ModalHeader>
        <ModalBody>
          Are you sure you want to mark this bill as decline ?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShowInProcessModal(false)}>Cancel</Button>
          <Button color="danger" onClick={handleConfirmInProcess}>Decline</Button>

        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

DiputedBillings.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(DiputedBillings);
