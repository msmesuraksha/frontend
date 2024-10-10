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
import { ApprovedTranctionData } from "../../../common/data/approvedTransactions";
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
import {
  CheckBox,
  OrderId,
  BillingName,
  DueSince,
  Total,
  PaymentStatus,
  PaymentMethod,
  Status
} from "./ApprovedTransactionCol";
import TableContainer from "../../../components/Common/TableContainer";
import ApprovedTranctionModel from "./ApprovedTranModel";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { fetchApprovedTransStart } from "store/ApprovedTransactions/approvedTrans.action"
import { selectApprovedTransMap } from "store/ApprovedTransactions/approvedTrans.selecter";
import * as moment from "moment";
import { StatusAndOpinionObj } from "pages/Dashboard/LatestTranaction";

const ApprovedTranction = props => {
  const [showReferModal, setShowReferModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedData, setselectedData] = useState([]);
  const [showInProcessModal, setShowInProcessModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const handleReferClick = () => { setShowReferModal(true) };
  const handleConfirmRefer = () => { setShowReferModal(false) };

  const toggleViewModal = () => setModal1(!modal1);
  const handleApproveClick = () => { setShowApproveModal(true) };
  const handleInProcessClick = () => { setShowInProcessModal(true) };
  const handleConfirmApprove = () => { setShowApproveModal(false) };
  const handleConfirmInProcess = () => { setShowInProcessModal(false) };
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

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
        Cell: cellProps => {
          return (
            <div className="d-flex  text-capitalize">
              {cellProps.cell.row.original.latestTanss.defaulterEntry != undefined && cellProps.cell.row.original.latestTanss.defaulterEntry.creditor != undefined ? cellProps.cell.row.original.latestTanss.defaulterEntry.creditor.companyName : ""}
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
            <div className="d-flex text-capitalize">
              {cellProps.cell.row.original.latestTanss.defaulterEntry != undefined && cellProps.cell.row.original.latestTanss.defaulterEntry.debtor != undefined ? cellProps.cell.row.original.latestTanss.defaulterEntry.debtor.companyName : ''}
            </div>
          );
        },
      },

      {
        Header: "PAID Amount",
        accessor: "total",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className=" text-end">

              {cellProps.cell.row.original != undefined && cellProps.cell.row.original.latestTanss.defaulterEntry != undefined ? numberFormat(cellProps.cell.row.original.latestTanss.totalAmountPaid) : ''}
            </div>
          );
        },
      },
      {
        Header: "balance Amount",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return (
            <div className=" text-end">

              {cellProps.cell.row.original != undefined && cellProps.cell.row.original.latestTanss.defaulterEntry != undefined ? numberFormat(cellProps.cell.row.original.latestTanss.defaulterEntry.totalAmount) : ''}
            </div>
          );
        },
      },
      {
        Header: "Due Since*",
        accessor: "orderdate",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "20px" }}> <DueSinceApprove {...cellProps} /></div>
        }
      },

      {
        Header: "STATUS / OPINION",
        accessor: "paymentStatus",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {


          let currentStatus = ''

          for (const key in StatusAndOpinionObj) {
            const currentUrlArr = cellProps.cell.row.original?.latestTanss?.defaulterEntry?.latestStatus;
            if (currentUrlArr == undefined) break
            if (key === currentUrlArr) {
              currentStatus = StatusAndOpinionObj[key];
              break;
            }
          }
          return (
            <div className="d-flex">
              <strong style={{ color: cellProps.cell.row.original != undefined && cellProps.cell.row.original.latestTanss.pHArray != undefined ? cellProps.cell.row.original.latestTanss.defaulterEntry?.latestStatus == "COMPLAINT_APPROVED" ? "#5cd65c" : "" : "" }}>
                {currentStatus}
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
              {cellProps.cell.row.original?.latestTanss.defaulterEntry && (
                <strong style={{ color: cellProps.cell.row.original.latestTanss.defaulterEntry.status === "PAID" ? "#5cd65c" : "#ff1a1a" }}>
                  {cellProps.cell.row.original.latestTanss.defaulterEntry.status}
                </strong>
              )}
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
                setselectedData(cellProps.cell.row.original.latestTanss)
                // toggleViewModal(!model1)
                setModal1(true)

              }}
            >
              View Details
            </Button>
          );
        },
      },

      // {
      //   Header: "Action",
      //   disableFilters: true,
      //   accessor: "project",
      //   Cell: cellProps => {
      //     return (
      //       <div className="d-flex">
      //       {/* <div className="d-flex flex-column align-items-center me-3" onClick={toggleViewModal} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-eye font-size-18 text-primary mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="View" />
      //       </div> */}
      //       <div className="d-flex flex-column align-items-center me-3" onClick={handleApproveClick} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-check-circle font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve" />
      //       </div>
      //       <div className="d-flex flex-column align-items-center" onClick={handleInProcessClick} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-close-circle font-size-18 text-danger mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Decline" />
      //       </div>
      //     </div>

      //     );
      //   },
      // },
    ],
    []
  );
  const dispatch = useDispatch()
  const approvedTransactiondata = useSelector(selectApprovedTransMap)
  useEffect(() => {
    dispatch(fetchApprovedTransStart())
  }, [])

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

    const valueFordate = cell.row.original.latestTanss.defaulterEntry != null && cell.row.original.latestTanss.defaulterEntry != undefined ? cell.row.original.latestTanss.defaulterEntry.dueFrom : ''
    /*  const [startDate, setStartDate] = useState(new Date('1965-04-05')); */
    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date(); // Current date
    // const currentDate = moment(today).format('YYYY-MM-DD')
    const daysSince = daysSinceRefe(valueFordate, today);


    /*     const formattedDate = new Date(cell.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }); */

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
      padding: '3px' // Adjust the padding value as needed
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
          <div className="text-capitalize" >{cell.row.original.latestTanss.defaulterEntry == null ? '' : cell.row.original.latestTanss.defaulterEntry.dueFrom}</div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Approved Transactions" breadcrumbItem="Approved Transactions" />
          <ApprovedTranctionModel isOpen={modal1} toggle={toggleViewModal} selected={selectedData} />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns}
                data={approvedTransactiondata}
                isGlobalFilter={true}
                isAddOptions={false}
                customPageSize={20}
              />
              <p className="">Due Since : The number of due days is calculated from date of oldest invoice.
              </p>
            </CardBody>
          </Card>
        </Container>
      </div>


    </React.Fragment>
  );
};

ApprovedTranction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(ApprovedTranction);
