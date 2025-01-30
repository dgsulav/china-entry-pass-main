import React, { useEffect, useRef, useState } from "react";
import ModalHeader from "./ModalHeader";
import { useDispatch } from "react-redux";

const Modal = ({
  onModalClick = null,
  children,
  size,
  id,
  title,
  header,
  showModal,
  setShowModal,
  edit,
  clearAction,
  ...props
}) => {
  const ref = useRef();
  const dispatch = useDispatch();

  const modalClass = showModal ? "modal display-block" : "modal display-none";
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={modalClass}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      id={id}
      onClick={onModalClick}
    >
      <div className={`modal-dialog modal-dialog-centered ${size ? size : ""}`}>
        <div className="modal-content">
          <ModalHeader
            header={header}
            setShowModal={setShowModal}
            edit={edit}
            clearAction={clearAction}
            {...props}
          />
          <div
            className="modal-body"
            style={{ background: "#f4f7fa" }}
            ref={ref}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

{
  /* <div className={modalClass} tabIndex="-1">
<div className="modal-dialog modal-md">
  <div className="modal-content content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Take Signature with Siganture Pad
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
    </div> */
}

{
  /* <div className="modal-body">
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
                          htmlFor="signature"
                          className="fw-bold float-start"
                        >
                          Signing process view
                          <strong className="text-danger ml-1">*</strong>
                        </label>
                        <Field
                          type="text"
                          name="signature"
                          className="form-control "
                          placeholder="Write your Signature here"
                        />
                        <ErrorMessage
                          name="signature"
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
                        title={"Take Signature"}
                        content={"Take Signature"}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div> */
}
{
  /* </div>
</div>{" "}
</div> */
}
