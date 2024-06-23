import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  Card,
  CardBody,

  Table,
  Row, Col
} from "reactstrap"
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { userDeactivateAcceptStart } from "store/MemberDeactivateAccept/MemberDeactivateAccept.action";
import { fetchRequestDeactivateStart } from "store/requestDeactiveData/requestDeactiveData.action";

export const DeactivateConformModule = props => {

  const { isOpen, toggle, item } = props
  const dispatch = useDispatch();

  const [remark, setRemark] = useState('')

  const handleActiveButton = (value) => {
    const payload = {
      "userId": item,
      "suspensionRemarkByL3": remark,
      "acceptanceStatus": ''
    }
    dispatch(userDeactivateAcceptStart(payload))
    toast.success("Request Accepted")

    toggle()

    setTimeout(() => {
      dispatch(fetchRequestDeactivateStart())
    }, 1000);
  }


  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Approval for Deactivation</ModalHeader>
        <ModalBody>
          <Col>
            <strong className="text-danger">
              Are you sure, you want to deactivate this member?
            </strong>
          </Col>

          <Row className="mt-3">
            <Col md={3}>
              <div className="mb-2"><b className="mt-2">Reason<span style={{ color: 'red' }}>*</span></b></div>
            </Col>
            <Col md={8}>
              <div className="d-inline">
                <Input
                  type="textarea"
                  id="customerEmail"
                  name="customerEmail"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Reason"
                />

              </div>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button disabled={remark.length > 0 ? false : true} className="btn btn-info" onClick={() => handleActiveButton()}>
            Deactivate
          </Button>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}


