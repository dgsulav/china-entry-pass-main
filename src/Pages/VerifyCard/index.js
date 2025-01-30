import React, { useState, useEffect } from "react";
import { defaultLimit } from "../../utils/defaultLimit";
import {
  clearData,
  getVerifyCard,
  handleSearch,
} from "../../Redux/VerifyCard/thunk";
import VerifyCard from "./VerifyCard";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import { useSelector, useDispatch } from "react-redux";
import ViewDetail from "./ViewDetail";
import Modal from "../../Component/Modal";
import CreateCard from "../Card/CreateCard";

const VerifyCardListing = () => {
  const {
    verifyCards,
    loading,
    loadingUpdated,
    count,
    edit,
    verifyCard: masterData,
  } = useSelector((state) => state.verifyCard);

  const search = useSelector((state) => state.search.search);
  const permissions = useSelector((state) => state.auth.permissions);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // for editing the verified user
  const [verifyCard, setVerifyCard] = useState(false);
  // const [editForm, setEditForm] = useState(edit ? true : false);

  const [showEditModal, setShowEditModal] = useState(false);
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
        dispatch(getVerifyCard(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getVerifyCard(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getVerifyCard(postsPerPage));
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
    permissions.includes("can_verify_entrypass") || isSuperuser;

  return (
    <>
      <div className="user-card">
        <div className="header-content">
          <h4 className="mb-sm-0 fw-normal">Verified Cards Listing</h4>
        </div>
        <div
          className={`${
            verifyCards?.length > 0 ? "office-card-body" : "card-body"
          }`}
        >
          <div className="row m-0 p-0">
            {verifyCards?.length > 0 && (
              <>
                <div className="col-6">
                  <PaginationLimit
                    postsPerPage={postsPerPage}
                    setPostsPerPage={setPostsPerPage}
                  />
                </div>
              </>
            )}
          </div>
          {loading && <ListingSkeleton />}
          {loadingUpdated && <ListingSkeleton />}
          {!loading && !loadingUpdated && (
            <VerifyCard
              verifyCards={verifyCards}
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
              // used only for admin
              setShowEditModal={setShowEditModal}
              showEditModal={showEditModal}
            />
          )}
        </div>
      </div>

      {showModal && edit && (
        <Modal
          header={"Verify Card"}
          types={"setup"}
          size={"modal-xl"}
          setShowModal={setShowModal}
          showModal={showModal}
          edit={edit}
          clearAction={clearData}
        >
          <ViewDetail
            edit={edit}
            showModal={showModal}
            setShowModal={setShowModal}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
          />
        </Modal>
      )}

      {showEditModal && (
        <Modal
          header={edit ? "Update User Info" : "User Info"}
          types={"setup"}
          size={"modal-xl"}
          setShowModal={setShowEditModal}
          showModal={showEditModal}
          edit={edit}
          clearAction={clearData}
        >
          <CreateCard
            setShowModal={setShowEditModal}
            showModal={showEditModal}
            edit={edit}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            showSignatureModal={showSignatureModal}
            setShowSignatureModal={setShowSignatureModal}
            setSignatures={setSignatures}
            setSignaturesText={setSignaturesText}
            verifyCard={verifyCard}
            setVerifyCard={setVerifyCard}
            // showSignatureModal={showSignatureModal}
            signatures={signatures}
            masterData={masterData}
            loading={loading}
            loadingUpdate={loadingUpdated}
            count={count}
            type={"verifyCard"}
          />
        </Modal>
      )}
    </>
  );
};

export default VerifyCardListing;
