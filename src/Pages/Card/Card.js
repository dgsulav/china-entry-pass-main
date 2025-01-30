import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getParticularPage,
  getPrevious,
  getNext,
  editCardRequest,
} from "../../Redux/Card/thunk";

import PaginationBlock from "../../Component/PaginationBlock";
import NoData from "../../Component/NoData";
import Tooltip from "../../Component/Tooltip/Tooltip";
import { getOrganizationSetup } from "../../Redux/OrganizationSetup/thunk";
import { clearEditCardSuccessAction } from "../../Redux/Card/actions";

const Card = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  count,
  setShowModal,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
  // setShowViewModal,
  search,
}) => {
  // props
  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const cards = useSelector((state) => state.card.cards);
  const next = useSelector((state) => state.card.next);
  const previous = useSelector((state) => state.card.previous);
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

  //pagination end

  const handleView = async (id) => {
    await dispatch(editCardRequest(id));
    setShowModal(true);
  };

  const viewPermission =
    permissions.includes("can_read_entrypass") || isAdmin || isSuperuser;

  const addPermission = permissions.includes("can_create_entrypass");

  return (
    <>
      {cards?.length > 0 ? (
        <div className="mt-2">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th style={{ width: "2%" }}>S.N</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Citizenship No</th>
                  <th className="text-left">Mobile</th>
                  <th className="text-left">DOB BS</th>
                  <th className="text-left">Office</th>
                  <th className="text-left">Reference</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cards?.length > 0 &&
                  cards.map((detail, i) => {
                    const {
                      id,
                      fullName,
                      email,
                      citizenshipNumber,
                      mobileNumber,
                      submissionNumber,
                      dobBs,
                      office,
                    } = detail;

                    return (
                      <tr key={id}>
                        <td className="fw-bold" style={{ width: "2%" }}>
                          {postsPerPage * (currentPage - 1) + (i + 1)}{" "}
                        </td>

                        <td className="text-left">{fullName}</td>
                        <td
                          className="text-left"
                          style={{ wordBreak: "break-all" }}
                        >
                          {email !== "" ? email : "N/A"}
                        </td>
                        <td className="text-left">
                          {citizenshipNumber === null
                            ? "N/A"
                            : citizenshipNumber}
                        </td>
                        <td className="text-left">{mobileNumber}</td>
                        <td className="text-left">{dobBs}</td>
                        <td className="text-left">{office?.name}</td>
                        <td className="text-left">{submissionNumber}</td>

                        <td>
                          {viewPermission && (
                            <Tooltip content="View Detail">
                              <button
                                onClick={() => handleView(id)}
                                className="btn btn-md btn-edit btn-primary mx-1"
                              >
                                <FaEye size={16} />
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
        <NoData
          search={search}
          onClick={() => {
            dispatch(clearEditCardSuccessAction());
            dispatch(getOrganizationSetup());
            setShowModal(true);
          }}
          addPermission={addPermission}
        />
      )}
    </>
  );
};

export default Card;
