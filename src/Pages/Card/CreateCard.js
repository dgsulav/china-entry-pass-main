import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import * as Yup from "yup";
import { errorFunction } from "../../Component/Alert";
import RejectModal from "../../Component/AlertModal/Reject";
import Button from "../../Component/Button/Button";
import { genders } from "../../Component/Data/Data";
import Modal from "../../Component/Modal";
import Signature from "../../Component/SignaturePad";
import TextError from "../../Component/TextError/TextError";
import Thumb from "../../Component/Thumb";
import Tooltip from "../../Component/Tooltip/Tooltip";
import {
  cardClearData,
  createCard,
  getCardRequest,
  updateCard,
  verifyCardThunk,
} from "../../Redux/Card/thunk";
import defaultImage from "../../assets/profile.png";
import pdfImage from "../../assets/PDF_file_icon.png";
import { imageConvertor } from "../../utils/imageConvertor";
import CameraModal from "./CameraModal";
import CropModal from "./CropModal";
import {
  loadOptionsDistrict,
  loadOptionsOffice,
  loadOptionsPalika,
  loadOptionsProvince,
} from "./asyncFunction";
import { useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";
import { closeEditCardSuccessAction } from "../../Redux/Card/actions";
import ViewModal from "./ViewModal";
import NepaliDatePicker from "../../Component/NepaliDatePicker";
import Loader from "../../Component/Loader";

const CreateCard = ({
  currentPage,
  postsPerPage,
  setShowModal,
  showSignatureModal,
  setShowSignatureModal,
  verifyCard,
  setSignaturesText,
  setSignatures,
  signatures,
  edit,
  editDetails,
  masterData,
  loading,
  loadingCreate,
  loadingUpdate,
  loadingReject,
  type,
}) => {
  const citizenshipFrontRef = useRef(null);
  const citizenshipBackRef = useRef(null);
  const birthCertificateRef = useRef(null);
  const migrationDocumentRef = useRef(null);
  const marriageDocumentsRef = useRef(null);
  const recommendationLetterRef = useRef(null);

  const office = useSelector((state) => state.auth.office);
  const recommendationRequired = useSelector(
    (state) => state.organizationSetup.recommendationRequired
  );
  const permissions = useSelector((state) => state.auth.permissions);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const canMinorApply = useSelector(
    (state) => state.organizationSetup.canMinorApply
  );

  const dispatch = useDispatch();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [citizenshipFrontImg, setCitizenshipFrontImg] = useState(null);
  const [citizenshipFrontImgError, setCitizenshipFrontImgError] =
    useState(false);
  const [citizenshipBackImg, setCitizenshipBackImg] = useState(null);
  const [citizenshipBackImgError, setCitizenshipBackImgError] = useState(false);
  const [birthCertificateImg, setBirthCertificateImg] = useState(null);
  const [birthCertificateImgError, setBirthCertificateImgError] =
    useState(false);
  const [recommendationLetterImg, setRecommendationLetterImg] = useState(null);
  const [recommendationLetterImgError, setRecommendationLetterImgError] =
    useState(false);
  const [migrationDocument, setMigratedDocument] = useState(null);
  const [migrationDocumentError, setMigratedDocumentError] = useState(false);
  const [marriageDocuments, setMarriageDocuments] = useState(null);
  const [marriageDocumentsError, setMarriageDocumentsError] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [hasCitizenship, setHasCitizenship] = useState(true);
  const [viewData, setViewData] = useState("");
  const [migrated, setMigrated] = useState(false);
  const [married, setMarried] = useState(false);
  const [gender, setGender] = useState(null);
  // load data from already registered

  useEffect(() => {
    if (masterData !== null) {
      setPhoto(masterData?.userPhoto);
      setCitizenshipFrontImg(masterData?.citizenshipFront);
      setCitizenshipBackImg(masterData?.citizenshipBack);
      setBirthCertificateImg(masterData?.birthCertificate);
      setRecommendationLetterImg(masterData?.recommendationLetter);
      setMigratedDocument(masterData?.migrationDocument);
      setMarriageDocuments(masterData?.marriageDocuments);
    }
  }, [masterData]);

  //initial state of the form
  const initialState = {
    office: edit ? masterData?.office : office,
    firstName: edit ? masterData?.firstName : "",
    middleName: edit ? masterData?.middleName : "",
    lastName: edit ? masterData?.lastName : "",
    dob: edit && masterData?.dob ? masterData?.dob : "",
    dobBs: edit && masterData?.dobBs ? masterData?.dobBs : "",
    tole: edit ? masterData?.tole : "",
    age: "",
    email: edit ? (masterData?.email ? masterData?.email : "") : "",
    gender: edit
      ? masterData.gender
        ? genders.find((value) => value?.id === masterData?.gender)
        : null
      : null,
    province: edit
      ? masterData?.province
        ? masterData?.province
        : office?.province
      : office?.province,
    birthDistrict: edit
      ? masterData?.birthDistrict
        ? masterData?.birthDistrict
        : null
      : null,
    birthPlace: edit
      ? masterData?.birthPlace
        ? masterData?.birthPlace
        : null
      : null,
    district: edit
      ? masterData?.district
        ? masterData?.district
        : office?.district
      : office?.district,
    palika: edit ? (masterData?.palika ? masterData?.palika : null) : null,
    wardNumber: edit ? masterData?.wardNumber : "",

    citizenshipNumber: edit
      ? masterData?.citizenshipNumber
        ? masterData?.citizenshipNumber
        : ""
      : "",
    hasCitizenship: edit
      ? masterData?.citizenshipIssuedDate
        ? true
        : false
      : true,
    citizenshipIssuedFrom: edit ? masterData?.citizenshipIssuedFrom : null,
    citizenshipIssuedDate: edit ? masterData?.citizenshipIssuedDate : "",
    fatherName: edit
      ? masterData?.fatherName
        ? masterData?.fatherName
        : ""
      : "",
    spouseName: edit
      ? masterData?.spouseName
        ? masterData?.spouseName
        : ""
      : "",
    mobileNumber: edit ? masterData?.mobileNumber : "",
    isConfirmed: edit ? masterData?.isConfirmed : false,
    migrated: edit ? masterData?.migrated : false,
    migratedDistrict: edit ? masterData?.migratedDistrict : null,
    married: edit ? masterData?.married : false,
    marriedDistrict: edit ? masterData?.marriedDistrict : null,
    remarks: "",
  };
  useEffect(() => {
    if (!editDetails && !edit) {
      if (recommendationRequired) {
        setIsRecommended(true);
      } else {
        setIsRecommended(false);
      }
    } else {
      setIsRecommended(masterData?.isRecommended);
    }
  }, [recommendationRequired, edit, masterData, editDetails]);

  const validation = Yup.object().shape({
    office: Yup.object().required("Required."),
    firstName: Yup.string()
      .required("Required.")
      .min(2, "First Name must be at least 2 characters.")
      .max(50, "First Name must be at most 50 characters."),
    middleName: Yup.string().max(50, "Name must be at most 50 characters."),
    lastName: Yup.string()
      .required("Required.")
      .min(2, "Last Name must be at least 2 characters.")
      .max(50, "Last Name must be at most 50 characters."),
    email: Yup.string().email("@ is required"),
    mobileNumber: Yup.string()
      .required("Required.")
      .matches(
        /^[9]\d{9}$/,
        "Mobile number should start with 9 and should be 10 digits."
      ),

    gender: Yup.object().required("Required.").typeError("Required."),
    province: Yup.object().required("Required.").typeError("Required."),
    birthPlace: Yup.object().required("Required.").typeError("Required."),
    district: Yup.object().required("Required.").typeError("Required."),
    palika: Yup.object().required("Required.").typeError("Required."),
    wardNumber: Yup.number()
      .min(1, "Ward number should be greater than 1.")
      .required("Required."),
    tole: Yup.string().required("Required."),
    dob: Yup.date()
      .max(new Date(), "Date of birth can not be greater than today's date.")
      .required("Required."),
    hasCitizenship: Yup.bool(),
    citizenshipNumber: Yup.string()
      .required("Required.")
      .min(1, "Citizenship Number must be at least 1 characters.")
      .max(100, "Citizenship Number must be at most 100 characters."),

    citizenshipIssuedFrom: Yup.object()
      .required("Required.")
      .typeError("Required.")
      .test(
        "citizenshipIssuedFromTest",
        "You must be either migrated or married to applied office district",
        function (citizenship) {
          const office = this.parent.office;
          const married = this.parent.married;
          const migrated = this.parent.migrated;
          let result = false;
          if (
            citizenship?.id !== office?.district?.id &&
            !married &&
            !migrated
          ) {
            result = false;
          } else {
            result = true;
          }
          return result;
        }
      ),

    birthDistrict: Yup.object()
      .nullable()
      .test(
        "birthDistrictTest",
        "You must be either migrated or married to applied office district",
        function (birthDistrict) {
          const office = this.parent.office;
          const married = this.parent.married;
          const migrated = this.parent.migrated;
          const hasCitizenship = this.parent.hasCitizenship;
          let result = false;
          if (!hasCitizenship) {
            if (
              birthDistrict?.id !== office?.district?.id &&
              !married &&
              !migrated
            ) {
              result = false;
            } else {
              result = true;
            }
          } else {
            result = true;
          }

          return result;
        }
      ),
    citizenshipIssuedDate: Yup.string().required("Required."),

    fatherName: Yup.string()
      .required("Required.")
      .min(2, "Father Name must be at least 2 character.")
      .max(50, "Father Name must be at most 50 characters."),
    spouseName: Yup.string()
      .min(2, "Name must be at least 2 character.")
      .max(50, "Name must be at most 50 characters.")
      .test("spouseTest", "Required.", function (value) {
        let result = true;
        if (married) {
          if (gender?.short === "f" && !value) {
            result = false;
          } else {
            result = true;
          }
        }
        return result;
      }),

    isConfirmed: Yup.bool(),
    migrated: Yup.boolean(),
    migratedDistrict: Yup.object()
      .nullable()
      .when("migrated", {
        is: (value) => value === true,
        then: (schema) =>
          schema
            .required("Required")
            .test(
              "migratedTest1",
              "We noticed that you selected 'migrated and married' as your status, and the district you are applying for is different from your migrated and married district.",
              function (migratedDistrict) {
                const office = this.parent.office;
                const married = this.parent.married;
                const marriedDistrict = this.parent.marriedDistrict;
                let result = true;
                if (married) {
                  if (
                    marriedDistrict?.id !== office?.district?.id &&
                    migratedDistrict?.id !== office?.district?.id
                  ) {
                    result = false;
                  } else if (
                    marriedDistrict?.id === office?.district?.id ||
                    migratedDistrict?.id === office?.district?.id
                  ) {
                    result = true;
                  } else {
                    result = true;
                  }
                }
                return result;
              }
            )
            .test(
              "migratedTest2",
              "We noticed that you selected 'migrated' as your status, and the district you are applying for is different from your migrated district.",
              function (migratedDistrict) {
                const office = this.parent.office;
                const married = this.parent.married;
                let result = true;
                if (!married) {
                  if (migratedDistrict?.id !== office?.district?.id) {
                    result = false;
                  } else {
                    result = true;
                  }
                }

                return result;
              }
            ),
        otherwise: (schema) => schema,
      }),

    married: Yup.boolean(),
    marriedDistrict: Yup.object()
      .nullable()
      .when("married", {
        is: (value) => value === true,
        then: (schema) =>
          schema
            .required("Required")
            .test(
              "marriedTest1",
              "We noticed that you selected 'married and migrated' as your status, and the district you are applying for is different from your migrated and married district.",
              function (marriedDistrict) {
                const office = this.parent.office;
                const migrated = this.parent.migrated;
                const migratedDistrict = this.parent.migratedDistrict;
                let result = true;
                if (migrated) {
                  if (
                    marriedDistrict?.id !== office?.district?.id &&
                    migratedDistrict?.id !== office?.district?.id
                  ) {
                    result = false;
                  } else if (
                    marriedDistrict?.id === office?.district?.id &&
                    migratedDistrict?.id === office?.district?.id
                  ) {
                    result = true;
                  } else {
                    result = true;
                  }
                }
                return result;
              }
            )
            .test(
              "marriedTest2",
              "We noticed that you selected 'married' as your status, and the district you are applying for is different from your married district.",
              function (marriedDistrict) {
                const office = this.parent.office;
                const migrated = this.parent.migrated;
                let result = true;
                if (!migrated) {
                  if (marriedDistrict?.id !== office?.district?.id) {
                    result = false;
                  } else {
                    result = true;
                  }
                }

                return result;
              }
            ),
        otherwise: (schema) => schema,
      }),
  });

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const handleView = (document) => {
    setViewData(document);
    setShowViewModal(true);
  };
  const onSubmit = async (values) => {
    const {
      gender,
      province,
      district,
      palika,
      birthDistrict,
      birthPlace,
      citizenshipIssuedFrom,
      marriedDistrict,
      migratedDistrict,
    } = values;

    if (photo === null) {
      setPhotoError(true);
    } else {
      setPhotoError(false);
      if (hasCitizenship && citizenshipFrontImg === null) {
        setCitizenshipFrontImgError(true);
      } else {
        setCitizenshipFrontImgError(false);
        if (hasCitizenship && citizenshipBackImg === null) {
          setCitizenshipBackImgError(true);
        } else {
          setCitizenshipBackImgError(false);
          if (!hasCitizenship && birthCertificateImg === null) {
            setBirthCertificateImgError(true);
          } else {
            setBirthCertificateImgError(false);
            if (recommendationRequired && recommendationLetterImg === null) {
              setRecommendationLetterImgError(true);
            } else {
              setRecommendationLetterImgError(false);
              if (migrated && migrationDocument === null) {
                setMigratedDocumentError(true);
              } else {
                setMigratedDocumentError(false);
                if (married && marriageDocuments === null) {
                  setMarriageDocumentsError(true);
                } else {
                  setMarriageDocumentsError(false);
                  if (editDetails) {
                    const id = masterData?.id;
                    const convertedImage =
                      photo !== ""
                        ? await imageConvertor(photo, "photo.png", "image/png")
                        : "";
                    const result = await dispatch(
                      updateCard(
                        id,
                        {
                          ...values,
                          userPhoto: convertedImage,
                          citizenshipIssuedFrom: citizenshipIssuedFrom?.id,
                          province: province?.id,
                          district: district?.id,
                          palika: palika?.id,
                          gender: gender?.id,
                          marriedDistrict:
                            marriedDistrict !== null ? marriedDistrict?.id : "",
                          migratedDistrict:
                            migratedDistrict !== null
                              ? migratedDistrict?.id
                              : "",
                          birthDistrict:
                            birthDistrict !== null ? birthDistrict?.id : "",
                          birthPlace: birthPlace !== null ? birthPlace?.id : "",
                          isRecommended: isRecommended,
                        },
                        type,
                        currentPage,
                        postsPerPage
                      )
                    );

                    if (result) {
                      setShowModal(false);
                      setBirthCertificateImg(null);
                      setCitizenshipBackImg(null);
                      setCitizenshipFrontImg(null);
                      setRecommendationLetterImg(null);
                      setMarriageDocuments(null);
                      setMigratedDocument(null);
                      setPhoto(null);
                      dispatch(cardClearData());
                    } else {
                      setShowModal(true);
                    }
                  } else {
                    const convertedImage =
                      photo !== ""
                        ? await imageConvertor(photo, "photo.png", "image/png")
                        : "";
                    const updatedValues = {
                      ...values,
                      userPhoto: convertedImage,
                      citizenshipIssuedFrom: citizenshipIssuedFrom?.id,
                      province: province?.id,
                      district: district?.id,
                      palika: palika?.id,
                      gender: gender?.id,
                      marriedDistrict:
                        marriedDistrict !== null ? marriedDistrict?.id : "",
                      migratedDistrict:
                        migratedDistrict !== null ? migratedDistrict?.id : "",
                      birthDistrict:
                        birthDistrict !== null ? birthDistrict?.id : "",
                      birthPlace: birthPlace !== null ? birthPlace?.id : "",
                      citizenshipFrontImg:
                        citizenshipFrontImg !== null
                          ? citizenshipFrontImg
                          : null,
                      citizenshipBackImg:
                        citizenshipBackImg !== null ? citizenshipBackImg : null,
                      birthCertificateImg:
                        birthCertificateImg !== null
                          ? birthCertificateImg
                          : null,
                      recommendationLetterImg:
                        recommendationLetterImg !== null
                          ? recommendationLetterImg
                          : null,
                      isRecommended: isRecommended,
                      marriageDocuments:
                        marriageDocuments !== null ? marriageDocuments : null,
                      migrationDocument:
                        migrationDocument !== null ? migrationDocument : null,
                    };
                    if (!updatedValues?.userPhoto) {
                      errorFunction("Photo is required");
                    }
                    const result = await dispatch(
                      createCard(updatedValues, currentPage, postsPerPage)
                    );
                    if (result) {
                      setShowModal(false);
                      setBirthCertificateImg(null);
                      setCitizenshipBackImg(null);
                      setCitizenshipFrontImg(null);
                      setRecommendationLetterImg(null);
                      setMarriageDocuments(null);
                      setMigratedDocument(null);
                      setPhoto(null);
                      dispatch(cardClearData());
                    } else {
                      setShowModal(true);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const handleChangeImage = (file, fileRef) => {
    if (file) {
      const fileType = file.type;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64URL = reader.result;
        if (fileRef.current) {
          if (fileType === "application/pdf") {
            fileRef.current.src = pdfImage;
          } else {
            fileRef.current.src = base64URL;
          }
        }
      };
    }
  };

  const handleSubmit = async () => {
    if (isSuperuser || isAdmin) {
      errorFunction("Admin or Superuser can not perform this action");
    } else if (signatures[0] === "") {
      errorFunction("Signature is not captured. Please capture signature.");
    } else {
      const convertedImage =
        photo !== ""
          ? await imageConvertor(photo, "photo.png", "image/png")
          : "";
      const updatedValues = {
        userPhoto: convertedImage,
        signature: signatures,
      };
      const result = await dispatch(
        verifyCardThunk(
          masterData?.id,
          updatedValues,
          currentPage,
          postsPerPage
        )
      );

      if (result) {
        setShowSignatureModal(false);
        dispatch(getCardRequest(10));

        setShowSignatureModal(false);
        setSignatures([""]);
        setSignaturesText([""]);
        setShowModal(false);
      } else {
        setShowSignatureModal(true);
      }
    }
  };

  const handleImageClick = () => {
    console.log("Icon clicked!");
    if (!edit) {
      console.log("camera open");
      setShowCameraModal(true);
    }
  };

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

  const editPermission = permissions.includes("can_update_entrypass");

  return (
    <>
      {(loadingUpdate || loadingCreate) && <Loader />}
      <Formik
        enableReinitialize={edit}
        initialValues={initialState}
        validationSchema={validation}
        onSubmit={edit ? handleSubmit : onSubmit}
      >
        {(formik) => {
          const { setFieldValue } = formik;
          console.log(formik.errors, "errors");
          return (
            <Form autoComplete="off">
              <div className="bg-white" style={{ borderRadius: "15px" }}>
                <div className="row">
                  <div style={{ borderRadius: "15px" }}>
                    <div className="registration-process">
                      <div className="w-100">
                        {editPermission && edit && (
                          <div className="mt-2 d-flex justify-content-end align-items-center">
                            <div>
                              <Tooltip content="Edit">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-editDetails btn-primary mx-1"
                                  onClick={() => {
                                    dispatch(closeEditCardSuccessAction());
                                  }}
                                >
                                  <FaEdit size={18} />
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                        <div
                          className="d-flex flex-column justify-content-center align-items-center"
                          style={{ position: "relative" }}
                        >
                          <img
                            src={photo !== null ? photo : defaultImage}
                            alt="Uploaded Preview"
                            height={130}
                            width={130}
                            onClick={handleImageClick}
                            style={{
                              cursor: "pointer",
                              borderRadius: "50%",
                              border: "1px solid #ccc",
                              padding: "5px",
                            }}
                          />
                          <IoCameraOutline
                            size={25}
                            style={{
                              position: "absolute",
                              top: "60%",
                              left: "54%",
                              background: "#f1f1f1",
                              borderRadius: "50%",
                            }}
                            className="upload-icon"
                            onClick={handleImageClick}
                          />
                          <label
                            htmlFor="userPhoto"
                            className="fw-bold float-start"
                          >
                            Upload Picture
                            <strong className="text-danger ">*</strong>
                          </label>

                          {photoError && <TextError>Required.</TextError>}
                        </div>
                      </div>
                      <div className="form-group row my-2 ">
                        <div className="mt-2 col-4">
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
                            disabled={edit}
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
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="middleName"
                            className="fw-bold float-start"
                          >
                            Middle Name
                          </label>
                          <Field
                            type="text"
                            disabled={edit}
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
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="lastName"
                            className="fw-bold float-start"
                          >
                            Last Name
                            <strong className="text-danger ">*</strong>
                          </label>

                          <Field
                            type="text"
                            disabled={edit}
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
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="mobileNumber"
                            className="fw-bold float-start"
                          >
                            Mobile Number
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="text"
                            disabled={edit}
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
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="email"
                            className="fw-bold float-start"
                          >
                            Email
                          </label>
                          <Field
                            type="email"
                            value={formik.values.email}
                            name="email"
                            onChange={(e) => {
                              setFieldValue("email", e.target.value);
                            }}
                            disabled={edit}
                            className="form-control "
                            placeholder="Enter Your Email"
                          />

                          <ErrorMessage name="email" component={TextError} />
                        </div>
                        <div className="mt-2 col-4">
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
                            className={
                              edit ? "select-field disabled" : "select-field"
                            }
                            name="gender"
                            isDisabled={edit}
                            getOptionLabel={(option) => `${option?.name} `}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              setGender(selected);
                              setFieldValue("gender", selected);
                            }}
                            options={genders}
                          />
                          <ErrorMessage name="gender" component={TextError} />
                        </div>
                        {edit ? (
                          <div className="mt-2 col-4">
                            <label
                              htmlFor="dobBs"
                              className="fw-bold float-start"
                            >
                              Date Of Birth(BS)
                              <strong className="text-danger ">*</strong>
                            </label>
                            <Field
                              type="text"
                              disabled
                              value={formik.values?.dobBs}
                              name="dobBs"
                              onChange={(e) => {
                                setFieldValue("dobBs", e.target.value);
                              }}
                              className="form-control "
                              placeholder="Date of Birth(BS)"
                            />

                            <ErrorMessage name="dobBs" component={TextError} />
                          </div>
                        ) : (
                          <div className="mt-2 col-4">
                            <NepaliDatePicker
                              label="Date of Birth (B.S.)"
                              name="dobBs"
                              id="dobBs"
                              placeholder="Date of Birth (B.S)"
                              required
                              formikRequired={
                                formik?.errors?.dob && formik?.touched?.dob
                              }
                              defaultDate={formik?.values?.dobBs}
                              onChange={({ bsDate, adDate }) => {
                                formik.setFieldValue("dobBs", bsDate);
                                formik.setFieldValue("dob", adDate);
                                const age = calculateAge(adDate);
                                formik.setFieldValue("age", age);
                                if (canMinorApply) {
                                  if (Number(age) < 16) {
                                    formik.setFieldValue(
                                      "hasCitizenship",
                                      false
                                    );
                                  } else {
                                    formik.setFieldValue(
                                      "hasCitizenship",
                                      true
                                    );
                                  }
                                }
                              }}
                            />
                            <ErrorMessage name="dobBs" component={TextError} />
                          </div>
                        )}

                        <div className="mt-2 col-4">
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
                            placeholder="Date of Birth (A.D)"
                          />

                          <ErrorMessage name="dob" component={TextError} />
                        </div>

                        <div className="mt-2 col-4">
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
                            className={
                              edit || editDetails || office?.province
                                ? "select-field disabled"
                                : "select-field"
                            }
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            isDisabled
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
                        <div className="mt-2 col-4">
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
                            className={
                              edit || editDetails || office?.district
                                ? "select-field disabled"
                                : "select-field"
                            }
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
                            isDisabled
                            loadOptions={loadOptionsDistrict}
                            additional={{
                              offset: 0,
                              limit: 10,
                              province: formik?.values?.province,
                            }}
                          />
                          <ErrorMessage name="district" component={TextError} />
                        </div>

                        <div className="mt-2 col-4">
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
                                : false || edit
                            }
                            value={formik.values.palika}
                            isClearable="true"
                            isSearchable="true"
                            name="palika"
                            inputId="input"
                            className={
                              edit ? "select-field disabled" : "select-field"
                            }
                            isDisabled={
                              formik?.values?.district === null
                                ? true
                                : false || edit
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
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="wardNumber"
                            className="fw-bold float-start"
                          >
                            Ward
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="number"
                            disabled={edit}
                            value={formik.values.wardNumber}
                            name="wardNumber"
                            onChange={(e) => {
                              setFieldValue("wardNumber", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Ward"
                          />

                          <ErrorMessage
                            name="wardNumber"
                            component={TextError}
                          />
                        </div>

                        <div className="mt-2 col-4">
                          <label htmlFor="tole" className="fw-bold float-start">
                            Tole
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="text"
                            disabled={edit}
                            value={formik.values.tole}
                            name="tole"
                            onChange={(e) => {
                              setFieldValue("tole", e.target.value);
                            }}
                            className="form-control "
                            placeholder="Tole"
                          />

                          <ErrorMessage name="tole" component={TextError} />
                        </div>
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="fatherName"
                            className="fw-bold float-start"
                          >
                            Father Name{" "}
                            <strong className="text-danger ">*</strong>
                          </label>
                          <Field
                            type="text"
                            disabled={edit}
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
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="spouseName"
                            className="fw-bold float-start"
                          >
                            Spouse Name
                            {formik.values.married &&
                              formik.values.gender?.id === "f" && (
                                <strong className="text-danger ">*</strong>
                              )}
                          </label>
                          <Field
                            type="text"
                            disabled={edit}
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
                        <div className="mt-2 col-4">
                          <label
                            htmlFor="office"
                            className="fw-bold float-start"
                          >
                            Applying Office
                            <strong className="text-danger ">*</strong>
                          </label>

                          <AsyncPaginate
                            blurInputOnSelect
                            key={JSON.stringify(formik.values?.office)}
                            value={formik.values.office}
                            isClearable="true"
                            isSearchable="true"
                            name="office"
                            inputId="input"
                            className={
                              edit || editDetails
                                ? "select-field disabled"
                                : "select-field"
                            }
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              setFieldValue("office", selected);
                            }}
                            loadOptions={loadOptionsOffice}
                            additional={{
                              offset: 0,
                              limit: 10,
                            }}
                            isDisabled
                          />
                          <ErrorMessage name="office" component={TextError} />
                        </div>

                        <div className="mt-2 col-4">
                          <label
                            htmlFor="birthPlace"
                            className="fw-bold float-start"
                          >
                            Birth Place
                            <strong className="text-danger ">*</strong>
                          </label>

                          <AsyncPaginate
                            blurInputOnSelect
                            key={JSON.stringify(formik.values?.birthPlace)}
                            value={formik.values.birthPlace}
                            isClearable="true"
                            isSearchable="true"
                            name="birthPlace"
                            inputId="input"
                            className={
                              edit ? "select-field disabled" : "select-field"
                            }
                            isDisabled={edit}
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              if (!formik.values.hasCitizenship) {
                                setFieldValue("birthDistrict", selected);
                              }
                              setFieldValue("birthPlace", selected);
                            }}
                            loadOptions={loadOptionsDistrict}
                            additional={{
                              offset: 0,
                              limit: 10,
                            }}
                          />
                          <ErrorMessage
                            name="birthPlace"
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
                                value={true}
                                checked={formik.values.hasCitizenship === true}
                                onChange={() => {
                                  setHasCitizenship(true);
                                  setFieldValue("hasCitizenship", true);
                                }}
                                className="form-check-input"
                                disabled={
                                  edit ||
                                  !canMinorApply ||
                                  (formik.values.dob !== "" &&
                                    Number(formik.values.age) < 16)
                                }
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
                                value={false}
                                disabled={!canMinorApply}
                                checked={formik.values.hasCitizenship === false}
                                onChange={() => {
                                  if (formik.values.birthPlace !== null) {
                                    setFieldValue(
                                      "birthDistrict",
                                      formik.values.birthPlace
                                    );
                                  }
                                  setHasCitizenship(false);
                                  setFieldValue("hasCitizenship", false);
                                }}
                                className="form-check-input"
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
                        {formik.values.hasCitizenship === true ? (
                          <>
                            <div className="mt-2 col-4">
                              <label
                                htmlFor="citizenshipNumber"
                                className="fw-bold float-start"
                              >
                                Citizenship No.
                                {formik.values.hasCitizenship === true && (
                                  <strong className="text-danger ">*</strong>
                                )}
                              </label>
                              <Field
                                type="text"
                                disabled={edit}
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
                            {edit ? (
                              <div className="mt-2 col-4">
                                <label
                                  htmlFor="citizenshipIssuedDate"
                                  className="fw-bold float-start"
                                >
                                  Issued Date
                                  <strong className="text-danger ">*</strong>
                                </label>
                                <Field
                                  type="text"
                                  disabled
                                  value={formik.values?.citizenshipIssuedDate}
                                  name="citizenshipIssuedDate"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "citizenshipIssuedDate",
                                      e.target.value
                                    );
                                  }}
                                  className="form-control "
                                  placeholder="Issued Date"
                                />

                                <ErrorMessage
                                  name="citizenshipIssuedDate"
                                  component={TextError}
                                />
                              </div>
                            ) : (
                              <div className="mt-2 col-4">
                                <NepaliDatePicker
                                  label="Issued Date"
                                  name="citizenshipIssuedDate"
                                  id="citizenshipIssuedDate"
                                  placeholder="Issued Date (B.S.)"
                                  required
                                  formikRequired={
                                    formik?.errors?.citizenshipIssuedDate &&
                                    formik?.touched?.citizenshipIssuedDate
                                  }
                                  defaultDate={
                                    formik?.values?.citizenshipIssuedDate
                                  }
                                  onChange={({ bsDate, adDate }) => {
                                    formik.setFieldValue(
                                      "citizenshipIssuedDate",
                                      bsDate
                                    );
                                  }}
                                />
                              </div>
                            )}

                            {/* citizenship issued from */}
                            <div className="mt-2 col-4">
                              <label
                                htmlFor="citizenshipIssuedFrom"
                                className="fw-bold float-start"
                              >
                                Citizenship Issued From
                                <strong className="text-danger ">*</strong>
                              </label>

                              <AsyncPaginate
                                blurInputOnSelect
                                key={JSON.stringify(
                                  formik.values?.citizenshipIssuedFrom
                                )}
                                isDisabled={edit || editDetails}
                                value={formik.values.citizenshipIssuedFrom}
                                isClearable="true"
                                isSearchable="true"
                                name="citizenshipIssuedFrom"
                                inputId="input"
                                className={
                                  edit || editDetails
                                    ? "select-field disabled"
                                    : "select-field"
                                }
                                getOptionLabel={(option) => `${option.name}`}
                                getOptionValue={(option) => `${option?.id}`}
                                onChange={(selected) => {
                                  setFieldValue(
                                    "citizenshipIssuedFrom",
                                    selected
                                  );
                                }}
                                loadOptions={loadOptionsDistrict}
                                additional={{
                                  offset: 0,
                                  limit: 10,
                                }}
                              />
                              <ErrorMessage
                                name="citizenshipIssuedFrom"
                                component={TextError}
                              />
                            </div>

                            <div className="mt-2 col-6">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="citizenshipFront"
                                  className="fw-bold float-start"
                                >
                                  Citizenship Front
                                  {formik.values.hasCitizenship === true && (
                                    <strong className="text-danger ">*</strong>
                                  )}
                                </label>
                                {citizenshipFrontImg && (
                                  <img
                                    ref={citizenshipFrontRef}
                                    height={80}
                                    width={80}
                                    src={
                                      edit || editDetails
                                        ? handleViewDocument(
                                            citizenshipFrontImg
                                          )
                                        : ""
                                    }
                                    onClick={() =>
                                      handleView(citizenshipFrontImg)
                                    }
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                name="citizenshipFront"
                                accept="application/pdf,image/*"
                                disabled={edit || editDetails}
                                className="form-control form-control-sm"
                                onChange={(event) => {
                                  handleChangeImage(
                                    event.target.files[0],
                                    citizenshipFrontRef
                                  );
                                  setCitizenshipFrontImg(event.target.files[0]);
                                }}
                              />
                              {citizenshipFrontImgError && (
                                <TextError>Required.</TextError>
                              )}
                            </div>
                            <div className="mt-2 col-6">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="citizenshipBack"
                                  className="fw-bold float-start"
                                >
                                  Citizenship Back
                                  {formik.values.hasCitizenship === true && (
                                    <strong className="text-danger ">*</strong>
                                  )}
                                </label>
                                {citizenshipBackImg && (
                                  <img
                                    ref={citizenshipBackRef}
                                    height={80}
                                    width={80}
                                    src={
                                      edit || editDetails
                                        ? handleViewDocument(citizenshipBackImg)
                                        : ""
                                    }
                                    onClick={() =>
                                      handleView(citizenshipBackImg)
                                    }
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                disabled={edit || editDetails}
                                name="citizenshipBack"
                                accept="application/pdf,image/*"
                                className="form-control form-control-sm"
                                onChange={(event) => {
                                  setCitizenshipBackImg(event.target.files[0]);
                                  handleChangeImage(
                                    event.target.files[0],
                                    citizenshipBackRef
                                  );
                                }}
                              />
                              {citizenshipBackImgError && (
                                <TextError>Required.</TextError>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mt-2 col-6">
                              <label
                                htmlFor="birthDistrict"
                                className="fw-bold float-start"
                              >
                                Birth District
                                <strong className="text-danger ">*</strong>
                              </label>

                              <AsyncPaginate
                                blurInputOnSelect
                                key={JSON.stringify(
                                  formik.values?.birthDistrict
                                )}
                                value={formik.values.birthDistrict}
                                isClearable="true"
                                isSearchable="true"
                                name="birthDistrict"
                                inputId="input"
                                className={
                                  edit
                                    ? "select-field disabled"
                                    : "select-field"
                                }
                                isDisabled={edit || editDetails}
                                getOptionLabel={(option) => `${option.name}`}
                                getOptionValue={(option) => `${option?.id}`}
                                onChange={(selected) => {
                                  if (!formik.values.hasCitizenship) {
                                    setFieldValue("birthPlace", selected);
                                  }
                                  setFieldValue("birthDistrict", selected);
                                }}
                                loadOptions={loadOptionsDistrict}
                                additional={{
                                  offset: 0,
                                  limit: 10,
                                }}
                              />
                              <ErrorMessage
                                name="birthDistrict"
                                component={TextError}
                              />
                            </div>
                            <div className="mt-2 col-6">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="birthCertificate"
                                  className="fw-bold float-start"
                                >
                                  Birth Certificate
                                  {formik.values.hasCitizenship === false && (
                                    <strong className="text-danger ">*</strong>
                                  )}
                                </label>
                                {birthCertificateImg && (
                                  <img
                                    ref={birthCertificateRef}
                                    height={80}
                                    width={80}
                                    src={
                                      edit || editDetails
                                        ? handleViewDocument(
                                            birthCertificateImg
                                          )
                                        : ""
                                    }
                                    onClick={() =>
                                      handleView(birthCertificateImg)
                                    }
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                disabled={
                                  !formik.values?.birthDistrict ||
                                  edit ||
                                  editDetails
                                }
                                name="birthCertificate"
                                accept="application/pdf,image/*"
                                className="form-control form-control-sm"
                                onChange={(event) => {
                                  setBirthCertificateImg(event.target.files[0]);
                                  handleChangeImage(
                                    event.target.files[0],
                                    birthCertificateRef
                                  );
                                }}
                              />
                              {birthCertificateImgError && (
                                <TextError>Required.</TextError>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Migrated */}

                      <div className="form-group row my-2 ">
                        <div
                          className="mt-2 col-12 d-flex"
                          style={{ gap: "50px" }}
                        >
                          <label
                            htmlFor="migrated"
                            className="fw-bold float-start"
                          >
                            <strong className="bold">Are you Migrated ?</strong>
                            <strong className="text-danger ">*</strong>
                          </label>

                          <div
                            className="d-flex flex-grow-1 "
                            style={{ gap: "20px" }}
                          >
                            <div className="form-check">
                              <Field
                                type="radio"
                                id="migratedYes"
                                name="migrated"
                                value={true}
                                checked={formik.values.migrated === true}
                                onChange={() => {
                                  setMigrated(true);
                                  setFieldValue("migrated", true);
                                  setFieldValue(
                                    "migratedDistrict",
                                    office?.district
                                  );
                                }}
                                className="form-check-input"
                                disabled={edit || editDetails}
                              />
                              <label
                                htmlFor="migratedYes"
                                className="form-check-label"
                              >
                                Yes
                              </label>
                            </div>

                            <div className="form-check">
                              <Field
                                type="radio"
                                id="migratedNo"
                                name="migrated"
                                value={false}
                                checked={formik.values.migrated === false}
                                onChange={() => {
                                  setMigrated(false);
                                  setFieldValue("migrated", false);
                                  setFieldValue("migratedDistrict", null);
                                }}
                                className="form-check-input"
                                disabled={edit || editDetails}
                              />
                              <label
                                htmlFor="migratedNo"
                                className="form-check-label"
                              >
                                No
                              </label>
                            </div>
                          </div>

                          <ErrorMessage name="migrated" component={TextError} />
                        </div>
                        {formik.values.migrated && (
                          <>
                            <div className="mt-2 col-6">
                              <label
                                htmlFor="migratedDistrict"
                                className="fw-bold float-start"
                              >
                                Migrated District
                                <strong className="text-danger ">*</strong>
                              </label>

                              <AsyncPaginate
                                blurInputOnSelect
                                key={JSON.stringify(
                                  formik.values?.migratedDistrict
                                )}
                                value={formik.values.migratedDistrict}
                                isClearable="true"
                                isSearchable="true"
                                name="migratedDistrict"
                                inputId="input"
                                className={
                                  edit || editDetails
                                    ? "select-field disabled"
                                    : "select-field"
                                }
                                getOptionLabel={(option) => `${option.name}`}
                                getOptionValue={(option) => `${option?.id}`}
                                onChange={(selected) => {
                                  setFieldValue("migratedDistrict", selected);
                                }}
                                loadOptions={loadOptionsDistrict}
                                additional={{
                                  offset: 0,
                                  limit: 10,
                                }}
                                isDisabled={edit || editDetails}
                              />
                              <ErrorMessage
                                name="migratedDistrict"
                                component={TextError}
                              />
                            </div>

                            <div className="mt-2 col-6">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="migrationDocument"
                                  className="fw-bold float-start"
                                >
                                  Document
                                  {formik.values.migrated === true && (
                                    <strong className="text-danger ">*</strong>
                                  )}
                                </label>
                                {migrationDocument && (
                                  <img
                                    ref={migrationDocumentRef}
                                    height={80}
                                    width={80}
                                    src={
                                      edit || editDetails
                                        ? handleViewDocument(migrationDocument)
                                        : ""
                                    }
                                    onClick={() =>
                                      handleView(migrationDocument)
                                    }
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                name="migrationDocument"
                                accept="application/pdf,image/*"
                                disabled={
                                  !formik.values.migrated || edit || editDetails
                                }
                                className="form-control form-control-sm"
                                onChange={(event) => {
                                  setMigratedDocument(event.target.files[0]);
                                  handleChangeImage(
                                    event.target.files[0],
                                    migrationDocumentRef
                                  );
                                }}
                              />
                              {migrationDocumentError && (
                                <TextError>Required.</TextError>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* end of migrated */}

                      {/* marriage */}

                      <div className="form-group row my-2 ">
                        <div
                          className="mt-2 col-12 d-flex"
                          style={{ gap: "50px" }}
                        >
                          <label
                            htmlFor="married"
                            className="fw-bold float-start"
                          >
                            <strong className="bold">Are you Married ?</strong>
                            <strong className="text-danger ">*</strong>
                          </label>

                          <div
                            className="d-flex flex-grow-1 "
                            style={{ gap: "20px" }}
                          >
                            <div className="form-check">
                              <Field
                                type="radio"
                                id="marriedYes"
                                name="married"
                                value={true}
                                checked={formik.values.married === true}
                                onChange={() => {
                                  setMarried(true);
                                  setFieldValue("married", true);
                                  setFieldValue(
                                    "marriedDistrict",
                                    office?.district
                                  );
                                }}
                                className="form-check-input"
                                disabled={edit || editDetails}
                              />
                              <label
                                htmlFor="marriedYes"
                                className="form-check-label"
                              >
                                Yes
                              </label>
                            </div>

                            <div className="form-check">
                              <Field
                                type="radio"
                                id="marriedNo"
                                name="married"
                                value={false}
                                checked={formik.values.married === false}
                                onChange={() => {
                                  setMarried(false);
                                  setFieldValue("married", false);
                                  setFieldValue("marriedDistrict", null);
                                }}
                                className="form-check-input"
                                disabled={edit || editDetails}
                              />
                              <label
                                htmlFor="marriedNo"
                                className="form-check-label"
                              >
                                No
                              </label>
                            </div>
                          </div>

                          <ErrorMessage name="married" component={TextError} />
                        </div>
                        {formik.values.married && (
                          <>
                            <div className="mt-2 col-6">
                              <label
                                htmlFor="marriedDistrict"
                                className="fw-bold float-start"
                              >
                                Married District
                                <strong className="text-danger ">*</strong>
                              </label>

                              <AsyncPaginate
                                blurInputOnSelect
                                key={JSON.stringify(
                                  formik.values?.marriedDistrict
                                )}
                                value={formik.values.marriedDistrict}
                                isClearable="true"
                                isSearchable="true"
                                name="marriedDistrict"
                                inputId="input"
                                className={
                                  edit || editDetails
                                    ? "select-field disabled"
                                    : "select-field"
                                }
                                getOptionLabel={(option) => `${option.name}`}
                                getOptionValue={(option) => `${option?.id}`}
                                onChange={(selected) => {
                                  setFieldValue("marriedDistrict", selected);
                                }}
                                loadOptions={loadOptionsDistrict}
                                additional={{
                                  offset: 0,
                                  limit: 10,
                                }}
                                isDisabled={edit || editDetails}
                              />
                              <ErrorMessage
                                name="marriedDistrict"
                                component={TextError}
                              />
                            </div>

                            <div className="mt-2 col-6">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="marriageDocuments"
                                  className="fw-bold float-start"
                                >
                                  Document
                                  {formik.values.married === true && (
                                    <strong className="text-danger ">*</strong>
                                  )}
                                </label>
                                {marriageDocuments && (
                                  <img
                                    ref={marriageDocumentsRef}
                                    height={80}
                                    width={80}
                                    src={
                                      edit || editDetails
                                        ? handleViewDocument(marriageDocuments)
                                        : ""
                                    }
                                    onClick={() =>
                                      handleView(marriageDocuments)
                                    }
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                name="marriageDocuments"
                                accept="application/pdf,image/*"
                                disabled={
                                  !formik.values.married || edit || editDetails
                                }
                                className="form-control form-control-sm"
                                onChange={(event) => {
                                  setMarriageDocuments(event.target.files[0]);
                                  handleChangeImage(
                                    event.target.files[0],
                                    marriageDocumentsRef
                                  );
                                }}
                              />
                              {marriageDocumentsError && (
                                <TextError>Required.</TextError>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* end of marriage */}
                      <div className="form-group row my-2 ">
                        <div className="col-12">
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
                                  value={true}
                                  disabled={
                                    !isRecommended || edit || editDetails
                                  }
                                  checked={isRecommended === true}
                                  onChange={() => ""}
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
                                  value={false}
                                  disabled={
                                    isRecommended || edit || editDetails
                                  }
                                  checked={isRecommended === false}
                                  onChange={() => ""}
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
                          {isRecommended === true && (
                            <div className="col-4 mt-2">
                              <div className="d-flex flex-column">
                                <label
                                  htmlFor="recommendationLetter"
                                  className="fw-bold float-start"
                                >
                                  Recommendation Letter
                                  <strong className="text-danger ">*</strong>
                                </label>
                                {recommendationLetterImg && (
                                  <img
                                    ref={recommendationLetterRef}
                                    height={80}
                                    width={80}
                                    src={
                                      edit || editDetails
                                        ? handleViewDocument(
                                            recommendationLetterImg
                                          )
                                        : ""
                                    }
                                    onClick={() =>
                                      handleView(recommendationLetterImg)
                                    }
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                name="recommendationLetter"
                                accept="application/pdf,image/*"
                                className="form-control form-control-sm"
                                disabled={edit || editDetails}
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "recommendationLetter",
                                    event.target.files[0]
                                  );
                                  setRecommendationLetterImg(
                                    event.target.files[0]
                                  );
                                  handleChangeImage(
                                    event.target.files[0],
                                    recommendationLetterRef
                                  );
                                }}
                              />
                              {recommendationLetterImgError && (
                                <TextError>Required.</TextError>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {edit && type === "card" && (
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="w-25 my-2">
                            <Signature
                              showSignatureModal={showSignatureModal}
                              setShowSignatureModal={setShowSignatureModal}
                              signatures={signatures}
                              setSignatures={setSignatures}
                              setSignaturesText={setSignaturesText}
                              setShowModal={setShowModal}
                            />
                          </div>
                        </div>
                      )}
                      {!edit && (
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
                            माथि पेश भएका विवरणहरु म निवेदक&nbsp;
                            <strong>
                              {formik.values.firstName}&nbsp;
                              {formik.values.middleName}&nbsp;
                              {formik.values.lastName}&nbsp;
                            </strong>
                            बाट स्वयं पेश भएको साँचो हो । झुट्ठा ठहरे कानून
                            बमोजिम सहुँला/बुझाउँला ।
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group text-center d-flex m-2 justify-content-center align-items-center">
                {!edit && !isSuperuser && !isAdmin && (
                  <Button
                    type={"submit"}
                    className={"btn btn-primary"}
                    loading={loadingCreate || loadingUpdate}
                    disabled={
                      loadingCreate ||
                      loadingUpdate ||
                      verifyCard ||
                      formik?.values?.isConfirmed === true
                        ? false
                        : true
                    }
                    title={editDetails ? "Update" : "Create"}
                    content={editDetails ? "Update" : "Add"}
                  />
                )}
                {edit && !isSuperuser && !isAdmin && console.log("!isSuperuser "+!isSuperuser + "&& !isAdmin:" + !isAdmin) &&(
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <Button
                        type={"button"}
                        className={"btn btn-danger"}
                        loading={loadingReject}
                        disabled={verifyCard}
                        onClick={() => setShowRejectModal(true)}
                        // disabled={lock || loadingUpdate}
                        title={"Reject"}
                        content={"Reject"}
                      />
                    </div>
                    <div className="align-items-center">
                      <Button
                        type={"button"}
                        className={"btn btn-primary "}
                        loading={loadingUpdate}
                        disabled={verifyCard}
                        title={"Update"}
                        content={"Update"}
                        onClick={handleSubmit}
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
            data={masterData}
            dispatch={dispatch}
            showRejectModal={showRejectModal}
            setShowRejectModal={setShowRejectModal}
            setShowModal={setShowModal}
            setBirthCertificateImg={setBirthCertificateImg}
            setCitizenshipBackImg={setCitizenshipBackImg}
            setCitizenshipFrontImg={setCitizenshipFrontImg}
            setRecommendationLetterImg={setRecommendationLetterImg}
            setPhoto={setPhoto}
            clearAction={cardClearData}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
          />
        </Modal>
      )}
      {showCameraModal && (
        <Modal
          header={"Capture Photo"}
          size="md"
          setShowModal={setShowCameraModal}
          showModal={showCameraModal}
        >
          <CameraModal
            setPhoto={setPhoto}
            setShowModal={setShowCameraModal}
            setShowCropModal={setShowCropModal}
          />
        </Modal>
      )}

      {showCropModal && (
        <Modal
          showModal={showCropModal}
          setShowModal={setShowCropModal}
          header="Crop Photo"
          size={"modal-md change-password-size"}
        >
          <CropModal
            setShowCropModal={setShowCropModal}
            setPhoto={setPhoto}
            photo={photo}
          />
        </Modal>
      )}
      {showViewModal && (
        <Modal
          header={"View"}
          size="modal-xl"
          setShowModal={setShowViewModal}
          showModal={showViewModal}
        >
          <ViewModal viewData={viewData} />
        </Modal>
      )}
    </>
  );
};
export default CreateCard;
