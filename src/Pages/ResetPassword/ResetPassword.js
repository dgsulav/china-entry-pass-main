import React, { useEffect } from "react";
import TextError from "../../Component/TextError/TextError";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Login/Login.css";
import Spinner from "../../Component/Spinner/Spinner";
import { resetPassword } from "../../Redux/Auth/thunk";
import Footer from "../../Dashboard/Footer";
import Select from "react-select";
const ResetPassword = () => {
  const loading = useSelector((state) => state.auth.loadingResetPassword);
  const message = useSelector((state) => state.auth.message);
  const branches = useSelector((state) => state.auth.branches);
  const initialValues = {
    email: "",
  };
  //validation rule for the form field in formik
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });
  const dispatch = useDispatch();

  //submit handler for formik
  const onSubmit = (values) => {
    dispatch(resetPassword(values.email));
  };

  return (
    <>
      <div className="login-bak">
        <div className="account-pages reset-container my-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card overflow-hidden card-reset">
                  <div className="bg-primary waves-effect waves-light bg-soft">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="text-center m-3">
                          <h5 className="">Reset Password</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        {(formik) => {
                          return (
                            <Form
                              autoComplete="off"
                              className="form-horizontal "
                            >
                              <div className="mb-3 mt-3">
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Email{" "}
                                  <strong className="text-danger ">*</strong>
                                </label>
                                <Field
                                  type="text"
                                  className="form-control textfield-login"
                                  name="email"
                                  placeholder="Enter Email"
                                />
                                <ErrorMessage
                                  name="email"
                                  component={TextError}
                                />
                              </div>
                              <div className="mt-3 text-center d-grid">
                                <button
                                  className="btn btn-primary waves-effect waves-light mt-4 m-3"
                                  type="submit"
                                  disabled={loading}
                                >
                                  Continue {loading && <Spinner />}
                                </button>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-3 text-center text-white">
                  <div>
                    <Footer />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
