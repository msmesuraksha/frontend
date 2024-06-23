import PropTypes from "prop-types";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword, userForgetPasswordWithToken } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";

const ForgetPasswordPageLink = props => {
  //var tokenFromURL=''; 
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  var tokenFromURL = url.pathname.split('/')[2];
  var tokenFromURL2 = url.pathname.split('/')[3];
  var FinalURL = tokenFromURL + '/' + tokenFromURL2// Assuming the token is at the third position


  //meta title
  document.title = "Forget Password | MSME Suraksha - Admin & Dashboard ";
  const dispatch = useDispatch();
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: '',
      token: FinalURL
    },
    validationSchema: Yup.object().shape({
      // other fields...
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {

      dispatch(userForgetPasswordWithToken(values, props.history));
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  });

  const { forgetError, forgetSuccessMsg } = useSelector(state => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }));

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to MSME Suraksha.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {/* <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          disabled={forgetSuccessMsg ? true : false}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div> */}
                      {/* {forgetSuccessMsg ? (
                        <> */}
                      {/* <div className="mb-3">
                            <Label className="form-label">Authentication Token</Label>
                            <Input
                              name="token"
                              className="form-control"
                              placeholder="Enter token"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.token || ""}
                              invalid={validation.touched.token && validation.errors.token ? true : false}
                            />
                            {validation.touched.token && validation.errors.token ? (
                              <FormFeedback type="invalid">{validation.errors.token}</FormFeedback>
                            ) : null}
                          </div> */}
                      <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter new  password"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={validation.touched.password && validation.errors.password ? true : false}
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Confirm New Password</Label>
                        <Input
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm new password"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirmPassword || ""}
                          invalid={validation.touched.confirmPassword && validation.errors.confirmPassword ? true : false}
                        />
                        {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                          <FormFeedback type="invalid">{validation.errors.confirmPassword}</FormFeedback>
                        ) : null}
                      </div>

                      {/* </>
                      ) : null} */}

                      <Row className="mb-3">
                        <Col className="text-end">
                          {/* <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Reset
                          </button> */}
                          <button className="btn btn-primary w-md" type="submit">
                            {forgetSuccessMsg ? "Update" : "Reset"}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} MSME Suraksha. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by AnandRishi Technologies Pvt Ltd
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};



export default withRouter(ForgetPasswordPageLink);
ForgetPasswordPageLink.propTypes = {
  history: PropTypes.object,
};