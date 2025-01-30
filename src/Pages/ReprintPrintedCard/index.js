import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import {
  getReprintPrintedCard,
  handleSearch,
} from "../../Redux/ReprintPrintedCard/thunk";
import { defaultLimit } from "../../utils/defaultLimit";
import ReprintPrintedCard from "./ReprintPrintedCard";

const ReprintPrintedCardListing = () => {
  const reprintPrintedCards = useSelector(
    (state) => state.reprintPrintedCard.reprintPrintedCards
  );
  const loading = useSelector((state) => state.reprintPrintedCard.loading);
  const loadingUpdated = useSelector(
    (state) => state.reprintPrintedCard.loadingUpdated
  );
  const count = useSelector((state) => state.reprintPrintedCard.count);
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
        dispatch(getReprintPrintedCard(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getReprintPrintedCard(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getReprintPrintedCard(postsPerPage));
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
          <h4 className="mb-sm-0 fw-normal">Reprint Printed Cards Listing</h4>
        </div>
        <div
          className={`${
            reprintPrintedCards?.length > 0 ? "office-card-body" : "card-body"
          }`}
        >
          <div className="row m-0 p-0">
            {reprintPrintedCards?.length > 0 && (
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
            <ReprintPrintedCard
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

export default ReprintPrintedCardListing;
