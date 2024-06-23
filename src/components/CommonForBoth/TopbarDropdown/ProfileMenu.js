import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = props => {
  function capitalizeWords(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("");
  // function capitalizeWords(str) {
  //   return str.replace(/\b\w/g, (match) => match.toUpperCase());
  // }
  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {

        const obj = JSON.parse(sessionStorage.getItem("authUser"));
        setusername(capitalizeWords(obj.name));
      }
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >

          <div className="d-flex">
            <i className='bx bxs-user-circle' style={{ fontSize: "35px", marginTop: '20px' }}></i>  &nbsp;
            <span style={{ marginTop: '25px' }} >{JSON.parse(sessionStorage.getItem("authUser")).name}</span>&nbsp;
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" style={{ fontSize: "15px", marginTop: '25px' }} />&nbsp;
          </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem> */}


          <Link to="/Settings" className="dropdown-item">
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            <span>{props.t("Setting")}</span>
          </Link>

          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
