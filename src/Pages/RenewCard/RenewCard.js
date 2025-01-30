import React, { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import "./renewCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getParticularPage,
  getPrevious,
  getNext,
} from "../../Redux/RenewCard/thunk";

import PaginationBlock from "../../Component/PaginationBlock";
import NoData from "../../Component/NoData/NoData";
import Tooltip from "../../Component/Tooltip/Tooltip";
import { editRenewCardDataAction } from "../../Redux/RenewCard/actions";

const RenewCard = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  count,
  showModal,
  setShowModal,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,

  search,
}) => {
  // props
  const group = useSelector((state) => state.auth.group);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const permissions = useSelector((state) => state.auth.permissions);
  const { renewCards, next, previous } = useSelector(
    (state) => state.renewCard
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

  const handleView = async (id) => {
    dispatch(editRenewCardDataAction(id));
    setShowModal(true);
  };

  const addPermission =
    permissions.includes("can_create_renew" || "can_update_renew") ||
    isAdmin ||
    isSuperuser;

  return (
    <>
      {renewCards?.length > 0 ? (
        <div className="mt-2">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "8%" }}>
                    S.N
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Citizenship No</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Reference</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {renewCards?.length > 0 &&
                  renewCards.map((detail, i) => {
                    const {
                      id,
                      fullName,
                      email,
                      citizenshipNumber,
                      mobileNumber,
                      submissionNumber,
                    } = detail;

                    return (
                      <tr key={id}>
                        <td className="fw-bold" style={{ width: "8%" }}>
                          {postsPerPage * (currentPage - 1) + (i + 1)}{" "}
                        </td>
                        <td>{fullName}</td>
                        <td>{email}</td>
                        <td>{citizenshipNumber}</td>
                        <td>{mobileNumber}</td>
                        <td>{submissionNumber}</td>

                        <td>
                          {addPermission && (
                            <Tooltip content="View Detail">
                              <button
                                onClick={() => handleView(id)}
                                className="btn btn-sm btn-edit btn-primary mx-1"
                              >
                                <FaEye />
                              </button>
                            </Tooltip>
                          )}
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

export default RenewCard;
