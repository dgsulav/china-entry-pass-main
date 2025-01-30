import React, { useState, useEffect } from "react";
import { defaultLimit } from "../../utils/defaultLimit";
import { getRejectedCard, handleSearch } from "../../Redux/RejectedEntry/thunk";

import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import Tooltip from "../../Component/Tooltip/Tooltip";

import RejectedEntry from "./RejectedEntry";
import ViewDetail from "./ViewDetail";
import Modal from "../../Component/Modal";

const RejectedEntryListing = () => {
  const { count, loading, loadingUpdate, rejectedCards, edit, rejectedCard } =
    useSelector((state) => state.rejectedCard);

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
        dispatch(getRejectedCard(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getRejectedCard(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getRejectedCard(postsPerPage));
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
          <h4 className="mb-sm-0 fw-normal">Rejected Cards Listing</h4>
        </div>
        <div
          className={`${
            rejectedCards?.length > 0 ? "office-card-body" : "card-body"
          }`}
        >
          <div className="row m-0 p-0">
            {rejectedCards?.length > 0 && (
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
          {loadingUpdate && <ListingSkeleton />}
          {!loading && (
            <RejectedEntry
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
        </div>
        {showModal && (
          <Modal
            header={"View Rejected Card"}
            types={"setup"}
            size={"modal-xl"}
            setShowModal={setShowModal}
            showModal={showModal}
          >
            <ViewDetail
              setShowModal={setShowModal}
              showModal={showModal}
              rejectedCard={rejectedCard}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default RejectedEntryListing;
