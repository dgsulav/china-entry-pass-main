import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import { clearRole, getRole, handleSearch } from "../../Redux/Role/thunk";
import Role from "./Role";
import { defaultLimit } from "../../utils/defaultLimit";
import { FaPlus } from "react-icons/fa";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import Tooltip from "../../Component/Tooltip/Tooltip";
import UpdatedSkeleton from "../../Component/Skeleton/UpdatedSkeleton";

import CreateRole from "./CreateRole";
import Modal from "../../Component/Modal";

const RoleListing = () => {
  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const { roles, role, edit, loading, count, loadingUpdated } = useSelector(
    (state) => state.role
  );
  const { search } = useSelector((state) => state.search);

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
        dispatch(getRole(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getRole(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getRole(postsPerPage));
        }
      } else {
        setCurrentPage(1);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        dispatch(handleSearch(search, postsPerPage));
      }
    }
  }, [dispatch, postsPerPage, search]);

  return (
    <>
      <div className="user-card">
        <div className="header-content">
          <h4 className="mb-sm-0 fw-normal">Roles Listing</h4>
        </div>
        <div
          className={`${roles?.length > 0 ? "office-card-body" : "card-body"}`}
        >
          <div className="row m-0 p-0">
            {roles?.length > 0 && (
              <>
                <div className="col-6">
                  <PaginationLimit
                    postsPerPage={postsPerPage}
                    setPostsPerPage={setPostsPerPage}
                  />
                </div>
                <div className="col-6 text-right">
                  {isAdmin && isSuperuser && (
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
          {loadingUpdated && <UpdatedSkeleton />}
          {!loading && !loadingUpdated && (
            <Role
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
            <Suspense fallback={<div></div>}>
              <Modal
                header={edit ? "Edit Role" : "Role"}
                types={"role"}
                size={"modal-xl"}
                setShowModal={setShowModal}
                showModal={showModal}
                edit={edit}
                clearAction={clearRole}
              >
                <CreateRole
                  setShowModal={setShowModal}
                  showModal={showModal}
                  edit={edit}
                  role={role}
                  currentPage={currentPage}
                />
              </Modal>
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default RoleListing;
