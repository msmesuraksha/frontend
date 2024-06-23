import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import {
    Button, Card, CardBody, Row, Col, CardHeader,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    Label,
    Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Moment from 'react-moment';
import './FeedbackQuestion.css'
import "../../admin/Common.scss"
import Select from "react-select"

import { toast, ToastContainer } from "react-toastify";

import { addFeedbackQuestionStart } from "store/addFeedbackQuestion/addFeedbackQuestion.action";
import { addFeedbackQuestionSelect } from "store/addFeedbackQuestion/addFeedbackQuestion.selecter";
import { getFeebBackQuestionList, feedbackquestionDel } from "store/feedbackquestionList/feedbackquestionList.actions";
import { getFeebBackQuestionListSelector } from "store/feedbackquestionList/feedbackquestionList.selecter";

const opationList = [
    { label: "TEXT", value: "TEXT" },
    { label: "TEXT-AREA", value: "TEXT-AREA" },
    { label: "DROP-DOWN", value: "DROP-DOWN" },
    { label: "RATING", value: "RATING" },
]

const colourStyles = {
    menuList: styles => ({
        ...styles,
        background: '#FFFFFF'
    })
}

const FeedbackQuestionModel = props => {
    const [individual, setIndividual] = useState(false)
    const dispatch = useDispatch();

    const getFeebBackQuestion = useSelector(getFeebBackQuestionListSelector)
    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        setDataTable(getFeebBackQuestion)
    }, [getFeebBackQuestion])


    const [addDataTable, setAddDataTable] = useState([])




    useEffect(() => {
        dispatch(getFeebBackQuestionList())
    }, []);


    const dummyRow = [
        {
            "questionDesc": "",
            "questionType": "",
            "values": ""
        }
    ]

    const handleAddRow = () => {
        setDataTable((prevData) => [...prevData, ...dummyRow]);
        setAddDataTable((prevData) => [...prevData, ...dummyRow]);
    }



    const handleRemove = (index, item) => {

        const newData = dataTable.filter((item, i) => i != index);
        setDataTable(newData);

        setAddDataTable((prevData) => {
            let indexValue = index - getFeebBackQuestion.length
            const newData = [...prevData];
            newData.splice(indexValue, 1);
            return newData;
        });
        dispatch(feedbackquestionDel({
            "questionId": item.id
        }))
    };
    useEffect(() => {

    }, [dataTable])

    const handleSubmitForFinalApiCall = (item) => {
        // setItems([...items, newObject]);
        setdataAForApi((prevData) => [...prevData, item]);


    }
    const Responsee = useSelector(addFeedbackQuestionSelect)


    const FinalAPICAL = () => {

        dispatch(addFeedbackQuestionStart(addDataTable))
        toast.success(Responsee)


    }


    return (
        <React.Fragment className="text-capitalize">

            <Card className="mt-5">
                <CardBody>
                    <div className="modal-content">
                        <br />
                        <br />
                        <br />
                        <ModalHeader className="ml-3">Add Feedback Question</ModalHeader>
                        <ModalBody style={{ padding: '20px 20px' }}>
                            <Row className="mt-3" style={{ padding: '5px 10px' }}>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Questions</th>
                                            <th scope="col">Question Type</th>
                                            <th scope="col">Value</th>
                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTable.map((item, index) => {
                                            return <tr key={item}>
                                                <td style={{ width: '2%' }}>
                                                    #{index + 1}
                                                </td>
                                                <QuestionSelecter item={item} indexValue={index} setAddDataTable={setAddDataTable} getFeebBackQuestion={getFeebBackQuestion} addDataTable={addDataTable} />
                                                <td>
                                                    <Button className="btn btn-sm btn-danger" onClick={() => handleRemove(index, item)}>
                                                        <i className='bx bx-trash'></i> &nbsp;  Remove
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                        <tr>
                                            <td></td>
                                            <td>
                                                <Button className="btn btn-sm btn-info" onClick={() => handleAddRow()}>
                                                    <i className='bx bx-plus'></i> &nbsp;Add New Question
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Row>
                            <div>
                                <Button onClick={() => FinalAPICAL()} className="btn btn-md btn-info" disabled={addDataTable.length == 0}>Submit</Button>
                            </div>
                        </ModalBody>
                    </div>
                </CardBody>
                <ToastContainer />
            </Card>
            <ToastContainer />
        </React.Fragment>
    );
};


const QuestionText = ({ index, addDataTable, setAddDataTable }) => {

    const [questionText, setQuestionText] = useState('')

    const setTextValue = (value, index) => {

        const newData = addDataTable.map((item, i) => {
            if (i === index) {
                return { ...item, questionDesc: value };
            }
            return item;
        });
        setAddDataTable(newData);
        setQuestionText(value);
    };

    return (
        <Input
            className="form-control text-capitalize"
            placeholder="Enter Question"
            type="text"
            value={questionText}
            onChange={(e) => setTextValue(e.target.value, index)}
        />
    )
}


const QuestionSelecter = ({ item, indexValue, setAddDataTable, getFeebBackQuestion, addDataTable }) => {

    let index = indexValue - getFeebBackQuestion.length
    const [selectQType, setSelectQType] = useState("")
    const [Integrity, setIntegrity] = useState(0)
    const [addFeedQues, setAddFeedQues] = useState()


    const handlefinancialdifficult = (selected, index) => {

        setDescription(selected, index)
        setSelectQType(selected.value)
    }

    const setDescription = (value, index) => {

        const newData = [...addDataTable]

        if (value.questionType === "selectType") {
            newData[index].questionType = value.value
            setAddDataTable(newData)
        }

        if (value.questionType === "value") {
            if (selectQType === "DROP-DOWN") {
                const valuesArray = value.value.split(',');
                newData[index].values = valuesArray
                setAddDataTable(newData)
                setAddFeedQues(valuesArray)
            } else {
                newData[index].values = value.value
                setAddDataTable(newData)
                setAddFeedQues(value.value)

            }
        }

        if (selectQType === "RATING") {
            newData[index].values = ''
            setAddDataTable(newData)
        }
    }


    return (
        <>
            <td style={{ width: '50%' }} className="text-capitalize">
                {item.questionDesc != '' ? item.questionDesc : <>
                    <QuestionText index={index} addDataTable={addDataTable} setAddDataTable={setAddDataTable} />
                </>}
            </td>
            <td>
                <Select
                    id="primaryContact"
                    className="custom-content"
                    options={opationList}
                    styles={colourStyles}
                    placeholder="Select Options"
                    onChange={(selected) => handlefinancialdifficult({
                        "questionType": "selectType",
                        "value": selected.value
                    }, index)}
                />
            </td>
            <td>
                {selectQType === "TEXT" ? (
                    <>
                        <Input
                            className="form-control text-capitalize"
                            placeholder="Enter Value"
                            type="text"
                            value={addFeedQues}
                            onChange={(e) => setDescription({
                                "questionType": "value",
                                "value": e.target.value,
                            }, index)}

                        />
                        {/* <Button className="btn btn-sm btn-info mt-1 " onClick={() => handleSubmit()}>Submit</Button> */}
                    </>

                ) : selectQType === "TEXT-AREA" ?
                    (<><textarea
                        rows={2}
                        className={`form-control custom-content`}
                        placeholder="Enter Value"
                        value={addFeedQues}
                        onChange={(e) => setDescription({
                            "questionType": "value",
                            "value": e.target.value,
                        }, index)}
                    />
                        {/* <Button className="btn btn-sm btn-info mt-1 " onClick={() => handleSubmit()}>Submit</Button> */}
                    </>
                    ) : selectQType === "RATING" ? (
                        <div className="mb-1">
                            <Col md={6}>
                                <span>
                                    <i className='bx bxs-star'
                                        onClick={(selected) => {
                                            setIntegrity(1)
                                        }
                                        }
                                        style={{ color: Integrity != 0 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                                    ></i></span>
                                <span>
                                    <i className='bx bxs-star'
                                        onClick={(selected) => {
                                            setIntegrity(2)
                                        }
                                        }
                                        style={{ color: Integrity != 0 && Integrity > 1 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                                    ></i></span>
                                <span>
                                    <i className='bx bxs-star'
                                        onClick={(selected) => {
                                            setIntegrity(3)
                                        }
                                        }
                                        style={{ color: Integrity != 0 && Integrity > 2 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                                    ></i></span>
                                <span>
                                    <i className='bx bxs-star'
                                        onClick={(selected) => {
                                            setIntegrity(4)
                                        }
                                        }
                                        style={{ color: Integrity != 0 && Integrity > 3 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                                    ></i></span>
                                <span>
                                    <i className='bx bxs-star'
                                        onClick={(selected) => {
                                            setIntegrity(5)
                                        }
                                        }
                                        style={{ color: Integrity != 0 && Integrity > 4 ? '  #ffdb4d' : 'gray', fontSize: '18px' }}
                                    ></i></span>
                                {/*  <Button className="btn btn-sm btn-info mt-1 " onClick={() => handleSubmit()}>Submit</Button> */}

                            </Col>

                        </div>
                    ) : selectQType === "DROP-DOWN" ? (
                        <>
                            <Input
                                className="form-control text-capitalize"
                                placeholder="e.g., value1, value2, value3"
                                type="text"
                                value={addFeedQues}
                                onChange={(e) => setDescription({
                                    "questionType": "value",
                                    "value": e.target.value,
                                }, index)}
                            />
                            {/* <Button className="btn btn-sm btn-info mt-1 " onClick={() => handleSubmit()}>Submit</Button> */}
                        </>
                    ) : selectQType === "" ? (<Input
                        className="form-control text-capitalize"
                        placeholder="Enter Value"
                        type="text"
                        value={addFeedQues}
                        onChange={(e) => setDescription({
                            "questionType": "value",
                            "value": e.target.value,
                        }, index)}
                    />) : ""
                }

            </td>





        </>
    )
}


export default withRouter(FeedbackQuestionModel);
