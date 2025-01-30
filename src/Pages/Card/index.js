import React, { useState, useEffect } from "react";
import "./Card.css";
import { defaultLimit } from "../../utils/defaultLimit";
import {
  cardClearData,
  getCardRequest,
  handleSearch,
} from "../../Redux/Card/thunk";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Tooltip from "../../Component/Tooltip/Tooltip";
import Card from "./Card";
import CreateCard from "./CreateCard";
import Modal from "../../Component/Modal";
import { clearEditCardSuccessAction } from "../../Redux/Card/actions";
import { getOrganizationSetup } from "../../Redux/OrganizationSetup/thunk";

const CardListing = () => {
  const loading = useSelector((state) => state.card.loading);
  const loadingUpdate = useSelector((state) => state.card.loadingUpdate);
  const loadingCreate = useSelector((state) => state.card.loadingCreate);
  const loadingReject = useSelector((state) => state.card.loadingReject);
  const permissions = useSelector((state) => state.auth.permissions);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  const count = useSelector((state) => state.card.count);
  const card = useSelector((state) => state.card.card);
  const cards = useSelector((state) => state.card.cards);
  const edit = useSelector((state) => state.card.edit);
  const editDetails = useSelector((state) => state.card.editDetails);
  const search = useSelector((state) => state.search.search);

  const [showModal, setShowModal] = useState(false);

  const [verifyCard, setVerifyCard] = useState(false);
  // const [editForm, setEditForm] = useState(edit ? true : false);

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatures, setSignatures] = useState([""]);
  const [signaturesText, setSignaturesText] = useState([""]);

  const dispatch = useDispatch();

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
        dispatch(getCardRequest(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getCardRequest(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getCardRequest(postsPerPage));
        }
      } else {
        setCurrentPage(1);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        dispatch(handleSearch(search, postsPerPage));
      }
    }
  }, [dispatch, postsPerPage, search]);
  const addPermission = permissions.includes("can_create_entrypass");
  return (
    <>
      <div className="user-card">
        <div className="header-content">
          <h4 className="mb-sm-0 fw-normal">Pass Request Listing</h4>
        </div>
        <div
          className={`${cards?.length > 0 ? "office-card-body" : "card-body"}`}
        >
          <div className="row m-0 p-0">
            {cards?.length > 0 && (
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
                        onClick={() => {
                          dispatch(clearEditCardSuccessAction());
                          dispatch(getOrganizationSetup());
                          setShowModal(true);
                        }}
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
          {loading ? (
            <ListingSkeleton />
          ) : (
            <Card
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
              header={editDetails ? "Update User Info" : "User Info"}
              types={"card"}
              size={"modal-xl"}
              setShowModal={setShowModal}
              showModal={showModal}
              edit={edit}
              clearAction={cardClearData}
            >
              <CreateCard
                setShowModal={setShowModal}
                showModal={showModal}
                edit={edit}
                editDetails={editDetails}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                showSignatureModal={showSignatureModal}
                setShowSignatureModal={setShowSignatureModal}
                setSignatures={setSignatures}
                setSignaturesText={setSignaturesText}
                verifyCard={verifyCard}
                setVerifyCard={setVerifyCard}
                signatures={signatures}
                masterData={card}
                loading={loading}
                loadingCreate={loadingCreate}
                loadingUpdate={loadingUpdate}
                loadingReject={loadingReject}
                type={"card"}
              />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default CardListing;
