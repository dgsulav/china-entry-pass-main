import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Select from "react-select";
import * as Yup from "yup";
import { bsToAd, adToBs } from "@sbmdkl/nepali-date-converter";
import TextError from "../../Component/TextError/TextError";
import { useSelector, useDispatch } from "react-redux";
import {
  renewCardClearData,
  getRenewCardRequest,
  updateRenewCard,
} from "../../Redux/RenewCard/thunk";
import Button from "../../Component/Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaFileSignature } from "react-icons/fa";

import Thumb from "../../Component/Thumb";

import { FILE_SIZE, SUPPORTED_FORMATS } from "../../utils/image";
import { AsyncPaginate } from "react-select-async-paginate";

import { genders } from "../../Component/Data/Data";
import { errorFunction } from "../../Component/Alert";
import useFetchImage from "../../utils/fetchImage";
import {
  loadOptionsDistrict,
  loadOptionsPalika,
  loadOptionsProvince,
} from "./asyncFunction";
import Tooltip from "../../Component/Tooltip/Tooltip";
import Modal from "../../Component/Modal";

import Signature from "../../Component/SignaturePad";
import RejectModal from "../../Component/AlertModal/Reject";
import { verifyCardThunk } from "../../Redux/Card/thunk";

const Calendar = lazy(() => import("@sbmdkl/nepali-datepicker-reactjs"));

const CreateRenewCard = ({
  currentPage,
  postsPerPage,
  setShowModal,
  showSignatureModal,
  setShowSignatureModal,
  verifyCard,
  setSignaturesText,
  setSignatures,
  signatures,
}) => {
  // props
  const { renewCard, edit, loadingUpdate, loading } = useSelector(
    (state) => state.renewCard
  );
  const [editForm, setEditForm] = useState(edit ? true : false);
  const dispatch = useDispatch();
  //state for disabling the submit button

  const userPhotoImage = useFetchImage(edit, edit ? renewCard?.userPhoto : "");

  const citizenshipFrontImage = useFetchImage(
    edit,
    edit ? renewCard?.citizenshipFront : ""
  );
  const citizenshipBackImage = useFetchImage(
    edit,
    edit ? renewCard?.citizenshipBack : ""
  );
  const birthCertificateImage = useFetchImage(
    edit,
    edit ? renewCard?.birthCertificate : ""
  );
  const recommendationLetterImage = useFetchImage(
    edit,
    edit ? renewCard?.recommendationLetter : ""
  );

  const [dateState, setDateState] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [userPhoto, setUserPhoto] = useState(
    edit ? (renewCard ? renewCard?.userPhoto : null) : null
  );

  const [citizenshipFrontImg, setCitizenshipFrontImg] = useState(
    edit ? (renewCard ? renewCard?.citizenshipFront : null) : null
  );
  const [citizenshipBackImg, setCitizenshipBackImg] = useState(
    edit ? (renewCard ? renewCard?.citizenshipBack : null) : null
  );
  const [birthCertificateImg, setBirthCertificateImg] = useState(
    edit ? (renewCard ? renewCard?.birthCertificate : null) : null
  );
  const [recommendationLetterImg, setRecommendationLetterImg] = useState(
    edit ? (renewCard ? renewCard?.recommendationLetter : null) : null
  );

  useEffect(() => {
    // Set dateState when the component mounts or when 'edit' or 'renewCard' changes
    if (edit && renewCard?.dobBs) {
      setDateState(renewCard.dobBs);
    } else if (!edit) {
      setDateState("2080-02-21");
    }

    // Cleanup function
    return () => {
      setDateState("");
    };
  }, [edit, renewCard, dispatch]);

  //initial state of the form
  const initialState = {
    userPhoto: userPhotoImage,
    firstName: edit ? renewCard?.firstName : "",
    middleName: edit ? renewCard?.middleName : "",
    lastName: edit ? renewCard?.lastName : "",
    dob: edit && renewCard.dob ? renewCard.dob : "",
    dobBs: edit && renewCard ? dateState : "",
    permanentAddress: edit ? renewCard?.permanentAddress : "",
    email: edit ? (renewCard.email ? renewCard?.email : "") : "",
    gender: edit
      ? renewCard.gender
        ? genders.find((value) => value?.id === renewCard?.gender)
        : null
      : null,
    province: edit ? (renewCard.province ? renewCard.province : null) : null,
    district: edit ? (renewCard.district ? renewCard?.district : null) : null,
    palika: edit ? (renewCard?.palika ? renewCard?.palika : null) : null,
    wardNumber: edit ? renewCard.wardNumber : "",

    citizenshipNumber: edit
      ? renewCard.citizenshipNumber
        ? renewCard.citizenshipNumber
        : ""
      : "",
    hasCitizenship: edit
      ? renewCard?.citizenshipIssuedDate
        ? "yes"
        : "no"
      : "yes",
    citizenshipIssuedFrom: edit ? renewCard?.citizenshipIssuedFrom : "",
    citizenshipIssuedDate: edit ? renewCard?.citizenshipIssuedDate : "",
    citizenshipFront: citizenshipFrontImage,
    citizenshipBack: citizenshipBackImage,
    birthCertificate: birthCertificateImage,
    fatherName: edit ? (renewCard.fatherName ? renewCard.fatherName : "") : "",
    spouseName: edit ? (renewCard.spouseName ? renewCard.spouseName : "") : "",
    mobileNumber: edit ? renewCard?.mobileNumber : "",
    isRecommended: edit
      ? renewCard?.isRecommended === true
        ? "yes"
        : "no"
      : "no",
    recommendationLetter: recommendationLetterImage,
    isConfirmed: edit ? renewCard?.isConfirmed : false,

    remarks: "",
  };

  //validation rules of the form
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required.")
      .min(2, "First Name must be at least 2 characters.")
      .max(50, "First Name must be at most 50 characters."),
    middleName: Yup.string().max(50, "Name must be at most 50 characters."),
    lastName: Yup.string()
      .required("Last Name is required.")
      .min(2, "Last Name must be at least 2 characters.")
      .max(50, "Last Name must be at most 50 characters."),
    mobileNumber: Yup.string()
      .required("Mobile Number")
      .matches(
        /^9\d{9}$/,
        "Mobile number should start with 98 and should be 10 digits."
      ),
    email: Yup.string().email("@ is required").required("Required."),
    gender: Yup.object().nullable(),
    province: Yup.object().nullable(),
    district: Yup.object().nullable(),
    palika: Yup.object().nullable(),
    wardNumber: Yup.number()
      .integer("Ward must be an integer")
      .typeError("Please enter a valid Ward No")
      .positive("Ward must be a positive number")
      .required("Ward is required"),

    dobBs: Yup.string().test(
      "dobBs",
      "Birth Date(BS) cannot be greater than today's date",
      function (value) {
        const adDate =
          value !== undefined
            ? value.length === 10
              ? bsToAd(value)
              : value
            : "";

        if (value !== undefined && new Date(adDate) > new Date()) {
          return false;
        } else {
          return true;
        }
      }
    ),
    permanentAddress: Yup.string().required("Permanent Address is required."),
    fatherName: Yup.string()
      .required("Father Name is required.")
      .min(2, "Father Name must be at least 2 character.")
      .max(50, "Father Name must be at most 50 characters."),
    spouseName: Yup.string()
      .min(2, "Spouse Name must be at least 2 character.")
      .max(50, "Spouse Name must be at most 50 characters."),
    hasCitizenship: Yup.string().required(),
    citizenshipNumber: Yup.mixed().when("hasCitizenship", {
      is: (hasCitizenship) => hasCitizenship === "yes",
      then: Yup.string().required("Citizenship Number is required"),
    }),
    citizenshipIssuedFrom: Yup.mixed().when("hasCitizenship", {
      is: (hasCitizenship) => hasCitizenship === "yes",
      then: Yup.string()
        .required("Citizenship Issued From is required.")
        .min(2, "Citizenship Issued From must be at least 2 characters.")
        .max(20, "Citizenship Issued From must be at most 20 characters."),
    }),
    citizenshipIssuedDate: Yup.mixed().when("hasCitizenship", {
      is: (hasCitizenship) => hasCitizenship === "yes",
      then: Yup.string()
        .required("Citizenship Issued Date is required.")
        .min(2, "Citizenship Issued Date must be at least 2 characters.")
        .max(20, "Citizenship Issued Date must be at most 20 characters."),
    }),

    birthCertificate: Yup.mixed()
      .test("test", "Required", function (value) {
        const hasCitizenship = this.options.parent.hasCitizenship;
        if (hasCitizenship === "yes" && value === null) {
          return true;
        } else return false;
      })
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB.",
        (file) => !file || (file && file.size <= FILE_SIZE)
      )
      .test(
        "fileType",
        "Unsupported File Format.",
        (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
      ),

    citizenshipFront: Yup.mixed()
      .test("test", "Required", function (value) {
        const hasCitizenship = this.options.parent.hasCitizenship;

        if (hasCitizenship === "yes" && value === null) {
          return false;
        } else return true;
      })
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB.",
        (file) =>
          function (file) {
            if (!file) return true; // Allow if no file is provided

            const fileSizeInKB = file.byteLength / 1024;
            return fileSizeInKB <= FILE_SIZE;
          }
      )
      .test(
        "fileType",
        "Unsupported File Format.",
        (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
      ),

    citizenshipBack: Yup.mixed()
      .test("test", "Required", function (value) {
        const hasCitizenship = this.options.parent.hasCitizenship;
        if (hasCitizenship === "yes" && value === null) {
          return false;
        } else return true;
      })
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB.",
        (file) => !file || (file && file.size <= FILE_SIZE)
      )
      .test(
        "fileType",
        "Unsupported File Format.",
        (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
      ),

    isRecommended: Yup.string().required("Required"),
    recommendationLetter: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB.",
        (file) => !file || (file && file.size <= FILE_SIZE)
      )
      .test(
        "fileType",
        "Unsupported File Format.",
        (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
      ),
    isConfirmed: Yup.bool(),
    // remarks:
    //   edit &&
    //   Yup.string()
    //     .required("Remarks is required.")
    //     .min(1, "Remarks Name must be at most 1 characters."),
  });
  const onSubmit = async (values) => {
    const { remarks, gender, province, district, palika, citizenshipFront } =
      values;

    if (edit) {
      const id = renewCard?.id;
      const result = await dispatch(
        updateRenewCard(
          id,
          {
            ...values,
            gender: gender?.id,
            province: province?.id,
            district: district?.id,
            palika: palika?.id,
            remarks,
          },
          currentPage
        )
      );

      if (result) {
        setShowModal(false);
        setBirthCertificateImg(null);
        setCitizenshipBackImg(null);
        setCitizenshipFrontImg(null);
        setRecommendationLetterImg(null);
        setUserPhoto(null);
        dispatch(renewCardClearData());
      } else {
        setShowModal(true);
      }
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    const acceptedExtensions = ["jpeg", "jpg", "png"];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!acceptedExtensions.includes(extension)) {
        errorFunction(
          `File extension of "jpeg", "jpg", "png" are only accepted`
        );
        return;
      } else {
        if (event.target.name === "userPhoto") {
          setFieldValue("userPhoto", event.target.files[0]);
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = () => setUserPhoto([reader.result]);
        } else if (event.target.name === "citizenshipFront") {
          setFieldValue("citizenshipFront", event.target.files[0]);
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = () => setCitizenshipFrontImg([reader.result]);
        } else if (event.target.name === "citizenshipBack") {
          setFieldValue("citizenshipBack", event.target.files[0]);
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = () => setCitizenshipBackImg([reader.result]);
        } else if (event.target.name === "birthCertificate") {
          setFieldValue("birthCertificate", event.target.files[0]);
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = () => setBirthCertificateImg([reader.result]);
        } else if (event.target.name === "recommendationLetter") {
          setFieldValue("recommendationLetter", event.target.files[0]);
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = () => setRecommendationLetterImg([reader.result]);
        }
      }
    }

    // onChange(event);
  };

  const handleSubmit = async () => {
    if (signatures[0] === "") {
      errorFunction("Signature is not captured. Please capture signature.");
    } else {
      const updatedValues = {
        //   voucherReferenceNumber: voucherReferenceNumber,
        status: "verified",
        signature: signatures,
      };

      const result = await dispatch(
        verifyCardThunk(renewCard?.id, updatedValues)
      );

      if (result) {
        setShowSignatureModal(false);
        dispatch(getRenewCardRequest(10));
        setShowModal(false);
        setShowSignatureModal(false);
        setSignatures([""]);
        setSignaturesText([""]);
      } else {
        setShowSignatureModal(true);
      }
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={editForm ? handleSubmit : onSubmit}
      >
        {(formik) => {
          const { setFieldValue } = formik;

          return (
            <Form autoComplete="off">
              <div className=" rounded">
                <div className="row">
                  <div className="mt-2 col-12 ">
                    <div className="registration-process">
                      <div className="form-group row my-2 ">
                        <div className="mt-2 col-3 flex-column d-flex">
                          <label
                            htmlFor="userPhoto"
                            className="fw-bold float-start"
                          >
                            Profile
                            <strong className="text-danger ">*</strong>
                          </label>

                          {userPhoto && (
                            <Thumb thumb={userPhoto} height={80} width={80} />
                          )}
                          {renewCard && renewCard?.userPhoto && !userPhoto && (
                            <Thumb
                              thumb={renewCard?.userPhoto}
                              height={80}
                              width={80}
                            />
                          )}
                          <input
                            type="file"
                            name="userPhoto"
                            className="form-control form-control-sm"
                            onChange={(event) => {
                              handleFileChange(event, setFieldValue);
                            }}
                            disabled={editForm}
                          />

                          <ErrorMessage
                            name="userPhoto"
                            component={TextError}
                          />
                        </div>
                        <div className="mt-2 col-6 flex-column d-flex"></div>
                        {edit && (
                          <>
                            {" "}
                            <div className="row mt-2 col-3 d-flex justify-content-end">
                              <div>
                                <Tooltip content="Edit">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-edit btn-primary mx-1"
                                    style={{ height: "max-content" }}
                                    onClick={() => {
                                      setEditForm((pre) => !pre);
                                    }}
                                  >
                                    <FaEdit size={18} />
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="form-group row my-2 ">
                        <div className="mt-2 col-3">
                          <label
                            htmlFor="firstName"
                            className="fw-bold float-start"
                          >
                            First Name
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            value={formik.values.firstName}
                            type="text"
                            disabled={editForm}
                            name="firstName"
                            className="form-control "
                            placeholder="First Name"
                            onChange={(e) => {
                              setFieldValue("firstName", e.target.value);
                            }}
                          />
                          <ErrorMessage
                            name="firstName"
                            component={TextError}
                          />
                        </div>
                        <div className="mt-2 col-3">
                          <label
                            htmlFor="middleName"
                            className="fw-bold float-start"
                          >
                            Middle Name
                          </label>
                          <Field
                            type="text"
                            disabled={editForm}
                            name="middleName"
                            value={formik.values.middleName}
                            className="form-control "
                            placeholder="Middle Name"
                            onChange={(e) => {
                              setFieldValue("middleName", e.target.value);
                            }}
                          />

                          <ErrorMessage
                            name="middleName"
                            component={TextError}
                          />
                        </div>
                        <div className="mt-2 col-3">
                          <label
                            htmlFor="lastName"
                            className="fw-bold float-start"
                          >
                            Last Name
                            <strong className="text-danger ">*</strong>
                          </label>

                          <Field
                            type="text"
                            disabled={editForm}
                            value={formik.values.lastName}
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={(e) => {
                              setFieldValue("lastName", e.target.value);
                            }}
                          />
                          <ErrorMessage name="lastName" component={TextError} />
                        </div>
                        <div className="mt-2 col-3">
                          <label
                            htmlFor="mobileNumber"
                            className="fw-bold float-start"
                          >
                            Mobile Number
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="text"
                            disabled={editForm}
                            value={formik.values.mobileNumber}
                            name="mobileNumber"
                            onChange={(e) => {
                              setFieldValue("mobileNumber", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Mobile Number"
                          />

                          <ErrorMessage
                            name="mobileNumber"
                            component={TextError}
                          />
                        </div>
                        <div className="mt-2 col-3">
                          <label
                            htmlFor="email"
                            className="fw-bold float-start"
                          >
                            Email
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="email"
                            value={formik.values.email}
                            name="email"
                            onChange={(e) => {
                              setFieldValue("email", e.target.value);
                            }}
                            disabled={editForm}
                            className="form-control "
                            placeholder="Enter Your Email"
                          />

                          <ErrorMessage name="email" component={TextError} />
                        </div>
                        <div className="mt-2 col-3">
                          <label
                            htmlFor="gender"
                            className="fw-bold float-start"
                          >
                            Gender
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Select
                            value={formik.values.gender}
                            isClearable="true"
                            isSearchable="true"
                            name="gender"
                            isDisabled={editForm}
                            getOptionLabel={(option) => `${option?.name} `}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              setFieldValue("gender", selected);
                            }}
                            options={genders}
                          />
                          <ErrorMessage name="gender" component={TextError} />
                        </div>

                        <div className="mt-2 col-3">
                          <label
                            htmlFor="dobBs"
                            className="fw-bold float-start"
                          >
                            Date Of Birth(BS)
                            <strong className="text-danger ">*</strong>
                          </label>

                          {edit ? (
                            <Suspense fallback={<div>Loading...</div>}>
                              <Calendar
                                value={formik.values?.dobBs || ""} // Ensure that value is either a valid date or an empty string
                                className="form-control"
                                label="Date of Birth(BS)"
                                placeholder="Select Date of Birth(BS)"
                                name="dobBs"
                                isDisabled={editForm}
                                language="en"
                                defaultDate={edit ? formik.values?.dobBs : ""}
                                dateFormat="YYYY-MM-DD"
                                onChange={({ bsDate, adDate }) => {
                                  setDateState(bsDate);
                                  setFieldValue("dobBs", bsDate);
                                  setFieldValue("dob", adDate);
                                }}
                              />

                              <ErrorMessage
                                name="dobBs"
                                component={TextError}
                              />
                            </Suspense>
                          ) : (
                            <>
                              <Suspense fallback={<div>Loading...</div>}>
                                <Calendar
                                  value={formik.values?.dobBs} // Ensure that value is either a valid date or an empty string
                                  className="form-control"
                                  label="Date of Birth(BS)"
                                  placeholder="Select Date of Birth(BS)"
                                  name="dobBs"
                                  language="en"
                                  hideDefaultValue
                                  dateFormat="YYYY-MM-DD"
                                  onChange={({ bsDate, adDate }) => {
                                    setDateState(bsDate);
                                    setFieldValue("dobBs", bsDate);
                                    setFieldValue("dob", adDate);
                                  }}
                                />

                                <ErrorMessage
                                  name="dobBs"
                                  component={TextError}
                                />
                              </Suspense>{" "}
                            </>
                          )}
                        </div>
                        <div className="mt-2 col-3">
                          <label htmlFor="dob" className="fw-bold float-start">
                            Date Of Birth (AD)
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="text"
                            disabled={true}
                            value={formik.values.dob}
                            name="dob"
                            onChange={(e) => {
                              setFieldValue("dob", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Citizenship Issued From"
                          />

                          <ErrorMessage name="dob" component={TextError} />
                        </div>

                        <div className="mt-2 col-2">
                          <label
                            htmlFor="province"
                            className="fw-bold float-start"
                          >
                            Province
                            <strong className="text-danger ">*</strong>
                          </label>
                          <AsyncPaginate
                            blurInputOnSelect
                            value={formik.values.province}
                            isClearable="true"
                            isSearchable="true"
                            name="province"
                            inputId="input"
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            isDisabled={editForm}
                            onChange={(select) => {
                              if (select) {
                                if (
                                  select?.id === formik.values?.province?.id
                                ) {
                                  setFieldValue("province", select);
                                } else {
                                  setFieldValue("province", select);
                                  setFieldValue("district", null);
                                  setFieldValue("palika", null);
                                }
                              } else {
                                setFieldValue("province", null);
                                setFieldValue("district", null);
                                setFieldValue("palika", null);
                              }
                            }}
                            loadOptions={loadOptionsProvince}
                            additional={{
                              offset: 0,
                              limit: 10,
                            }}
                          />

                          <ErrorMessage name="province" component={TextError} />
                        </div>
                        <div className="mt-2 col-2">
                          <label
                            htmlFor="district"
                            className="fw-bold float-start"
                          >
                            District
                            <strong className="text-danger ">*</strong>
                          </label>
                          <AsyncPaginate
                            blurInputOnSelect
                            key={JSON.stringify(formik.values?.province)}
                            value={formik.values.district}
                            isClearable="true"
                            isSearchable="true"
                            name="district"
                            inputId="input"
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(select) => {
                              if (select) {
                                if (
                                  select?.id === formik.values?.district?.id
                                ) {
                                  setFieldValue("district", select);
                                } else {
                                  setFieldValue("district", select);
                                  setFieldValue("palika", null);
                                }
                              } else {
                                setFieldValue("district", null);
                                setFieldValue("palika", null);
                              }
                            }}
                            isDisabled={
                              formik?.values?.province === null
                                ? true
                                : false || editForm
                            }
                            loadOptions={loadOptionsDistrict}
                            additional={{
                              offset: 0,
                              limit: 10,
                              province: formik?.values?.province,
                            }}
                          />
                          <ErrorMessage name="district" component={TextError} />
                        </div>

                        <div className="mt-2 col-2">
                          <label
                            htmlFor="palika"
                            className="fw-bold float-start"
                          >
                            Palika
                            <strong className="text-danger ">*</strong>
                          </label>

                          <AsyncPaginate
                            blurInputOnSelect
                            key={JSON.stringify(formik.values?.district)}
                            disabled={
                              formik?.values?.district === null
                                ? true
                                : false || editForm
                            }
                            value={formik.values.palika}
                            isClearable="true"
                            isSearchable="true"
                            name="palika"
                            inputId="input"
                            isDisabled={
                              formik?.values?.district === null
                                ? true
                                : false || editForm
                            }
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              setFieldValue("palika", selected);
                            }}
                            loadOptions={loadOptionsPalika}
                            additional={{
                              offset: 0,
                              limit: 10,
                              district: formik?.values?.district,
                            }}
                          />
                          <ErrorMessage name="palika" component={TextError} />
                        </div>
                        <div className="mt-2 col-2">
                          <label
                            htmlFor="wardNumber"
                            className="fw-bold float-start"
                          >
                            Ward
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="number"
                            disabled={editForm}
                            value={formik.values.wardNumber}
                            name="wardNumber"
                            onChange={(e) => {
                              setFieldValue("wardNumber", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Ward Number"
                          />

                          <ErrorMessage
                            name="wardNumber"
                            component={TextError}
                          />
                        </div>

                        <div className="mt-2 col-4">
                          <label
                            htmlFor="permanentAddress"
                            className="fw-bold float-start"
                          >
                            Permanent Address
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="text"
                            disabled={editForm}
                            value={formik.values.permanentAddress}
                            name="permanentAddress"
                            onChange={(e) => {
                              setFieldValue("permanentAddress", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Permanent Address"
                          />

                          <ErrorMessage
                            name="permanentAddress"
                            component={TextError}
                          />
                        </div>
                        <div className="mt-2 col-6">
                          <label
                            htmlFor="fatherName"
                            className="fw-bold float-start"
                          >
                            Father Name{" "}
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="text"
                            disabled={editForm}
                            value={formik.values.fatherName}
                            name="fatherName"
                            onChange={(e) => {
                              setFieldValue("fatherName", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Father Name"
                          />

                          <ErrorMessage
                            name="fatherName"
                            component={TextError}
                          />
                        </div>
                        <div className="mt-2 col-6">
                          <label
                            htmlFor="spouseName"
                            className="fw-bold float-start"
                          >
                            Spouse Name
                          </label>
                          <Field
                            type="text"
                            disabled={editForm}
                            value={formik.values.spouseName}
                            name="spouseName"
                            onChange={(e) => {
                              setFieldValue("spouseName", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Spouse Name"
                          />

                          <ErrorMessage
                            name="spouseName"
                            component={TextError}
                          />
                        </div>
                      </div>
                      <div className="form-group row my-2 ">
                        <div
                          className="mt-2 col-12 d-flex"
                          style={{ gap: "50px" }}
                        >
                          <label
                            htmlFor="hasCitizenship"
                            className="fw-bold float-start"
                          >
                            <strong className="bold">
                              Do you have Citizenship?
                            </strong>
                            <strong className="text-danger ">*</strong>
                          </label>

                          <div
                            className="d-flex flex-grow-1 "
                            style={{ gap: "20px" }}
                          >
                            <div className="form-check">
                              <Field
                                type="radio"
                                id="hasCitizenshipYes"
                                name="hasCitizenship"
                                value="yes"
                                checked={formik.values.hasCitizenship === "yes"}
                                onChange={() =>
                                  setFieldValue("hasCitizenship", "yes")
                                }
                                className="form-check-input"
                                disabled={editForm}
                              />
                              <label
                                htmlFor="hasCitizenshipYes"
                                className="form-check-label"
                              >
                                Yes
                              </label>
                            </div>

                            <div className="form-check">
                              <Field
                                type="radio"
                                id="hasCitizenshipNo"
                                name="hasCitizenship"
                                value="no"
                                checked={formik.values.hasCitizenship === "no"}
                                onChange={() =>
                                  setFieldValue("hasCitizenship", "no")
                                }
                                disabled
                                className="form-check-input"
                                // disabled={editForm}
                              />
                              <label
                                htmlFor="hasCitizenshipNo"
                                className="form-check-label"
                              >
                                No
                              </label>
                            </div>
                          </div>

                          <ErrorMessage
                            name="hasCitizenship"
                            component={TextError}
                          />
                        </div>
                        {formik.values.hasCitizenship === "yes" ? (
                          <>
                            <div className="mt-2 col-4">
                              <label
                                htmlFor="citizenshipNumber"
                                className="fw-bold float-start"
                              >
                                Citizenship No.
                                {formik.values.hasCitizenship === "yes" && (
                                  <strong className="text-danger ">*</strong>
                                )}
                              </label>
                              <Field
                                type="text"
                                disabled={editForm}
                                value={formik.values.citizenshipNumber}
                                name="citizenshipNumber"
                                onChange={(e) => {
                                  setFieldValue(
                                    "citizenshipNumber",
                                    e.target.value
                                  );
                                }}
                                className="form-control "
                                placeholder="Citizenship No"
                              />

                              <ErrorMessage
                                name="citizenshipNumber"
                                component={TextError}
                              />
                            </div>
                            <div className="mt-2 col-4">
                              <label
                                htmlFor="citizenshipIssuedDate"
                                className="fw-bold float-start"
                              >
                                Issued Date
                                {formik.values.hasCitizenship === "yes" && (
                                  <strong className="text-danger ">*</strong>
                                )}
                              </label>
                              <Calendar
                                value={formik.values?.citizenshipIssuedDate} // Ensure that value is either a valid date or an empty string
                                className="form-control"
                                label="Issued Date"
                                placeholder="Select Issued Date"
                                name="citizenshipIssuedDate"
                                language="en"
                                hideDefaultValue
                                dateFormat="YYYY-MM-DD"
                                onChange={({ bsDate, adDate }) => {
                                  setFieldValue(
                                    "citizenshipIssuedDate",
                                    bsDate
                                  );
                                }}
                              />

                              <ErrorMessage
                                name="citizenshipIssuedDate"
                                component={TextError}
                              />
                            </div>
                            <div className="mt-2 col-4">
                              <label
                                htmlFor="citizenshipIssuedFrom"
                                className="fw-bold float-start"
                              >
                                Citizenship Issued From
                                {formik.values.hasCitizenship === "yes" && (
                                  <strong className="text-danger ">*</strong>
                                )}
                              </label>
                              <Field
                                type="text"
                                disabled={editForm}
                                value={formik.values.citizenshipIssuedFrom}
                                name="citizenshipIssuedFrom"
                                onChange={(e) => {
                                  setFieldValue(
                                    "citizenshipIssuedFrom",
                                    e.target.value
                                  );
                                }}
                                className="form-control "
                                placeholder="Citizenship Issued From"
                              />

                              <ErrorMessage
                                name="citizenshipIssuedFrom"
                                component={TextError}
                              />
                            </div>
                            <div className="mt-2 col-4">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="citizenshipFront"
                                  className="fw-bold float-start"
                                >
                                  Citizenship Front
                                  {formik.values.hasCitizenship === "yes" && (
                                    <strong className="text-danger ">*</strong>
                                  )}
                                </label>
                                {citizenshipFrontImg && (
                                  <Thumb
                                    height={80}
                                    width={80}
                                    thumb={citizenshipFrontImg}
                                  />
                                )}
                                {renewCard &&
                                  renewCard?.citizenshipFront &&
                                  !citizenshipFrontImg && (
                                    <Thumb
                                      height={80}
                                      width={80}
                                      thumb={renewCard?.citizenshipFront}
                                    />
                                  )}
                              </div>
                              <input
                                type="file"
                                name="citizenshipFront"
                                disabled={editForm}
                                className="form-control form-control-sm"
                                onChange={(event) => {
                                  handleFileChange(event, setFieldValue);
                                }}
                              />

                              <ErrorMessage
                                name="citizenshipFront"
                                component={TextError}
                              />
                            </div>
                            <div className="mt-2 col-4">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="citizenshipBack"
                                  className="fw-bold float-start"
                                >
                                  Citizenship Back
                                  {formik.values.hasCitizenship === "yes" && (
                                    <strong className="text-danger ">*</strong>
                                  )}
                                </label>
                                {citizenshipBackImg && (
                                  <Thumb
                                    height={80}
                                    width={80}
                                    thumb={citizenshipBackImg}
                                  />
                                )}
                                {renewCard &&
                                  renewCard?.citizenshipBack &&
                                  !citizenshipBackImg && (
                                    <Thumb
                                      height={80}
                                      width={80}
                                      thumb={renewCard?.citizenshipBack}
                                    />
                                  )}
                              </div>
                              <input
                                type="file"
                                disabled={editForm}
                                name="citizenshipBack"
                                className="form-control form-control-sm"
                                onChange={(event) => {
                                  handleFileChange(event, setFieldValue);
                                }}
                              />

                              <ErrorMessage
                                name="citizenshipBack"
                                component={TextError}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="mt-2 col-4">
                            <div className="d-flex flex-column">
                              <label
                                htmlFor="birthCertificate"
                                className="fw-bold float-start"
                              >
                                Birth Certificate
                                {formik.values.hasCitizenship === "no" && (
                                  <strong className="text-danger ">*</strong>
                                )}
                              </label>
                              {birthCertificateImg && (
                                <Thumb
                                  height={80}
                                  width={80}
                                  thumb={birthCertificateImg}
                                />
                              )}
                              {renewCard &&
                                renewCard?.birthCertificate &&
                                !birthCertificateImg && (
                                  <Thumb
                                    height={80}
                                    width={80}
                                    thumb={renewCard?.birthCertificate}
                                  />
                                )}
                            </div>
                            <input
                              type="file"
                              disabled={editForm}
                              name="birthCertificate"
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                handleFileChange(event, setFieldValue);
                              }}
                            />

                            <ErrorMessage
                              name="birthCertificate"
                              component={TextError}
                            />
                          </div>
                        )}
                      </div>
                      <div className="form-group row my-2 ">
                        <div className="col-8">
                          <div
                            className="col-12 mt-2 d-flex"
                            style={{ gap: "50px" }}
                          >
                            <label
                              htmlFor="isRecommended"
                              className="-bold float-start"
                            >
                              <strong className="bold">
                                Do you have any Recommendation Letter?
                              </strong>
                            </label>

                            <div className="d-flex" style={{ gap: "20px" }}>
                              <div className="form-check">
                                <Field
                                  type="radio"
                                  id="isRecommendedYes"
                                  name="isRecommended"
                                  value="yes"
                                  disabled={editForm}
                                  checked={
                                    formik.values.isRecommended === "yes"
                                  }
                                  onChange={() =>
                                    setFieldValue("isRecommended", "yes")
                                  }
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="isRecommendedYes"
                                  className="form-check-label"
                                >
                                  Yes
                                </label>
                              </div>

                              <div className="form-check">
                                <Field
                                  type="radio"
                                  id="isRecommendedNo"
                                  name="isRecommended"
                                  value="no"
                                  disabled={editForm}
                                  checked={formik.values.isRecommended === "no"}
                                  onChange={() =>
                                    setFieldValue("isRecommended", "no")
                                  }
                                  className="form-check-input"
                                />
                                <label
                                  htmlFor="isRecommendedNo"
                                  className="form-check-label"
                                >
                                  No
                                </label>
                              </div>
                            </div>

                            <ErrorMessage
                              name="isRecommended"
                              component={TextError}
                            />
                          </div>
                          <div className="col-4 mt-2">
                            <div className="d-flex flex-column">
                              <label
                                htmlFor="recommendationLetter"
                                className="fw-bold float-start"
                              >
                                Recommendation Letter
                                {formik.values.isRecommended === "yes" && (
                                  <strong className="text-danger ">*</strong>
                                )}
                              </label>
                              {recommendationLetterImg && (
                                <Thumb
                                  height={80}
                                  width={80}
                                  thumb={recommendationLetterImg}
                                />
                              )}
                              {renewCard &&
                                renewCard?.recommendationLetter &&
                                !recommendationLetterImg && (
                                  <Thumb
                                    height={80}
                                    width={80}
                                    thumb={renewCard?.recommendationLetter}
                                  />
                                )}
                            </div>
                            <input
                              type="file"
                              disabled={editForm}
                              name="recommendationLetter"
                              className="form-control form-control-sm"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "recommendationLetter",
                                  event.target.files[0]
                                );
                                let reader = new FileReader();
                                reader.readAsDataURL(event.target.files[0]);
                                reader.onloadend = () =>
                                  setRecommendationLetterImg([reader.result]);
                              }}
                            />

                            <ErrorMessage
                              name="recommendationLetter"
                              component={TextError}
                            />
                          </div>
                        </div>
                        {edit && editForm && (
                          <div className="col-4">
                            <div className="col-12">
                              <Signature
                                showSignatureModal={showSignatureModal}
                                setShowSignatureModal={setShowSignatureModal}
                                signatures={signatures}
                                setSignatures={setSignatures}
                                setSignaturesText={setSignaturesText}
                                setShowModal={setShowModal}
                              />
                            </div>
                            <div className="d-flex justify-content-center align-items-center gap-2 my-1">
                              <Button
                                type={"btn"}
                                className={"btn btn-primary"}
                                title={"Save"}
                                content={"Save"}
                                // onClick={onSubmit}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {!editForm && (
                        <div className="col-12 mt-3 text-center">
                          <Field
                            type="checkbox"
                            name="isConfirmed"
                            id="isConfirmed"
                            className="filled-in chk-col-blue "
                            onChange={(e) => {
                              setFieldValue("isConfirmed", e.target.checked);
                            }}
                          />
                          <label htmlFor="isConfirmed" className="mx-2 fw-bold">
                            Above mentioned Data is True Data.
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group text-center d-flex m-2 justify-content-center align-items-center">
                {editForm ? (
                  ""
                ) : !edit ? (
                  <Button
                    type={"btn"}
                    className={"btn btn-primary"}
                    loading={loading}
                    disabled={verifyCard}
                    // disabled={lock || !formik.dirty || loading}
                    title={"Create"}
                    content={"Add"}
                  />
                ) : (
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <Button
                        type={"button"}
                        className={"btn btn-danger"}
                        loading={loadingUpdate}
                        disabled={verifyCard}
                        onClick={() => setShowRejectModal(true)}
                        // disabled={lock || loadingUpdate}
                        title={"Reject"}
                        content={"Reject"}
                      />
                    </div>
                    <div className="align-items-center">
                      <Button
                        type={"btn"}
                        className={"btn btn-primary "}
                        loading={loadingUpdate}
                        disabled={verifyCard}
                        title={"Update"}
                        content={"Update"}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      {showRejectModal && (
        <Modal
          header={"Reason for rejecting this form."}
          types={"setup"}
          size={"modal-sm"}
          setShowModal={setShowRejectModal}
          showModal={showRejectModal}
        >
          <RejectModal
            types={"entryPass"}
            data={renewCard}
            dispatch={dispatch}
            showRejectModal={showRejectModal}
            setShowRejectModal={setShowRejectModal}
            setShowModal={setShowModal}
            setBirthCertificateImg={setBirthCertificateImg}
            setCitizenshipBackImg={setCitizenshipBackImg}
            setCitizenshipFrontImg={setCitizenshipFrontImg}
            setRecommendationLetterImg={setRecommendationLetterImg}
            setUserPhoto={setUserPhoto}
            clearAction={renewCardClearData}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
          />
        </Modal>
      )}
    </>
  );
};
export default CreateRenewCard;
