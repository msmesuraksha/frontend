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

import Select from 'react-select';
import moment from 'moment'
import { getAllLogs } from "store/LatestTransaction/latestTrans.action"
import { useSelector, useDispatch } from "react-redux"
import { SellerDocViewModule } from "../../Dashboard/sellerDocViewModule";

import { FileDisplay, FileDisplayTwo, FileDisplayDebtor, CAAttchment, OtherDocuments, ImageIcons } from "pages/Dashboard/LatesttransactionViewDetails";

import { DocumentViewModule } from "../documentViewer/documentView";

import './folder.css';

import { OneFirstCapitalizeWords } from "pages/Dashboard/LatesttransactionViewDetails";


const ApprovedTranctionModel = props => {

    const { isOpen, toggle, selected } = props

    const [sellerDocOpen, setSellerDocOpen] = useState(false)
    const [sellerDocData, setSellerDocOpenData] = useState(null)
    const getAllLogss = useSelector(getlogsSelector)
    const dispatch = useDispatch()
    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(value);
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




    useEffect(() => {
        const logsPaymenid = selected != "" ? selected.defaulterEntry?._id : ''

        dispatch(getAllLogs({
            "defaulterEntryId": logsPaymenid
        }))
    }, [selected])

    const viewDocuments = (value) => {
        setSellerDocOpen(!sellerDocOpen)
        setSellerDocOpenData(value)
    }
    const toggleUploiadFiles = () => setSellerDocOpen(!sellerDocOpen)

    const [documentViewOpen, setDocumentViewOpen] = useState(false)
    const [currentUrl, setCurrentUrl] = useState({})

    const toggleDocumentView = () => setDocumentViewOpen(!documentViewOpen)

    const documentView = (value) => {
        setCurrentUrl(value)
        toggleDocumentView()
    }

    const documentImgReturn = (imgtype) => {
        let documentImg = ''

        for (const key in ImageIcons) {
            const currentUrlArr = imgtype?.name?.split('.');
            if (currentUrlArr == undefined) break
            if (key === currentUrlArr[currentUrlArr?.length - 1]) {
                documentImg = ImageIcons[key];
                break;
            }
        }

        return documentImg

    }

    return (
        <>
            {documentViewOpen && <DocumentViewModule isOpen={documentViewOpen} toggle={toggleDocumentView} currentUrl={currentUrl} />}
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
                    <ModalHeader toggle={toggle}>Approved Transaction</ModalHeader>
                    {sellerDocOpen && <SellerDocViewModule isOpen={sellerDocOpen} toggle={toggleUploiadFiles} item={sellerDocData} />}
                    <ModalBody>

                        <div className=" p-2">
                            <Row>
                                <Col md="12">
                                    <Card className="mb-1 shadow-sm">
                                        <CardBody className="buyer-card-body">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5>
                                                            Complaint No. : <span className="text-primary">{selected != "" && selected.defaulterEntry != undefined ? selected?.defaulterEntry?.complaintNumber : ''}</span>
                                                        </h5>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h5 className="text-right">
                                                            Defaulter Entry created At: <span className="text-primary">{selected != "" && selected.defaulterEntry != undefined ? moment(selected.defaulterEntry.createdAt).format("DD-MM-YYYY") : ''}</span>
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


                            {selected != "" ? <Row>

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
                                                        return <FileDisplay key={index} file={file} documentView={documentView} requestor={"CREDITOR"} numberFormat={numberFormat} />;
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

                                            {selected.defaulterEntry?.creditoradditionaldocuments?.length > 0 && <Row className="mt-4">
                                                <div >
                                                    {selected.defaulterEntry?.creditoradditionaldocuments?.length > 0 && selected.defaulterEntry?.creditoradditionaldocuments?.map((value, i) => {

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
                                                            <Col key={i}>
                                                                <div className="file-container">
                                                                    <div className="file-header">
                                                                        <div><strong>Additional Document</strong> </div>
                                                                        {selected.defaulterEntry?.creditoradditionaldocuments[0] && <span style={{ display: 'inline-block' }}>Documents Uploaded On: {moment(selected.defaulterEntry?.creditoradditionaldocuments[0].createdAt).format("DD-MM-YYYY")}</span>}
                                                                    </div>
                                                                    <div className="file-header">
                                                                        <div><strong>Other Documents Attachments</strong> </div>
                                                                    </div>
                                                                    <Card className="mb-2">

                                                                        <CardBody className="attachment-card-body" style={{ height: "80px" }}>
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
                                                                </div>
                                                            </Col>

                                                        )
                                                    })

                                                    }
                                                </div>
                                            </Row>}
                                            {selected.defaulterEntry?.creditorcacertificate != null && selected.defaulterEntry?.creditorcacertificate != '' && <Row className="mt-4">
                                                <div>
                                                    {selected.defaulterEntry?.creditorcacertificate != '' && selected.defaulterEntry?.creditorcacertificate != null &&
                                                        <Col md="12">
                                                            <div className="file-container">
                                                                <div className="file-header">
                                                                    <div><strong>Additional Document</strong> </div>
                                                                    {selected.defaulterEntry?.creditorcacertificate.createdAt[0] && <span style={{ display: 'inline-block' }}>Documents Uploaded On: {moment(selected.defaulterEntry?.creditorcacertificate.createdAt).format("DD-MM-YYYY")}</span>}
                                                                </div>
                                                                <div className="file-header">
                                                                    <div><strong>CA Certificate Attachments</strong> </div>
                                                                </div>
                                                                <Card className="mb-2">

                                                                    <CardBody className="attachment-card-body" style={{ height: "80px" }}>
                                                                        <div className="attachment-icon d-flex">
                                                                            <img src={documentImgReturn(selected.defaulterEntry?.creditorcacertificate)} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(selected.defaulterEntry?.creditorcacertificate)} />&nbsp;
                                                                            <span style={{
                                                                                display: "block",/* or inline-block */
                                                                                textOverflow: "ellipsis",
                                                                                wordWrap: "break-word",
                                                                                overflow: "hidden",
                                                                                maxHeight: "3.9em",
                                                                                lineHeight: "1.8em"
                                                                            }}>{selected.defaulterEntry?.creditorcacertificate?.name}</span>
                                                                        </div>

                                                                    </CardBody>
                                                                </Card>
                                                            </div>
                                                        </Col>


                                                    }
                                                </div>
                                            </Row>}

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
                                                                                <td className="text-capitalize" style={{ border: '1px solid #ddd', padding: '12px', color: '#74788d' }}>
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
                                                                                <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'middle', textAlign: 'left', width: '80%' }}>{OneFirstCapitalizeWords(review.question.questionDesc) || ''}</td>
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
                                                        return <FileDisplayDebtor key={index} file={file} documentView={documentView} requestor={'DEBTOR'} numberFormat={numberFormat} />;
                                                    }
                                                })}

                                                {selected.defaulterEntry?.debtorcacertificate != '' && selected.defaulterEntry?.debtorcacertificate != null && (
                                                    <div className="file-container">
                                                        <div className="file-header">
                                                            <div><strong>Additional Document</strong></div>
                                                            {selected.defaulterEntry?.debtorcacertificate.createdAt && (
                                                                <span style={{ display: 'inline-block' }}>
                                                                    Documents Uploaded On: {moment(selected.defaulterEntry?.debtorcacertificate.createdAt).format("DD-MM-YYYY")}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <CAAttchment file={selected.defaulterEntry} documentView={documentView} />
                                                    </div>
                                                )}

                                                {selected.defaulterEntry?.debtoradditionaldocuments != null && selected.defaulterEntry?.debtoradditionaldocuments.length > 0 && (
                                                    <div className="file-container">
                                                        <div className="file-header">
                                                            <div><strong>Additional Document</strong></div>
                                                            {selected.defaulterEntry?.debtoradditionaldocuments[0]?.createdAt && (
                                                                <span style={{ display: 'inline-block' }}>
                                                                    Documents Uploaded On: {moment(selected.defaulterEntry?.debtoradditionaldocuments[0].createdAt).format("DD-MM-YYYY")}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <OtherDocuments file={selected.defaulterEntry} documentView={documentView} />
                                                    </div>
                                                )}

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
                                                                <div><strong>Dispute Type : </strong><span style={{ display: 'flex' }}>SELLER HAS NOT GIVEN GST INPUT CREDIT FOR INVOICE RAISED</span></div>
                                                                <span style={{ display: 'inline-block' }}>Documents Uploaded On :- {moment(file.debtorcacertificate?.createdAt).format("DD-MM-YYYY")}</span>
                                                            </div>
                                                            <div className="buyer-remarks"><strong>CA Certificate Attachments</strong></div>
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
                            </Row> : ""}

                            {
                                selected.defaulterEntry?.reopenReason != undefined && selected.defaulterEntry?.reopenReason != "" ? <Row>

                                    <Col md="12" className="mt-4">
                                        <h4>Reason For Reopen Ticket</h4>
                                        <Card className="mb-3 shadow">
                                            <CardBody className="seller-card-body">



                                                <p className="mb-2 text-capitalize">
                                                    <strong className=" ">{selected.defaulterEntry?.reopenRequester == "DEBTOR" ? selected?.defaulterEntry?.debtor?.companyName : selected?.defaulterEntry?.creditor?.companyName}:</strong> &nbsp;
                                                    <span className="">{selected.defaulterEntry?.reopenReason}</span>
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
                                                        {item?.remarks != undefined && item.message != 'Complaint disputed' && item.message != 'Payment recorded by Seller' ? <span className="text-capitalize"> {`[Admin Remarks: ${item?.remarks}]`}</span> : ''}
                                                        {item.message == 'Complaint disputed' && item.remarks != '' ? <span className="text-capitalize"> {`[Buyer Remarks: ${item?.remarks}]`}</span> : ''}
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






                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="secondary" onClick={toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </div>
            </Modal>
        </>



    )
}

ApprovedTranctionModel.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default ApprovedTranctionModel
