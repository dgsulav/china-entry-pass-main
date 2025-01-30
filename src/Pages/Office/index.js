import React, { useState, useEffect } from "react";
import { defaultLimit } from "../../utils/defaultLimit";
import {
  getOffice,
  handleSearch,
  officeClearData,
} from "../../Redux/Office/thunk";

import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Tooltip from "../../Component/Tooltip/Tooltip";
import { useHistory } from "react-router-dom";

import Office from "./Office";
import CreateOffice from "./CreateOffice";
import Modal from "../../Component/Modal";
const OfficeListing = () => {
  const history = useHistory();
  const { count, loading, loadingUpdate, edit } = useSelector(
    (state) => state.office
  );
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const permissions = useSelector((state) => state.auth.permissions);
  const offices = useSelector((state) => state.office.offices);

  const search = useSelector((state) => state.search.search);
  const dispatch = useDispatch();

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  //pagination end
  //loading all the food
  useEffect(() => {
    if (postsPerPage === 0) {
      if (search === "") {
        dispatch(getOffice(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getOffice(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getOffice(postsPerPage));
        }
      } else {
        setCurrentPage(1);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        dispatch(handleSearch(search, postsPerPage));
      }
    }
  }, [dispatch, postsPerPage, search]);

  const addPermission = isAdmin || isSuperuser;
  return (
    <>
      <div className="user-card">
        <div className="header-content">
          <h4 className="mb-sm-0 fw-normal">Office Listing</h4>
        </div>
        <div
          className={`${
            offices?.length > 0 ? "office-card-body" : "card-body"
          }`}
        >
          <div className="row m-0 p-0">
            {offices?.length > 0 && (
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
          {loadingUpdate && <ListingSkeleton />}
          {!loading && (
            <Office
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
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}

          {showModal && (
            <Modal
              header={edit ? "Edit Office" : "Create Office"}
              types={"setup"}
              size={"modal-md"}
              setShowModal={setShowModal}
              showModal={showModal}
              edit={edit}
              clearAction={officeClearData}
            >
              <CreateOffice
                setShowModal={setShowModal}
                showModal={showModal}
                edit={edit}
                currentPage={currentPage}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default OfficeListing;
