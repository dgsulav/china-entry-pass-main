import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/nepal-government.png";
import Profile from "../../assets/profile.png";
import { FaBars, FaSignature } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { BiPowerOff } from "react-icons/bi";
import { layoutConstants } from "../../Redux/Layout/constants";
import { useSelector, useDispatch } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import {
  clearSearchString,
  updateSearchString,
} from "../../Redux/Search/actions";
import { useHistory } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
const Header = () => {
  const history = useHistory();
  const toggleSidebar = useSelector((state) => state.layout.toggleSidebar);
  const username = useSelector((state) => state.auth.username);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const search = useSelector((state) => state.search.search);
  const dispatch = useDispatch();
  const photo = useSelector((state) => state.auth.photo);
  const handleSearch = (e) => {
    const data = e.target.value.toLowerCase();
    dispatch(updateSearchString(data));
  };
  const handleClear = () => {
    dispatch(clearSearchString());
  };
  //Method which handle the logout of the user
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box d-flex">
            <Link to="/" className="logo ">
              <span className="logo-sm">
                <img src={Logo} alt="" height="30" />
              </span>
              <span className="logo-lg">
                <img src={Logo} alt="" height="40" />
              </span>
            </Link>
            <Link to="/">
              <div className="name">Nepal-China Entry / Exit Pass System</div>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 header-item waves-effect"
            id="vertical-menu-btn"
            onClick={() =>
              dispatch({
                type: layoutConstants.TOGGLE_SIDEBAR,
                payload: !toggleSidebar,
              })
            }
          >
            <i>
              <FaBars />
            </i>
          </button>
        </div>
        <div className="d-flex">
          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                value={search}
                className="form-control"
                style={{ width: "550px" }}
                placeholder="Search..."
                onChange={handleSearch}
              />
              <span className="search">
                <FaSearch />
              </span>
              {search?.length >
              (
                <span className="clear" onClick={handleClear}>
                  <BiX />
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="d-flex">
          <div className="dropdown d-inline-block">
            <button
              type="button"
              className="btn header-item waves-effect dropdown-toggle"
              id="page-header-user-dropdown "
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="rounded-circle header-profile-user"
                src={photo !== null ? photo : Profile}
                alt="Avatar"
              />
              <span
                className="d-none d-xl-inline-block ms-1 ml-2 userName"
                key="t-henry"
              >
                {username === "" ? "Guest" : username}
              </span>
              <i className=" d-none d-xl-inline-block"> </i>
            </button>
            <div
              className="dropdown-menu "
              aria-labelledby="page-header-user-dropdown"
            >
              {(isAdmin || isSuperuser) && (
                <>
                  {" "}
                  <Link to="/organization-setup" className="dropdown-item">
                    <i className=" font-size-16 me-1 mr-2 ">
                      <AiFillSetting
                        style={{
                          transform: "rotate(180deg)",
                          fontSize: " 1.1em",
                        }}
                      />
                    </i>
                    <span key="t-profile">Organization Setup</span>
                  </Link>
                </>
              )}
              <div className="dropdown-divider"></div>
              <Link to="/change-password" className="dropdown-item">
                <i className=" font-size-16 me-1 mr-2 ">
                  <RiLockPasswordFill size={20} />
                </i>
                <span key="t-profile">Change Password</span>
              </Link>
              {!isSuperuser && !isAdmin && (
                <>
                  <div className="dropdown-divider"></div>
                  <Link to="/update-signature" className="dropdown-item">
                    <i className=" font-size-16 me-1 mr-2 ">
                      <FaSignature size={20} />
                    </i>
                    <span key="t-profile">Update Signature</span>
                  </Link>
                </>
              )}
              <div className="dropdown-divider"></div>

              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={handleLogout}
              >
                <i className="  me-1 mr-2 text-danger">
                  <BiPowerOff size={20} />
                </i>
                <span key="t-logout">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
