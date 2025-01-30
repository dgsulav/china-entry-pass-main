import React, { useState, useEffect } from "react";

import { defaultLimit } from "../../utils/defaultLimit";
import {
  renewCardClearData,
  getRenewCardRequest,
  handleSearch,
} from "../../Redux/RenewCard/thunk";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Tooltip from "../../Component/Tooltip/Tooltip";

import CreateRenewCard from "./CreateRenewCard";
import RenewCard from "./RenewCard";
import Modal from "../../Component/Modal";

const RenewCardListing = () => {
  const { loading, loadingUpdate, count, renewCards, edit } = useSelector(
    (state) => state.renewCard
  );

  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const permissions = useSelector((state) => state.auth.permissions);

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search);

  const [showModal, setShowModal] = useState(false);

  const [verifyCard, setVerifyCard] = useState(false);
  // const [editForm, setEditForm] = useState(edit ? true : false);

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatures, setSignatures] = useState([""]);
  const [signaturesText, setSignaturesText] = useState([""]);
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);

  //pagination end
  //loading all the food
  useEffect(() => {
    if (postsPerPage === 0) {
      if (search === "") {
        dispatch(getRenewCardRequest(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getRenewCardRequest(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getRenewCardRequest(postsPerPage));
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
    permissions.includes("can_create_renew") || isAdmin || isSuperuser;

  return (
    <>
      <div className="user-card">
        <div className="header-content">
          <h4 className="mb-sm-0 fw-normal">Renew Cards Listing</h4>
        </div>
        <div className="card-body">
          <div className="row m-0 p-0">
            {renewCards?.length > 0 && (
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
                        &nbsp;Add
                      </button>
                    </Tooltip>
                  )}
                </div>
              </>
            )}
          </div>
          {loading && <ListingSkeleton />}
          {/* {loadingUpdate && <ListingSkeleton />} */}
          {!loading && (
            <RenewCard
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postsPerPage={postsPerPage}
              setPostsPerPage={setPostsPerPage}
              count={count}
              showModal={showModal}
              setShowModal={setShowModal}
              maxPageNumberLimit={maxPageNumberLimit}
              setMaxPageNumberLimit={setMaxPageNumberLimit}
              minPageNumberLimit={minPageNumberLimit}
              setMinPageNumberLimit={setMinPageNumberLimit}
              search={search}
            />
          )}

          {showModal && (
            <Modal
              header={edit ? "Update User Info" : "User Info"}
              types={"renew"}
              size={"modal-xl"}
              setShowModal={setShowModal}
              showModal={showModal}
              edit={edit}
              clearAction={renewCardClearData}
            >
              <CreateRenewCard
                setShowModal={setShowModal}
                showModal={showModal}
                edit={edit}
                currentPage={currentPage}
                showSignatureModal={showSignatureModal}
                setShowSignatureModal={setShowSignatureModal}
                setSignatures={setSignatures}
                setSignaturesText={setSignaturesText}
                verifyCard={verifyCard}
                setVerifyCard={setVerifyCard}
                // showSignatureModal={showSignatureModal}
                signatures={signatures}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default RenewCardListing;
