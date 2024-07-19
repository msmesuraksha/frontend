import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
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
    ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Table,
    Row, Col, CardHeader
} from "reactstrap"
import { Link } from 'react-router-dom';
import moment from 'moment'
import Select from 'react-select';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { approveRejectLatestTrans, esclateTransaction, requestForAdditionalDoc, getAllLogs } from "store/LatestTransaction/latestTrans.action"
import { selectLatestTansMap } from "store/LatestTransaction/latestTans.selecter"
import { useSelector, useDispatch } from "react-redux"

import { useLocation } from 'react-router-dom';
import { select } from "redux-saga/effects";
import { getlogsSelector } from "store/LatestTransaction/latestTans.selecter"

import { SellerDocViewModule } from "./sellerDocViewModule";

import { DocumentViewModule } from "pages/admin/documentViewer/documentView";

import fileImg1 from '../../../src/assets/images/newImg/png-file-.png'
import fileImg2 from '../../../src/assets/images/newImg/pdf.png'
import fileImg3 from '../../../src/assets/images/newImg/jpg-icon.png'
import fileImg4 from '../../../src/assets/images/newImg/jpeg.png'
import fileImg5 from '../../../src/assets/images/newImg/doc-icon.png'
import fileImg6 from '../../../src/assets/images/newImg/xls.png'
import fileImg7 from '../../../src/assets/images/newImg/xlsx.png'

export const ImageIcons = {
    'png': fileImg1,
    'pdf': fileImg2,
    'jpg': fileImg3,
    'jpeg': fileImg4,
    'doc': fileImg5,
    'xls': fileImg6,
    'xlsx': fileImg7,
}


import './folder.css';

function LatesttransactionViewDetails(props) {

    const location = useLocation();
    const { isOpen, toggle } = props
    const selected = location.state.selected
    const SelectedTab = location.state.SelectedTab

    const [sellerDocOpen, setSellerDocOpen] = useState(false)
    const [sellerDocData, setSellerDocOpenData] = useState(null)
    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);

    const colourStyles = {
        control: (provided, state) => ({
            ...provided,
            width: 370, // Set your custom width here, in pixels or any valid CSS value
        }),
        menuList: styles => ({
            ...styles,
            background: '#FFFFFF',
        })

    }

    const checkboxStyle = {
        border: '2px solid #ff0000',  // Set the border color to red (#ff0000)
        // Add any other styles you need
    };
    const [attachments, setAttachments] = useState([
        { name: 'Invoice Document', type: 'application/pdf' },
        { name: 'challan Document', type: 'image/jpeg' },
        { name: 'Transportation Document', type: 'application/pdf' },
        { name: 'Purchase Order Document', type: 'application/pdf' },
        { name: 'CA Certificate', type: 'application/pdf' },
        // Add more attachments as needed
    ]);
    const [attachmentss, setAttachmentss] = useState([
        { name: 'Invoice', type: 'application/pdf' },
        { name: 'Challan', type: 'image/jpeg' },
        { name: 'Purchase Order', type: 'application/pdf' },

        { name: 'Transportation ', type: 'application/pdf' },

        // Add more attachments as needed
    ]);
    const [sellerattachments, setSellerattachments] = useState([
        // { name: 'Invoice Document', type: 'application/pdf' },
        { name: 'Payment Record Document', type: 'image/jpeg' },
        { name: 'CA Certificate', type: 'application/pdf' },

        // Add more attachments as needed
    ]);
    const renderStarRating = (rating) => {
        const starCount = 5; // Number of stars
        const fullStarCount = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = [];

        for (let i = 0; i < fullStarCount; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }

        const remainingStars = starCount - fullStarCount - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }

        return stars;
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [notesSeller, setnotesSeller] = useState('');
    const [notesBuyer, setnotesBuyer] = useState('');


    const [remarks, setRemarks] = useState('');
    const [checkRemarks, setCheckRemarks] = useState(false);

    const [itemsSeller, setItemsSeller] = useState([]);
    const [itemsBuyer, setItemsBuyer] = useState([]);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleModal = () => setModalOpen(!modalOpen);

    const handleLevelSelection = (level) => {
        setSelectedLevel(level);
        toggleModal();
    };
    const isReferDisabled = selectedLevel === '';
    const existingReviews = [
        { rating: 3.5, comment: "I have been using this product for a while now, and I am incredibly impressed with its features and performance. From the moment I started using it, I could tell that the team behind this product is dedicated to delivering top-notch quality.!" },
        { rating: 3, comment: "Average quality." },
        // ... other review objects
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    // const [selectedOption, setSelectedOption] = useState(null);

    const [definationState, setDefinationState] = useState('')

    useEffect(() => {
        if (selectedOption?.value == null) return
        for (const key in StatusOpinion) {
            if (key === selectedOption.value) {
                const definationState = StatusOpinion[key];
                setDefinationState(definationState)
                break;
            }
        }
    }, [selectedOption])

    const TostMassageForAction = {
        APPROVED: 'Complaint approved successfully',
        COMPLAINT_APPROVED: 'Complaint approved successfully',
        REJECTED: 'Complaint inconclusive successfully',
        Esclate: 'Complaint escalate to next level',
        Requesttoadditionaldocumnet: 'Document requested successfully',
        DOCUMENTS_NEEDED: 'Document requested successfully',
        BuyerMayBeaDefaulter: 'Buyer may be a defaulter successfully',
        fraudulentComplaintSeller: 'Fraudulent complaint lodged by seller successfully',
        Complaintsfiledwithoutevidence: 'Complaints filed without sufficient evidence successfully',
        FULLY_RESOLVED_PAYMENT_RECIEVED: 'Complaint resolved successfully',
        PARTIALLY_RESOLVED_PARTIAL_PAYMENT_RECEIVED: 'Partial payment received successfully',
        PAYMENT_PENDING_AGREEMENT_REACHED: 'Payment pending agreement successfully',
    }

    const options = [
        /*  { value: 'APPROVED', label: 'APPROVED' }, */
        { value: 'COMPLAINT_APPROVED', label: 'COMPLAINT APPROVED' },
        { value: 'REJECTED', label: 'INCONCLUSIVE' },
        { value: 'Esclate', label: 'COMPLAINT ESCALATED' },
        { value: 'Requesttoadditionaldocumnet', label: 'AWAITING ADDITIONAL DOCUMENTATION' },
        { value: 'BuyerMayBeaDefaulter', label: 'BUYER MAY BE A DEFAULTER' },
        { value: 'fraudulentComplaintSeller', label: 'FRAUDULENT COMPLAINT LODGED BY SELLER' },
        /*  { value: 'documentUnderVerification', label: 'DOCUMENT UNDER VERIFICATION' }, */
        { value: 'Complaintsfiledwithoutevidence', label: 'COMPLAINTS FILED WITHOUT SUFFICIENT EVIDENCE' },
        /*    { value: 'PENDING_INVESTIGATION', label: 'PENDING INVESTIGATION' }, */
        /*     { value: 'AWAITING_ADDITIONAL_DOCUMENTS', label: 'AWAITING ADDITIONAL DOCUMENTS' }, */
        { value: 'FULLY_RESOLVED_PAYMENT_RECIEVED', label: 'COMPLAINT RESOLVED' },
        { value: 'PARTIALLY_RESOLVED_PARTIAL_PAYMENT_RECEIVED', label: ' PARTIAL PAYMENT RECEIVED' },
        { value: 'PAYMENT_PENDING_AGREEMENT_REACHED', label: 'PAYMENT PENDING - AGREEMENT REACHED' },

        // { value: 'RequesttoCA', label: 'Request to CA Certificate' },
    ];

    const StatusOpinion = {
        APPROVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'red' }}> Complaint Approved : </b>
            From the information gathered thus far, BUYER seems to be a defaulter.</span>,
        COMPLAINT_APPROVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'red' }}> Complaint Approved : </b>
            From the information gathered thus far, BUYER seems to be a defaulter.</span>,
        PENDING: <span style={{ fontSize: '13px', }}> <b className="" style={{ color: ' #ff794d' }}> Awaiting Buyer Response : </b>
            If buyer does not respond within 4 days from the date of complaint, the case will be assessed based on information available and that time.
        </span>,
        REJECTED: <span style={{ fontSize: '13px', }}> <b className="" style={{ color: ' #ff794d' }}> Inconclusive : </b>
            The presented evidence is insufficient to definitively establish that the buyer is in default.
        </span>,
        Esclate: <span style={{ fontSize: '13px', }}> <b className="" style={{ color: ' #ff794d' }}>  Complaint Escalated :</b>
            The complaint has escalated to a higher level due to complexity, urgency, or unresolved issues.
        </span>,
        Requesttoadditionaldocumnet: <span style={{ fontSize: '13px', }}> <b className="" style={{ color: ' #ff794d' }}>  Complaint Escalated :</b>
            The complaint requires further documentation or evidence from either party. Once submitted, the process will continue.
        </span>,
        DISPUTED: <span style={{ fontSize: '13px', }}> <b className="" style={{ color: 'red ' }}> Inconclusive : </b>
            The presented evidence is insufficient to definitively establish that the buyer is in default.</span>,
        BuyerMayBeaDefaulter: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Buyer May Be a Defaulter : </b>
            Buyer has failed to respond despite repeated reminders OR Buyer has failed to provide sufficient proofs to demonstrate that he is not a defaulter.</span>,
        fraudulentComplaintSeller: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Fraudulent Complaint Lodged by Seller : </b>
            The supplier has submitted false documents as part of their complaint.</span>,
        documentUnderVerification: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Documents Under Verification : </b>
            The documents provided by both parties are currently under verification.</span>,
        Complaintsfiledwithoutevidence: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Complaints Filed Without Sufficient Evidence : </b>Complaint filed without adequate evidence to support the claim.</span>,
        PENDING_INVESTIGATION: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Pending Investigation : </b>
            The complaint is currently under investigation. Relevant parties are reviewing the evidence and assessing the situation.</span>,
        AWAITING_ADDITIONAL_DOCUMENTS: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Awaiting Additional Documentation : </b>The complaint requires further documentation or evidence from either party. Once submitted, the process will continue.</span>,
        ESCLATED_COMPLAIN: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Complaint Escalated : </b>
            The complaint has escalated to a higher level due to complexity, urgency, or unresolved issues.</span>,
        FULLY_RESOLVED_PAYMENT_RECIEVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Complaint Resolved : </b>
            The complaint has been successfully resolved, and the agreed-upon payment has been received by the relevant party.</span>,
        PARTIALLY_RESOLVED_PARTIAL_PAYMENT_RECEIVED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Partial payment received : </b>While the complaint is not fully resolved, progress has been made. A partial payment has been received, but further negotiations or actions are still required.</span>,
        PAYMENT_PENDING_AGREEMENT_REACHED: <span style={{ fontSize: '13px' }}> <b className="" style={{ color: 'blue' }}>Payment Pending - Agreement Reached : </b>Both parties have reached an agreement, but the actual payment is pending. The resolution process is in its final stages.</span>,

    }

    const handleChange = (selected) => {
        setSelectedOption(selected);

        // console.log("EsclateEsclate",selected)
    };

    const handleCheckboxChanges = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            // Add item to the array
            setItemsSeller(prevItems => [...prevItems, value]);
        } else {
            // Remove item from the array
            setItemsSeller(prevItems => prevItems.filter(item => item !== value));
        }
    };


    const handleCheckboxChangeBuyer = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            // Add item to the array
            setItemsBuyer(prevItems => [...prevItems, value]);
        } else {
            // Remove item from the array
            setItemsBuyer(prevItems => prevItems.filter(item => item !== value));
        }
    };
    const dispatch = useDispatch()

    const handleActionSelect = () => {
        if (remarks.length > 0) {
            setCheckRemarks(false)

        } else {
            setCheckRemarks(true)
            return
        }

        const newPaymentArray = selected.pHArray.map((value) => {
            return {
                "paymentId": value.id,
            }
        })

        if (selectedOption.value == "Esclate") {

            dispatch(esclateTransaction({
                "payments": newPaymentArray,
                "remarks": remarks
            }))
            toast.success("Complaint escalate to next level")
        } else {
            const payload = {
                "status": selectedOption.value,
                "payments": newPaymentArray,
                "remarks": remarks,
                "defaulterEntryId": selected.defaulterEntry._id,

            }
            dispatch(approveRejectLatestTrans(payload))

            const tostText = TostMassageForAction[selectedOption.value]
            toast.success(`${tostText}`)

        }

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 500);
    }
    const handleRequestedDoc = () => {

        if (remarks.length > 0) {
            setCheckRemarks(false)
        } else {
            setCheckRemarks(true)
            return
        }

        const newPaymentArray = selected.pHArray.map((value) => {
            return {
                "paymentId": value.id,
            }
        })

        const payload = {
            "payments": newPaymentArray,

            "documentsRequiredFromCreditor": itemsSeller,
            "documentsRequiredFromDebtor": itemsBuyer,
            "isDocumentsRequiredByCreditor": itemsSeller.length != 0 ? "true" : "false",
            "adminRemarksForDebtor": notesBuyer,
            "adminRemarksForCreditor": notesSeller,
            "remarks": remarks
        }


        toast.success("Document requested successfully")
        dispatch(requestForAdditionalDoc(payload))



        setTimeout(() => {
            dispatch(getAllLogs({
                "paymentId": logsPaymenid
            }))
            window.location.href = "/dashboard";
        }, 500);


    }
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckboxChange = (checkboxNumber) => {
        if (checkboxNumber === 1) {
            setIsChecked1(true);
            setIsChecked2(false);
        } else if (checkboxNumber === 2) {
            setIsChecked1(false);
            setIsChecked2(true);
        }
    };

    const viewDocuments = (value) => {
        setSellerDocOpen(!sellerDocOpen)
        setSellerDocOpenData(value)
    }
    const getAllLogss = useSelector(getlogsSelector)


    const logsPaymenid = selected.defaulterEntry?._id

    useEffect(() => {
        dispatch(getAllLogs({
            "defaulterEntryId": logsPaymenid
        }))
    }, [])
    const toggleUploiadFiles = () => setSellerDocOpen(!sellerDocOpen)


    const [documentViewOpen, setDocumentViewOpen] = useState(false)
    const [currentUrl, setCurrentUrl] = useState({})

    const toggleDocumentView = () => setDocumentViewOpen(!documentViewOpen)

    const documentView = (value) => {
        setCurrentUrl(value)
        toggleDocumentView()
    }

    return (
        <>
            {documentViewOpen && <DocumentViewModule isOpen={documentViewOpen} toggle={toggleDocumentView} currentUrl={currentUrl} />}
            {sellerDocOpen && <SellerDocViewModule isOpen={sellerDocOpen} toggle={toggleUploiadFiles} item={sellerDocData} />}
            <div className="mt-5 p-5">
                <Row>
                    <Col md="12">
                        <Card className="mb-1 shadow-sm">
                            <CardBody className="buyer-card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>
                                                Reference No. : <span className="text-primary">{selected != "" && selected.defaulterEntry != undefined ? "BAF" + "-" + selected.defaulterEntry.debtor._id.slice(-6).toUpperCase() + '-' + selected.defaulterEntry.invoices?.[0]?._id.slice(-6).toUpperCase() : ''}</span>
                                            </h5>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="">
                                                Defaulter Entry created At: <span className="text-primary">{selected != "" && selected.defaulterEntry != undefined ? moment(selected.pHArray[0].createdAt).format("DD-MM-YYYY") : ''}</span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" className="mt-4">
                        <h4>Seller Information</h4>
                        <Card className="mb-3 shadow">
                            <CardBody className="seller-card-body">

                                <p className="mb-2">
                                    Seller Name: <span className="text-primary text-capitalize">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry.creditor?.companyOwner?.name : ''}</span>
                                </p>
                                <p className="mb-2">
                                    Company name : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.companyName : ''}</span>
                                </p>
                                <p className="mb-2">
                                    GST No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.gstin : ''}</span>
                                </p>
                                <p className="mb-2">
                                    PAN No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.companyPan : ''}</span>
                                </p>
                                <p className="mb-2">
                                    Email id  : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry.creditor?.emailId : ''}</span>
                                </p>

                                <p className="mb-2">
                                    Contact No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.phoneNumber : ''}</span>
                                </p>
                                <p className="mb-2">
                                    City : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.city : ''}</span>
                                </p>
                                <p className="mb-2">
                                    State : <span className="text-primary">{selected != "" && selected.defaulterEntry?.creditor != undefined ? selected.defaulterEntry?.creditor?.state : ''}</span>
                                </p>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" className="mt-4">
                        <h4>Buyer Information</h4>
                        <Card className="mb-3 shadow">
                            <CardBody className="buyer-card-body">


                                <p className="mb-2">
                                    Buyer Name: <span className="text-primary text-capitalize">{selected != "" && selected.defaulterEntry != undefined && selected.defaulterEntry != null ? <>{selected.defaulterEntry.debtor.firstname} {selected.defaulterEntry.debtor.lastname} </> : ''}</span>
                                </p>
                                <p className="mb-2">
                                    Company name : <span className="text-primary">{selected != "" && selected.defaulterEntry?.debtor != undefined && selected.defaulterEntry != null ? selected.defaulterEntry.debtor.companyName : ''}</span>
                                </p>
                                <p className="mb-2">
                                    GST No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.debtor != undefined && selected.defaulterEntry != null ? selected.defaulterEntry.debtor.gstin : ''}</span>
                                </p>
                                <p className="mb-2">
                                    PAN No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.debtor != undefined && selected.defaulterEntry != null ? selected.defaulterEntry.debtor.companyPan : ''}</span>
                                </p>
                                <p className="mb-2">
                                    Email id : <span className="text-primary">{selected != "" && selected.defaulterEntry?.debtor != undefined && selected.defaulterEntry != null ? selected.defaulterEntry.debtor.customerEmail : ''}</span>
                                </p>
                                <p className="mb-2">
                                    Contact No. : <span className="text-primary">{selected != "" && selected.defaulterEntry?.debtor != undefined && selected.defaulterEntry != null ? selected.defaulterEntry.debtor.customerMobile : ''}</span>
                                </p>
                                <p className="mb-2">
                                    City : <span className="text-primary">{selected != "" && selected.defaulterEntry?.debtor != undefined && selected.defaulterEntry != null ? selected.defaulterEntry.debtor.city : ''}</span>
                                </p>
                                <p className="mb-2">
                                    State : <span className="text-primary">{selected != "" && selected.defaulterEntry?.debtor != undefined && selected.defaulterEntry != null ? selected.defaulterEntry.debtor.state : ''}</span>
                                </p>

                            </CardBody>
                        </Card>
                    </Col>

                </Row>



                <Row>

                    <Col md="6" className="mt-4">
                        <h4>Seller Attachments</h4>
                        <Card className="mb-3 shadow">
                            <CardBody className="buyer-card-body">
                                <h4>Payment History</h4>
                                <div className="table-responsive" >
                                    <Table className="table align-middle table-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                {/* <th>Type</th> */}
                                                <th>Amount</th>
                                                <th>Payment Method</th>
                                                <th>Bank Name</th>

                                                <th>Account No.</th>
                                                <th>Cheque No.</th>
                                                <th>IFSC code</th>

                                                <th>Transaction ID</th>
                                                <th>Create on</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selected.pHArray.map((item, index) => {
                                                if (item.requestor == 'CREDITOR' && item.disputeType == '') {
                                                    return <tr key={item + index}>
                                                        <td>{(item.paymentDate)}</td>
                                                        {/* <td>Bank Deposit</td> */}
                                                        <td className="text-right">{numberFormat(item.amtPaid)}</td>
                                                        <td>{item.paymentMode}</td>
                                                        <td>{item.bankName}</td>

                                                        <td>{item.bankAccNumber}</td>
                                                        <td>{item.chequeNumber}</td>
                                                        <td>{item.ifsc}</td>

                                                        <td>{item.transactionId}</td>
                                                        <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                                                    </tr>
                                                }

                                            })}

                                            {/* Add more rows as needed */}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="file-list mt-4">
                                    {selected.pHArray.map((file, index) => {
                                        if (file.requestor == 'CREDITOR') {
                                            if (file.disputeType !== '') return null; // Skip non-Record Payment files
                                            return <FileDisplay key={index} file={file} documentView={documentView} />;
                                        }

                                    })}
                                </div>
                                <h4 className="mt-4">Invoice Details</h4>
                                <Row>
                                    <div className="table-responsive">
                                        <Table className="table align-middle table-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Invoice No.</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selected.defaulterEntry?.invoices.map((item) => (
                                                    <tr key={item.invoiceNumber}>
                                                        <td>{item.invoiceNumber}</td>
                                                        <td>{moment(item.dueDate).format("DD-MM-YYYY")}</td>
                                                        <td>{numberFormat(item.subTotal)}</td>
                                                        <td>
                                                            <Button className="btn btn-sm btn-info" onClick={() => { viewDocuments(item); }}>View Document</Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* Add more rows as needed */}
                                            </tbody>
                                        </Table>
                                    </div>

                                </Row>

                                <Row className="mt-2">
                                    <h4>Total Due Amount : {numberFormat(selected.defaulterEntry?.totalAmount)}</h4>
                                </Row>

                                <Row>
                                    <h4 className="mt-2">Seller Rating</h4>
                                    <div className="existing-reviews flex-wrap align-items-center">
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', background: '#f2f2f2', color: '#74788d' }}>Parameter</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', background: '#f2f2f2', color: '#74788d' }}>Rating</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selected.defaulterEntry?.debtor.ratings.map((review, index) => (
                                                        <tr key={index}>
                                                            {review?.question?.questionType === "RATING" && (
                                                                <>
                                                                    <td style={{ border: '1px solid #ddd', padding: '12px', color: '#74788d' }}>
                                                                        {review?.question?.questionDesc || ''}
                                                                    </td>
                                                                    <td style={{ border: '1px solid #ddd', padding: '12px', color: '#74788d' }}>
                                                                        <div className="review-rating" style={{ color: '#ffc83d', fontSize: '18px' }}>
                                                                            {renderStarRating(review.response)}
                                                                        </div>
                                                                    </td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                </Row>
                                {selected.pHArray[0].creditoradditionaldocuments.length > 0 && <Row className="mt-4">
                                    <strong> Other Documents</strong>

                                    {selected.pHArray.map((file, index) => (
                                        <div key={index}>
                                            {file?.creditoradditionaldocuments.length > 0 && file.creditoradditionaldocuments.map((value, i) => {

                                                let currentImg1 = ''

                                                for (const key in ImageIcons) {
                                                    const currentUrlArr = value.name?.split('.');
                                                    if (currentUrlArr == undefined) break
                                                    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                                                        currentImg1 = ImageIcons[key];
                                                        break;
                                                    }
                                                }
                                                return (
                                                    <Col md="6" key={i}>
                                                        <Card className="mb-2">

                                                            <CardBody className="attachment-card-body" style={{ background: 'rgba(0, 0, 0, 0.05)', height: "80px" }}>
                                                                <div className="attachment-icon d-flex">
                                                                    {/* <a href={value.url} rel='noreferrer' target='_blank'>
                                                                        
                                                                        <i className="far fa-file-pdf fa-2x text-danger"></i>
                                                                    </a> */}
                                                                    <img src={currentImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(value)} />&nbsp;
                                                                    <span style={{
                                                                        display: "block",/* or inline-block */
                                                                        textOverflow: "ellipsis",
                                                                        wordWrap: "break-word",
                                                                        overflow: "hidden",
                                                                        maxHeight: "3.9em",
                                                                        lineHeight: "1.8em"
                                                                    }}>{value.name}</span>
                                                                </div>

                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                )
                                            })

                                            }
                                        </div>



                                    ))}
                                </Row>}
                                {selected.pHArray[0].creditorcacertificate != null && selected.pHArray[0].creditorcacertificate != '' && <Row className="mt-4">
                                    <strong> CA Certificate</strong>

                                    {selected.pHArray.map((file, index) => {


                                        let currentImg1 = ''

                                        for (const key in ImageIcons) {
                                            const currentUrlArr = file?.creditorcacertificate?.name?.split('.');
                                            if (currentUrlArr == undefined) break
                                            if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                                                currentImg1 = ImageIcons[key];
                                                break;
                                            }
                                        }

                                        return <div key={index}>
                                            {file?.creditorcacertificate != '' && file?.creditorcacertificate != null &&
                                                <Col md="6">
                                                    <Card className="mb-2">

                                                        <CardBody className="attachment-card-body" style={{ background: 'rgba(0, 0, 0, 0.05)', height: "80px" }}>
                                                            <div className="attachment-icon d-flex">
                                                                <img src={currentImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(file?.creditorcacertificate)} />&nbsp;
                                                                <span style={{
                                                                    display: "block",/* or inline-block */
                                                                    textOverflow: "ellipsis",
                                                                    wordWrap: "break-word",
                                                                    overflow: "hidden",
                                                                    maxHeight: "3.9em",
                                                                    lineHeight: "1.8em"
                                                                }}>{file?.creditorcacertificate?.name}</span>
                                                            </div>

                                                        </CardBody>
                                                    </Card>
                                                </Col>


                                            }
                                        </div>
                                    }
                                    )}
                                </Row>}

                                <Row>
                                    <h4 className="mt-4">Feedback Question</h4>
                                    <div className="existing-reviews flex-wrap align-items-center">
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', background: '#f2f2f2', color: '#74788d' }}>Questions</th>
                                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', background: '#f2f2f2', color: '#74788d' }}>Response</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selected.defaulterEntry?.debtor.ratings.map((review, index) => (
                                                        <tr key={index}>
                                                            {review?.question != null && review.question.questionType !== "RATING" && (
                                                                <>
                                                                    <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'middle', textAlign: 'left', width: '80%' }}>{review.question.questionDesc || ''}</td>
                                                                    <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'middle', textAlign: 'left', width: '20%' }}>{review.response}</td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" className="mt-4">
                        <h4>Buyer Attachments</h4>
                        <Card className="mb-3 mt-1" >

                            <CardBody>
                                <h4>Payment History</h4>
                                <div className="table-responsive" >
                                    <Table className="table align-middle table-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                {/* <th>Type</th> */}
                                                <th>Amount</th>
                                                <th>Payment Method</th>
                                                <th>Bank Name</th>

                                                <th>Account No.</th>
                                                <th>Cheque No.</th>
                                                <th>IFSC code</th>

                                                <th>Transaction ID</th>
                                                <th>Create on</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selected.pHArray.map((item) => {
                                                if (item.requestor == 'DEBTOR') {
                                                    if (item.disputeType == "DISPUTE_TYPE1") return
                                                    if (item.disputeType == "DISPUTE_TYPE2") return
                                                    if (item.disputeType == "DISPUTE_TYPE3") return
                                                    return <tr key={item}>
                                                        <td>{(item.paymentDate)}</td>
                                                        {/* <td>Bank Deposit</td> */}
                                                        <td className="text-right">{numberFormat(item.amtPaid)}</td>
                                                        <td>{item.paymentMode}</td>
                                                        <td>{item.bankName}</td>

                                                        <td>{item.bankAccNumber}</td>
                                                        <td>{item.chequeNumber}</td>
                                                        <td>{item.ifsc}</td>

                                                        <td>{item.transactionId}</td>
                                                        <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                                                    </tr>
                                                }

                                            })}

                                            {/* Add more rows as needed */}
                                        </tbody>
                                    </Table>
                                </div>
                                <h4 className="mt-4">Reason For Dispute</h4>

                                <div className="file-list">
                                    {selected.pHArray.map((file, index) => {
                                        if (file.requestor == 'DEBTOR') {
                                            if (file.disputeType !== '') return null; // Skip non-Record Payment files
                                            return <FileDisplay key={index} file={file} documentView={documentView} />;
                                        }

                                    })}
                                </div>

                                <div className="file-list">
                                    {selected.pHArray.map((file, index) => {
                                        if (file.disputeType != 'DISPUTE_TYPE1') return
                                        return <FileDisplayTwo key={index} file={file} selected={selected} numberFormat={numberFormat} documentView={documentView} />;
                                    })}
                                </div>

                                <div className="file-list">
                                    {selected.pHArray.map((file, index) => {
                                        if (file.disputeType != 'DISPUTE_TYPE2') return

                                        let currentImg1 = ''

                                        for (const key in ImageIcons) {
                                            const currentUrlArr = file.debtorcacertificate?.name?.split('.');
                                            if (currentUrlArr == undefined) break
                                            if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                                                currentImg1 = ImageIcons[key];
                                                break;
                                            }
                                        }
                                        return <>
                                            <div className="file-container">
                                                <div className="file-header">
                                                    <div><strong>Dispute Type : </strong><span style={{ display: 'flex' }}>SELLER HAS NOT GIVEN INPUT CREDIT FOR INVOICE RAISED</span></div>
                                                    <span style={{ display: 'inline-block' }}>Documents Uploaded On :- {moment(file.debtorcacertificate?.createdAt).format("DD-MM-YYYY")}</span>
                                                </div>
                                                <div className="buyer-remarks"><strong>CA Attachments</strong></div>
                                                <div className="attachments-container">
                                                    {file?.debtorcacertificate != '' && file?.debtorcacertificate != null &&
                                                        <Col md="6">
                                                            <Card className="mb-2">

                                                                <CardBody className="attachment-card-body">
                                                                    <div className="attachment-icon d-flex">
                                                                        <img src={currentImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(file.debtorcacertificate)} /> &nbsp;
                                                                        <span style={{
                                                                            display: "block",/* or inline-block */
                                                                            textOverflow: "ellipsis",
                                                                            wordWrap: "break-word",
                                                                            overflow: "hidden",
                                                                            maxHeight: "3.9em",
                                                                            lineHeight: "1.8em"
                                                                        }}>{file?.debtorcacertificate?.name}</span>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>


                                                    }
                                                </div>
                                                {file.debtoradditionaldocuments.length > 0 && <OtherDocuments file={file} documentView={documentView} />}
                                                {/* <div className="buyer-remarks">
                                                            <strong>Buyer Remarks</strong>
                                                            <p>{file.debtorRemarks}</p>
                                                        </div> */}
                                            </div>
                                        </>

                                    })}
                                </div>




                                <div className="file-list">
                                    {selected.pHArray.map((file, index) => {
                                        if (file.disputeType != 'DISPUTE_TYPE3') return
                                        return <>
                                            <div className="file-container">
                                                <div className="file-header">
                                                    <div><strong>Dispute Type : </strong><span style={{ display: 'flex' }}> ANY OTHER REASONS</span>
                                                    </div>
                                                    <span style={{ display: 'inline-block' }}>Documents Uploaded On :- {moment(file.supportingDocuments?.[0]?.createdAt).format("DD-MM-YYYY")}</span>
                                                </div>

                                                {file.otherDisputeReasons?.length > 0 && (<>
                                                    <div className=""><strong>Reason</strong></div>
                                                    <div className="">
                                                        {file.otherDisputeReasons?.map((value, i) => {


                                                            return <Col xs={12} key={i} className="">{i + 1}. {value}</Col>
                                                        })}
                                                    </div></>)}
                                                {file?.debtorcacertificate != '' && file?.debtorcacertificate != null &&
                                                    <CAAttchment file={file} documentView={documentView} />
                                                }
                                                {file.debtoradditionaldocuments.length > 0 && < OtherDocuments file={file} documentView={documentView} />}

                                                <div className="" style={{}}>
                                                    <strong >Buyer Remarks</strong>
                                                    <p>{file.debtorRemarks}</p>
                                                </div>

                                                <div className="buyer-remarks"><strong>Attachments</strong></div>
                                                <div className="attachments-container">
                                                    {file?.supportingDocuments?.length > 0 && file.supportingDocuments?.map((value, i) => {


                                                        let currentImg1 = ''

                                                        for (const key in ImageIcons) {
                                                            const currentUrlArr = value.name?.split('.');
                                                            if (currentUrlArr == undefined) break
                                                            if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                                                                currentImg1 = ImageIcons[key];
                                                                break;
                                                            }
                                                        }
                                                        return (
                                                            <Col md="6" key={i}>
                                                                <Card className="mb-2">

                                                                    <CardBody className="attachment-card-body ">
                                                                        <div className="attachment-icon d-flex">
                                                                            <img src={currentImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(value)} /> &nbsp;
                                                                            <span style={{
                                                                                display: "block",/* or inline-block */
                                                                                textOverflow: "ellipsis",
                                                                                wordWrap: "break-word",
                                                                                overflow: "hidden",
                                                                                maxHeight: "3.9em",
                                                                                lineHeight: "1.8em"
                                                                            }}>{value.name}</span>
                                                                        </div>

                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    }
                                                    )

                                                    }
                                                </div>
                                            </div>
                                        </>

                                    })}
                                </div>

                                {/*  <div className="file-list">
                                    {selected.pHArray.map((file, index) => {
                                        return <>
                                            <div className="file-container">
                                                <div className="file-header">
                                                    <div><strong>CA Certificate</strong><span style={{ display: 'flex' }}></span></div>
                                                    <span style={{ display: 'inline-block' }}>Documents Uploaded On :- {moment(file.debtorcacertificate?.createdAt).format("DD-MM-YYYY")}</span>
                                                </div>
                                                <div className="buyer-remarks"><strong>Attachments</strong></div>
                                                <div className="attachments-container">
                                                    {file?.debtorcacertificate != '' && file?.debtorcacertificate != null &&
                                                        <Col md="6">
                                                            <Card className="mb-3">

                                                                <CardBody className="attachment-card-body">
                                                                    <div className="attachment-icon d-flex">
                                                                        <a href={file?.debtorcacertificate?.url} rel='noreferrer' target='_blank'>

                                                                            <i className="far fa-file-pdf fa-2x text-danger"></i>
                                                                        </a> &nbsp;
                                                                        <span style={{
                                                                            display: "block",
                                                                            textOverflow: "ellipsis",
                                                                            wordWrap: "break-word",
                                                                            overflow: "hidden",
                                                                            maxHeight: "3.9em",
                                                                            lineHeight: "1.8em"
                                                                        }}>{file?.debtorcacertificate?.name}</span>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>


                                                    }
                                                </div>
                                            </div>
                                        </>

                                    })}
                                </div> */}

                                {/*  <div className="file-list">
                                    {selected.pHArray.map((file, index) => {
                                        if (file?.debtoradditionaldocuments?.length == 0) return
                                        return (file?.debtoradditionaldocuments?.length > 0 && <>
                                            <div className="file-container">
                                                <div className="file-header">
                                                    <strong>Other Documents / Payment Record Document</strong>
                                                    <span style={{ display: 'inline-block' }}>Documents Uploaded On :- {moment(file.debtoradditionaldocuments?.[0]?.createdAt).format("DD-MM-YYYY")}</span>
                                                </div>
                                                <div className="buyer-remarks"><strong>Attachments</strong></div>
                                                <div className="attachments-container">
                                                    {file.debtoradditionaldocuments?.map((value, i) => (
                                                        <Col md="6" key={i}>
                                                            <Card className="mb-3">

                                                                <CardBody className="attachment-card-body" style={{ background: 'rgba(0, 0, 0, 0.05)', height: "80px" }}>
                                                                    <div className="attachment-icon d-flex">
                                                                        <a href={value.url} rel='noreferrer' target='_blank'>
                                                                            
                                                                            <i className="far fa-file-pdf fa-2x text-danger"></i>
                                                                        </a> &nbsp;
                                                                        <span style={{
                                                                            display: "block",
                                                                            textOverflow: "ellipsis",
                                                                            wordWrap: "break-word",
                                                                            overflow: "hidden",
                                                                            maxHeight: "3.9em",
                                                                            lineHeight: "1.8em"
                                                                        }}>{value.name}</span>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    ))
                                                    }
                                                </div>
                                                <div className="buyer-remarks">
                                                    <strong> Buyer Remarks</strong>
                                                    <p>{file.debtorRemarks}</p>
                                                </div>
                                            </div>


                                        </>)

                                    })}
                                </div> */}



                            </CardBody>
                        </Card>
                    </Col>
                </Row>












                {
                    selected.pHArray[0].reopenReason != undefined && selected.pHArray[0].reopenReason != "" ? <Row>

                        <Col md="12" className="mt-4">
                            <h4>Reason For Reopen Ticket</h4>
                            <Card className="mb-3 shadow">
                                <CardBody className="seller-card-body">



                                    <p className="mb-2 text-capitalize">
                                        <strong className=" ">{selected.pHArray[0].requestor == "DEBTOR" ? selected?.defaulterEntry?.debtor?.companyName : selected?.defaulterEntry?.creditor?.companyName}:</strong> &nbsp;
                                        <span className="">{selected.pHArray[0].reopenReason}</span>
                                    </p>

                                </CardBody>
                            </Card>
                        </Col>


                    </Row> : ""
                }












                <Row>

                    <Col md="12" className="mt-4">
                        <h4>Logs</h4>
                        <Card className="mb-3 shadow">
                            <CardBody className="buyer-card-body" style={{ height: "300px", overflowY: "scroll" }}>
                                {getAllLogss != null && getAllLogss != undefined ? getAllLogss.map((item, index) => {

                                    return <Row className="d-flex p-1 mt-1 " style={{ background: "#e6f7ff" }} key={item}>
                                        <Col md={12}>
                                            <span className="text-capitalize"> {moment(item.timeStamp).format("DD/MM/YYYY")} -</span>
                                            <span className=""> {item.message}</span>
                                            {index > 0 && item?.remarks != undefined && item.message != 'Payment recorded by Buyer' && item.message != 'Payment recorded by Seller' ? <span className="text-capitalize"> {`[Admin Remarks: ${item?.remarks}]`}</span> : ''}
                                            {item.message == 'Payment recorded by Buyer' && item.remarks != '' ? <span className="text-capitalize"> {`[Buyer Remarks: ${item?.remarks}]`}</span> : ''}
                                            {item.message == 'Payment recorded by Seller' && item.remarks != '' ? <span className="text-capitalize"> {`[Seller Remarks: ${item?.remarks}]`}</span> : ''}
                                        </Col>



                                    </Row>
                                }) :
                                    <Row>
                                        <span className="text-center">No Logs Found</span>

                                    </Row>}

                            </CardBody>
                        </Card>
                    </Col>

                </Row>

                {SelectedTab != 'closeTicket' && <Row className="mt-4">
                    <Row md="4" className="mt-3" ><h3>Action</h3></Row>
                    <Row className="mt-3 align-items-center d-flex" style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                        <div className="d-flex" style={{ width: 'auto' }}>
                            <label className="visually-hidden" htmlFor="autoSizingSelect">Preference</label>
                            <Select
                                options={options}
                                value={selectedOption}
                                onChange={handleChange}
                                placeholder="Select an option"
                                styles={colourStyles}
                            />
                        </div>
                        <div style={{ fontSize: '14px', flexShrink: 'unset' }}> {definationState?.props?.children[2]}</div>
                    </Row>

                    <Row md="2" className="mt-3">
                        <Label>
                            <b>Remarks For Admin<span style={{ color: 'red' }}>*</span></b>
                            <br />
                            <Input type="textarea" placeholder="Remarks" style={{ width: "800px", height: "150px" }}

                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </Label>

                    </Row>
                    {checkRemarks && <div style={{ color: 'red' }} >Please Enter Remark</div>}
                    {selectedOption?.value != "Requesttoadditionaldocumnet" && <Row md="2" className="mt-3" >
                        <Col>
                            <Button disabled={selectedOption == null ? true : false} className="btn btn-info" onClick={() => handleActionSelect()}>Submit</Button>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>


                    </Row>}



                </Row>}



                {
                    selectedOption != null && selectedOption.value == "Requesttoadditionaldocumnet" ?
                        <div className="mb-5">

                            <Row className="mt-4">
                                <Col md={6}>
                                    <Card className="shadow-sm">
                                        <CardHeader className="bg-white">
                                            <h5 className="">Seller</h5>

                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <h5 className="">Request A Document</h5>

                                                <Col md={6}><Label>
                                                    <Input type="checkbox" style={checkboxStyle}
                                                        value="cacertificate"
                                                        onChange={handleCheckboxChanges}
                                                        checked={itemsSeller.includes("cacertificate")}
                                                    />&nbsp; CA Certificate
                                                </Label></Col>
                                                <Col md={6}>
                                                    <Label>
                                                        <Input type="checkbox" style={checkboxStyle}
                                                            value="purchaseOrderDocument"
                                                            onChange={handleCheckboxChanges}
                                                            checked={itemsSeller.includes("purchaseOrderDocument")}

                                                        />&nbsp; Purchase Order Document
                                                    </Label>
                                                </Col>
                                                <Col md={6}><Label>
                                                    <Input type="checkbox" style={checkboxStyle}
                                                        value="transportationDocument"
                                                        onChange={handleCheckboxChanges}
                                                        checked={itemsSeller.includes("transportationDocument")}
                                                    />&nbsp; Transportation Document
                                                </Label> </Col>
                                                <Col md={6}><Label>
                                                    <Input type="checkbox" style={checkboxStyle}
                                                        value="paymentRecordDocument"
                                                        onChange={handleCheckboxChanges}
                                                        checked={itemsSeller.includes("paymentRecordDocument")}
                                                    />&nbsp; Payment Record Document
                                                </Label></Col>
                                                <Col md={6}><Label>
                                                    <Input type="checkbox" style={checkboxStyle}
                                                        value="additionaldocuments"
                                                        onChange={handleCheckboxChanges}
                                                        checked={itemsSeller.includes("additionaldocuments")}
                                                    />&nbsp; Other Documents
                                                </Label></Col>

                                            </Row>

                                            <Row className="mt-3">
                                                {/* <Col md={3}></Col> */}
                                                <Col md={6} className="text-left">
                                                    <Label>
                                                        Message to user <br /> <br />
                                                        <Input type="textarea" placeholder="Enter text" style={{ width: "380px", height: "80px" }}

                                                            onChange={(e) => setnotesSeller(e.target.value)}
                                                        />
                                                    </Label>

                                                </Col>
                                                <Col md={3}></Col>
                                            </Row>

                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card className="shadow-sm">
                                        <CardHeader className="bg-white">
                                            <h5 className="">Buyer</h5>

                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <h5 className="">Request A Document</h5>

                                                <Col md={6}><Label>
                                                    <Input type="checkbox" style={checkboxStyle}
                                                        value="cacertificate"
                                                        onChange={handleCheckboxChangeBuyer}
                                                        checked={itemsBuyer.includes("cacertificate")}
                                                    />&nbsp; CA Certificate
                                                </Label></Col>
                                                {/* <Col md={6}>
{/* <Label> 
<Input type="checkbox" style={checkboxStyle}/>&nbsp; Purchase Order Document 
</Label> */}
                                                {/* </Col>
<Col md={6}><Label> 
<Input type="checkbox" style={checkboxStyle}/>&nbsp; Transportation Document 
</Label> </Col> */}
                                                {/* <Col md={6}><Label>
                                                <Input type="checkbox" style={checkboxStyle}
                                                    value="PaymentRecord"
                                                    onChange={handleCheckboxChangeBuyer}
                                                    checked={itemsBuyer.includes("PaymentRecord")}

                                                />&nbsp; Payment Record Document
                                            </Label></Col> */}

                                                <Col md={6}><Label>
                                                    <Input type="checkbox" style={checkboxStyle}
                                                        value="additionaldocuments"
                                                        onChange={handleCheckboxChangeBuyer}
                                                        checked={itemsBuyer.includes("additionaldocuments")}
                                                    />&nbsp; Other Documents / Payment Record Document
                                                </Label></Col>

                                            </Row>

                                            <Row className="mt-5">
                                                {/* <Col md={3}></Col> */}
                                                <Col md={6} className="text-left">
                                                    <Label>
                                                        Message to user <br /> <br />
                                                        <Input type="textarea" placeholder="Enter text" style={{ width: "380px", height: "80px" }}
                                                            onChange={(e) => setnotesBuyer(e.target.value)}
                                                        />
                                                    </Label>

                                                </Col>
                                                <Col md={3}></Col>
                                            </Row>


                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                {/* <Col md={5}></Col> */}
                                <Col md={4}>
                                    <Button className="btn btn-info" disabled={itemsSeller.length == 0 && itemsBuyer.length == 0 ? true : false} onClick={() => handleRequestedDoc()}>Request Document</Button>
                                </Col>
                                <Col md={5}></Col>
                            </Row>
                        </div>
                        :

                        <div className="mb-5 h-50vh">
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                }

                <ToastContainer />
            </div></>

    )
}

export const FileDisplay = ({ file, documentView }) => {



    return (
        <div className="file-container">
            <div className="file-header">
                <div><strong>Dispute Type:</strong> PAYMENT RECORDED</div>
                {file.attachments?.[0] && <span style={{ display: 'inline-block' }}>Documents Uploaded On: {moment(file.attachments?.[0]?.createdAt).format("DD-MM-YYYY")}</span>}
            </div>
            <div className="">
                <strong>Buyer Remarks</strong>
                <p>{file.debtorRemarks}</p>
            </div>
            <div className="buyer-remarks"><strong>Attachments</strong></div>
            <div className="attachments-container">
                {file.attachments?.map((value, i) => {

                    let currentImg1 = ''

                    for (const key in ImageIcons) {
                        const currentUrlArr = value.name?.split('.');
                        if (currentUrlArr == undefined) break
                        if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                            currentImg1 = ImageIcons[key];
                            break;
                        }
                    }

                    return (
                        <Card key={i} className="attachment-card">
                            <CardBody className="attachment-card-body">
                                <div className="attachment-icon">
                                    <img src={currentImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(value)} />
                                    <span className="attachment-name">{value.name}</span>
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
            {file?.debtorcacertificate != '' && file?.debtorcacertificate != null &&
                <CAAttchment file={file} documentView={documentView} />
            }
            {file.debtoradditionaldocuments.length > 0 && < OtherDocuments file={file} documentView={documentView} />}

        </div>
    );
};
export const FileDisplayTwo = ({ file, numberFormat, documentView }) => {
    return (
        <div className="file-container">
            <div className="file-header">
                <div><strong>Dispute Type: </strong><span style={{ display: 'flex' }}>DISPUTED AMOUNT IS LESS THAN THAT CLAIMED BY SELLER</span></div>

                <span style={{ display: 'inline-block' }}>Documents Uploaded On: {file?.paymentDate}</span>
            </div>
            <div className="">
                <strong>Buyer Remarks</strong>
                <p>{file.debtorRemarks}</p>
            </div>
            <div className="buyer-remarksTwo"><div><strong>Difference amount as per your claim:  </strong> {numberFormat(file?.totalAmtAsPerDebtor)}</div></div>
            <div className="attachments-container">
                <div className="table-responsive">
                    <Table bordered>
                        <tbody>
                            {file.disputedInvoiceSupportingDocuments?.map((item, index) => (
                                <tr key={index}>
                                    <td colSpan={3}>
                                        <Row className="p-3">
                                            <Col xs={12} sm={4}>
                                                <strong>{index + 1}. Invoice No: {item.invoice?.invoiceNumber}</strong>
                                            </Col>
                                            <Col xs={12} sm={4}>
                                                <strong>Due Amount: {numberFormat(item.invoice?.subTotal)}</strong>
                                            </Col>
                                            <Col xs={12} sm={4}>
                                                <strong style={{ display: 'flex', alignItems: 'center', alignItems: 'flex-start' }}><span>Due From:</span> {DueSinceApprove(item.invoice?.dueDate)}  </strong>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="buyer-remarks"><strong>Attachments</strong></div>
                                        </Row>
                                        <Row >
                                            {item.documents?.map((doc, idx) => {
                                                let currentImg1 = ''

                                                for (const key in ImageIcons) {
                                                    const currentUrlArr = doc.name?.split('.');
                                                    if (currentUrlArr == undefined) break
                                                    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                                                        currentImg1 = ImageIcons[key];
                                                        break;
                                                    }
                                                }

                                                return (

                                                    <Card key={idx} className="attachment-card">
                                                        <CardBody className="attachment-card-body">
                                                            <div className="attachment-icon">
                                                                <img src={currentImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(doc)} />
                                                                <span className="attachment-name">{doc.name}</span>
                                                            </div>
                                                        </CardBody>
                                                    </Card>

                                                )
                                            })}
                                        </Row>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            {file?.debtorcacertificate != '' && file?.debtorcacertificate != null &&
                <CAAttchment file={file} documentView={documentView} />
            }
            {file.debtoradditionaldocuments.length > 0 && < OtherDocuments file={file} documentView={documentView} />}

        </div>
    );
};


const DueSinceApprove = (newdata) => {


    const valueFordate = newdata != null && newdata != undefined ? newdata : ''

    const today = new Date();
    const daysSince = daysSinceRefe(valueFordate, today);

    const newDate = valueFordate != undefined ? valueFordate.split("-").reverse().join("-") : "";
    const currentDate = new Date(valueFordate);
    let e = ""

    const calculateDateDifference = () => {
        const differenceInMilliseconds = today - currentDate;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        e = differenceInDays
        return differenceInDays;

    };
    const divStyle = {
        padding: '3px' // Adjust the padding value as needed
    };

    const containerStyle = {
        fontSize: "14px",
        width: "100%",
        maxWidth: "100px",
        boxSizing: "border-box",
    };

    return (
        <div style={containerStyle}>
            <div className="text-center">
                <div className="text-capitalize">{newdata ? moment(newdata).format('DD-MM-YYYY') : ''}</div>
                <div className="text-capitalize ">
                    {calculateDateDifference()} <span className="ml-1">Days</span>
                </div>
            </div>
        </div>
    );
};


export const CAAttchment = ({ file, documentView }) => {

    let currentImg1 = ''

    for (const key in ImageIcons) {
        const currentUrlArr = file?.debtorcacertificate?.name?.split('.');
        if (currentUrlArr == undefined) break
        if (key === currentUrlArr[currentUrlArr?.length - 1]) {
            currentImg1 = ImageIcons[key];
            break;
        }
    }

    return (<>
        <div className="buyer-remarks"><strong>CA Attachments</strong></div>
        <div className="attachments-container">
            <Col md="6">
                <Card className="mb-2">

                    <CardBody className="attachment-card-body">
                        <div className="attachment-icon d-flex">
                            <img src={currentImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(file?.debtorcacertificate)} />&nbsp;
                            <span style={{
                                display: "block",
                                textOverflow: "ellipsis",
                                wordWrap: "break-word",
                                overflow: "hidden",
                                maxHeight: "3.9em",
                                lineHeight: "1.8em"
                            }}>{file?.debtorcacertificate?.name}</span>
                        </div>

                    </CardBody>
                </Card>
            </Col>


        </div>
    </>)
}

export const OtherDocuments = ({ file, documentView }) => {



    return (<>
        <div className="buyer-remarks"><strong>Other Documents / Payment Record Document</strong></div>
        <div className="attachments-container">
            {file.debtoradditionaldocuments?.map((value, i) => {
                let currenttImg1 = ''

                for (const key in ImageIcons) {
                    const currentUrlArr = value.name?.split('.');
                    if (currentUrlArr == undefined) break
                    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                        currenttImg1 = ImageIcons[key];
                        break;
                    }
                }

                return (
                    <Col md="6" key={i}>
                        <Card className="mb-2">

                            <CardBody className="attachment-card-body">
                                <div className="attachment-icon d-flex">
                                    <img src={currenttImg1} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(value)} /> &nbsp;
                                    <span style={{
                                        display: "block",/* or inline-block */
                                        textOverflow: "ellipsis",
                                        wordWrap: "break-word",
                                        overflow: "hidden",
                                        maxHeight: "3.9em",
                                        lineHeight: "1.8em"
                                    }}>{value.name}</span>
                                </div>

                            </CardBody>
                        </Card>
                    </Col>
                )
            })
            }
        </div>
    </>)
}



const daysSinceRefe = (cellValue, referenceDate) => {

    if (cellValue != undefined) {
        // Split the date string into day, month, and year components
        const [dayStr, monthStr, yearStr] = cellValue.split('-');

        // Convert the string components into integers
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10) - 1; // Months are zero-based (0 = January, 1 = February, ...)
        const year = parseInt(yearStr, 10);

        // Create a new Date object using the parsed components
        const currentDate = new Date(year, month, day);
        const timeDifference = referenceDate - currentDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }
    return '';
};




export default LatesttransactionViewDetails
