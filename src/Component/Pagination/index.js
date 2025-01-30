import React from "react";
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  handleClick,
  currentPage,
  maxPageNumberLimit,
  minPageNumberLimit,
}) => {
  const pageNumbers = [];
  if (postsPerPage > 0) {
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  }
  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button className="page-link" onClick={() => handleClick("next")}>
        &hellip;
      </button>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <button className="page-link" onClick={() => handleClick("previous")}>
        &hellip;
      </button>
    );
  }
  return (
    <>
      <ul className="pagination pagination-sm justify-content-end">
        <li className="page-item ">
          <button
            className="page-link"
            onClick={() => handleClick("previous")}
            disabled={currentPage === pageNumbers[0] ? true : false}
          >
            &laquo;
          </button>
        </li>
        {/* {pageDecrementBtn} */}
        {pageNumbers.map((number, i) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li className="page-item" key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`page-link ${
                    i + 1 === currentPage ? "active" : null
                  }`}
                >
                  {number}
                </button>
              </li>
            );
          } else {
            return null;
          }
        })}
        {/* {pageIncrementBtn} */}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handleClick("next")}
            disabled={
              currentPage === pageNumbers[pageNumbers.length - 1] ? true : false
            }
          >
            &raquo;
          </button>
        </li>
      </ul>
    </>
  );
};

export default React.memo(Pagination);
