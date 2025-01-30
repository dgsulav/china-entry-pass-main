import "./index.css";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import React, { lazy } from "react";
import { ErrorMessage } from "formik";
import TextError from "../TextError/TextError";

const NepaliDatePicker = ({
  name,
  label,
  required,
  onChange,
  formikRequired,
  defaultDate,
  placeholder,
  isNotFormik,
  value,
  id,
  className = "",
}) => {
  return (
    <div className="common-datepicker-wrapper">
      <label htmlFor={name} className="form-label">
        {label} {required && <strong className="text-danger">*</strong>}
      </label>
      <br />

      <Calendar
        name={name}
        id={id}
        value={value}
        dateFormat="YYYY-MM-DD"
        defaultDate={defaultDate}
        language="en"
        disabled={true}
        placeholder={placeholder ? placeholder : "Select Date"}
        className={
          formikRequired
            ? className + "required-field form-control"
            : className + "form-control"
        }
        onChange={onChange}
      />

      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default NepaliDatePicker;
