import React from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../../Component/Button/Button";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { errorFunction } from "../../Component/Alert";
import TextError from "../../Component/TextError/TextError";
import { useDispatch } from "react-redux";
import { getVerifyCard, verifyCard } from "../../Redux/VerifyCard/thunk";
import { useHistory } from "react-router-dom";

const ApprovedCard = ({ masterData, setMasterData, show, setShow }) => {
  const dispatch = useDispatch();

  const initialState = {
    voucherReferenceNumber: "",
  };
  //validation rules of the form
  const validationSchema = Yup.object().shape({
    voucherReferenceNumber: Yup.string().required("Required"),

    remarks: Yup.string(),
  });

  const onSubmit = async (values) => {
    const { voucherReferenceNumber } = values;
    delete masterData.userPhoto;
    delete masterData.citizenshipBack;
    delete masterData.citizenshipFront;
    delete masterData.birthCertificate;
    delete masterData.recommendationLetter;
    const updatedValues = {
      ...masterData,
      district: masterData?.district?.id,
      palika: masterData?.palika?.id,
      province: masterData?.province?.id,
      voucherReferenceNumber: voucherReferenceNumber,
      status: "approved",
    };

    const result = await dispatch(verifyCard(masterData?.id, updatedValues));

    if (result) {
      setShow(false);
      setMasterData(null);
      dispatch(getVerifyCard(10));
    } else {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    setMasterData(null);
  };
  const modalClass = show ? "modal display-block" : "modal display-none";
  return (
    <div className={modalClass} tabIndex="-1">
      <div className="modal-dialog modal-md">
        <div className="modal-content content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Enter Voucher Number
            </h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <FaTimes />
            </button>
          </div>

          <div className="modal-body">
            <div className="row justify-content-center mt-3">
              <div className="col-12">
                <div className="registration-process ">
                  <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form autoComplete="off">
                          <div className="form-group row mb-2 justify-content-center">
                            <div className="col-8">
                              <label
                                htmlFor="voucherReferenceNumber"
                                className="fw-bold float-start"
                              >
                                Bank Voucher Reference
                                <strong className="text-danger ml-1">*</strong>
                              </label>
                              <Field
                                type="text"
                                name="voucherReferenceNumber"
                                className="form-control"
                                placeholder="Reference code"
                              />
                              <ErrorMessage
                                name="voucherReferenceNumber"
                                component={TextError}
                              />
                            </div>
                          </div>

                          <div className="form-group text-center">
                            <Button
                              type={"btn"}
                              className={"btn btn-primary"}
                              // loading={loading}
                              // disabled={lock || !formik.dirty}
                              title={"Approve"}
                              content={"Approve Voucher"}
                            />
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ApprovedCard;
