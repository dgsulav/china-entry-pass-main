import React, { useState } from "react";
import { FaEdit, FaFileSignature } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../../Component/Tooltip/Tooltip";
import Button from "../../Component/Button/Button";
// import { editCardRequest } from "../../Redux/Card/thunk";
import Modal from "../../Component/Modal";
import {
  clearData,
  getVerifyCard,
  verifyCard as verifyCardThunk,
} from "../../Redux/VerifyCard/thunk";
import pdfImage from "../../assets/PDF_file_icon.png";
import AlertModal from "../../Component/AlertModal";
import RejectModal from "../../Component/AlertModal/Reject";
import { errorFunction } from "../../Component/Alert";
import Loader from "../../Component/Loader";
const ViewDetail = ({ showModal, setShowModal, currentPage, postsPerPage }) => {
  const dispatch = useDispatch();
  const { verifyCard, edit, loadingUpdated, loading } = useSelector(
    (state) => state.verifyCard
  );
  const signaturePhoto = useSelector((state) => state.auth.signaturePhoto);
  const [verifyModal, setVerifyModal] = useState(false);
  const [viewDoc, setViewDoc] = useState(false);
  const [img, setImg] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const {
    district,
    dob,
    dobBs,
    email,
    fatherName,
    fullName,
    gender,
    isRecommended,
    married,
    migrated,
    mobileNumber,
    palika,
    province,
    spouseName,
    submissionNumber,
    userPhoto,
    wardNumber,
    office,
    recommendationLetter,
    citizenshipBack,
    citizenshipFront,
    birthCertificate,
  } = verifyCard;

  const handleViewDocument = (document) => {
    if (typeof document === "string") {
      const extension = document.substring(
        document.length - 3,
        document.length
      );
      if (extension === "pdf") {
        return pdfImage;
      } else {
        return document;
      }
    }
  };

  const handleVieDoc = (detail) => {
    if (detail.target.name === "citizenshipFront") {
      setViewDoc(true);
      setImg(citizenshipFront);
    } else if (detail.target.name === "citizenshipBack") {
      setViewDoc(true);
      setImg(citizenshipBack);
    } else if (detail.target.name === "birthCertificate") {
      setViewDoc(true);
      setImg(birthCertificate);
    } else if (detail.target.name === "recommendationLetter") {
      setViewDoc(true);
      setImg(recommendationLetter);
    }
  };

  const handleVerify = () => {
    if (signaturePhoto) {
      setVerifyModal(true);
    } else {
      errorFunction("Please add signature to verify.");
    }
  };
  return (
    <>
      {loadingUpdated && <Loader />}
      <div className="row">
        <div className="basic-details col-12 ">
          <div className="user-img">
            <img src={userPhoto} alt="userPhoto" />
          </div>
          <div className="details flex-grow-1">
            <div className="full-name">{fullName} </div>
            <div>{submissionNumber} </div>
            <div>{/* <span>Age: </span> {age} */}</div>
            <div>
              <span>Gender: </span>{" "}
              {gender === "m" ? "Male" : gender === "f" ? "Female" : "Other"}
            </div>
            <div>
              <span>Contact: </span>
              {mobileNumber}
            </div>
            <div>
              <span>Email: </span> {email}
            </div>
            <div>
              <span> Address: </span>
              {province?.name}, {district?.name}, {palika?.name} -{wardNumber}
            </div>
          </div>

          <div className="divider "></div>
          <div className="details" style={{ minWidth: "250px" }}>
            <div>
              <span>DOB: </span> {dobBs}
            </div>
            <div>
              <span>Dob(AD): </span>
              {dob}
            </div>
            <div>
              <span>Father : </span> {fatherName}
            </div>
            {married && (
              <div>
                <span>Spouse: </span>
                {spouseName}
              </div>
            )}

            <div>
              <span>Migrated: </span> {migrated ? "Yes" : "No"}
            </div>
            <div>
              <span>Recommended: </span> {isRecommended ? "Yes" : "No"}
            </div>
            <div>
              <span>Applied Office: </span> {office?.name},{office?.address}
            </div>
          </div>
        </div>
        <div className="basic-details mt-3 col-12 row">
          <div className="details d-flex col-12">
            {citizenshipBack && citizenshipFront && (
              <>
                <div className="d-flex flex-column col-2">
                  <span>Citizenship Front</span>
                  <img
                    className="border rounded"
                    style={{ objectFit: "contain" }}
                    src={handleViewDocument(citizenshipFront)}
                    height={120}
                    alt="citizenshipFront"
                  />
                  <div className="d-flex justify-content-center mt-1">
                    <Tooltip content={"view"}>
                      <button
                        name="citizenshipFront"
                        onClick={handleVieDoc}
                        type={"btn"}
                        className="btn btn-primary p-1"
                        style={{ fontSize: "14px" }}
                      >
                        View
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <div className="d-flex flex-column col-2">
                  <span>Citizenship Back</span>
                  <img
                    className="border rounded"
                    style={{ objectFit: "contain" }}
                    src={handleViewDocument(citizenshipBack)}
                    height={120}
                    alt="citizenshipBack"
                  />
                  <div className="d-flex justify-content-center mt-1">
                    <Tooltip content={"view"}>
                      <button
                        name="citizenshipBack"
                        onClick={handleVieDoc}
                        type={"btn"}
                        className="btn btn-primary p-1"
                        style={{ fontSize: "14px" }}
                      >
                        View
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </>
            )}
            {birthCertificate && (
              <div className="d-flex flex-column col-2">
                <span>Birth Certificate</span>
                <img
                  className="border rounded"
                  style={{ objectFit: "contain" }}
                  src={handleViewDocument(birthCertificate)}
                  height={120}
                  alt="birthCertificate"
                />
                <div className="d-flex justify-content-center mt-1">
                  <Tooltip content={"view"}>
                    <button
                      name="birthCertificate"
                      onClick={handleVieDoc}
                      type={"btn"}
                      className="btn btn-primary p-1"
                      style={{ fontSize: "14px" }}
                    >
                      View
                    </button>
                  </Tooltip>
                </div>
              </div>
            )}

            {recommendationLetter && (
              <div className="d-flex flex-column col-2">
                <span>Recommendation Letter</span>
                <img
                  className="border rounded"
                  style={{ objectFit: "contain" }}
                  src={handleViewDocument(recommendationLetter)}
                  height={120}
                  alt="recommendationLetter"
                />
                <div className="d-flex justify-content-center mt-1">
                  <Tooltip content={"view"}>
                    <button
                      name="recommendationLetter"
                      onClick={handleVieDoc}
                      type={"btn"}
                      className="btn btn-primary p-1"
                      style={{ fontSize: "14px" }}
                    >
                      View
                    </button>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex flex-column col-12">
          <div className="d-flex justify-content-center mt-2">
            <div className="m-1">
              <Button
                type={"btn"}
                className={"btn btn-danger"}
                loading={loadingUpdated}
                onClick={() => setShowRejectModal(true)}
                title={"Reject"}
                content={"Reject"}
              />
            </div>
            <div className="m-1">
              <Button
                type={"btn"}
                className={"btn btn-primary"}
                loading={loadingUpdated}
                onClick={handleVerify}
                title={"Approve"}
                content={"Approve"}
              />
            </div>
          </div>
        </div>
      </div>
      {viewDoc && (
        <Modal
          header={"View Image"}
          types={"setup"}
          size={"modal-xl"}
          setShowModal={setViewDoc}
          showModal={viewDoc}
          edit={false}
        >
          <div className="imageContainer d-flex justify-content-center">
            <iframe height="520" src={img} style={{ width: "100%" }} />
          </div>
        </Modal>
      )}
      {verifyModal && (
        <AlertModal
          verifyCardThunk={verifyCardThunk}
          verifyCard={verifyCard}
          verifyModal={verifyModal}
          setVerifyModal={setVerifyModal}
          setShowModal={setShowModal}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
        />
      )}

      {showRejectModal && (
        <Modal
          header={"Reason for rejecting this form."}
          types={"setup"}
          size={"modal-sm"}
          setShowModal={setShowRejectModal}
          showModal={showRejectModal}
        >
          <RejectModal
            types={"verifyCard"}
            data={verifyCard}
            dispatch={dispatch}
            showRejectModal={showRejectModal}
            setShowRejectModal={setShowRejectModal}
            setShowModal={setShowModal}
            clearAction={clearData}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
          />
        </Modal>
      )}
    </>
  );
};
export default ViewDetail;
