import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { NavLink } from "react-router-dom";
import { classNames } from "primereact/utils";
import MenuBar from "../menubar";
import { login } from "../../services/login";

export const LoginScreen = ({ callback }) => {
  const [values, setValues] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickLogin = async () => {
    var formikResponse = formik.errors;
    if (Object.keys(formikResponse).length === 0) {
      console.log("sending to server");
      const email = values.email;
      const password = values.password;
      const token = await login(email, password);
      callback(token);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);

      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="form--section">
      <MenuBar />
      <div className="title--container">
        <h1>Home Service</h1>
      </div>
      <div className="form-demo">
        <div className="flex justify-content-center">
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div>
                <h1>Login</h1>
              </div>
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <InputText
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("email"),
                    })}
                  />
                  <label
                    htmlFor="email"
                    className={classNames({
                      "p-error": isFormFieldValid("email"),
                    })}
                  >
                    Email*
                  </label>
                </span>
                {getFormErrorMessage("email")}
              </div>
              <div className="field">
                <span className="p-float-label">
                  <Password
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    toggleMask={true}
                    feedback={false}
                    className={classNames({
                      "p-invalid": isFormFieldValid("password"),
                    })}
                  />
                  <label
                    className={classNames({
                      "p-error": isFormFieldValid("password"),
                    })}
                  >
                    Password*
                  </label>
                </span>
                {getFormErrorMessage("password")}
              </div>
              <Button
                onClick={() => handleClickLogin()}
                label="Login"
                className="p-button-raised p-button-rounded"
              />
              <div className="elements">
                <NavLink className="link" to="/">
                  Esqueci minha senha
                </NavLink>
                <div>
                  <NavLink className="link" to="/registroUsuario">
                    Registrar-se
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
