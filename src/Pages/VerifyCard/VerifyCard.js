import React, { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getParticularPage,
  getPrevious,
  getNext,
  approveVerifyCard,
} from "../../Redux/VerifyCard/thunk";
import PaginationBlock from "../../Component/PaginationBlock";
import Tooltip from "../../Component/Tooltip/Tooltip";
import { verifyCardConstants } from "../../Redux/VerifyCard/constants";
import NoData from "../../Component/NoData/NoData";

const VerifyCard = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  count,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
  search,
  showModal,
  setShowModal,
  setShowEditModal,
}) => {
  // props
  const { permissions, isAdmin } = useSelector((state) => state.auth);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);

  const { next, previous, verifyCards } = useSelector(
    (state) => state.verifyCard
  );

  const dispatch = useDispatch();

  // for pagination
  const [pageNumberLimit] = useState(5);

  //change page
  const paginate = (number) => {
    dispatch(getParticularPage({ number, postsPerPage }));
    setCurrentPage(number);
  };

  //handle Click for pagination
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

  const handleApprove = (id) => {
    dispatch(approveVerifyCard(id));
    setShowModal(true);
  };

  const handleEdit = (id) => {
    dispatch({
      type: verifyCardConstants.EDIT_VERIFY_CARD,
      payload: id,
    });

    setShowEditModal(true);
  };
  const verifyPermission =
    permissions?.includes("can_verify_entrypass") || isSuperuser;

  return (
    <>
      {verifyCards?.length > 0 ? (
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
                    Email
                  </th>
                  <th scope="col" className="text-left">
                    Citizenship No
                  </th>
                  <th scope="col" className="text-left">
                    Mobile
                  </th>
                  <th scope="col" className="text-left">
                    DOB BS
                  </th>
                  <th scope="col" className="text-left">
                    Office
                  </th>
                  <th scope="col" className="text-left">
                    Reference
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {verifyCards?.length > 0 &&
                  verifyCards.map((detail, i) => {
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

                        <td className="text-left">
                          {fullName ? fullName : "N/A"}
                        </td>
                        <td
                          className="text-left"
                          style={{ wordBreak: "break-all" }}
                        >
                          {email ? email : "N/A"}
                        </td>
                        <td className="text-left">
                          {citizenshipNumber ? citizenshipNumber : "N/A"}
                        </td>
                        <td className="text-left">
                          {mobileNumber ? mobileNumber : "N/A"}
                        </td>
                        <td className="text-left">{dobBs ? dobBs : "N/A"}</td>
                        <td className="text-left">
                          {office ? office?.name : "N/A"}
                        </td>
                        <td className="text-left">{submissionNumber}</td>

                        <td>
                          {isAdmin && (
                            <Tooltip content="Edit">
                              <button
                                disabled={!verifyPermission}
                                onClick={() => handleEdit(id)}
                                className="btn btn-md  btn-success mx-2"
                              >
                                <FaEdit size={16} />
                              </button>
                            </Tooltip>
                          )}
                          <Tooltip content="Verify">
                            <button
                              disabled={!verifyPermission}
                              onClick={() => handleApprove(id)}
                              className="btn btn-md  btn-success mx-2"
                            >
                              <FaCheck size={16} />
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

export default VerifyCard;
