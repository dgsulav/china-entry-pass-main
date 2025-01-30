import React, { useState, useEffect } from "react";
import { defaultLimit } from "../../utils/defaultLimit";
import {
  getOrganizationSetup,
  handleSearch,
  organizationSetupClearAllData,
} from "../../Redux/OrganizationSetup/thunk";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Tooltip from "../../Component/Tooltip/Tooltip";
import { useHistory } from "react-router-dom";

import OrganizationSetup from "./OrganizationSetup";
import CreateOrganizationSetup from "./CreateOrganizationSetup";
import Modal from "../../Component/Modal";
const OrganizationSetupListing = () => {
  const history = useHistory();
  const count = useSelector((state) => state.organizationSetup.count);
  const loading = useSelector((state) => state.organizationSetup.loading);
  const loadingUpdate = useSelector(
    (state) => state.organizationSetup.loadingUpdate
  );
  const organizationSetup = useSelector(
    (state) => state.organizationSetup.organizationSetup
  );
  const edit = useSelector((state) => state.organizationSetup.edit);
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
        dispatch(getOrganizationSetup(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getOrganizationSetup(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getOrganizationSetup(postsPerPage));
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
      <div className="">
        <div className="header-content">
          <h4 className="mb-sm-0 fw-normal">Organization Rule</h4>
        </div>
        <div
          className={`${
            organizationSetup?.length > 0 ? "office-card-body" : ""
          }`}
        >
          <div className="row m-0 p-0">
            {organizationSetup?.length > 0 && (
              <>
                <div className="col-6 text-right">
                  <Tooltip content="Add">
                    <button
                      className="btn btn-primary waves-effect waves-light btn-sm float-end"
                      onClick={() => history.push("/create-entry-exit-pass")}
                    >
                      <FaPlus className="mb-1" />
                      &nbsp;Add
                    </button>
                  </Tooltip>
                </div>
              </>
            )}
          </div>
          {loading && <ListingSkeleton />}
          {loadingUpdate && <ListingSkeleton />}
          {!loading && (
            <OrganizationSetup
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
              header={"Set Organization Rule"}
              types={"setup"}
              size={"modal-lg"}
              setShowModal={setShowModal}
              showModal={showModal}
              edit={edit}
              clearAction={organizationSetupClearAllData}
            >
              <CreateOrganizationSetup
                setShowModal={setShowModal}
                showModal={showModal}
                edit={edit}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default OrganizationSetupListing;
