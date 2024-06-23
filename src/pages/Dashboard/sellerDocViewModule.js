import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from 'moment'
/* import CurrencyFormat from 'react-currency-format'; */

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,

  Table,
  Row, Col
} from "reactstrap"

export const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);


import { ImageIcons } from "./LatesttransactionViewDetails";

import { DocumentViewModule } from "pages/admin/documentViewer/documentView";


export const SellerDocViewModule = props => {
  const { isOpen, toggle, item } = props

  const [documentViewOpen, setDocumentViewOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState({})

  const toggleDocumentView = () => setDocumentViewOpen(!documentViewOpen)

  const documentView = (value) => {
    setCurrentUrl(value)
    toggleDocumentView()
  }

  let currentImg1 = ''

  for (const key in ImageIcons) {
    const currentUrlArr = item.invoiceDocument?.name?.split('.');
    if (currentUrlArr == undefined) break
    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
      currentImg1 = ImageIcons[key];
      break;
    }
  }

  let currentImg2 = ''

  for (const key in ImageIcons) {
    const currentUrlArr = item.challanDocument?.name?.split('.');
    if (currentUrlArr == undefined) break
    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
      currentImg2 = ImageIcons[key];
      break;
    }
  }

  let currentImg3 = ''

  for (const key in ImageIcons) {
    const currentUrlArr = item.transportationDocument?.name?.split('.');
    if (currentUrlArr == undefined) break
    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
      currentImg3 = ImageIcons[key];
      break;
    }
  }

  let currentImg4 = ''

  for (const key in ImageIcons) {
    const currentUrlArr = item.purchaseOrderDocument?.name?.split('.');
    if (currentUrlArr == undefined) break
    if (key === currentUrlArr[currentUrlArr?.length - 1]) {
      currentImg4 = ImageIcons[key];
      break;
    }
  }

  return (
    <>
      {documentViewOpen && <DocumentViewModule isOpen={documentViewOpen} toggle={toggleDocumentView} currentUrl={currentUrl} />}
      <Modal
        isOpen={isOpen}
        role="dialog"
        size="xl"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <div className="modal-content">
          <ModalHeader toggle={toggle}>Documents List</ModalHeader>

          <ModalBody>

            <Row className="bg-light p-3 mt-2">
              <Row>
                <Col md={3}><strong>Invoice No. : {item.invoiceNumber}</strong></Col>
                <Col md={3}><strong>Due Date : {moment(item.dueDate).format("DD-MM-YYYY")}</strong></Col>
                <Col md={4}><strong className="d-flex">Due Amount : {numberFormat(item.remainingAmount)}</strong></Col>
                <Col md={2}>

                </Col>

              </Row>


              <Row className="mt-4">
                {
                  item.invoiceDocument !== null ? <Col md={2} className="text-center" style={{ marginLeft: '-15px' }}>
                    <Col className="d-flex justify-content-center">
                      <b>Invoice Document</b>
                    </Col>
                    <Col className='pt-2'>
                      <img src={currentImg1} className="iconsImage" style={{ cursor: 'pointer' }} onClick={() => documentView(item.invoiceDocument)} />

                    </Col>

                  </Col>
                    :
                    ""
                }


                {item.challanDocument !== null ?

                  <Col md={2} className="text-center">
                    <Col className="d-flex justify-content-center">
                      <b>Dispatch Document</b>
                    </Col>
                    <Col className='pt-2'>
                      <img src={currentImg2} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.challanDocument)} />
                    </Col>

                  </Col>
                  : ""

                }

                {item.transportationDocument !== null ?
                  <Col md={2} className="text-center">
                    <Col className="d-flex justify-content-center">
                      <b>Transportation Document</b>
                    </Col>
                    <Col className='pt-2'>
                      <img src={currentImg3} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.transportationDocument)} />
                    </Col>

                  </Col>
                  : ""

                }
                {item.purchaseOrderDocument !== null ?
                  <Col md={2} className="text-center">
                    <Col className="d-flex justify-content-center">
                      <b>Purchase Order</b>
                    </Col>
                    <Col className='pt-2'>
                      <img src={currentImg4} className="iconsImage shadow" style={{ cursor: 'pointer' }} onClick={() => documentView(item.purchaseOrderDocument)} />
                    </Col>

                  </Col>
                  : ""
                }
              </Row>
            </Row>
          </ModalBody>
        </div>
      </Modal>
    </>

  )
}


