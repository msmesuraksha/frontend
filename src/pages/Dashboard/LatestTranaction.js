import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import withRouter from "components/Common/withRouter"

import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import InvoiceModal from "./InvoicePopupModal"
import ConfirmModal from "./ConfirmRefertoSeio"
import { latestTransaction } from "../../common/data/dashboard"
import * as moment from "moment";
import { useSelector, useDispatch } from "react-redux"
import { fetchLatestTransStart } from "store/LatestTransaction/latestTrans.action"
import { fetchDashboardAdminDataStart } from "store/DashboardAdminData/dashboardAdminData.action"


import TableContainer from "../../components/Common/TableContainer"
import { Link, useNavigate } from 'react-router-dom';
import { selectLatestTansMap, selectIsLoading } from "store/LatestTransaction/latestTans.selecter"

import { CompanySerchForm } from "./companySearchComponet"
import { CapitalizeWords } from "."

import { ExportFileComponent } from "pages/exportFile/exportFileComponent"

import { Spinner } from "pages/admin/spinner/spinner"

const LatestTranaction = props => {

  const [showReferModal, setShowReferModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showInProcessModal, setShowInProcessModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [selected, setSelected] = useState('')

  const selectLoading = useSelector(selectIsLoading)
  const handleReferClick = () => {
    setShowReferModal(true)
  }
  const handleConfirmRefer = () => {
    if (selectedLevel) {
      // Handle refer logic here

      setSelectedLevel("") // Reset the selected level
      setShowReferModal(false)
    }
  }
  const handleCancelRefer = () => {
    setSelectedLevel("") // Reset the selected level
    setShowReferModal(false)

  }
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

  const toggleViewModal = () => setModal1(!modal1)
  const handleApproveClick = () => {
    setShowApproveModal(true)
  }
  const handleInProcessClick = () => {
    setShowInProcessModal(true)
  }
  const handleConfirmApprove = () => {
    setShowApproveModal(false)
  }
  const handleConfirmInProcess = () => {
    setShowInProcessModal(false)
  }
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
    navigate('/LatestTranaction-View-Details', { state: { selected: value.cell.row.original.latestTanss } });
    setSelected(value.cell.row.original)
  }
  const isReferDisabled = selectedLevel === ""
  var CurrentDate = moment().format('DD-MM-YYYY');
  CurrentDate = moment([CurrentDate])

  useEffect(() => {
    dispatch(fetchLatestTransStart({
      "roleBasedFilter": true
    }))
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
        Cell: cellProps => {
          return (
            <div className="d-flex">
              {cellProps.cell.row.original.sellerName == undefined ? '' : CapitalizeWords(cellProps.cell.row.original.sellerName)}
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
              {cellProps.cell.row.original.buyerName == undefined || cellProps.cell.row.original.buyerName == null ? '' : CapitalizeWords(cellProps.cell.row.original.buyerName)}
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
            <div className='text-end' >

              {cellProps.cell.row.original != undefined && cellProps.cell.row.original.latestTanss.defaulterEntry != undefined ? numberFormat(cellProps.cell.row.original.latestTanss.defaulterEntry.totalAmount) : ''}
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

              {cellProps.cell.row.original != undefined && cellProps.cell.row.original.latestTanss.pHArray != undefined ? cellProps.cell.row.original.latestTanss.pHArray[0].status : ''}

              {/* {cellProps.cell.row.original.defaulterEntry != undefined ? cellProps.cell.row.original.defaulterEntry.status : ""} */}
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
            <div className="d-flex" >
              {cellProps.cell.row.original != undefined ? cellProps.cell.row.original?.latestTanss?.defaulterEntry?.status : "'"}
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
              onClick={() => viewModel(cellProps)}
            >
              View Details
            </Button>
          )
        },
      },


    ],
    []
  )

  const dispatch = useDispatch()
  const latestTransactiondata = useSelector(selectLatestTansMap)

  const adminRole = sessionStorage.getItem('adminRole')



  return (
    <React.Fragment>
      <InvoiceModal isOpen={modal1} toggle={toggleViewModal} selected={selected} />
      {/* <ConfirmModal isOpen={isModalOpen} toggle={toggleModal} /> */}
      <Modal isOpen={showReferModal} toggle={() => setShowReferModal(false)}>
        <ModalHeader toggle={() => setShowReferModal(false)}>
          Confirm Asclation
        </ModalHeader>
        <ModalBody>
          {/* <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
            {selectedLevel ? selectedLevel : 'Select Level'} <span className="caret"></span>

            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setSelectedLevel('L1')}>L1</DropdownItem>
              <DropdownItem onClick={() => setSelectedLevel('L2')}>L2</DropdownItem>
              <DropdownItem onClick={() => setSelectedLevel('L3')}>L3</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <p>
            Asclation: Please select the level you want to refer this
            transaction to.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCancelRefer}>
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={handleConfirmRefer}
            disabled={isReferDisabled}
          >
            Refer
          </Button>
        </ModalFooter>
      </Modal>

      <Card>
        <CardBody>
          {props.isDisputedModal != true ? <div className="mb-4 h4 card-title">Latest Reported Transactions</div> : ""}
          {adminRole == 'L3' && <ExportFileComponent url={'/api/admin/downloadAllTransactions'} fileName={'AllTransactions'} />}
          {selectLoading == false ? <Spinner /> : <TableContainer
            columns={columns}
            data={latestTransactiondata != undefined ? latestTransactiondata : []}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={20}
          />}
          <p className="">Due Since : The number of due days is calculated from date of oldest invoice.
          </p>
        </CardBody>
      </Card>
      <Modal
        isOpen={showApproveModal}
        toggle={() => setShowApproveModal(false)}
      >
        <ModalHeader toggle={() => setShowApproveModal(false)}>
          Confirm Approval
        </ModalHeader>
        <ModalBody>Are you sure you want to approve this bill?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShowApproveModal(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={handleConfirmApprove}>
            Approve
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={showInProcessModal}
        toggle={() => setShowInProcessModal(false)}
      >
        <ModalHeader toggle={() => setShowInProcessModal(false)}>
          Confirm In Process
        </ModalHeader>
        <ModalBody>Are you sure you want to mark this as in process?</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => setShowInProcessModal(false)}
          >
            Cancel
          </Button>
          <Button color="info" onClick={handleConfirmInProcess}>
            In Process
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}



export const StatusAndOpinionObj = {
  APPROVED: 'COMPLAINT APPROVED',
  COMPLAINT_APPROVED: 'COMPLAINT APPROVED',
  REJECTED: 'INCONCLUSIVE',
  Esclate: 'COMPLAINT ESCALATED',
  PENDING: 'PENDING',
  RE_OPENED: 'RE-OPENED',
  Requesttoadditionaldocumnet: 'AWAITING ADDITIONAL DOCUMENTATION',
  DOCUMENTS_NEEDED: 'AWAITING ADDITIONAL DOCUMENTATION',
  BuyerMayBeaDefaulter: 'BUYER MAY BE A DEFAULTER',
  fraudulentComplaintSeller: 'FRAUDULENT COMPLAINT LODGED BY SELLER',
  Complaintsfiledwithoutevidence: 'COMPLAINTS FILED WITHOUT SUFFICIENT EVIDENCE',
  FULLY_RESOLVED_PAYMENT_RECIEVED: 'COMPLAINT RESOLVED',
  PARTIALLY_RESOLVED_PARTIAL_PAYMENT_RECEIVED: 'PARTIAL PAYMENT RECEIVED',
  PAYMENT_PENDING_AGREEMENT_REACHED: 'PAYMENT PENDING - AGREEMENT REACHED',
}

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

export default withRouter(LatestTranaction)
