import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { getOrders as onGetOrders } from "store/actions";
import InvoiceModal from "../../Dashboard/InvoicePopupModal";
import { Link } from 'react-router-dom';
import { latestTransactionData } from "../../../common/data/dashboard";
import avatar1 from "../../../assets/images/users/avatar-1.jpg"
import profileImg from "../../../assets/images/profile-img.png"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import {
  OrderId,
  BillingName,
  DueSince,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./LatestTransactionPageCol";

import TableContainer from "../../../components/Common/TableContainer";

const LatestTranactionPage = props => {


  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      {
        Header: "Reference No.",
        accessor: "orderId",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />;
        },
      },
      {
        Header: "Seller Name",
        accessor: "billingName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <BillingName {...cellProps} />;
        },
      },
      {
        Header: "Due Amount",
        accessor: "total",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Total {...cellProps} />;
        },
      },

      {
        Header: "Due Since",
        accessor: "orderdate",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DueSince {...cellProps} />;
        },
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PaymentStatus {...cellProps} />;
        },
      },
      {
        Header: "Seller Rating",
        accessor: "paymentMethod",
        disableFilters: true,
        Cell: cellProps => {
          return <PaymentMethod {...cellProps} />;
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
              onClick={toggleViewModal}
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
      //       <div className="d-flex flex-column align-items-center me-3" onClick={() => handleProjectClick(project)} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-check-circle font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Approve" />
      //       </div>
      //       <div className="d-flex flex-column align-items-center me-3" onClick={() => handleProjectClick(project)} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-progress-clock font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="In Process" />
      //       </div>
      //       <div className="d-flex flex-column align-items-center" onClick={() => onClickDelete(project)} style={{ cursor: 'pointer' }}>
      //         <i className="mdi mdi-account-supervisor font-size-18 text-warning mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Refer to Senior" />
      //       </div>
      //     </div>

      //     );
      //   },
      // },
    ],
    []
  );


  return (
    <React.Fragment>
      <InvoiceModal isOpen={modal1} toggle={toggleViewModal} />
      <div className="overflow-hidden mt-lg-2">..</div>
      <Card className="overflow-hidden mt-lg-5">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="10">
              <div className="text-primary p-3">
                <h5 className="text-primary">Thankyou for visit us!</h5>
                <p className="mb-0">Company history & latest transaction of buyer and seller...</p>
              </div>
            </Col>
            {/* <Col xs="6">
             
            </Col> */}
            <Col xs="2" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="3">
              {/* <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div> */}
              <h2 className="font-size-15 text-truncate mt-2">Buyer Company Name</h2>
              <p className="text-muted mb-0 text-truncate">AnandRishi Technologies Pvt Ltd</p>
            </Col>

            <Col sm="3">
              <h5 className="font-size-15 text-truncate mt-2">GSTIN</h5>
              <p className="text-muted mb-0 text-truncate">29ABCDE1234F1Z5</p>
              {/* <div className="pt-4">
                <Row>
                  <Col xs="4">
                  <h5 className="font-size-15 text-truncate">GSTIN</h5>
                  <p className="text-muted mb-0 text-truncate">29ABCDE1234F1Z5</p>
                  </Col>
                  <Col xs="">
                    <h5 className="font-size-15">$1245</h5>
                    <p className="text-muted mb-0">Revenue</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs="9">
                  </Col>
                  <Col xs="3">
                  <div className="mt-4">
                  <Link
                    to="/profile"
                    className="btn btn-primary  btn-sm"
                  >
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
                  </Col>
                </Row>
               
              </div> */}
            </Col>
            <Col sm="3">
              <h5 className="font-size-15 text-truncate mt-2">Pancard</h5>
              <p className="text-muted mb-0 text-truncate">ABCDE1234F</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Company History</div>
          <TableContainer
            columns={columns}
            data={latestTransactionData}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

LatestTranactionPage.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(LatestTranactionPage);
