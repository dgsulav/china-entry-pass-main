import React, { useState, useEffect, Suspense, lazy } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import TextError from "../../Component/TextError/TextError";
import { useSelector, useDispatch } from "react-redux";
import { createRole, updateRole } from "../../Redux/Role/thunk";
import { errorFunction } from "../../Component/Alert";
import { checkRedundantDataUser } from "../../utils/redundant/user";

import Button from "../../Component/Button/Button";

const Permission = lazy(() => import("./Permission"));
const CreateRole = ({ currentPage, loading, setShowModal, role, edit }) => {
  const dispatch = useDispatch();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [holdPermissions, setHoldPermissions] = useState([]);

  //initial state of the form
  const initialState = {
    name: edit ? role?.name : "",
    permissions: edit ? (role ? role?.permissions : []) : [],
    remarks: "",
    isActive: edit ? role?.isActive : false,
  };
  //validation rules of the form
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("First Name required")
      .min(3, "First name must be at least 2 characters."),

    isActive: Yup.bool(),
    remarks: Yup.string(),
  });

  const onSubmit = async (values) => {
    const {
      name,

      remarks,

      isActive,
    } = values;
    const capitalName = name?.charAt(0).toUpperCase() + name?.slice(1);
    const per = selectedPermissions.map((value) => value.id);
    if (edit) {
      const id = role.id;
      const result = await dispatch(
        updateRole(
          id,
          {
            name: capitalName,
            permissions: per,
            isActive,
            remarks,
          },

          currentPage
        )
      );
      if (result) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } else {
      const result = await dispatch(
        createRole(
          {
            name: capitalName,
            permissions: per,
            isActive,

            remarks,
          },
          currentPage
        )
      );
      if (result) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    }
  };

  // function which checks whether the bank is added already or not
  const handleChange = async (e) => {
    if (e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantDataUser(e);
      result && errorFunction("Role with this name is already added ");
    }
  };

  return (
    <>
      <div className="row justify-content-center mt-3">
        <div className="col-12">
          <div className="registration-process ">
            <Formik
              enableReinitialize={true}
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                const { setFieldValue } = formik;
                return (
                  <Form autoComplete="off">
                    <div className="form-group row mb-2 justify-content-center">
                      <div className=" col-12">
                        <label htmlFor="name" className="fw-bold float-start">
                          Role Name{" "}
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control "
                          placeholder="Role Name"
                        />
                        <ErrorMessage name="name" component={TextError} />
                      </div>
                    </div>

                    <Permission
                      selectedPermissions={selectedPermissions}
                      setSelectedPermissions={setSelectedPermissions}
                      holdPermissions={holdPermissions}
                      setHoldPermissions={setHoldPermissions}
                      role={role}
                      edit={edit}
                    />

                    <div className="form-group row mb-2">
                      <div className="col-12 text-center">
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
                    </div>
                    <div className="form-group text-center">
                      <Button
                        type={"btn"}
                        className={"btn btn-primary"}
                        loading={loading}
                        // disabled={lock || !formik.dirty}
                        title={edit ? "Update" : "Create"}
                        content={edit ? "Update" : "Create"}
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
export default React.memo(CreateRole);
