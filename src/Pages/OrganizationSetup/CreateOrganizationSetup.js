import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../Component/TextError/TextError";
import Thumb from "../../Component/Thumb";
import { useDispatch, useSelector } from "react-redux";
import { FAVICON_SIZE, LOGO_SIZE, SUPPORTED_FORMATS } from "../../utils/image";
import Button from "../../Component/Button/Button";
import {
  createOrganizationSetup,
  updateOrganizationSetup,
} from "../../Redux/OrganizationSetup/thunk";
import { errorFunction } from "../../Component/Alert";
import useFetchImage from "../../utils/fetchImage";
const CreateOrganizationSetup = ({ setShowModal, showModal }) => {
  const { organizationSetup, edit } = useSelector(
    (state) => state.organizationSetup
  );
  // const logoImage = useFetchImage(edit, edit ? organizationSetup?.logo : "");
  // const stampImage = useFetchImage(edit, edit ? organizationSetup?.stamp : "");
  // const signatureImage = useFetchImage(
  //   edit,
  //   edit ? organizationSetup?.signature : ""
  // );

  // const [logo, setLogo] = useState(
  //   edit ? (organizationSetup ? organizationSetup?.logo : null) : null
  // );

  // const [stamp, setStamp] = useState(
  //   edit ? (organizationSetup ? organizationSetup.stamp : null) : null
  // );
  // const [signature, setSignature] = useState(
  //   edit ? (organizationSetup ? organizationSetup.signature : null) : null
  // );

  // recommendationRequired
  // boolean

  // false
  // Send empty value
  // canMinorApply
  // boolean

  // true
  // Send empty value
  // otherLettersRequired
  // boolean

  // true
  // Send empty value
  // newCardValidityYear
  // integer
  // 2147483647
  // Send empty value
  // renewCardValidityYea

  const initialValues = {
    // name: edit ? (organizationSetup ? organizationSetup.name : "") : "",
    // phoneNo: edit ? (organizationSetup ? organizationSetup.phoneNo : "") : "",
    // email: edit ? (organizationSetup ? organizationSetup.email : "") : "",
    // address: edit ? (organizationSetup ? organizationSetup.address : "") : "",
    // fiscalSessionType: edit
    //   ? organizationSetup
    //     ? organizationSetup.fiscalSessionType
    //     : ""
    //   : "",
    // logo: logoImage,
    // stamp: stampImage,
    // signature: signatureImage,

    recommendationRequired: edit
      ? organizationSetup
        ? organizationSetup.recommendationRequired
        : ""
      : "",
    canMinorApply: edit
      ? organizationSetup
        ? organizationSetup.canMinorApply
        : ""
      : "",
    newCardValidityYear: edit
      ? organizationSetup
        ? organizationSetup.newCardValidityYear
        : ""
      : "",
    renewCardValidityYear: edit
      ? organizationSetup
        ? organizationSetup.renewCardValidityYear
        : ""
      : "",
  };

  const validationSchema = Yup.object().shape({
    // name: Yup.string().required("Required"),
    // address: Yup.string().required("Required"),
    // phoneNo: Yup.string().required("Phone Number"),
    // email: Yup.string().email("@ is required").required("Required."),

    // logo: Yup.mixed()
    //   .test(
    //     "fileSize",
    //     "File must be less than 20KB",
    //     (file) => !file || (file && file.size <= FAVICON_SIZE)
    //   )
    //   .test(
    //     "fileType",
    //     "Unsupported File Format.",
    //     (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
    //   ),
    // signature: Yup.mixed()
    //   .test(
    //     "fileSize",
    //     "File must be less than 20KB",
    //     (file) => !file || (file && file.size <= FAVICON_SIZE)
    //   )
    //   .test(
    //     "fileType",
    //     "Unsupported File Format.",
    //     (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
    //   ),
    // stamp: Yup.mixed()
    //   .test(
    //     "fileSize",
    //     "File must be less than 20KB.",
    //     (file) => !file || (file && file.size <= FAVICON_SIZE)
    //   )
    //   .test(
    //     "fileType",
    //     "Unsupported File Format.",
    //     (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
    //   ),

    recommendationRequired: Yup.boolean(),
    canMinorApply: Yup.boolean(),
    newCardValidityYear: Yup.number().min(0).max(2147483647),
    renewCardValidityYear: Yup.number().min(0).max(2147483647),
  });
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    if (!edit) {
      const result = await dispatch(createOrganizationSetup(values));

      if (result) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } else {
      const createData = {
        id: organizationSetup?.id,
        values: { ...values },
      };
      const result = await dispatch(updateOrganizationSetup(createData));
      if (result) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    }
  };

  // const handleFileChange = (event, setFieldValue) => {
  //   const file = event.target.files[0];
  //   const acceptedExtensions = ["jpeg", "jpg", "png"];

  //   if (file) {
  //     const extension = file.name.split(".").pop().toLowerCase();
  //     if (!acceptedExtensions.includes(extension)) {
  //       errorFunction(
  //         `File extension of "jpeg", "jpg", "png" are only accepted`
  //       );
  //       return;
  //     } else {
  // if (event.target.name === "logo") {
  //   setFieldValue("logo", event.target.files[0]);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onloadend = () => setLogo([reader.result]);
  // } else if (event.target.name === "stamp") {
  //   setFieldValue("stamp", event.target.files[0]);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onloadend = () => setStamp([reader.result]);
  // } else if (event.target.name === "signature") {
  //   setFieldValue("signature", event.target.files[0]);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onloadend = () => setSignature([reader.result]);
  // }
  // }
  // }

  // onChange(event);
  // };

  return (
    <div className="row">
      <div className="col-12">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const { setFieldValue } = formik;
            return (
              <Form autoComplete="off">
                <div className="my-2">
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label htmlFor="name" className="fw-bold float-start">
                        Recommendation Required
                        <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="checkbox"
                        name="recommendationRequired"
                        className="form-check-input ml-3"
                        checked={formik.values.recommendationRequired}
                        onChange={(e) => {
                          setFieldValue(
                            "recommendationRequired",
                            e.target.checked
                          );
                        }}
                      />
                      <ErrorMessage
                        name="recommendationRequired"
                        component={TextError}
                      />
                    </div>

                    <div className="col-6 mb-3">
                      <label
                        htmlFor="canMinorApply"
                        className="fw-bold float-start"
                      >
                        Can Minor Apply
                        <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="checkbox"
                        name="canMinorApply"
                        className="form-check-input ml-3"
                        checked={formik.values.canMinorApply}
                        onChange={(e) => {
                          setFieldValue("canMinorApply", e.target.checked);
                        }}
                      />
                      <ErrorMessage
                        name="canMinorApply"
                        component={TextError}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label
                        htmlFor="newCardValidityYear"
                        className="fw-bold float-start"
                      >
                        New Card Validity Year
                        <strong className="text-danger ">*</strong>
                      </label>
                      <Field
                        type="number"
                        value={formik.values.newCardValidityYear}
                        name="newCardValidityYear"
                        onChange={(e) => {
                          setFieldValue("newCardValidityYear", e.target.value);
                        }}
                        className="form-control "
                      />
                      <ErrorMessage
                        name="newCardValidityYear"
                        component={TextError}
                      />
                    </div>
                    <div className="col-6">
                      <label
                        htmlFor="renewCardValidityYear"
                        className="fw-bold float-start"
                      >
                        Renew Card Validity Year
                        <strong className="text-danger ">*</strong>
                      </label>
                      <Field
                        type="number"
                        value={formik.values.renewCardValidityYear}
                        name="renewCardValidityYear"
                        onChange={(e) => {
                          setFieldValue(
                            "renewCardValidityYear",
                            e.target.value
                          );
                        }}
                        className="form-control "
                      />
                      <ErrorMessage
                        name="renewCardValidityYear"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>

                <div className="my-4 d-flex justify-content-end align-items-center">
                  <Button
                    type="submit"
                    className={"btn btn-primary"}
                    createButton={true}
                    title={edit ? "Update" : "Save"}
                    content={edit ? "Update" : "Save"}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateOrganizationSetup;
