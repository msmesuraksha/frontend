import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
        str === "" || str === undefined ? "" : str.toLowerCase()
    );
};

const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const SrNo = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{console.log("CONSOLEEEEEE>>>EEE", cell)}</Link>
    );
};
const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(value);

const Amount = (cell) => {
    return cell.value ? numberFormat(cell.value) : '';
};

const DateFormat = (cell) => {
    return cell.value ? moment(cell.value).format("DD-MM-YYYY") : '';
};

const GstNO = (cell) => {
    return cell.value ? cell.value : '';
};

const Pancard = (cell) => {
    return cell.value ? cell.value : '';
};

const CompanyName = (cell) => {
    return cell.value ? <span className="text-capitalize">{cell.value}</span> : '';
};

const Status = (cell) => {
    return (
        <Badge
            className={"font-size-11 badge-soft-" +
                (cell.value === "Active" ? "success" : "danger")}
        >
            {cell.value}
        </Badge>
    )
};
const PaymentMethod = (cell) => {
    return (
        <span>
            <i
                className={
                    (cell.value === "Paypal" ? "fab fa-cc-paypal me-1" : "" ||
                        cell.value === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
                            cell.value === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
                                cell.value === "Visa" ? "fab fa-cc-visa me-1" : ""
                    )}
            />{" "}
            {cell.value}
        </span>
    )
};
export {
    CheckBox,
    SrNo,
    CompanyName,
    GstNO,
    Pancard,
    Status,
    PaymentMethod,
    Amount,
    DateFormat
};