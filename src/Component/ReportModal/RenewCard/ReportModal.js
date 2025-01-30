import React, { useState } from "react";
import "../modal.css";
import { FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  getNewCardReportNext,
  getNewCardReportParticularPage,
  getNewCardReportPrevious,
} from "../../../Redux/Report/thunk";

const ReportModal = ({
  showReportModal,
  setShowReportModal,
  formData,
  renewReports,
}) => {
  const { user, formatedStartDate, formatedEndDate } = formData;
  const loading = useSelector((state) => state.report.loading);
  const count = useSelector((state) => state.report.renewCount);
  const renewPrevious = useSelector((state) => state.report.renewPrevious);
  const next = useSelector((state) => state.report.renewNext);

  const dispatch = useDispatch();
  const modalClass = showReportModal
    ? "modal display-block"
    : "modal display-none";

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const pageNumberLimit = 5;
  //change page
  const paginate = (number) => {
    dispatch(
      getNewCardReportParticularPage({
        number,
        postsPerPage,
        user,
        formatedStartDate,
        formatedEndDate,
      })
    );
    setCurrentPage(number);
  };

  //handle Click
  const handleClick = (type) => {
    if (type === "previous") {
      dispatch(getNewCardReportPrevious(renewPrevious));
      setCurrentPage((prevState) => prevState - 1);
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    } else if (type === "next") {
      dispatch(getNewCardReportNext(next));
      setCurrentPage((prevState) => prevState + 1);
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  return (
    <>
      <div className={modalClass} tabIndex="-1">
        <div className="container-fluid main-container">
          <div className="modal-content content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Reprint Card Report
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowReportModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {loading ? (
                <div className="d-flex justify-content-center ">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {renewReports?.length === 0 ? (
                    "You have No records"
                  ) : (
                    <table className="table table table-bordered ">
                      <thead className="text-center">
                        <tr className="text-center">
                          <th scope="col">#</th>
                          <th scope="col">Submission Number</th>
                          <th scope="col">Name </th>
                          <th scope="col">Citizenship Number</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Card No</th>
                          <th scope="col">Father</th>
                          <th scope="col">Branch</th>
                          <th scope="col">Province</th>
                          <th scope="col">Permanent Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renewReports?.length > 0 &&
                          renewReports.map((detail, i) => {
                            const {
                              id,
                              submissionNumber,
                              fullName,

                              cardNumber,
                              citizenshipNumber,
                              mobileNumber,
                              fatherName,
                              office,
                              province,
                              permanentAddress,
                            } = detail;

                            return (
                              <tr key={id} className="text-center">
                                <td>
                                  {" "}
                                  {postsPerPage * (currentPage - 1) + (i + 1)}
                                </td>
                                <td>{submissionNumber}</td>
                                <td>{fullName}</td>
                                <td>{citizenshipNumber}</td>
                                <td>{mobileNumber}</td>
                                <td>{cardNumber}</td>
                                <td>{fatherName}</td>
                                <td>{office ? office?.name : "N/A"}</td>
                                <td>{province ? province?.name : "N/A"}</td>
                                <td>{permanentAddress}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};
export default React.memo(ReportModal);
