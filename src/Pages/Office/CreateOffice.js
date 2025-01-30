import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../Component/TextError/TextError";

import { useDispatch, useSelector } from "react-redux";

import Button from "../../Component/Button/Button";
import { createOffice, updateOffice } from "../../Redux/Office/thunk";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from "react-select";
import {
  loadOptionsDistrict,
  loadOptionsPalika,
  loadOptionsProvince,
} from "./asyncFunction";
import { officeTypes } from "../../Component/Data/Data";

const CreateOffice = ({ setShowModal, showModal, currentPage }) => {
  const { office, edit } = useSelector((state) => state.office);

  const initialValues = {
    officeType: edit
      ? officeTypes.find((value) => value.id === office?.officeType)
      : "",
    province: edit ? (office ? office.province : null) : null,
    district: edit ? (office ? office.district : null) : null,
    palika: edit ? (office ? office.palika : null) : null,
    ward: edit ? (office ? office.ward : null) : null,
    isActive: edit ? office?.isActive : false,
  };

  const validationSchema = Yup.object().shape({
    province: Yup.object().nullable(),
    district: Yup.object().nullable(),
    palika: Yup.object().nullable(),
    ward: Yup.number()
      .integer("Ward must be an integer")
      .typeError("Please enter a valid Ward No")
      .positive("Ward must be a positive number")
      .required("Ward is required"),
    isActive: Yup.bool(),
  });
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const { officeType, district, province, palika } = values;
    const value = {
      ...values,
      officeType: officeType?.id,
      district: district?.id,
      province: province?.id,
      palika: palika?.id,
    };
    if (!edit) {
      const result = await dispatch(createOffice(value, currentPage, 10));

      if (result) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    } else {
      const updateData = {
        id: office?.id,
        values: {
          ...values,

          officeType: officeType?.id,
          district: district?.id,
          province: province?.id,
          palika: palika?.id,
        },
        currentPage,
      };
      const result = await dispatch(updateOffice(updateData));
      if (result) {
        setShowModal(false);
      } else {
        setShowModal(true);
      }
    }
  };

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
                    <div className="col-6 mb-2">
                      <label htmlFor="gender" className="fw-bold ">
                        Office Type
                      </label>
                      <Select
                        value={formik.values.officeType}
                        isClearable="true"
                        isSearchable="true"
                        name="officeType"
                        getOptionLabel={(option) => `${option?.name} `}
                        getOptionValue={(option) => `${option?.id}`}
                        options={officeTypes}
                        onChange={(selected) => {
                          formik.setFieldValue("officeType", selected);
                        }}
                      />
                      <ErrorMessage name="officeType" component={TextError} />
                    </div>
                    <div className="col-6 mb-2">
                      <label htmlFor="province" className="fw-bold float-start">
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
                        onChange={(select) => {
                          if (select) {
                            if (select?.id === formik.values?.province?.id) {
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
                    <div className="col-6 mb-2">
                      <label htmlFor="district" className="fw-bold float-start">
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
                        isDisabled={
                          formik.values?.province === null ? true : false
                        }
                        getOptionLabel={(option) => `${option.name}`}
                        getOptionValue={(option) => `${option?.id}`}
                        onChange={(select) => {
                          if (select) {
                            if (select?.id === formik.values?.district?.id) {
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
                        loadOptions={loadOptionsDistrict}
                        additional={{
                          offset: 0,
                          limit: 10,
                          province: formik?.values?.province,
                        }}
                      />
                      <ErrorMessage name="district" component={TextError} />
                    </div>

                    <div className="col-6 mb-2">
                      <label htmlFor="palika" className="fw-bold float-start">
                        Palika
                        <strong className="text-danger ">*</strong>
                      </label>

                      <AsyncPaginate
                        blurInputOnSelect
                        key={JSON.stringify(formik.values?.district)}
                        disabled={
                          formik?.values?.district === null ? true : false
                        }
                        value={formik.values.palika}
                        isClearable="true"
                        isSearchable="true"
                        name="palika"
                        inputId="input"
                        isDisabled={
                          formik?.values?.district === null ? true : false
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

                    <div className="col-6 mb-2">
                      <label htmlFor="ward" className="fw-bold float-start">
                        Ward
                        <strong className="text-danger ">*</strong>
                      </label>
                      <Field
                        type="number"
                        value={formik.values.ward}
                        name="ward"
                        onChange={(e) => {
                          setFieldValue("ward", e.target.value);
                        }}
                        className="form-control "
                        placeholder="Ward Number"
                      />

                      <ErrorMessage name="ward" component={TextError} />
                    </div>
                  </div>
                </div>
                <div className="form-group row mb-2">
                  <div className="col-12 text-center">
                    <Field
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      className="filled-in chk-col-blue"
                    />
                    <label htmlFor="isActive" className="fw-bold  mx-2">
                      Active
                    </label>
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

export default CreateOffice;
