import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink, Link } from "react-router-dom";
import MetisMenu from "@metismenu/react";
import SimpleBar from "simplebar-react";
import { data } from "./SidebarData";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchString } from "../../Redux/Search/actions";
const Sidebar = () => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.auth.group);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const permissionData = useSelector((state) => state.auth.permissions);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    dispatch(clearSearchString());
  };
  return (
    <div className="vertical-menu m-0 mm-active">
      <SimpleBar className="h-100 mm-show ">
        {/* <div className="">
          <form className="app-search sidebar-search d-none d-lg-block ">
            <div className="position-relative">
              <input
                type="text"
                value={search}
                className="form-control search-sidebar"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <span>
                {" "}
                <BiSearchAlt />
              </span>
            </div>
          </form>
        </div> */}

        <div id="sidebar-menu" className="mm-active">
          <MetisMenu
            className="metismenu list-unstyled"
            id="side-menu"
            toggle={true}
          >
            {search === ""
              ? data?.map((side) => {
                  const { menu, icon, menuPermission, subMenu } = side;

                  const showMenu = permissionData?.some(
                    (element) => menuPermission?.indexOf(element) !== -1
                  );


                  if (isAdmin || showMenu) {
                    return (
                      <li key={menu}>
                        <Link to="#" className="has-arrow waves-effect">
                          <i>{icon} &nbsp; </i>
                          <span>{menu}</span>
                        </Link>
                        <ul className="sub-menu">
                          {subMenu?.map((sub) => {
                            const { link, name, permission } = sub;
                            const showSubMenu = permissionData?.some(
                              (element) => permission?.indexOf(element) !== -1
                            );

                            if (isAdmin || showSubMenu) {
                              return (
                                <li key={name}>
                                  <NavLink to={link}>{name}</NavLink>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </li>
                    );
                  }
                })
              : data?.map((side) => {
                  const { menu, subMenu } = side;
                  const menuPermission = subMenu
                    ?.map((sub) => sub.permission)
                    ?.reduce((acc, pos) => acc.concat(pos));

                  const showMenu = menuPermission.includes(group)
                    ? true
                    : false;
                  if (isAdmin || showMenu) {
                    return (
                      <ul className="sub-menu" key={menu}>
                        {subMenu?.map((sub) => {
                          const { link, name, permission } = sub;
                          const showSubMenu = permission.includes(group)
                            ? true
                            : false;
                          if (isAdmin || showSubMenu) {
                            return (
                              <li key={name}>
                                <NavLink
                                  to={link}
                                  onClick={handleClick}
                                >
                                  {name}
                                </NavLink>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    );
                  }
                })}
          </MetisMenu>
        </div>
      </SimpleBar>
    </div>
  );
};

export default React.memo(Sidebar);
