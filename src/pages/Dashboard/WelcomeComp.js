import React, { useState, useEffect } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/user.png"
import profileImg from "../../assets/images/profile-img.png"


const WelcomeComp = props => {
  function capitalizeWords(str) {
    return str != undefined ? str.replace(/\b\w/g, (match) => match.toUpperCase()) : '';
  }
  const [username, setusername] = useState("");
  const [rol, setrole] = useState("");
  const [emailId, setemailId] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {

        const obj = JSON.parse(sessionStorage.getItem("authUser"));
        setusername(capitalizeWords(obj.name));
        setrole(capitalizeWords(obj.adminRole));
        setemailId(obj.emailId);

      }
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="9">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>MSME Suraksha Dashboard</p>
              </div>
            </Col>
            <Col xs="3" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">{username}</h5>
              <p className="text-muted mb-0 text-truncate">{rol}</p>
            </Col>

            <Col sm="8">
              <div className="pt-4">
                {/* <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">125</h5>
                    <p className="text-muted mb-0">Projects</p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">$1245</h5>
                    <p className="text-muted mb-0">Revenue</p>
                  </Col>
                </Row> */}
                <div className="mt-4 d-flex justify-content-end">
                  <Link
                    to="/profile"
                    className="btn btn-primary  btn-sm"
                  >
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default WelcomeComp
