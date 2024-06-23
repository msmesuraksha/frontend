import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    Card,
    CardBody,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    Row,
    Col,
    Modal as BootstrapModal, // Rename the imported Modal to avoid conflicts
} from "reactstrap";
import { Link } from 'react-router-dom';

const ConfirmModal = props => {
    const { isOpen, toggle } = props;
    const [showReferModal, setShowReferModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const handleReferClick = () => {
        setShowReferModal(true);
    };
    const handleApproveClick = () => {
        setShowApproveModal(true);
    };
    const handleConfirmApprove = () => {
        // Handle the action when confirming "Approve"
        // For example, you can call the onClickApprove function here
        // And then close the approve modal
        onClickApprove(project);
        setShowApproveModal(false);
    };


    const handleConfirmRefer = () => {
        // Handle the action when confirming "Refer to Senior"
        // For example, you can call the onClickDelete function here
        // And then close the refer modal
        //onClickDelete(project);
        setShowReferModal(false);
    };


    // Rest of your code...

    return (

        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="invoiceModal modal-lg"
            tabIndex="-1"
            toggle={toggle}
        >
            <Modal isOpen={showReferModal} toggle={() => setShowReferModal(false)}>
                <ModalHeader toggle={() => setShowReferModal(false)}>Confirm Refer to Senior</ModalHeader>
                <ModalBody>
                    Are you sure you want to refer this bill to a senior?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowReferModal(false)}>Cancel</Button>
                    <Button color="danger" onClick={handleConfirmRefer}>Refer</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={showApproveModal} toggle={() => setShowApproveModal(false)}>
                <ModalHeader toggle={() => setShowApproveModal(false)}>Confirm Approval</ModalHeader>
                <ModalBody>
                    Are you sure you want to approve this bill?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowApproveModal(false)}>Cancel</Button>
                    <Button color="success" onClick={handleConfirmApprove}>Approve</Button>
                </ModalFooter>
            </Modal>
        </Modal>
    );
}

ConfirmModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default ConfirmModal;
