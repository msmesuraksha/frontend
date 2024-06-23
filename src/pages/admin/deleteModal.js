import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import "../../pages/admin/Common.scss"
import { useDispatch, useSelector } from "react-redux";

import { deleteAdminAction as ondeleteAdminAction } from "../../store/actions";

import { getAdminData as ongetAdminData } from "../../store/actions";

const ConfirmDeleteModal = props => {
  const { isOpen, toggle, deletedId } = props
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(ondeleteAdminAction(deletedId))
    toggle()

    setTimeout(() => {
      dispatch(ongetAdminData());
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
        <ModalHeader toggle={toggle}>Delete Employee</ModalHeader>
        <ModalBody>
          <strong className="text-danger">
            Are you sure, you want to delete this employee?
          </strong>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-info" onClick={() => handleDelete()}>
            Delete
          </Button>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

ConfirmDeleteModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ConfirmDeleteModal
