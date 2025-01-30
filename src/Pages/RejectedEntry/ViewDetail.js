import React from "react";
import Tooltip from "../../Component/Tooltip/Tooltip";

const ViewDetail = ({ rejectedCard, setShowModal }) => {
  const {
    // age,

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
    rejectedBy,
    remarks,
  } = rejectedCard;

  return (
    <div className="row">
      <div className="basic-details col-12 ">
        <div className="user-img">
          <img src={userPhoto} />
        </div>
        <div className="details flex-grow-1">
          <div className="full-name">{fullName} </div>
          <div>{submissionNumber} </div>
          <div>{/* <span>Age: </span> {age} */}</div>
          <div>
            <span>Gender: </span> {gender === "m" ? "Male" : "Female"}
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
            <span> Applied Office: </span> {office?.name},{office?.address}
          </div>
        </div>
        <div className="d-flex" style={{ gap: "5px" }}>
          <button
            className="btn btn-danger"
            readOnly
            style={{ height: "max-content" }}
          >
            Rejected
          </button>
        </div>
      </div>
      <div className="basic-details mt-3 col-12 row">
        <div className="details d-flex flex-column col-12">
          <div>Rejected By: {rejectedBy?.name}</div>
          <div>Reason For Being Rejected: {remarks}</div>
        </div>
      </div>
    </div>
  );
};
export default ViewDetail;
