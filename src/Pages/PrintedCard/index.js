import React, { useState, useEffect } from "react";
import { defaultLimit } from "../../utils/defaultLimit";
import { getPrintedCard, handleSearch } from "../../Redux/PrintedCard/thunk";
import PrintedCard from "./PrintedCard";
import ListingSkeleton from "../../Component/Skeleton/ListingSkeleton";
import PaginationLimit from "../../Component/Pagination/PaginationLimit";
import { useSelector, useDispatch } from "react-redux";
const PrintedCardListing = () => {
  const printedCards = useSelector((state) => state.printedCard.printedCards);
  const loading = useSelector((state) => state.printedCard.loading);
  const loadingUpdated = useSelector(
    (state) => state.printedCard.loadingUpdated
  );
  const count = useSelector((state) => state.printedCard.count);
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
        dispatch(getPrintedCard(count));
      } else {
        dispatch(handleSearch(search, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getPrintedCard(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getPrintedCard(postsPerPage));
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
          <h4 className="mb-sm-0 fw-normal">Printed Cards Listing</h4>
        </div>
        <div
          className={`${
            printedCards?.length > 0 ? "office-card-body" : "card-body"
          }`}
        >
          <div className="row m-0 p-0">
            {printedCards?.length > 0 && (
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
            <PrintedCard
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

export default PrintedCardListing;
