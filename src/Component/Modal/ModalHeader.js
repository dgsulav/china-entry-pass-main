// import "./Modal.css";
import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const ModalHeader = ({
  header,
  setShowModal,
  types,
  edit,
  clearAction,
  setDeviceId,
  setRightFingerPrint,
  setLeftFingerPrint,
  setStartScan,
  setStartScanRight,
  setStartScanLeft,
  ...props
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    clearAction && dispatch(clearAction());
    setShowModal(false);
    if (types === "card" || types === "renew") {
      // setDeviceId(null);
      // setRightFingerPrint(null);
      // setLeftFingerPrint(null);
      // setStartScan(false);
      // setStartScanRight(false);
      // setStartScanLeft(false);
    }
  };
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title" id="myExtraLargeModalLabel">
          {header}
        </h5>
        <div>
          <FaTimes onClick={handleClose} style={{cursor:"pointer"}} />
        </div>
      </div>
    </>
  );
};

export default ModalHeader;
