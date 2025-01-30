import React, { useState, useEffect } from "react";
import signatureImage from "../../assets/signature.gif";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSignature } from "../../Redux/Auth/thunk";
import { errorFunction, successFunction } from "../../Component/Alert";

const UpdateSignature = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [signatures, setSignatures] = useState([""]);
  const [signaturesText, setSignaturesText] = useState([""]);
  const userSignature = useSelector((state) => state.auth.signaturePhoto);
  console.log(userSignature, "sig");

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
  const handleSave = async () => {
    if (signatures[0] !== "") {
      const result = await dispatch(updateSignature(signatures[0]));
      if (result) {
        history.push("/");
      }
    } else {
      errorFunction("Please capture the signature first.");
    }
  };

  useEffect(() => {
    window.startSignatureService();
  }, []);

  return (
    <div className="signature-wrapper card p-5">
      <h3 className="text-center">Update Signature</h3>
      <div className="signature-container">
        {signatures[0] === "" ? (
          <div className="signature-card card">
            {userSignature ? (
              <img src={userSignature} alt="default-signature" />
            ) : (
              <img src={signatureImage} alt="default-signature" />
            )}
          </div>
        ) : (
          <div className="signature-card card">
            <img src={signatures[0]} alt="signature" />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2 my-1">
        <button
          type="button"
          className="btn btn-sm btn-primary mr-2"
          onClick={() => handleSignatureCapture(0)}
          disabled={signatures[0] !== ""}
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

        <button
          type="button"
          className="btn btn-sm btn-success"
          onClick={handleSave}
          disabled={signatures[0] === ""}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateSignature;
