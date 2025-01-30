import React, { useState, useEffect } from "react";

import Thumb from "../../assets/thumb.jpg";
import "./style.css";
import FingerPrint from "../../utils/FingerPrint";

const VerifyFingerprint = ({
  startScanRight,
  setStartScanRight,
  rightFingerPrint,
  setRightFingerPrint,

  startScanLeft,
  setStartScanLeft,

  leftFingerPrint,
  setLeftFingerPrint,

  setDeviceId,
  img,
  setImg,

  startScan,
  setStartScan,
}) => {
  useEffect(() => {
    if (leftFingerPrint === null && rightFingerPrint === null) {
      setStartScan(true);
    }

    if (startScanLeft && !leftFingerPrint) {
      setLeftFingerPrint(img);
    } else if (startScanRight && !rightFingerPrint) {
      setRightFingerPrint(img);
    }
  }, [img]);

  return (
    <>
      <FingerPrint
        startScan={startScan}
        setImg={setImg}
        setDeviceId={setDeviceId}
      />

      <div className="fingerprint-container">
        <div className="fingerprint">
          {rightFingerPrint !== null ? (
            <>
              <img
                className="fingerprint-image"
                src={rightFingerPrint}
                alt="fingerprint-image"
              />

              <div style={{ textAlign: "center", marginTop: "3px" }}>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setStartScanLeft(false);
                    setStartScanRight(true);
                    setRightFingerPrint(null);
                    setImg(null);
                  }}
                >
                  Right
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                className="fingerprint-image"
                src={Thumb}
                alt="fingerprint-image"
              />
              <div style={{ textAlign: "center", marginTop: "3px" }}>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setStartScanLeft(false);

                    setStartScanRight(true);
                    setRightFingerPrint(null);
                    setImg(null);
                  }}
                >
                  Right
                </button>
              </div>
            </>
          )}
        </div>
        <div className="fingerprint">
          {leftFingerPrint !== null ? (
            <>
              <img
                className="fingerprint-image"
                src={leftFingerPrint}
                alt="fingerprint-image"
              />

              <div style={{ textAlign: "center", marginTop: "3px" }}>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setStartScanRight(false);
                    setStartScanLeft(true);
                    setLeftFingerPrint(null);
                    setImg(null);
                  }}
                >
                  Left
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                className="fingerprint-image"
                src={Thumb}
                alt="fingerprint-image"
              />
              <div style={{ textAlign: "center", marginTop: "3px" }}>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setStartScanRight(false);
                    setStartScanLeft(true);
                    setLeftFingerPrint(null);
                    setImg(null);
                  }}
                >
                  Left
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <div className="d-flex justify-content-center align-items-center gap-2 my-1">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => setStartScanLeft(true)}
        >
          Scan
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger mr-2"
          disabled={rightFingerPrint === null}
          onClick={() => {
            setStartScanRight(false);
            setStartScanLeft(false);
            setImg(null);
            setRightFingerPrint(null);
            setLeftFingerPrint(null);
          }}
        >
          Clear
        </button>
      </div> */}
    </>
  );
};

export default VerifyFingerprint;
