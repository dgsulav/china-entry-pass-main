import "./NepaliDatePicker.css";
import React, { lazy } from "react";
import { ErrorMessage } from "formik";
import TextError from "../TextError/TextError";

const Calendar = lazy(() => import("@sbmdkl/nepali-datepicker-reactjs"));

const NepaliDatePicker = ({
  name,
  label,
  className,
  onChange,
  required,
  id,
  isNotFormik,
}) => {
  return (
    <div className="common-nepali-date-picker-wrapper">
      <label htmlFor={name} className="form-label">
        {label} {required && <strong className="text-danger">*</strong>}
      </label>
      <br />
      <Calendar
        id={id}
        dateFormat="YYYY-MM-DD"
        hideDefaultValue
        language="en"
        name={name}
        className="form-control"
        placeholder="Select Date"
        onChange={onChange}
      />
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default NepaliDatePicker;
