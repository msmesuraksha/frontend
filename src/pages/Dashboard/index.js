import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";
import { selectdashboardAdminDataMap } from "store/DashboardAdminData/dashboardAdminData.selecter";
import { fetchDashboardAdminDataStart } from "store/DashboardAdminData/dashboardAdminData.action";

const Dashboard = props => {

  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

  // const { chartsData } = useSelector(state => ({
  //   chartsData: state.Dashboard.chartsData
  // }));
  const dispatch = useDispatch()
  const { totalMemebers, amoundRecovered, amoundDue, totalReviews } = useSelector(selectdashboardAdminDataMap)
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);

  useEffect(() => {

    dispatch(fetchDashboardAdminDataStart())
  }, [])

  const reports = [
    { title: "Total Members", iconClass: "bx-group", description: `${totalMemebers}` },
    { title: "Amount Due", iconClass: "bx bx-money", description: numberFormat(amoundDue) },
    {
      "title": "Amount Recovered",
      "iconClass": "bx bx-check",
      "description": numberFormat(amoundRecovered)

    },
    {
      "title": "Total Reviews",
      "iconClass": "bx bx-star",
      "description": `${totalReviews}`
    }
    // {
    //   title: "Total Reviews",
    //   iconClass: "bx-purchase-tag-alt",
    //   description: "1,447",
    // },
  ];
  // const isPopupOpen = JSON.parse(sessionStorage.getItem("IspopupOpen"));
  const isPopupOpen = false
  useEffect(() => {
    sessionStorage.removeItem("Profile")
    if (isPopupOpen) {
      setTimeout(() => {

        setSubscribemodal(false);
        sessionStorage.setItem("IspopupOpen", JSON.stringify(false));
      }, 500);
    }
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");
  const handleSignUp = () => {
    setSubscribemodal(false);
  };

  // useEffect(() => {
  //      
  //   setPeriodData(chartsData);
  // }, [chartsData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(onGetChartsData("yearly"));
  // }, [dispatch]);

  //meta title
  document.title = "Dashboard | MSME Suraksha";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="12">
              <WelcomeComp />
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <Row>
                {reports.map((report, key) => (
                  <Col md="3" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Cash flow</h4>
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "weekly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("weekly");
                            }}
                            id="one_month"
                          >
                            This Fiscal Year
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "monthly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("monthly");
                            }}
                            id="one_month"
                          >
                            Previous Fiscal Year
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "yearly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("yearly");
                            }}
                            id="one_month"
                          >
                            Last 12 Months
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <StackedColumnChart periodData={periodData} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />
                </CardBody>
              </Card> */}
            </Col>
          </Row>
          {/* 
          <Row>
            <Col xl="4">
              <SocialSource />
            </Col>
            <Col xl="4">
              <ActivityComp />
            </Col>

            <Col xl="4">
              <TopCities />
            </Col>
          </Row> */}

          <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div>

      {/* subscribe ModalHeader */}
      {/* <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal);
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubscribemodal(!subscribemodal);
            }}
          ></ModalHeader>
        </div>
        <div className="modal-body">
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light  rounded-circle text-primary h1">
                <i className="mdi mdi-email-open"></i>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-10">
                <h4 className="text-primary">Subscribe !</h4>
                <p className="text-muted font-size-14 mb-4">
                  Subscribe our newletter and get notification to stay update.
                </p>

                <div
                  className="input-group rounded bg-light"
                >
                  <Input
                    type="email"
                    className="form-control bg-transparent border-0"
                    placeholder="Enter Email address"
                  />
                  <Button color="primary" type="button" id="button-addon2">
                    <i className="bx bxs-paper-plane"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal> */}
      <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal);
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubscribemodal(!subscribemodal);
            }}
          ></ModalHeader>
        </div>
        <div className="modal-body">
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light rounded-circle text-primary h1">
                <i className="mdi mdi-email-open"></i>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-10">
                <h4 className="text-primary">Confirmation</h4>
                <p className="text-muted font-size-14 mb-4">
                  By signing up, you agree not to post false information about any party and to take complete responsibility if your posts or reviews lead to defamation of any party.
                </p>

                <Button color="primary" type="button" onClick={handleSignUp}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>



      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal);
        }}
      >
        <div>
          <ModalHeader
            toggle={() => {
              setmodal(!modal);
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export const CapitalizeWords = (str) => {
  // Split the string into an array of words
  let words = str.split(" ");

  // Iterate over each word in the array
  for (let i = 0; i < words.length; i++) {
    // Capitalize the first letter of each word and make the rest of the letters lowercase
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }

  // Join the words back into a single string and return it
  return words.join(" ");
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
