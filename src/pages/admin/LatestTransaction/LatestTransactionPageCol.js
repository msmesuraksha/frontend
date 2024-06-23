import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';

const daysSinceReference = (cellValue, referenceDate) => {
    if (cellValue) {
        const currentDate = new Date(cellValue);
        const timeDifference = referenceDate - currentDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }
    return '';
};
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

const OrderId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const BillingName = (cell) => {
    return cell.value ? cell.value : '';
};

const DueSince = (cell) => {

    //const startDate = new Date('2019-10-07'); // October 7, 2019
    const today = new Date(); // Current date

    const daysSince = daysSinceReference(cell.value, today);


    let badgeClassName = "font-size-11 badge ";
    if (daysSince > 1 && daysSince < 800) {
        badgeClassName += "bg-success text-white";
    } else if (daysSince > 800) {
        badgeClassName += "bg-warning text-dark";
    } else {
        badgeClassName += "bg-danger text-white";
    }
    const formattedDate = new Date(cell.value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const divStyle = {
        padding: '3px' // Adjust the padding value as needed
    };

    return (
        <span className={badgeClassName}>
            <div style={divStyle}>({daysSince} days)</div>
            <div style={divStyle}>{formattedDate}</div>
        </span>
    );
};

const Total = (cell) => {
    return cell.value ? cell.value : '';
};

const PaymentStatus = (cell) => {
    return (

        <Badge
            className={"font-size-11 badge-soft-" +
                (cell.value === "Paid" ? "success" : "danger" && cell.value === "Refund" ? "warning" : "danger")}
        >
            {cell.value}
        </Badge>
    )
};
const PaymentMethod = (cell) => {
    return (
        <div className="review-rating d-flex align-items-center " style={{ color: 'goldenrod', fontSize: '12px' }}>
            {renderStarRating(cell.value)}
            <h5
                className="ml-2 mb-1 mt-2 mx-2"
                style={{ color: 'goldenrod', fontSize: '14px' }} // Inline CSS
            >
                {cell.value}
            </h5>
        </div>

    )
};
export {
    CheckBox,
    OrderId,
    BillingName,
    DueSince,
    Total,
    PaymentStatus,
    PaymentMethod
};