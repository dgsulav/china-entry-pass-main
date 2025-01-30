import React from "react";
import DisplayEntries from "../Pagination/DisplayEntries";
import Pagination from "../Pagination";
const index = ({
  currentPage,
  postsPerPage,
  count,
  paginate,
  handleClick,
  setCurrentPage,
  minPageNumberLimit,
  maxPageNumberLimit,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <DisplayEntries
            offset={1 + (currentPage - 1) * postsPerPage}
            limit={postsPerPage * currentPage}
            count={count}
          />
        </div>
        {postsPerPage < count && (
          <div className="col-6 text-right">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={count}
              paginate={paginate}
              handleClick={handleClick}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              minPageNumberLimit={minPageNumberLimit}
              maxPageNumberLimit={maxPageNumberLimit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default index;
