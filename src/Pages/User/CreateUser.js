import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AsyncPaginate } from "react-select-async-paginate";
import { errorFunction } from "../../Component/Alert";
import TextError from "../../Component/TextError/TextError";
import { createUser, updateUser } from "../../Redux/User/thunk";
import { checkRedundantDataUser } from "../../utils/redundant/user";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Button from "../../Component/Button/Button";
import { genders } from "../../Component/Data/Data";
import Thumb from "../../Component/Thumb";
import { loadOptionsOffice, loadOptionsRole } from "./asyncFunction";
import "./user.css";
import Spinner from "../../Component/Spinner/Spinner";
const CreateUser = ({ currentPage, setShowModal, postsPerPage }) => {
  // props
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isSuperuser = useSelector((state) => state.auth.isSuperuser);
  const loadingUpdated = useSelector((state) => state.user.loadingUpdated);
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const edit = useSelector((state) => state.user.edit);
  const dispatch = useDispatch();
  //state for disabling the submit button
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  const [img, setImg] = useState(null);

  //initial state of the form
  const initialState = {
    firstName: edit ? user?.firstName : "",
    middleName: edit ? user?.middleName : "",
    lastName: edit ? user?.lastName : "",
    email: edit ? user?.email : "",
    username: edit ? user?.username : "",
    office: edit ? user?.office : "",
    phone: edit ? user?.phone : "",
    designation: edit ? user?.designation : "",
    signature: edit ? user?.signature : "",
    userPhoto: "",
    password: "",
    confirmPassword: "",
    gender: edit ? genders.find((gender) => gender.id === user?.gender) : "",
    remarks: "",
    isActive: edit ? user?.isActive : true,
    isChecker: edit ? user?.isChecker : false,
    groups: edit ? user?.groups : [],
  };
  //validation rules of the form
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name required")
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name should be 50 characters.")
      .matches(
        /(?=.*^[A-Za-z]\w).*$/,
        "First name should only contain alphabet."
      ),
    middleName: Yup.string()
      .max(50, "Middle name should be 50 characters.")
      .matches(
        /(?=.*^[A-Za-z]\w).*$/,
        "Middle name should only contain alphabet."
      ),

    lastName: Yup.string()
      .required("Last Name required")
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name should be 50 characters.")
      .matches(
        /(?=.*^[A-Za-z]\w).*$/,
        "Last name should only contain alphabet."
      ),
    username: Yup.string()
      .required("Username is required.")
      .min(4, "Username must be at least 4 characters.")
      .max(50, "Username should be 50 characters.")
      .matches(
        /(?=.*^[A-Za-z_]\w).*$/,
        "Username should begin with _ or alphabet."
      ),
    password:
      !edit &&
      Yup.string()
        .required("Required.")
        .min(6, "Password must be at least 6 characters.")
        .matches(
          /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
          "Must Contain 6 Characters, One alphabet and One Number "
        ),
    confirmPassword:
      !edit &&
      Yup.string()
        .required("Required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
    email: Yup.string().email("@ is required").required("Required."),

    office: Yup.object()
      .typeError("Office is required")
      .required("Office is required"),

    phone: Yup.string()
      .required("Mobile Number")
      .matches(
        /^[9]\d{9}$/,
        "Mobile number should start with 98 and should be 10 digits."
      ),
    designation: Yup.string().required("Designation Required"),

    gender: Yup.object()
      .typeError("Gender is required")
      .required("Gender is required"),
    isActive: Yup.bool(),
    isChecker: Yup.bool(),
    remarks: Yup.string(),
  });

  const onSubmit = async (values) => {
    const {
      firstName,
      middleName,
      lastName,
      email,
      username,
      phone,
      office,
      gender,
      remarks,
      password,
      groups,
      confirmPassword,
      designation,
      userPhoto,
      isActive,
      isChecker,
    } = values;
    const capitalFirstName =
      firstName?.charAt(0).toUpperCase() + firstName?.slice(1);
    const capitalMiddleName =
      middleName?.charAt(0).toUpperCase() + middleName?.slice(1);
    const capitalLastName =
      lastName?.charAt(0).toUpperCase() + lastName?.slice(1);

    const updatedGroups = groups?.map((data) => data.id);

    if (edit) {
      const id = user.id;
      const updateData = {
        firstName: capitalFirstName,
        middleName: capitalMiddleName,
        lastName: capitalLastName,
        email,
        username: username?.charAt(0).toLowerCase() + username?.slice(1),
        gender: gender !== "" ? gender?.id : "",
        office: office ? office?.id : null,
        designation,
        groups: updatedGroups,
        phone,
        userPhoto,
        isActive,
        isChecker,
        remarks,
      };

      const result = await dispatch(
        updateUser(id, updateData, currentPage, postsPerPage)
      );
      if (result) {
        setImg(null);
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } else {
      const result = await dispatch(
        createUser(
          {
            firstName: capitalFirstName,
            middleName: capitalMiddleName,
            lastName: capitalLastName,
            email,
            username: username?.charAt(0).toLowerCase() + username?.slice(1),
            gender: gender !== "" ? gender?.id : "",
            office: office ? office?.id : null,
            groups: updatedGroups,
            phone,
            isActive,
            isChecker,
            password,
            designation: designation,
            confirmPassword,
            userPhoto,
            remarks,
          },
          currentPage
        )
      );
      if (result) {
        setImg(null);
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    }
  };

  // function which checks whether the bank is added already or not
  const handleChange = async (e) => {
    if (edit && e.target.value !== user?.username) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantDataUser(e);
        result && errorFunction("User name with this  is already added. ");
      }
    }
    if (e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataUser(e);
      result && errorFunction("User with this name is already added ");
    }
  };

  // toggle password
  const handlePasswordClick = () => {
    if (password === "password") {
      setPassword("text");
    } else {
      setPassword("password");
    }
  };
  // toggle password
  const handleConfirmClick = () => {
    if (confirmPassword === "password") {
      setConfirmPassword("text");
    } else {
      setConfirmPassword("password");
    }
  };
  return (
    <>
      <div className="row justify-content-center mt-3">
        <div className="col-12">
          <div className="registration-process ">
            <Formik
              // enableReinitialize={true}
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                const { setFieldValue } = formik;
                return (
                  <Form autoComplete="off">
                    <div className="form-group row mb-2 justify-content-center">
                      <div className=" col-4">
                        <label
                          htmlFor="firstName"
                          className="fw-bold float-start"
                        >
                          First Name{" "}
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          className="form-control "
                          placeholder="First Name"
                        />
                        <ErrorMessage name="firstName" component={TextError} />
                      </div>
                      <div className=" col-4">
                        <label
                          htmlFor="middleName"
                          className="fw-bold float-start"
                        >
                          Middle Name
                        </label>
                        <Field
                          type="text"
                          name="middleName"
                          className="form-control "
                          placeholder="Middle Name"
                        />
                        <ErrorMessage name="middleName" component={TextError} />
                      </div>
                      <div className=" col-4">
                        <label
                          htmlFor="lastName"
                          className="fw-bold float-start"
                        >
                          Last Name{" "}
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          className="form-control "
                          placeholder="Last Name"
                        />
                        <ErrorMessage name="lastName" component={TextError} />
                      </div>
                    </div>

                    <div className="form-group row mb-2 justify-content-center">
                      <div className=" col-4">
                        <label htmlFor="email" className="fw-bold float-start">
                          Email
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control "
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component={TextError} />
                      </div>
                      <div className=" col-4">
                        <label
                          htmlFor="office "
                          className="fw-bold float-start"
                        >
                          Office
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <AsyncPaginate
                          blurInputOnSelect
                          value={formik.values.office}
                          isClearable="true"
                          isSearchable="true"
                          name="office"
                          isDisabled={edit && !(isAdmin || isSuperuser)}
                          getOptionLabel={(option) => `${option.name}`}
                          getOptionValue={(option) => `${option?.id}`}
                          onChange={(selected) => {
                            setFieldValue("office", selected);
                          }}
                          loadOptions={loadOptionsOffice}
                          additional={{
                            offset: 0,
                            limit: 0,
                          }}
                          styles={{
                            border: "white",
                          }}
                        />
                        <ErrorMessage name="office" component={TextError} />
                      </div>
                      <div className=" col-4">
                        <label htmlFor="phone" className="fw-bold float-start">
                          Phone
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          value={formik.values.phone}
                          className="form-control "
                          placeholder="Mobile No"
                          onChange={(e) => {
                            formik.setFieldValue("phone", e.target.value);
                          }}
                        />
                        <ErrorMessage name="phone" component={TextError} />
                      </div>
                    </div>
                    <div className="form-group row mb-2 justify-content-center">
                      <div className="col-4">
                        <label
                          htmlFor="designation"
                          className="fw-bold float-start"
                        >
                          Designation
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <Field
                          type="text"
                          name="designation"
                          className="form-control "
                          placeholder="Designation"
                        />
                        <ErrorMessage
                          name="designation"
                          component={TextError}
                        />
                      </div>
                      <div className="col-4">
                        <label htmlFor="gender" className="fw-bold ">
                          Gender
                        </label>

                        <Select
                          value={formik.values.gender}
                          isClearable="true"
                          isSearchable="true"
                          name="gender"
                          getOptionLabel={(option) => `${option?.name} `}
                          getOptionValue={(option) => `${option?.id}`}
                          options={genders}
                          onChange={(selected) => {
                            formik.setFieldValue("gender", selected);
                          }}
                        />
                        <ErrorMessage name="gender" component={TextError} />
                      </div>
                      <div className=" col-4 ">
                        <label
                          htmlFor="userPhoto"
                          className="fw-bold float-start"
                        >
                          Photo
                        </label>
                        <input
                          type="file"
                          name="userPhoto"
                          className="form-control"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "userPhoto",
                              event.target.files[0]
                            );
                            let reader = new FileReader();
                            reader.readAsDataURL(event.target.files[0]);
                            reader.onloadend = () => setImg([reader.result]);
                          }}
                        />

                        {img && <Thumb thumb={img} />}
                        {user && user.userPhoto && !img && (
                          <Thumb thumb={user.userPhoto} />
                        )}
                        <ErrorMessage name="userPhoto" component={TextError} />
                      </div>
                    </div>

                    <div className="form-group row mb-2 justify-content-center">
                      <div className="col-4">
                        <label
                          htmlFor="username"
                          className="fw-bold float-start"
                        >
                          User Name (Case Insensitive)
                          <strong className="text-danger ml-1">*</strong>
                        </label>

                        <Field
                          type="text"
                          name="username"
                          className="form-control "
                          placeholder="Username"
                          onChange={(e) => {
                            const val = (e.target.value || "").replace(
                              /\s+/gi,
                              ""
                            );
                            formik.setFieldValue("username", val);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage name="username" component={TextError} />
                      </div>

                      {!edit && (
                        <>
                          {" "}
                          <div className="col-4 password-field">
                            <label
                              htmlFor="password"
                              className="fw-bold float-start"
                            >
                              Password
                              <strong className="text-danger ml-1">*</strong>
                            </label>
                            <div style={{ position: "relative" }}>
                              <Field
                                type={password}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                              />

                              <span onClick={handlePasswordClick}>
                                {password === "password" ? (
                                  <BsFillEyeSlashFill />
                                ) : (
                                  <BsFillEyeFill />
                                )}
                              </span>
                            </div>
                            <ErrorMessage
                              name="password"
                              component={TextError}
                            />
                          </div>
                          <div className="col-4 password-field">
                            <label
                              htmlFor="confirmPassword"
                              className="fw-bold float-start"
                            >
                              Confirm Password
                              <strong className="text-danger ml-1">*</strong>
                            </label>
                            <div style={{ position: "relative" }}>
                              <Field
                                type={confirmPassword}
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                              />
                              <span onClick={handleConfirmClick}>
                                {confirmPassword === "password" ? (
                                  <BsFillEyeSlashFill />
                                ) : (
                                  <BsFillEyeFill />
                                )}
                              </span>
                            </div>
                            <ErrorMessage
                              name="confirmPassword"
                              component={TextError}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="form-group row mb-2 justify-content-center">
                      <div className=" col-12">
                        <label htmlFor="groups" className="fw-bold float-start">
                          Role
                        </label>
                        <AsyncPaginate
                          blurInputOnSelect
                          value={formik.values.groups}
                          isClearable="true"
                          isSearchable="true"
                          name="groups"
                          inputId="input"
                          isMulti
                          getOptionLabel={(option) =>
                            `${option.role || option.name}`
                          }
                          getOptionValue={(option) => `${option?.id}`}
                          onChange={(selected) => {
                            setFieldValue("groups", selected);
                          }}
                          loadOptions={loadOptionsRole}
                          additional={{
                            offset: 0,
                            limit: 10,
                          }}
                          styles={{
                            border: "white",
                          }}
                        />
                        <ErrorMessage name="groups" component={TextError} />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-4">
                      <div className=" text-center">
                        <Field
                          type="checkbox"
                          name="isActive"
                          id="isActive"
                          className="filled-in chk-col-blue"
                        />
                        <label htmlFor="isActive" className="fw-bold  mx-2">
                          {" "}
                          Active
                        </label>
                      </div>
                      {/* <div className=" text-center">
                        <Field
                          type="checkbox"
                          name="isChecker"
                          id="isChecker"
                          className="filled-in chk-col-blue"
                        />
                        <label htmlFor="isChecker" className="fw-bold  mx-2">
                          {" "}
                          Pass Approved
                        </label>
                      </div> */}
                    </div>
                    <div className="form-group text-center">
                      <Button
                        type={"submit"}
                        className={"btn btn-primary"}
                        loading={loading || loadingUpdated}
                        disabled={loading || loadingUpdated}
                        title={edit ? "Update" : "Create"}
                        content={"Add"}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(CreateUser);
