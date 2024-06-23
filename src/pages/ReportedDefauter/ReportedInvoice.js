import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";

import {
    Badge,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Table,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
  } from "reactstrap";
  import TableContainer from "../../components/Common/TableContainer";

const data =[{
    "name":"Harshit",
    "Age":'25',
    "mobile":"9928005564"
},
{
    "name":"Harshit",
    "Age":'25',
    "mobile":"9928005564"
},
{
    "name":"Harshit",
    "Age":'25',
    "mobile":"9928005564"
},
]
const columns =  [
      {
        Header: "#",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      {
        Header: "Name",
        accessor:"name",
        filterable: false,
        disableFilters: true,
        // Cell: cellProps => {
        //   return <input type="checkbox" className="form-check-input" />;
        // },
      },{
        Header: "Age",
        accessor:"Age",
        filterable: false,
        disableFilters: true,
        // Cell: cellProps => {
        //   return <input type="checkbox" className="form-check-input" />;
        // },
      },
    ]

const ReportedInvoice = props => {

  return (
    <React.Fragment>
       <div className="mb-4 h4 card-title mt-lg-4">..</div>
          <div className="mb-4   mt-lg-5"> <h5>Reported Defaulter List</h5></div>
    
          <TableContainer
            columns={columns}
            data={data}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={20}
          />
    </React.Fragment>
  );
};

ReportedInvoice.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(ReportedInvoice);
