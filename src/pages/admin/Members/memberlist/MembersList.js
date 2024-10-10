import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { Button, Card, CardBody, Container } from "reactstrap";
import { MemberData } from "../../../../common/data/members";
import { getMemberData as ongetMemberData } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
// import _ from 'underscore'
import Moment from 'react-moment';
import * as moment from "moment";

// import 'moment-timezone';
import {
  SrNo,
  CustomerName,
  CompanyName,
  EmailID,
  Status,
  PhoneNumber,
  State,
  City,
  JoinedOn,
} from "./membersListCol.js";

import TableContainer from "../../../../components/Common/TableContainer";
import MembersViewModal from "./MembersViewModal.js";
import index from "pages/Dashboard-Blog";
import { userActiveDeactivateStart } from "store/MemberActiveDeactivate/memberActiveDeactivate.action";

import { CapitalizeWords } from "pages/Dashboard";

import { ExportFileComponent } from "pages/exportFile/exportFileComponent";

import { SelecMemberList } from "store/member-list/memberlist.selecter";

import { ConfirmInactiveModal } from "./memberInactivePop";

const MembersList = props => {

  const [selectedData, setselectedData] = useState();
  const [isChange, setisChange] = useState(false);
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();


  const memberData = useSelector(SelecMemberList)


  useEffect(() => {
    dispatch(ongetMemberData());
  }, []);


  const handleViewDetails = (item) => {
    setselectedData(item.original)
    toggleViewModal()

  }


  const handleActiveBtn = (item) => {
    const payload = {
      "userId": item,
      "userActivateFlag": "ACTIVE"
    }

    dispatch(userActiveDeactivateStart(payload));
    toast.success("User Activated")

    setTimeout(() => {
      dispatch(ongetMemberData());
    }, 1000);
  }

  const [currentUserId, setCurrentUserId] = useState('')
  const [inActivePop, setInActivePop] = useState(false)

  const handleDeactivateBtn = (item) => {
    setCurrentUserId(item)
    toggleInactiveModule()
  }

  const toggleInactiveModule = () => setInActivePop(!inActivePop)




  const columns = useMemo(
    () => [
      /*    {
           Header: "#",
           filterable: false,
           disableFilters: true,
           Cell: cellProps => {
             return <input type="checkbox" className="form-check-input" />;
           },
         }, */
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
        Header: "Member Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <CustomerName {...cellProps} />;
        },
      },
      {
        Header: "Company Name",
        accessor: "companyNames",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {

          return <CompanyName {...cellProps} />
        }
      },
      {
        Header: "Email Address",
        accessor: "emailId",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <EmailID {...cellProps} />;
        },
      },

      {
        Header: "Phone No.",
        accessor: "phoneNumber",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <PhoneNumber {...cellProps} />;
        },
      },
      {
        Header: "State",
        accessor: "state",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <State {...cellProps} />;
        },
      },
      {
        Header: "City",
        accessor: "city",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <City {...cellProps} />;
        },
      },
      {
        Header: "Joined On",
        accessor: "createdAt",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div style={{ width: "90px" }}>
            {/* {console.log("SPAN", cellProps.row.original.createdAt)} */}
            {/* <Moment date={cellProps.row.original.createdAt} format="DD-MM-YYYY" /> */}

            {moment(cellProps.row.original.createdAt).format("DD-MM-YYYY")}
          </div>
          // <JoinedOn {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <div >
            {cellProps.row.original?.isActiveAccount == 'ACTIVE' && <b style={{ color: '#5cd65c' }}>{cellProps.row.original?.isActiveAccount}</b>}
            {cellProps.row.original?.isActiveAccount == 'INACTIVE' && <b style={{ color: '#ff1a1a' }}>{cellProps.row.original?.isActiveAccount}</b>}
          </div>
          // <JoinedOn {...cellProps} />;
        },
      },


      {
        Header: "Action",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <div className="d-flex">
              <div className="d-flex flex-column align-items-center me-3" onClick={() => handleViewDetails(cellProps.cell.row)} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-eye font-size-16 text-primary me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="View Detail" />
              </div>
              <div className="d-flex flex-column align-items-center me-3" onClick={() => handleActiveBtn(cellProps.cell.row.original.id)} style={{ cursor: 'pointer' }} >
                <i className="mdi mdi-play font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Activate" />
              </div>
              <div className="d-flex flex-column align-items-center me-3" onClick={() => handleDeactivateBtn(cellProps.cell.row.original.id)} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-pause font-size-18 text-success mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Deactivate" />
              </div>

            </div>
          );
        },
      },
    ],
    []
  );

  const adminRole = sessionStorage.getItem('adminRole')


  return (
    <React.Fragment>
      {inActivePop && <ConfirmInactiveModal isOpen={inActivePop} toggle={toggleInactiveModule} item={currentUserId} />}
      {modal1 && <MembersViewModal isOpen={modal1} toggle={toggleViewModal} data={selectedData} />}
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Member List" breadcrumbItem="Member List" />
          <Card>
            <CardBody>
              {adminRole == 'L3' && <ExportFileComponent url={'/api/admin/downloadAllUsers'} fileName={'AllMemberList'} />}

              <TableContainer
                columns={adminRole != 'L1' ? columns : columns.filter((value) => value.Header != 'Action')}
                data={memberData != undefined && memberData != [] ? memberData : []}
                isGlobalFilter={true}
                isAddOptions={false}
                customPageSize={20}
              />
            </CardBody>
          </Card>
        </Container>
      </div>

      <ToastContainer />
    </React.Fragment>
  );
};

MembersList.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(MembersList);
