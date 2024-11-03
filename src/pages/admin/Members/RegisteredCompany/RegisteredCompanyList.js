import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import * as moment from "moment";

import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";
import { RegisteredCompanyData } from "../../../../common/data/registeredcompanyData";
import { getcompanyList as ongetcompanyList } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
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
import {
  CheckBox,
  SrNo,
  CompanyName,
  GstNO,
  Pancard,
  Status,
  PaymentMethod,
  Amount,
  DateFormat
} from "./RegCompanyCol";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";

import TableContainer from "../../../../components/Common/TableContainer";
import RegCompanyViewModal from "./RegCompanyViewModal";
import { Country, State, City } from 'country-state-city';

import { Spinner } from "pages/admin/spinner/spinner";

import { ExportFileComponent } from "pages/exportFile/exportFileComponent";

import { SelectCompanyList } from "store/member-list/memberlist.selecter";

const RegisteredCompanyList = props => {

  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);


  const companyList = useSelector(SelectCompanyList)

  const { loading } = useSelector(state => ({ loading: state.MemberList.loading })
  );

  const columns = useMemo(
    () => [
      {
        Header: "SR.No",
        accessor: "Srno",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;
        },
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {cellProps.cell.row.original.companyName}
          </div>;;
        },
      },
      {
        Header: "Mobile No.",
        accessor: "customerMobile",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <GstNO {...cellProps} />;
        },
      },
      {
        Header: "GST No.",
        accessor: "gstin",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <GstNO {...cellProps} />;
        },
      },
      {
        Header: "Pan Card No.",
        accessor: "companyPan",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Pancard {...cellProps} />;
        },
      },
      {
        Header: " Due Amount",
        accessor: "totalAmount",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div className=" text-end">
            <Amount {...cellProps} />
          </div>


        },
      },
      {
        Header: "JOINED ON",
        accessor: "joinedOn",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          //console.log("cellPropscellProps", cellProps)
          return <div style={{ width: "90px" }}>{moment(cellProps.cell.row.original.joinedOn).format("DD-MM-YYYY")}</div>
        },
      },
      {
        Header: "city",
        accessor: "city",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {cellProps.cell.row.original.city}
          </div>;
        },
      },
      {
        Header: "State",
        accessor: "state",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {cellProps.cell.row.original.state}
          </div>;
        },
      },
      {
        Header: "Created By",
        accessor: "createdRole",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div>
            {cellProps.cell.row.original.createdRole != undefined ? cellProps.cell.row.original.createdRole : ''}
          </div>;
        },
      },


    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ongetcompanyList());
  }, []);

  const adminRole = sessionStorage.getItem('adminRole')
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Company List" breadcrumbItem="Company List" />
          <RegCompanyViewModal isOpen={modal1} toggle={toggleViewModal} />
          {loading == false ? <Spinner /> : <Card>
            <CardBody>
              <TableContainer
                columns={columns}
                // data={arr != undefined? arr : []}
                data={companyList != undefined ? companyList : []}
                isGlobalFilter={true}
                isAddOptions={false}
                customPageSize={20}
                ExportFile={true}
              url = {"/api/admin/downloadAllCompaniesDateWise"}
              fileName={"AllCompanyList"}
              />
            </CardBody>
          </Card>}
        </Container>
      </div>
    </React.Fragment>
  );
};

RegisteredCompanyList.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(RegisteredCompanyList);
