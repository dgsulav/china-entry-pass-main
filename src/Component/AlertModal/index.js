import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { verifyCard } from "../../Redux/VerifyCard/thunk";
import { errorFunction } from "../Alert";

const Alert = ({
  verifyModal,
  setVerifyModal,
  verifyCard,
  setShowModal,
  currentPage,
  postsPerPage,
  verifyCardThunk,
}) => {
  const dispatch = useDispatch();

  const handleSave = async () => {
    const result = await dispatch(
      verifyCardThunk(verifyCard?.id, currentPage, postsPerPage)
    );
    if (result) {
      setVerifyModal(false);
      setShowModal(false);
      // setMasterData(null);
    } else {
      setShowModal(true);
    }
  };
  const modalClass = verifyModal
    ? "modal modal-md display-block d-flex justify-content-center align-items-center"
    : "modal display-none d-flex justify-content-center";
  return (
    <div
      className={modalClass}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header py-1 px-2">
            <p></p>
            <div className="export-buttons">
              <button
                onClick={() => setVerifyModal(false)}
                type="button"
                className="btn-close"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="buttons-container d-flex flex-column justify-content-center align-items-center p-2">
            <h4>Do you want to approve ?</h4>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: "10px" }}
            >
              <button
                className="btn btn-danger  "
                onClick={() => {
                  setVerifyModal(false);
                }}
              >
                NO
              </button>
              <button className="btn btn-success " onClick={handleSave}>
                YES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Alert);
