import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "../../Component/Modal";
import NoData from "../../Component/NoData/";
import PaginationBlock from "../../Component/PaginationBlock";
import Status from "../../Component/Status";
import Tooltip from "../../Component/Tooltip/Tooltip";
import { userConstants } from "../../Redux/User/constants";
import { getNext, getPageUser, getPrevious } from "../../Redux/User/thunk";
import ChangeUserPassword from "./ChangeUserPassword";
const User = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  count,
  setShowModal,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
  search,
}) => {
  // props
  const history = useHistory();
  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const users = useSelector((state) => state.user.users);
  const next = useSelector((state) => state.user.next);
  const previous = useSelector((state) => state.user.previous);
  const dispatch = useDispatch();

  // for pagination
  const [pageNumberLimit] = useState(5);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [passwordChangeId, setPasswordChangeId] = useState("");

  //change page
  const paginate = (number) => {
    dispatch(getPageUser({ number, postsPerPage }));
    setCurrentPage(number);
  };

  //handle Click
  const handleClick = (type) => {
    if (type === "previous") {
      dispatch(getPrevious(previous));
      setCurrentPage((prevState) => prevState - 1);
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    } else if (type === "next") {
      dispatch(getNext(next));
      setCurrentPage((prevState) => prevState + 1);
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  //pagination end

  //sorting end

  //edit function for the province
  const handleEdit = (id, postsPerPage) => {
    dispatch({
      type: userConstants.USER_EDIT_SUCCESS,
      payload: id,
      postsPerPage: postsPerPage,
    });
    setShowModal(true);
  };
  const addPermission =
    permissions?.includes("add_user") || isAdmin || isSuperuser;

  const handleChangePassword = (id) => {
    setPasswordChangeId(id);
    setShowPasswordChangeModal(true);
  };
  return (
    <>
      {users?.length > 0 ? (
        <div className="mt-2">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "2%" }}>
                    S.N
                  </th>

                  <th scope="col" className="text-left">
                    Username
                  </th>
                  <th scope="col" className="text-left">
                    Name
                  </th>
                  <th scope="col" className="text-left">
                    Email
                  </th>
                  <th scope="col" className="text-left">
                    Office
                  </th>
                  <th scope="col">Gender</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 &&
                  users.map((user, i) => {
                    const {
                      id,
                      username,
                      fullName,
                      office,
                      email,
                      isActive,
                      gender,
                      groups,
                      isAdmin,
                      isSuperuser,
                    } = user;

                    return (
                      <tr key={id}>
                        <th scope="row" style={{ width: "2%" }}>
                          {postsPerPage * (currentPage - 1) + (i + 1)}
                        </th>
                        <td className="text-left">
                          {username !== "" ? username : "N/A"}
                        </td>
                        <td className="text-left">
                          {fullName !== "" ? fullName : "N/A"}
                        </td>
                        <td
                          className="text-left"
                          style={{ wordBreak: "break-all" }}
                        >
                          {email}
                        </td>
                        <td className="text-left">
                          {office ? office?.name : "N/A"}
                        </td>

                        <td>
                          <span className="badge badge-success">
                            {gender === "m"
                              ? "Male"
                              : gender === "f"
                              ? "Female"
                              : "Other"}
                          </span>
                        </td>
                        <td>
                          {groups.length > 0
                            ? groups.map((value, i) => {
                                return (
                                  <span
                                    className="badge badge-success ml-1"
                                    key={i}
                                  >
                                    {value.role}
                                  </span>
                                );
                              })
                            : "N/A"}
                        </td>

                        <td>
                          <Status active={isActive} />
                        </td>

                        <td>
                          {(isSuperuser || isAdmin) && "N/A"}
                          {!isSuperuser && !isAdmin && (
                            <Tooltip content="Edit">
                              <button
                                className="btn btn-md btn-edit btn-primary mx-1"
                                onClick={() => handleEdit(id)}
                              >
                                <FaEdit size={16} />
                              </button>
                            </Tooltip>
                          )}
                          {!isAdmin && !isSuperuser && (
                            <Tooltip content="Change Password">
                              <button
                                className="btn btn-md btn-edit btn-primary mx-1"
                                onClick={() => handleChangePassword(id)}
                              >
                                <RiLockPasswordFill size={16} />
                              </button>
                            </Tooltip>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {count > 0 && (
            <PaginationBlock
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              count={count}
              paginate={paginate}
              handleClick={handleClick}
              setCurrentPage={setCurrentPage}
              minPageNumberLimit={minPageNumberLimit}
              maxPageNumberLimit={maxPageNumberLimit}
            />
          )}
        </div>
      ) : (
        <NoData
          search={search}
          onClick={() => setShowModal(true)}
          addPermission={addPermission}
        />
      )}

      {showPasswordChangeModal && (
        <Modal
          header={"Update Password"}
          types={"user"}
          size={"modal-xl"}
          setShowModal={setShowPasswordChangeModal}
          showModal={showPasswordChangeModal}
        >
          <ChangeUserPassword passwordChangeId={passwordChangeId} />
        </Modal>
      )}
    </>
  );
};

export default React.memo(User);
