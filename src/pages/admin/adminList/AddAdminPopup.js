import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'; // Import Yup for validation
import { useFormik } from 'formik'; // Import useFormik for form handling
import "../../../pages/admin/Common.scss";
import { adminregister as onadminregister } from "../../../store/actions";

import { getAdminData as ongetAdminData } from "../../../store/actions";

const AdminRegistrationModal = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    emailId: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().matches(/^\d{10}$/, "Invalid mobile number").required("Mobile number is required"),
    adminRole: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      emailId: "",
      phoneNumber: "",
      adminRole: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(onadminregister(values));
      toggle();

      setTimeout(() => {
        dispatch(ongetAdminData());
      }, 1000);
    },
  });
  const adminRole = sessionStorage.getItem('adminRole')
  return (
    <Modal isOpen={isOpen} role="dialog" autoFocus centered className="exampleModal" tabIndex="-1" toggle={toggle}>
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Employee Registration</ModalHeader>
        <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                //invalid={formik.touched.name && formik.errors.name}
                required
              />
              {formik.touched.name && formik.errors.name && (
                <FormFeedback invalid>{formik.errors.name}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="emailId"
                id="emailId"
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                //invalid={formik.touched.email && formik.errors.email}
                required
              />
              {formik.touched.emailId && formik.errors.emailId && (
                <FormFeedback invalid>{formik.errors.emailId}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="mobile">Mobile Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                //invalid={formik.touched.mobile && formik.errors.mobile}
                required
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <FormFeedback invalid>{formik.errors.phoneNumber}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <div className="col-sm-auto">
                <select
                  name="adminRole"
                  id="adminRole"
                  className="form-select custom-content"
                  value={formik.values.adminRole}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  //invalid={formik.touched.role && formik.errors.role}
                  required
                >
                  <option value="">Select from here...</option>
                  {adminRole == 'L2' && <><option value="L1">L1</option></>}
                  {adminRole == 'L3' && <><option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option></>}

                </select>
                {formik.touched.adminRole && formik.errors.adminRole && (
                  <FormFeedback invalid>{formik.errors.adminRole}</FormFeedback>
                )}
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="primary" onClick={formik.handleSubmit} disabled={!formik.isValid}>
            Register
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

AdminRegistrationModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AdminRegistrationModal;
