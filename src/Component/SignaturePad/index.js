import React, { useState, useEffect } from "react";
import signatureImage from "../../assets/signature.gif";
import "./style.css";
import { useSelector } from "react-redux";

const Signature = ({
  signatures,
  setSignatures,
  signaturesText,
  setSignaturesText,
  types,
  setShowSignatureModal,
}) => {
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const handleSignatureCapture = (pos) => {
    window?.captureSignature(
      signatures,
      setSignatures,
      signaturesText,
      setSignaturesText,
      pos
    );
  };

  const handleSignatureClear = async (pos) => {
    const updatedSignatures = signatures?.map((sign, i) => {
      if (i === pos) {
        return "";
      } else {
        return sign;
      }
    });

    const updatedSignaturesText = signaturesText?.map((sign, i) => {
      if (i === pos) {
        return "";
      } else {
        return sign;
      }
    });
    setSignatures(updatedSignatures);
    setSignaturesText(updatedSignaturesText);
  };

  useEffect(() => {
    window.startSignatureService();
  }, []);
  return (
    <div className="signature-wrapper">
      <div className="signature-container">
        {signatures[0] === "" ? (
          <div className="signature-card">
            <img src={signatureImage} alt="default-signature" />
          </div>
        ) : (
          <div className="signature-card">
            <img src={signatures[0]} alt="signature-image" />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2 my-1">
        <button
          type="button"
          className="btn btn-sm btn-primary mr-2"
          onClick={() => handleSignatureCapture(0)}
          disabled={signatures[0] !== "" || isAdmin || isSuperuser}
        >
          Capture
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger mr-2"
          onClick={() => handleSignatureClear(0)}
          disabled={signatures[0] === ""}
        >
          Clear
        </button>
        {types === "user" && (
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={() => setShowSignatureModal(false)}
            disabled={signatures[0] === ""}
          >
            Save
          </button>
        )}{" "}
      </div>
    </div>
  );
};

export default Signature;
