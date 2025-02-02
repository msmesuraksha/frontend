import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import AdminRegistrationModal from '../admin/adminList/AddAdminPopup';
//import action
import { getAdminData as ongetAdminData } from "../../store/actions";
import { Link } from "react-router-dom";

import { Button, Card, CardBody, } from "reactstrap";
import { UserData } from "../../common/data/registration";
import DeleteModal from "./deleteModal";
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
  UserId,
  UserName,
  Date,
  EmailAddress,
  Status,
  SrNo,
  PaymentMethod,
  Role
} from "./registrationCol";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import TableContainer from "../../components/Common/TableContainer";
import UserViewModal from "./UserViewModal";
import { useDispatch, useSelector } from "react-redux";
import index from "pages/Dashboard-Blog";
import { useHistory, Routes, Route, useNavigate } from "react-router-dom";
const UserList = props => {
  const [modal1, setModal1] = useState(false);
  const [deletedId, setdeletedId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [admindata, setAdminData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => { setisDeleteModalOpen(!isDeleteModalOpen); };

  const toggleAdminModal = () => { setIsModalOpen(!isModalOpen); };
  const navigate = useNavigate();

  const { adminData } = useSelector(state => ({
    adminData: state.AdminList.adminData
  }));



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ongetAdminData());
    if (adminData != undefined && adminData != null && adminData.data != undefined) {

      setAdminData(adminData.data.data.response);
    }

  }, []);


  const handleEdit = (project) => {

    sessionStorage.setItem("Profile", JSON.stringify(project))
    // window.location = "/profile";
    // history.push("/profile");


  }
  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "SrNo",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <div
            className="company-name-cell"
          >
            {cellProps.data.length - cellProps.cell.row.index}
          </div>;
        },
      },

      {
        Header: "Employee ID",
        accessor: "id",
        filterable: false,
        disableFilters: true,

        Cell: cellProps => {
          return <UserId {...cellProps} />;
        },
      },
      {
        Header: "Employee Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <UserName {...cellProps} />;
        },
      },
      {
        Header: "Email Address",
        accessor: "emailId",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <EmailAddress {...cellProps} />;
        },
      },
      {
        Header: "Created Date",
        accessor: "createdAt",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Date {...cellProps} />;
        },
      },
      {
        Header: "Role",
        accessor: "adminRole",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Role {...cellProps} />;
        },
      },
      // {
      //   Header: "Status",
      //   accessor: "Status",
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: cellProps => {
      //     return <Status {...cellProps} />;
      //   },
      // },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          const project = cellProps.row.original;
          return (
            <div className="d-flex">
              <Link to="/profile"

              >
                <div className="d-flex flex-column align-items-center me-3" style={{ cursor: 'pointer' }} onClick={() => handleEdit(project)}>

                  <i
                    className="mdi mdi-pencil font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" />
                </div>
              </Link>

              <div className="d-flex flex-column align-items-center" onClick={() => deleteAdmin(project)} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );
  const deleteAdmin = (email) => {

    setdeletedId(email.emailId)
    setisDeleteModalOpen(true)
  }



  const adminRole = sessionStorage.getItem('adminRole')


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Add a Employee" breadcrumbItem="Add a Employee" />
        </Container>
        {isModalOpen && <AdminRegistrationModal isOpen={isModalOpen} toggle={toggleAdminModal} />}
        {isDeleteModalOpen && <DeleteModal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal} deletedId={deletedId} />}
        <Card>
          <CardBody>
            <TableContainer
              columns={adminRole == 'L1' ? columns.filter((value) => value.Header != 'Action') : columns}
              data={adminData != undefined && adminData.data != undefined ? adminData.data.data.response : []}
              isGlobalFilter={true}
              isAddOptions={false}
              customPageSize={20}
              isAddEmployee={true}
              toggleAdminModal={toggleAdminModal}
            />
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

UserList.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(UserList);
