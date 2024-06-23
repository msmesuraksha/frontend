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



import { userActiveDeactivateStart } from "store/MemberActiveDeactivate/memberActiveDeactivate.action";
import { getMemberData as ongetMemberData } from "../../../../store/actions";

export const ConfirmInactiveModal = props => {

  const { isOpen, toggle, item } = props
  const dispatch = useDispatch();

  const [remark, setRemark] = useState('')

  const handleSubmit = () => {
    const payload = {
      "userId": item,
      "userActivateFlag": "INACTIVE",
      "suspensionRemarkByL2": remark,
    }

    dispatch(userActiveDeactivateStart(payload));
    toast.success("User Deactivated")

    toggle()

    setTimeout(() => {
      dispatch(ongetMemberData());
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
        <ModalHeader toggle={toggle}>Deactivate Member</ModalHeader>
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
          <Button disabled={remark.length > 0 ? false : true} className="btn btn-info" onClick={() => handleSubmit()}>
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


