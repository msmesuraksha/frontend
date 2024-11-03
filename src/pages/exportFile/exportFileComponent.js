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
        <Row className="selectionListss justify-content-end">


            <Col md={ selectMonth == 'CUSTOM' ? "4" : "4"} sm="12" className="mb-2 ">
                <div className="d-inline">
                  
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
                <Col md={4} sm="12" className="mb-2">
                    <FormGroup className="mb-2">

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
            <Col md={ selectMonth == 'CUSTOM' ? "4" : "4"} sm="12" className="mb-2">
                <ExportFileApi selectMonth={selectMonth} dateSelect={dateSelect} url={url} fileName={fileName} />
            </Col>

        </Row>
    )

}