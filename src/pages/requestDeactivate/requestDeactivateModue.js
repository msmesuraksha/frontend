import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    Label,
    Input,
    Card, CardBody, CardHeader,
    Row,
    Col
} from "reactstrap"
import { getlogsSelector } from "store/LatestTransaction/latestTans.selecter"

import { useSelector, useDispatch } from "react-redux"
import { SellerDocViewModule } from "pages/Dashboard/sellerDocViewModule";

import { toast, ToastContainer } from "react-toastify";

import { userDeactivateAcceptStart } from "store/MemberDeactivateAccept/MemberDeactivateAccept.action";

import { fetchRequestDeactivateStart } from "store/requestDeactiveData/requestDeactiveData.action"

import { DeactivateConformModule } from "./requestDeactivateConformPop"


const RequestForDeactivateModule = props => {

    const { isOpen, toggle, selected } = props

    const [sellerDocOpen, setSellerDocOpen] = useState(false)
    const [sellerDocData, setSellerDocOpenData] = useState(null)
    const getAllLogss = useSelector(getlogsSelector)
    const dispatch = useDispatch()


    const viewDocuments = (value) => {
        setSellerDocOpen(!sellerDocOpen)
        setSellerDocOpenData(value)
    }
    const toggleUploiadFiles = () => setSellerDocOpen(!sellerDocOpen)

    const handleActiveButton = () => {
        const payload = {
            "userId": selected.id,
            "suspensionRemarkByL3": "",
            "acceptanceStatus": 'REJECT'
        }
        dispatch(userDeactivateAcceptStart(payload))
        toast.error("Request Rejected")
        toggle()
        setTimeout(() => {
            dispatch(fetchRequestDeactivateStart())
        }, 1000);
    }

    const [inActivePop, setInActivePop] = useState(false)

    const handleDeactivateBtn = () => {
        toggleInactiveModule()
    }

    const toggleInactiveModule = () => setInActivePop(!inActivePop)


    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
            size="xl"
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>Request For Deactivation</ModalHeader>
                {sellerDocOpen && <SellerDocViewModule isOpen={sellerDocOpen} toggle={toggleUploiadFiles} item={sellerDocData} />}
                {inActivePop && <DeactivateConformModule isOpen={inActivePop} toggle={toggleInactiveModule} item={selected.id} />}
                <ModalBody>

                    <div className=" p-2">
                        <Row>
                            <Col md="12">
                                <h4>Member Information</h4>
                                <Card className="mb-3 shadow">
                                    <CardBody className="seller-card-body">

                                        <p className="mb-2">
                                            Member Name : <span className="text-primary text-capitalize">{selected != "" && selected.name != undefined ? selected.name : ''}</span>
                                        </p>
                                        {/*  <p className="mb-2">
                                            Company name : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.companyName : ''}</span>
                                        </p> */}
                                        {/* <p className="mb-2">
                                            GST No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.gstin : ''}</span>
                                        </p>
                                        <p className="mb-2">
                                            PAN No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.companyPan : ''}</span>
                                        </p> */}
                                        <p className="mb-2">
                                            Email id  : <span className="text-primary">{selected != "" && selected.emailId != undefined ? selected.emailId : ''}</span>
                                        </p>

                                        <p className="mb-2">
                                            Mobile (Primary ) : <span className="text-primary">{selected != "" && selected.phoneNumber != undefined ? selected.phoneNumber : ''}</span>
                                        </p>
                                        <p className="mb-2">
                                            Mobile (Secondary) : <span className="text-primary">{selected != "" && selected.secPhoneNumber != undefined ? selected.secPhoneNumber : ''}</span>
                                        </p>
                                        <p className="mb-2">
                                            City : <span className="text-primary">{selected != "" && selected.city != undefined ? selected?.city : ''}</span>
                                        </p>
                                        <p className="mb-2">
                                            State : <span className="text-primary">{selected != "" && selected.state != undefined ? selected.state : ''}</span>
                                        </p>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>


                        {selected != "" ? <Row>

                            <Col md="12" className="mt-4">
                                <h4>Member Company List</h4>
                                <Card className="mb-3 shadow">
                                    <CardBody className="buyer-card-body">

                                        <Row>
                                            <div className="table-responsive">
                                                <Table className="table align-middle table-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Company Name</th>
                                                            <th>GST No.</th>
                                                            <th>PEN CARD</th>
                                                            {/* <th>Action</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selected.companies?.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.companyName}</td>
                                                                    <td>{item.gstin}</td>
                                                                    <td>{item.companyPan}</td>
                                                                    {/*  <td>
                                                                        <Button className="btn btn-sm btn-info" onClick={() => viewDocuments(item)}>
                                                                            View Document
                                                                        </Button>
                                                                    </td> */}
                                                                </tr>
                                                            );
                                                        })}
                                                        {/* Add more rows as needed */}
                                                    </tbody>
                                                </Table>
                                            </div>

                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="12" className="mt-4">
                                <h4>Reason of Deactivate</h4>
                                <Card className="mb-3 shadow">
                                    <CardBody className="seller-card-body">

                                        <p className="mb-2">
                                            {selected.suspensionRemarkByL2}
                                        </p>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row> : ""}
                        <Row>
                            <Col className="d-flex gap-2">
                                <Button className="btn btn-info" onClick={() => handleDeactivateBtn()}>Approve</Button>
                                <Button className="btn btn-info" onClick={() => handleActiveButton()}>Disapprove</Button>
                            </Col>

                        </Row>

                    </div>
                </ModalBody>
            </div>
        </Modal>


    )
}

RequestForDeactivateModule.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default RequestForDeactivateModule
