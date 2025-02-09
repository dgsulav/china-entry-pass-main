import React, { useState, useEffect, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import { clearUserData, getUser, handleSearch } from "../../Redux/User/thunk";
import User from "./User";
import { defaultLimit } from "../../utils/defaultLimit";
import { FaPlus } from "react-icons/fa";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import Tooltip from "../../Component/Tooltip/Tooltip";
import UpdatedSkeleton from "../../Component/Skeleton/UpdatedSkeleton";
// import "metismenujs/styles/metismenujs.css";
import CreateUser from "./CreateUser";
import Modal from "../../Component/Modal";

const UserListing = () => {
  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const { users, edit, loading, count } = useSelector((state) => state.user);

  const loadingUpdated = useSelector((state) => state.user.loadingUpdated);

  const search = useSelector((state) => state.search.search);
  const dispatch = useDispatch();

  // for pagination
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);

  //pagination end
  //loading all the food
  useEffect(() => {
    if (postsPerPage === 0) {
      if (search === "") {
        dispatch(getUser(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getUser(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getUser(postsPerPage));
        }
      } else {
        setCurrentPage(1);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        dispatch(handleSearch(search, postsPerPage));
      }
    }
  }, [dispatch, postsPerPage, search]);

  const addPermission =
    permissions.includes("can_create_user" || "can_update_user") ||
    isAdmin ||
    isSuperuser;

  return (
    <>
      <div className="user-card" style={{ backgroundColor: "white" }}>
        <div className="header-content">
          <h4 className="mb-sm-0 fw-normal">Users Listing</h4>
        </div>
        <div
          className={`${users?.length > 0 ? "office-card-body" : "card-body"}`}
        >
          <div className="row m-0 p-0">
            {users?.length > 0 && (
              <>
                <div className="col-6">
                  <PaginationLimit
                    postsPerPage={postsPerPage}
                    setPostsPerPage={setPostsPerPage}
                  />
                </div>
                <div className="col-6 text-right">
                  {addPermission && (
                    <Tooltip content="Add">
                      <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light btn-sm float-end"
                        onClick={() => setShowModal(true)}
                      >
                        <FaPlus className="mb-1" />
                        &nbsp;Add New
                      </button>
                    </Tooltip>
                  )}
                </div>
              </>
            )}
          </div>
          {loading && <ListingSkeleton />}
          {/* {loadingUpdated && <UpdatedSkeleton />} */}
          {!loading && !loadingUpdated && (
            <User
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postsPerPage={postsPerPage}
              setPostsPerPage={setPostsPerPage}
              count={count}
              maxPageNumberLimit={maxPageNumberLimit}
              setMaxPageNumberLimit={setMaxPageNumberLimit}
              minPageNumberLimit={minPageNumberLimit}
              setMinPageNumberLimit={setMinPageNumberLimit}
              search={search}
              setShowModal={setShowModal}
            />
          )}

          {showModal && (
            <Modal
              header={edit ? "Edit User" : "User"}
              types={"user"}
              size={"modal-xl"}
              setShowModal={setShowModal}
              showModal={showModal}
              edit={edit}
              clearAction={clearUserData}
            >
              <CreateUser
                setShowModal={setShowModal}
                showModal={showModal}
                edit={edit}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default UserListing;
