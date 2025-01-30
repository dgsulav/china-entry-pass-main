import React, { useState, useEffect } from "react";
import { defaultLimit } from "../../utils/defaultLimit";
import { getApprovedCard, handleSearch } from "../../Redux/ApprovedCard/thunk";
import ApprovedCard from "./ApprovedCard";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import { useSelector, useDispatch } from "react-redux";
const ApprovedCardListing = () => {
  const approvedCards = useSelector(
    (state) => state.approvedCard.approvedCards
  );
  const loading = useSelector((state) => state.approvedCard.loading);
  const loadingUpdated = useSelector(
    (state) => state.approvedCard.loadingUpdated
  );
  const count = useSelector((state) => state.approvedCard.count);

  const search = useSelector((state) => state.search.search);

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
        dispatch(getApprovedCard(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getApprovedCard(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getApprovedCard(postsPerPage));
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
          <h4 className="mb-sm-0 fw-normal">Approved Cards Listing</h4>
        </div>
        <div
          className={`${
            approvedCards?.length > 0 ? "office-card-body" : "card-body"
          }`}
        >
          <div className="row m-0 p-0">
            {approvedCards?.length > 0 && (
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
            <ApprovedCard
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
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ApprovedCardListing;
