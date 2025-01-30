import React, { useState } from "react";
import "./Login.css";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../../Component/TextError/TextError";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redux/Auth/thunk";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Button from "../../Component/Button/Button";
import Footer from "../../Component/Footer/Footer";
const Login = () => {
  // props
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  //initial values of form field in formik
  // const user = localStorage.getItem("username");
  const initialValues = {
    username:  "",
    password: "",
  };

  //validation rule for the form field in formik
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required!")
      .min(3, "Username must be at least 3 characters")
      .matches(
        /(?=.*^[A-Za-z_]\w).*$/,
        "Username should begin with _ or alphabet "
      ),
    password: Yup.string()
      .required("Required!")
      .min(4, "Password should be at least 4 characters"),
  });
  //submit handler for formik
  const onSubmit = (values) => {
    const { username, password } = values;
    dispatch(login(username, password));
  };
  // toggle password
  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  return (
    <div className="login-bak">
      <div className="account-pages">
        <div className="container">
          <div className="row justify-content-center">
            <div className="login-position">
              <div className="card overflow-hidden card-login">
                <div className="bg-primary bg-soft">
                  <div className="p-2 mt-3">
                    <h2 style={{ fontWeight: "bold" }}>Welcome!</h2>
                    <h5>Sign in to continue.</h5>
                  </div>
                </div>
                <div className="login-card-body pt-0">
                  <div className="p-2">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {() => {
                        return (
                          <Form autoComplete="off" className="form-horizontal ">
                            <div className="mb-3 ">
                              <label
                                htmlFor="username"
                                className="form-label"
                                style={{ fontWeight: "bold", fontSize: "12px" }}
                              >
                                USERNAME{" "}
                                <strong className="text-danger ">*</strong>
                              </label>
                              <Field
                                type="text"
                                className="form-control textfield-login"
                                name="username"
                                placeholder="Enter Username"
                              />
                              <ErrorMessage
                                name="username"
                                component={TextError}
                              />
                            </div>
                            <div className="mb-3  password-field">
                              <label
                                htmlFor="password"
                                className="form-label "
                                style={{ fontWeight: "bold", fontSize: "12px" }}
                              >
                                PASSWORD{" "}
                                <strong className="text-danger ">*</strong>
                              </label>
                              <div style={{ position: "relative" }}>
                                <Field
                                  type={type}
                                  className="form-control textfield-login"
                                  name="password"
                                  placeholder="Enter Password"
                                />
                                <span
                                  style={{ lineHeight: "10px", top: "11px" }}
                                  onClick={handleClick}
                                >
                                  {type === "password" ? (
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
                            {/* <div className="form-check">
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                name="remember_me"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="remember_me"
                              >
                                Remember me
                              </label>
                            </div> */}
                            <div className="mt-4 mb-3 text-center w-100">
                              <Button
                                type={"btn"}
                                className={
                                  "btn btn-primary waves-effect waves-light btn-login"
                                }
                                loading={loading}
                                disabled={loading}
                                title={"Login"}
                                content={"Login"}
                              />
                            </div>
                            {/* <div className="text-center mt-2">
                              <Link
                                to="/reset-password"
                                className="text-decoration-none"
                              >
                                <i className="me-1 ">
                                  <BiLock />
                                </i>
                                Forgot password?
                              </Link>
                            </div> */}
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center text-white">
                <div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
