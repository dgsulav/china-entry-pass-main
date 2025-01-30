import React, { useState } from "react";
import "./rejectedEntry.css";
import { FaEye, FaFileSignature } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import PaginationBlock from "../../Component/PaginationBlock";

import Tooltip from "../../Component/Tooltip/Tooltip";

import { rejectedConstants } from "../../Redux/RejectedEntry/constants";
import {
  getNext,
  getParticularPage,
  getPrevious,
} from "../../Redux/RejectedEntry/thunk";
import NoData from "../../Component/NoData/NoData";

const RejectedEntry = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  count,
  setShowModal,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
  search,
}) => {
  // props

  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { rejectedCards, previous, next } = useSelector(
    (state) => state.rejectedCard
  );

  const dispatch = useDispatch();

  // for pagination
  const [pageNumberLimit] = useState(5);

  //change page
  const paginate = (number) => {
    dispatch(getParticularPage({ number, postsPerPage }));
    setCurrentPage(number);
  };

  //handle Click
  const handleClick = (type) => {
    if (type === "previous") {
      dispatch(getPrevious(previous));
      setCurrentPage((prevState) => prevState - 1);
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    } else if (type === "next") {
      dispatch(getNext(next));
      setCurrentPage((prevState) => prevState + 1);
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  //edit function for the province
  const handleView = (id) => {
    dispatch({
      type: rejectedConstants.VIEW_DETAIL,
      payload: id,
    });
    setShowModal(true);
  };

  return (
    <>
      {rejectedCards?.length > 0 ? (
        <div className="mt-2">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "2%" }}>
                    S.N
                  </th>

                  <th scope="col" className="text-left">
                    Name
                  </th>
                  <th scope="col" className="text-left">
                    Mobile No
                  </th>
                  <th scope="col" className="text-left">
                    Citizenship No
                  </th>
                  <th scope="col" className="text-left">
                    Applied Date
                  </th>
                  <th scope="col" className="text-left">
                    DOB B.S
                  </th>
                  <th scope="col" className="text-left">
                    Office
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rejectedCards?.length > 0 &&
                  rejectedCards.map((detail, i) => {
                    const {
                      id,
                      fullName,
                      mobileNumber,
                      citizenshipNumber,
                      createdAtBs,
                      dobBs,
                      office,
                    } = detail;

                    return (
                      <tr key={id}>
                        <td className="fw-bold" style={{ width: "2%" }}>
                          {postsPerPage * (currentPage - 1) + (i + 1)}{" "}
                        </td>

                        <td className="text-left">{fullName}</td>
                        <td className="text-left">{mobileNumber}</td>
                        <td className="text-left">{citizenshipNumber}</td>
                        <td className="text-left">{createdAtBs}</td>
                        <td className="text-left">{dobBs}</td>
                        <td className="text-left">{office?.name}</td>

                        <td>
                          <Tooltip content="View Details">
                            <button
                              // disabled={!updatePermission}
                              onClick={() => handleView(id)}
                              className="btn btn-md btn-edit btn-primary mx-2"
                            >
                              <FaEye size={16} />
                            </button>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {count > 0 && (
            <PaginationBlock
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              count={count}
              paginate={paginate}
              handleClick={handleClick}
              setCurrentPage={setCurrentPage}
              minPageNumberLimit={minPageNumberLimit}
              maxPageNumberLimit={maxPageNumberLimit}
            />
          )}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default RejectedEntry;
