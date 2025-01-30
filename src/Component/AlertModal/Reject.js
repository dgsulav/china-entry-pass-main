import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import { rejectEntryPass } from "../../Redux/Card/thunk";
// import { rejectEntryPass } from "../../Redux/VerifyCard/thunk";
import { errorFunction } from "../../Component/Alert";
import { useSelector } from "react-redux";

const RejectModal = ({
  types,
  data,
  dispatch,
  setShowRejectModal,
  setShowModal,
  setBirthCertificateImg,
  setCitizenshipBackImg,
  setCitizenshipFrontImg,
  setRecommendationLetterImg,
  setPhoto,
  clearAction,
  currentPage,
  postsPerPage,
}) => {
  const [remarks, setRemarks] = useState("");
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleReject = async () => {
    if (isSuperuser || isAdmin) {
      errorFunction("Admin or Superuser can't perform this action.");
    } else if (remarks.length > 10) {
    
      if (types === "entryPass") {
        const result = await dispatch(
          rejectEntryPass(data?.id, remarks, currentPage, postsPerPage, types)
        );
        if (result) {
          setBirthCertificateImg(null);
          setCitizenshipBackImg(null);
          setCitizenshipFrontImg(null);
          setRecommendationLetterImg(null);
          setPhoto(null);
          setRemarks("");
          dispatch(clearAction());
          setShowRejectModal(false);
          setShowModal(false);
        }
      } else if (types === "verifyCard") {
        const result = await dispatch(
          rejectEntryPass(data?.id, remarks, currentPage, postsPerPage, types)
        );
        if (result) {
          setRemarks("");
          dispatch(clearAction());
          setShowRejectModal(false);
          setShowModal(false);
        }
      }
    } else {
      errorFunction("Please write reason for rejecting of this pass request.");
    }
  };
  return (
    <div className="mb-2 justify-content-center">
      <div className="form-group row mb-2">
        {/* <label htmlFor="remarks" className="fw-bold">
          Why this is pass is Rejected?
          <span className="text-danger">*</span>
        </label> */}
        <textarea
          type="text"
          name="remarks"
          onChange={(e) => {
            setRemarks(e.target.value);
          }}
          className="form-control"
          placeholder="Enter remarks"
        />
      </div>
      {remarks.length < 10 && (
        <span className="text-danger">
          Remarks should have at least 10 characters
        </span>
      )}
      <div className="form-group row mb-2 justify-content-center">
        <Button
          // type={"btn"}
          className={"btn btn-primary "}
          onClick={handleReject}
          title={"Reject"}
          content={"Reject"}
        />
      </div>
    </div>
  );
};

export default RejectModal;
