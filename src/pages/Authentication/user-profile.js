import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  CardHeader,
} from "reactstrap";
import Select from 'react-select';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";

//redux
import { useSelector, useDispatch } from "react-redux";
import withRouter from "components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";

import { profileEditAdminStart } from "store/ProfileEditAdmin/profileEditAdmin.action";

import avatar1 from "../../assets/images/users/user.png"

const UserProfile = () => {

  //meta title
  document.title = "Profile | MSME Suraksha - Admin & Dashboard";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [isEdit, setIsEdit] = useState();
  const [image, setImage] = useState();
  const [idx, setidx] = useState(1);
  const [AdminRole, setadminRole] = useState("");
  const [Adminnew, setadminNew] = useState("");

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  const opationList = [
    { label: "L1", value: "L1" },
    { label: "L2", value: "L2" },
    { label: "L3", value: "L3" },

  ]

  const colourStyles = {
    container: (provided) => ({
      ...provided,
      width: '300px', // Custom width
      marginLeft: "15px",

    }),
    menuList: styles => ({
      ...styles,
      background: '#FFFFFF',
    })
  }

  useEffect(() => {
    setImage(avatar)
    if (sessionStorage.getItem("Profile") == undefined) {
      if (sessionStorage.getItem("authUser")) {

        const obj = JSON.parse(sessionStorage.getItem("authUser"));
        if (
          process.env.REACT_APP_DEFAULTAUTH === "jwt"
        ) {
          setname(obj.name);
          setemail(obj.userName);
          setidx(obj.id);
          setadminRole(obj.adminRole)
        }
        //   setTimeout(() => {
        //     dispatch(resetProfileFlag());
        //   }, 3000);
      }

    }
    else {
      const profile = JSON.parse(sessionStorage.getItem("Profile"))

      setname(profile.name);
      setemail(profile.userName);
      // setidx(obj.id);
      setadminRole(profile.adminRole)
    }

  }, [dispatch, success]);

  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     username: name || '',
  //     idx: idx || '',
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().required("Please Enter Your UserName"),
  //   }),
  //   onSubmit: (values) => {
  //     dispatch(editProfile(values));
  //   }
  // });
  const handleChange = () => {
    isEdit != undefined && isEdit != false ? setIsEdit(false) : setIsEdit(true)
    setadminNew('')
    return isEdit
  }


  const handlesubmit = () => {
    const payload = {
      'name': name,
      "emailId": email,
      "adminRole": Adminnew,
    }
    dispatch(profileEditAdminStart(payload));
    toast.success("Admin role change successfully")
  }

  const adminRole = sessionStorage.getItem('adminRole')


  const [selectMonth, setSelectMonth] = useState('')
  const [salutations, setsalutations] = useState([
    { label: "L1", value: "L1" },

    { label: "L2", value: "L2" },
    { label: "L3", value: "L3" },

  ])



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
              <Card>
                <CardHeader className=" align-self-left d-flex " style={{ background: '#FFFFFF' }}>
                  <Breadcrumb title="Bafana" breadcrumbItem="Profile" />
                </CardHeader>
                <CardBody>
                  <Row xl="12">
                    <Col sm="2">
                      <div className="avatar-md">
                        <img
                          src={avatar1}
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>
                    </Col>
                    <Col sm="4" style={{ fontSize: '16px' }} className="d-flex flex-column justify-content-center">
                      <div className="text-capitalize" >Admin Name : {name}</div>
                      <div >Admin Role :  {AdminRole}</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              {isEdit == false || isEdit == undefined ?
                <Card className="">
                  <CardHeader style={{ background: '#FFFFFF' }}>
                    <Row >
                      <Col lg={8}>
                        <Breadcrumb title="Bafana" breadcrumbItem="overview" />
                      </Col>
                      {adminRole == 'L3' && <Col lg={4} className="d-flex" style={{ justifyContent: 'end' }}>
                        <button className=" btn btn-info d-flex ml-auto" onClick={() => handleChange()} style={{ background: '', border: 'none', height: '35px', width: '80px', justifyContent: 'center' }}>
                          Edit
                        </button>
                      </Col>}
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xl={12}>
                        <Row>
                          <Col xl={2}><p> Full Name :</p></Col>
                          <Col><p className=" text-capitalize"> {name}</p></Col>
                        </Row>
                        <Row>
                          <Col xl={2}><p>Email Address :</p></Col>
                          <Col><p> {email}</p></Col>
                        </Row>
                        <Row>
                          <Col xl={2}><p>Role :</p></Col>
                          <Col><p> {AdminRole}</p></Col>
                        </Row>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
                :
                <Card>
                  <CardHeader className=" " style={{ background: '#FFFFFF' }}>
                    <Row >
                      <Col lg={8}>
                        <Breadcrumb title="Bafana" breadcrumbItem="Profile Edit" />
                      </Col>
                      <Col lg={4} className="d-flex" style={{ justifyContent: 'end' }}>
                        <button className=" btn btn-info d-flex ml-auto" onClick={() => handleChange()} style={{ background: '', border: 'none', height: '35px', width: '80px', justifyContent: 'center' }}>
                          close
                        </button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg={8} >
                        <br />
                        <form >
                          <label>
                            <span style={{ marginRight: "64px" }}>
                              Name:
                            </span>
                            <input className="p-1" type="text" value={name} disabled style={{ width: '300px' }} />
                          </label>
                          <br />
                          <label>
                            <span style={{ marginRight: "64px" }}>
                              Email:      </span>
                            <input disabled className="p-1" type="text" value={email} style={{ width: '300px' }} />
                          </label>
                          <br />
                          <label className="d-flex">
                            <span style={{ marginRight: "65px" }}>
                              Role
                            </span>
                            <Select
                              onChange={s => {
                                setadminNew(s.value)
                              }}
                              styles={colourStyles}
                              options={opationList}
                              placeholder="Select Admin Role"
                            />
                          </label>
                          <br />
                          <label
                            className="visually-hidden custom-content"
                            htmlFor="customerSelect"
                          >
                            Select Customer
                          </label>
                        </form>
                        <br />
                        <Button disabled={Adminnew == '' ? true : false} className=" btn btn-info " style={{ background: '', border: 'none', justifyContent: 'end' }} onClick={() => handlesubmit()}>
                          submit
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              }
            </Col>
          </Row>


        </Container>
      </div>
      <ToastContainer />
    </React.Fragment >
  );
};

export default withRouter(UserProfile);
