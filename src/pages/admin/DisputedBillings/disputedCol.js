import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge } from 'reactstrap';
import InvoiceModal from "../../Dashboard/InvoicePopupModal";
import InvoicePopupWithouthAction from "../../admin/InvoicePopupWithouthAction";



const dateFormat = (date, format) => {
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
  return cell.value ? cell.value : '';
};

const Creditor = (cell) => {
  return cell.value ? cell.value : '';
};
const Debtor = (cell) => {
  return cell.value ? cell.value : '';
};
const InvoiceNo = (cell) => {
  const data = cell.cell.row.original



  const invoiceNumber = cell.value || '';

  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => {
    setModal1(!modal1);
  };


  return (

    <div>
      {/* <span>{invoiceNumber}</span>{" "} */}
      <i className="mdi mdi-eye font-size-16 text-primary me-1" onClick={toggleViewModal} />{" "}
      <InvoicePopupWithouthAction isOpen={modal1} toggle={toggleViewModal} data={data} />
    </div>
  );
};
const DueAmount = (cell) => {
  return cell.value ? cell.value : '';
};
const Status = (cell) => {
  return (
    <Badge
      className={"font-size-12 badge-soft-" +
        (cell.value === "Approved" ? "success" :
          cell.value === "Rejeted" ? "danger" : "danger")}
    >
      {cell.value}
    </Badge>
  )
};
export {
  CheckBox,
  SrNo,
  Debtor,
  Creditor,
  DueAmount,
  InvoiceNo,
  Status,
};