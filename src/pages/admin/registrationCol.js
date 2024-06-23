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

const UserId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? "EMP-" + cell.value.slice(-5) : ''}</Link>
    );
};


const SrNo = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const UserName = (cell) => {
    return cell.value ? <span className='text-capitalize'>{cell.value}</span> : '';
};

const Date = (cell) => {
    return cell.value ? moment(cell.value).format("DD/MM/YYYY") : '';
};

const Role = (cell) => {
    return cell.value ? cell.value : '';
};

const EmailAddress = (cell) => {
    return cell.value ? cell.value : '';
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
    UserId,
    UserName,
    SrNo,
    Date,
    EmailAddress,
    Status,
    PaymentMethod,
    Role
};