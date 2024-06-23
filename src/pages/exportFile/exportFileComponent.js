import React, { useEffect, useState, useMemo } from "react"

import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table,
    FormGroup,
    Label,
    InputGroup
} from "reactstrap"

import Select from "react-select"

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { ExportFileApi } from "./exportFileApi";


export const ExportFileComponent = ({ url, fileName }) => {

    const [selectMonth, setSelectMonth] = useState('')
    const [salutations, setsalutations] = useState([
        { label: "1 Months", value: "1m" },
        { label: "3 Months", value: "3m" },
        { label: "6 Months", value: "6m" },
        { label: "1 Year", value: "1y" },
        { label: "Custom Date", value: "CUSTOM" },

    ])

    const colourStyles = {
        menuList: styles => ({
            ...styles,
            background: '#FFFFFF'
        })

    }

    const [dateSelect, setDateSelect] = useState([]);

    const selectDate = date => {
        setDateSelect(date);
    };

    return (
        <Row className="selectionListss">
            <Col md={2}>

            </Col>
            <Col md={2}>

            </Col>
            <Col md={1}>

            </Col>
            {selectMonth != 'CUSTOM' && <Col md={3}>
            </Col>}
            <Col md={2}>
                <div className="d-inline">
                    <label
                        className="visually-hidden custom-content"
                        htmlFor="customerSelect"
                    >
                        Select Customer
                    </label>
                    <Select
                        id="primaryContact"
                        className="custom-content"
                        options={salutations}
                        styles={colourStyles}
                        onChange={selected => setSelectMonth(selected.value)}
                        placeholder="Select Month"
                    />
                </div>
            </Col>
            {selectMonth == 'CUSTOM' &&
                <Col md={3}>
                    <FormGroup className="mb-4">

                        <InputGroup>
                            <Flatpickr
                                className="form-control d-block"
                                placeholder="Start Date - End Date"
                                options={{
                                    mode: "range",
                                    dateFormat: "Y-m-d"
                                }}
                                onChange={selectDate}
                            />
                        </InputGroup>
                    </FormGroup>

                </Col>}
            <Col>
                <ExportFileApi selectMonth={selectMonth} dateSelect={dateSelect} url={url} fileName={fileName} />
            </Col>

        </Row>
    )

}