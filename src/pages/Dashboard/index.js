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
    { title: "Total Members", iconClass: "bx-group", description: `${totalMemebers != undefined ? totalMemebers : 0}` },
    { title: "Amount Due", iconClass: "bx bx-money", description: numberFormat(amoundDue == undefined || amoundDue == NaN ? 0 : amoundDue) },
    {
      "title": "Amount Recovered",
      "iconClass": "bx bx-check",
      "description": numberFormat(amoundRecovered == undefined || amoundRecovered == NaN ? 0 : amoundRecovered)

    },
    {
      "title": "Total Reviews",
      "iconClass": "bx bx-star",
      "description": `${totalReviews == undefined || totalReviews == NaN ? 0 : totalReviews}`
    }
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

          <Row >
            <Col xl="12" >
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
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <LatestTranaction />
            </Col>
          </Row>
        </Container>
      </div>
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
