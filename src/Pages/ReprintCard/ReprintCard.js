import React, { useState } from "react";
import { FaCheck, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getParticularPage,
  getPrevious,
  getNext,
  approveVerifyCard,
} from "../../Redux/ReprintCard/thunk";
import PaginationBlock from "../../Component/PaginationBlock";
import NoData from "../../Component/NoData/NoData";
import Tooltip from "../../Component/Tooltip/Tooltip";
// import PrintModal from "./PrintModal";
import { errorFunction, successFunction } from "../../Component/Alert";
// import { confirmPrint } from "../../Redux/ReprintCard/thunk";
import Loader from "../../Component/Loader";
const ReprintCard = ({
  currentPage,
  postsPerPage,
  setCurrentPage,
  count,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
}) => {
  // const [show, setShow] = useState(false);
  // const [info, setInfo] = useState(null);
  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const loadingPrint = useSelector((state) => state.reprintCard.loadingPrint);

  // props

  const reprintCards = useSelector((state) => state.reprintCard.reprintCards);
  const previous = useSelector((state) => state.reprintCard.previous);
  const next = useSelector((state) => state.reprintCard.next);
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

  // const handleCard = (detail) => {
  //   setInfo(detail);
  //   setShow(true);
  // };

  // const viewPermission =
  //   permissions.includes("can_read_entrypass") || isAdmin || isSuperuser;
  // const printPermission = permissions.includes("can_print_cardprinting");

  // const handlePrint = async (detail) => {
  //   if (!detail?.approvedBy?.signature) {
  //     errorFunction("Please issue your signature first.");
  //   } else {
  //     try {
  //       const res = await dispatch(printCard(detail));
  //       if (res) {
  //         successFunction("Card Printed Successfully");
  //         const result = await dispatch(confirmPrint(detail.id));
  //         if (result) {
  //           dispatch(getReprintCard(10));
  //         }
  //       }
  //     } catch (error) {
  //       errorFunction(
  //         error.message || "An error occurred while printing the card"
  //       );
  //     }
  //   }
  // };
  const handleApprove = (id) => {
    dispatch(approveVerifyCard(id));
  };
  const verifyPermission =
    permissions?.includes("can_verify_entrypass") || isSuperuser;
  return (
    <>
      {loadingPrint && <Loader />}
      {reprintCards?.length > 0 ? (
        <div className="mt-2">
          <div className="table-scrollable">
            <table className="table table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "2%" }}>
                    S.N
                  </th>

                  <th scope="col" className="text-left">
                    Email
                  </th>
                  <th scope="col" className="text-left">
                    Name
                  </th>
                  <th scope="col" className="text-left">
                    Citizenship
                  </th>
                  <th scope="col" className="text-left">
                    Mobile number
                  </th>
                  <th scope="col" className="text-left">
                    DOB B.S
                  </th>
                  <th scope="col" className="text-left">
                    Office
                  </th>
                  <th scope="col" className="text-left">
                    Reference
                  </th>
                  {!isAdmin && !isSuperuser && <th scope="col">Action</th>}
                </tr>
              </thead>
              <tbody>
                {reprintCards?.length > 0 &&
                  reprintCards.map((detail, i) => {
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
                        <td className="text-left">{citizenshipNumber}</td>
                        <td className="text-left">{mobileNumber}</td>
                        <td className="text-left">{dobBs}</td>
                        <td className="text-left">{office?.name}</td>
                        <td className="text-left">{submissionNumber}</td>
                        {!isAdmin && !isSuperuser && (
                          <td>
                            {/* {viewPermission && (
                            <Tooltip content="Preview Card">
                              <button
                                onClick={() => handleCard(detail)}
                                className="btn btn-sm  btn-success mx-2"
                              >
                                <FaPrint />
                              </button>
                            </Tooltip>
                          )} */}
                            {/* {printPermission && (
                              <Tooltip content="Print Card">
                                <button
                                  onClick={() => handlePrint(detail)}
                                  className="btn btn-md btn-success mx-2"
                                >
                                  <FaCheck size={16} />
                                </button>
                              </Tooltip>
                            )} */}
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
                        )}
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
      {/* {show && (
        <PrintModal
          show={show}
          setShow={setShow}
          info={info}
          setInfo={setInfo}
        />
      )} */}

      {/* {showConfirmationModal && (
        <Modal
          header={"Printed Successfully?"}
          size="modal-md"
          setShowModal={setShowConfirmationModal}
          showModal={showConfirmationModal}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-2">
              <button
                className="btn btn-success mr-3"
                onClick={() => {
                  dispatch(confirmPrint(printId));
                  setShowConfirmationModal(false);
                }}
              >
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowPrintAgainModal(true)}
              >
                NO
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showPrintAgainModal && (
        <Modal
          header={"Do you want to print again?"}
          size="modal-md"
          setShowModal={setShowPrintAgainModal}
          showModal={showPrintAgainModal}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="p-2">
              <button
                className="btn btn-success mr-3"
                onClick={() => dispatch(printCard(printDetails))}
              >
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowPrintAgainModal(false);
                  setShowConfirmationModal(false);
                }}
              >
                NO
              </button>
            </div>
          </div>
        </Modal>
      )} */}
    </>
  );
};

export default ReprintCard;
