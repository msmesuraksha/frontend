import React, { useEffect, useState, useMemo } from "react"
import './member.css'
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
    Row,
    Col,
    CardBody,
    Card

} from "reactstrap"
import "../../admin/Common.scss"
import { useDispatch, useSelector } from "react-redux";

import { subscribeToPackage } from "store/LatestTransaction/latestTrans.action"
import { selectLatestTansMap } from "store/LatestTransaction/latestTans.selecter"
const data = [
    {
        "service": "invoice",
        "value": ""
    },
    {
        "service": "Defaulter search",
        "value": ""
    },
    {
        "service": "Defaulter Reporting",
        "value": ""
    },
    {
        "service": "Multiple Business Registration",
        "value": ""
    },
    {
        "service": "Verification of default transaction",
        "value": ""
    },
    {
        "service": "Verification of payment transaction",
        "value": ""
    },
    {
        "service": "View detailed history of defaulter company transactions",
        "value": ""
    },
    {
        "service": "Recovery Services - Online Advertising",
        "value": ""
    },
    {
        "service": "Recovery Services - Legal Service",
        "value": ""
    },
    {
        "service": "Multiple Employee Logins",
        "value": ""
    },

]

const CreatePlanModel = props => {
    const [individual, setIndividual] = useState(false)
    const [isPaid, setisPaid] = useState(false)
    const { isOpen, toggle } = props
    const [dataTable, setDataTable] = useState(data)
    const dispatch = useDispatch();

    const dummyRow = [
        {
            "service": "",
            "value": ""
        }
    ]

    const handleAddRow = () => {
        setDataTable((prevData) => [...prevData, ...dummyRow]);
    }

    const handleRemove = (index) => {
        setDataTable((prevData) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
        });
    };
    const [name, setName] = useState('');

    const [monthlyAmt, setmonthlyAmt] = useState('');
    const [yearlyAmt, setYearlyAmt] = useState('')
    const [monthlyDiscount, setmonthlyDiscount] = useState('')
    const [yearlyDiscount, setyearlyDiscount] = useState('')

    useEffect(() => {

    }, [])



    const submitCreatePlan = () => {
        if (isPaid == true) {
            const payload = {
                "subscriptionPkgName": name,
                "monthlyAmt": monthlyAmt,
                "yearlyAmt": yearlyAmt,
                "monthlyDiscount": "0",
                "yearlylyDiscount": "0",
                "services": [
                    {
                        "apiName": "Call",
                        "monthlyQuotaLimit": 5,
                        "yearlyQuotaLimit": 0
                    }
                ]
            }
            dispatch(subscribeToPackage(payload))
        }
        else {
            const payload = {
                "subscriptionPkgName": name,
                "monthlyAmt": monthlyAmt,
                "yearlyAmt": yearlyAmt,
                "monthlyDiscount": "0",
                "yearlylyDiscount": "0",
                "services": []

            }
            dispatch(subscribeToPackage(payload))

        }

        toggle()

    }

    const serviceNameChange = (value, index) => {

    }
    const serviceValue = (value, index) => {

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
            size="xl"
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>Create A Plan</ModalHeader>
                <ModalBody style={{ padding: '5px 80px' }}>

                    <form>
                        <Row className="mt-3">
                            <Col md={2} className="pt-2">
                                <Label className="form-label"><b className="h5">Plan Name</b></Label>
                            </Col>
                            <Col md={6}>
                                <Input
                                    className="form-control text-capitalize"
                                    placeholder="Enter Plan Name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </Col>
                            <Col md={4}></Col>
                        </Row>
                    </form>
                    {/* <Row className="mt-3" style={{ padding:'5px 10px'}}>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Services</th>
                                    <th scope="col">Values</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                               {dataTable.map((item, index)=>{
                                return  <tr key={item}>
                                    <td style={{ width:'2%'}}>
                                        #{index+1}
                                    </td>
                                <td style={{ width:'60%'}} className="text-capitalize">
                                    {item.service != ''? item.service:<>
                                    <Input
                                        className="form-control text-capitalize"
                                        placeholder= "Enter Service Name"
                                        type="text"

                                    />
                                    </>}
                                </td>
                                <td>
                                    <Input
                                        className="form-control text-capitalize"
                                        placeholder= "Enter Value"
                                        type="text"

                                    />
                                </td>
                                <td>
                                <Button className="btn btn-sm btn-danger" onClick={()=>handleRemove(index)}>
                                <i className='bx bx-trash'></i> &nbsp;  Remove
                                    </Button>
                                </td>
                            </tr>
                               })}
                               
                              
                             <tr>
                                <td></td>
                                <td>
                                    <Button className="btn btn-sm btn-info" onClick={()=>handleAddRow()}>
                                    <i className='bx bx-plus'></i> &nbsp;Add New Service
                                    </Button>
                                </td>
                               
                             </tr>

                            </tbody>
                        </table>
                    </Row> */}
                    <Row className="mt-3">
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <CardBody>
                                    <h5>                                 <Input type="radio" name="allMemberss" className="border border-dark" id="allMember" onChange={() => setisPaid(false)} />
                                        &nbsp;Free Services</h5>
                                    <br />
                                    <p> <i className='bx bx-check text-success'></i> &nbsp;Unlimited Complaints</p>
                                    <p> <i className='bx bx-check text-success'></i> &nbsp;Unlimited Verification by our team</p>
                                    <p> <i className='bx bx-x text-danger'></i> &nbsp;Calling Feature</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <CardBody>
                                    <h5> <Input type="radio" name="allMemberss" className="border border-dark" id="allMemberss" onChange={() => setisPaid(true)} />
                                        &nbsp; Paid Services</h5>
                                    <br />
                                    <p> <i className='bx bx-check text-success'></i> &nbsp;Unlimited Complaints</p>
                                    <p> <i className='bx bx-check text-success'></i> &nbsp;Unlimited Verification by our team</p>
                                    <p> <i className='bx bx-check text-success'></i> &nbsp;5 Calls Per day</p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px 10px' }} >
                        <Col md={12}>


                            <Row className=" p-2" style={{ background: '#f0f5f5' }}>

                                <Col md={2} className="pt-2"><b>Yearly Price</b></Col>
                                <Col md={3}>
                                    <Input
                                        className="form-control"
                                        placeholder="Enter Yearly Price"
                                        type="number"
                                        onChange={(e) => setYearlyAmt(e.target.value)}


                                    />
                                </Col>
                                <Col md={7}></Col>

                            </Row>
                            <Row className=" p-2" style={{ background: '#f0f5f5' }}>

                                <Col md={2} className="pt-2"><b>Monthly Price</b></Col>
                                <Col md={3}>
                                    <Input
                                        className="form-control"
                                        placeholder="Enter Monthly Price"
                                        type="number"
                                        onChange={(e) => setmonthlyAmt(e.target.value)}


                                    />
                                </Col>
                                <Col md={7}></Col>

                            </Row>
                        </Col>
                    </Row>
                    <div className="radio p-3">


                        <Row className="btn-group d-flex">
                            <Col md={4}>
                                <Label>
                                    <Input type="radio" name="allMember" className="border border-dark" id="allMember" onChange={() => setIndividual(false)} />
                                    &nbsp;&nbsp;
                                    Plan For All Members
                                </Label>
                                <br />
                                <Label>
                                    <Input type="radio" name="allMember" id="individual" className="border border-dark" onChange={() => setIndividual(true)} />
                                    &nbsp;&nbsp;
                                    Plan For Individual Member
                                </Label>
                            </Col>
                            <Col md={4} className="pt-3">
                                {individual == true ?



                                    <Input type="email" placeholder="Enter Email id" />




                                    : ""}

                            </Col>
                            <Col md={4}>
                            </Col>

                        </Row>
                    </div>

                    <Row className="mt-3 mb-3">
                        <Col md={4} className="">
                            <Button className="btn btn-info" onClick={() => submitCreatePlan()}>
                                Create Plan
                            </Button>
                        </Col>
                        <Col md={4}></Col>
                    </Row>





                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

CreatePlanModel.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default CreatePlanModel
