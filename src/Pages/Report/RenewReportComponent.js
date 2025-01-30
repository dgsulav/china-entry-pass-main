import { bsToAd } from "@sbmdkl/nepali-date-converter";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { AsyncPaginate } from "react-select-async-paginate";
import * as Yup from "yup";
import Button from "../../Component/Button/Button";
import TextError from "../../Component/TextError/TextError";
import { reportConstants } from "../../Redux/Report/constants";
import {
  getAllRenewCardReport,
  getRenewCardReport,
} from "../../Redux/Report/thunk";

import { dateFormater } from "../../utils/dateFormater";
import { statusTypes } from "../../Component/Data/Data";
import Select from "react-select";
import { loadOptionsOffice } from "./asyncFunction";

const RenewReportComponent = ({
  name,
  setShowExcelReportModal,
  setShowPDFReportModal,
  setShowReportModal,
  reportStartDate,
  setReportStartDate,
  reportEndDate,
  setReportEndDate,
  setFormData,
}) => {
  const dispatch = useDispatch();
  const [paginatedData, setPaginatedData] = useState(true);
  const userOffice = useSelector((state) => state.auth.office);
  const postsPerPage = 10;

  const initialState = {
    office: userOffice !== null ? userOffice : null,
    status: null,
    adSystem: true,
    bsSystem: false,
    startDate: new Date().toLocaleDateString("fr-CA"),
    endDate: new Date().toLocaleDateString("fr-CA"),
    quickReport: true,
    pdfReport: false,
    excelReport: false,
    district: null,
  };
  const validationSchema = Yup.object().shape({
    adSystem: Yup.bool(),
    bsSystem: Yup.bool(),
    startDate: Yup.string()
      .test(
        "startDate",
        "Start Date cannot be greater than today's date",
        function (value) {
          const { adSystem } = this.parent;
          const adDate =
            value !== undefined
              ? value.length === 10 && adSystem === false
                ? bsToAd(value)
                : value
              : "";
          if (adSystem && value !== undefined && new Date(value) > new Date()) {
            return false;
          } else if (
            adSystem === false &&
            value !== undefined &&
            new Date(adDate) > new Date()
          ) {
            return false;
          } else {
            return true;
          }
        }
      )
      .test(
        "startDate",
        "Start Date cannot be greater than end Date",
        function (value) {
          const { adSystem, endDate } = this.parent;
          const adDate =
            value !== undefined
              ? value.length === 10 && adSystem === false
                ? bsToAd(value)
                : value
              : "";
          if (
            adSystem &&
            value !== undefined &&
            new Date(value) > new Date(endDate)
          ) {
            return false;
          } else if (
            adSystem === false &&
            value !== undefined &&
            new Date(adDate) > new Date(endDate)
          ) {
            return false;
          } else {
            return true;
          }
        }
      ),
    endDate: Yup.string()
      .test(
        "endDate",
        "End Date cannot be greater than today's date",
        function (value) {
          const { adSystem } = this.parent;
          const adDate =
            value !== undefined
              ? value.length === 10 && adSystem === false
                ? bsToAd(value)
                : value
              : "";
          if (adSystem && value !== undefined && new Date(value) > new Date()) {
            return false;
          } else if (
            adSystem === false &&
            value !== undefined &&
            new Date(adDate) > new Date()
          ) {
            return false;
          } else {
            return true;
          }
        }
      )
      .test(
        "endDate",
        "End Date cannot be less than start Date",
        function (value) {
          const { adSystem, startDate } = this.parent;

          const convertedStartDate =
            startDate.length === 10 && adSystem === false
              ? bsToAd(startDate)
              : startDate;
          const adDate =
            value !== undefined
              ? value.length === 10 && adSystem === false
                ? bsToAd(value)
                : value
              : "";
          if (
            adSystem &&
            value !== undefined &&
            new Date(value) < new Date(convertedStartDate)
          ) {
            return false;
          } else if (
            adSystem === false &&
            value !== undefined &&
            new Date(adDate) < new Date(convertedStartDate)
          ) {
            return false;
          } else {
            return true;
          }
        }
      ),
    office: Yup.object().nullable(true),
    status: Yup.object().nullable(true),
    quickReport: Yup.bool(),
    pdfReport: Yup.bool(),
    excelReport: Yup.bool(),
  });
  const onSubmit = async (values) => {
    const {
      startDate,
      endDate,
      adSystem,
      quickReport,
      pdfReport,
      office,
      status,
    } = values;
    const formatedStartDate = adSystem
      ? dateFormater(new Date(startDate))
      : reportStartDate;
    const formatedEndDate = adSystem
      ? dateFormater(new Date(endDate))
      : reportEndDate;
    const body = {
      formatedStartDate,
      formatedEndDate,
      office: office?.id ? office?.id : "",
      status: status?.id ? status?.id : "",
    };
    setFormData(body);
    dispatch({ type: reportConstants.CLEAR_ALL_DATA });
    if (quickReport) {
      if (paginatedData) {
        if (name === "report") {
          dispatch(getRenewCardReport(postsPerPage, body));
          setShowReportModal(true);
          setShowExcelReportModal(false);
          setShowPDFReportModal(false);
        }
      } else {
        if (name === "report") {
          dispatch(getAllRenewCardReport(body));
          setShowReportModal(true);
          setShowExcelReportModal(false);
          setShowPDFReportModal(false);
        }
      }
    } else if (pdfReport) {
      if (name === "report") {
        dispatch(getAllRenewCardReport(body));
        setShowPDFReportModal(true);
        setShowReportModal(false);
        setShowExcelReportModal(false);
      }
    } else {
      if (name === "report") {
        dispatch(getAllRenewCardReport(body));
        setShowExcelReportModal(true);
        setShowPDFReportModal(false);
        setShowReportModal(false);
      }
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div
          className="col-md-7 "
          style={{ paddingBottom: "10", marginBottom: "10%" }}
        >
          <div className="card mb-5 mt-3 bg-white rounded">
            <div
              className=""
              style={{ backgroundColor: "#f1f1f1", padding: "20px" }}
            >
              <Formik
                enableReinitialize={true}
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form autoComplete="off">
                      <div className="form-group row justify-content-center">
                        <div className="col-5">
                          <label htmlFor="office" className="fw-bold">
                            Office
                          </label>

                          <AsyncPaginate
                            blurInputOnSelect
                            value={formik.values.office}
                            isClearable="true"
                            isSearchable="true"
                            name="office"
                            inputId="input"
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              formik.setFieldValue("office", selected);
                            }}
                            loadOptions={loadOptionsOffice}
                            additional={{
                              offset: 0,
                              limit: 10,
                            }}
                          />

                          <ErrorMessage name="office" component={TextError} />
                        </div>
                        <div className="col-5">
                          <label htmlFor="status" className="fw-bold">
                            Type
                          </label>
                          <Select
                            value={formik.values.status}
                            isClearable="true"
                            isSearchable="true"
                            name="status"
                            getOptionLabel={(option) => `${option?.name} `}
                            getOptionValue={(option) => `${option?.id}`}
                            options={statusTypes}
                            onChange={(selected) => {
                              formik.setFieldValue("status", selected);
                            }}
                          />

                          <ErrorMessage name="status" component={TextError} />
                        </div>
                      </div>

                      <div className="form-group row mb-5 justify-content-center">
                        <div className="col-5 text-center m-3">
                          <Field
                            type="checkbox"
                            name="adSystem"
                            id="adSystem"
                            className="filled-in chk-col-blue "
                            onChange={(e) => {
                              formik.setFieldValue(
                                "startDate",
                                new Date().toLocaleDateString("fr-CA")
                              );
                              formik.setFieldValue(
                                "endDate",
                                new Date().toLocaleDateString("fr-CA")
                              );
                              formik.setFieldValue(
                                "adSystem",
                                e.target.checked
                              );
                              formik.setFieldValue("bsSystem", false);
                            }}
                          />
                          <label htmlFor="adSystem" className="ml-2 fw-bold">
                            A.D System
                          </label>
                        </div>
                        <div className="col-5 text-center m-3">
                          <Field
                            type="checkbox"
                            name="bsSystem"
                            id="bsSystem"
                            className="filled-in chk-col-blue "
                            onChange={(e) => {
                              formik.setFieldValue(
                                "bsSystem",
                                e.target.checked
                              );
                              formik.setFieldValue("adSystem", false);
                            }}
                          />
                          <label htmlFor="bsSystem" className="mx-2 fw-bold">
                            {" "}
                            B.S System
                          </label>
                        </div>
                        <div className="col-5">
                          <label htmlFor="from_date" className="fw-bold">
                            Start Date
                          </label>
                          {formik.values.bsSystem ? (
                            <Calendar
                              value={formik.values.startDate}
                              onChange={({ bsDate, adDate }) => {
                                formik.setFieldValue("startDate", bsDate);
                                setReportStartDate(adDate);
                              }}
                              className="form-control"
                              label="Start Date"
                              name="startDate"
                              language="en"
                              dateFormat="YYYY-MM-DD"
                            />
                          ) : (
                            <DatePicker
                              value={formik.values.startDate}
                              format="yyyy-MM-dd"
                              label="Start Date"
                              name="startDate"
                              className="form-control"
                              onChange={(value) => {
                                formik.setFieldValue(
                                  "startDate",
                                  value?.toLocaleDateString("fr-CA")
                                );
                                setReportStartDate(value);
                              }}
                            />
                          )}
                          <ErrorMessage
                            component={TextError}
                            name="startDate"
                          />
                        </div>
                        <div className="col-5">
                          <label htmlFor="endDate" className="fw-bold">
                            End Date
                          </label>
                          {formik.values.bsSystem ? (
                            <Calendar
                              value={formik.values.endDate}
                              onChange={({ bsDate, adDate }) => {
                                formik.setFieldValue("endDate", bsDate);
                                setReportEndDate(adDate);
                              }}
                              className="form-control"
                              label="End Date"
                              name="endDate"
                              language="en"
                              dateFormat="YYYY-MM-DD"
                            />
                          ) : (
                            <DatePicker
                              value={formik.values.endDate}
                              format="yyyy-MM-dd"
                              label="End Date"
                              name="endDate"
                              className="form-control"
                              onChange={(value) => {
                                formik.setFieldValue(
                                  "endDate",
                                  value?.toLocaleDateString("fr-CA")
                                );
                                setReportEndDate(value);
                              }}
                            />
                          )}
                          <ErrorMessage component={TextError} name="endDate" />
                        </div>
                        <div className="col-3 m-3 text-center">
                          <Field
                            type="checkbox"
                            name="quickReport"
                            id="quickReport"
                            className="filled-in chk-col-blue "
                            onChange={(e) => {
                              formik.setFieldValue(
                                "quickReport",
                                e.target.checked
                              );
                              formik.setFieldValue("pdfReport", false);
                              formik.setFieldValue("excelReport", false);
                            }}
                          />
                          <label htmlFor="quickReport" className="mx-2 fw-bold">
                            {" "}
                            Quick Report
                          </label>
                        </div>

                        <div className="col-3 m-3 text-center">
                          <Field
                            type="checkbox"
                            name="pdfReport"
                            id="pdfReport"
                            className="filled-in chk-col-blue "
                            onChange={(e) => {
                              formik.setFieldValue(
                                "pdfReport",
                                e.target.checked
                              );
                              formik.setFieldValue("quickReport", false);
                              formik.setFieldValue("excelReport", false);
                            }}
                          />
                          <label htmlFor="pdfReport" className="mx-2 fw-bold">
                            {" "}
                            PDF
                          </label>
                        </div>
                        {/* <div className="col-3 m-3 text-center">
                          <Field
                            type="checkbox"
                            name="excelReport"
                            id="excelReport"
                            className="filled-in chk-col-blue "
                            onChange={(e) => {
                              formik.setFieldValue(
                                "excelReport",
                                e.target.checked
                              );
                              formik.setFieldValue("pdfReport", false);
                              formik.setFieldValue("quickReport", false);
                            }}
                          />
                          <label htmlFor="excelReport" className="mx-2 fw-bold">
                            {" "}
                            Excel
                          </label>
                        </div> */}
                      </div>
                      <div className="form-group d-flex justify-content-center mt-3 ">
                        <Button
                          type={"btn"}
                          className={"btn btn-primary"}
                          title={"Generate"}
                          content={"Generate"}
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
    </>
  );
};

export default React.memo(RenewReportComponent);
