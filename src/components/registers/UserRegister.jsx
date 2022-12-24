import React, { useState } from "react";
import { useFormik } from "formik";
import MenuBar from "../menubar/index.jsx";
import "../Forms.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import {
  registerUser,
  verifyUserEmail,
} from "../../services/registers/Registers";
import { Password } from "primereact/password";

export default function UserRegister() {
  const [values, setValues] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const changeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickRegisterUser = async () => {
    var formikResponse = formik.errors;
    if (Object.keys(formikResponse).length === 0) {
      const userName = values.userName;
      const email = values.email;
      const password = values.password;
      const verify = await verifyUserEmail(email);
      verify == false
        ? window.alert("Email já cadastrado!")
        : await registerUser(userName, email, password);
      clearInputs();
    }

    const getSuccessfulRegisteredMessage = (name) => {
      return isFormFieldValid(name) && <small>{name}</small>;
    };
  };

  const clearInputs = () => {
    formik.resetForm();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleClickRegisterUser();
    }
  };

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

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

      if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm password is required.";
      } else if (data.password != data.confirmPassword) {
        errors.confirmPassword = "Confirm password is different than Password";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);

      formik.resetForm();
    },
  });

  return (
    <div className="form--section">
      <MenuBar />
      <div className="title--container">
        <h1>Home Service</h1>
        <h2>Registre sua conta aqui!</h2>
      </div>
      <div className="form-demo">
        <div className="flex justify-content-center">
          <div className="card">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div>
                <h1>Create your account!</h1>
              </div>
              <div className="field">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({
                      "p-error": isFormFieldValid("name"),
                    })}
                  >
                    Name*
                  </label>
                </span>
                {getFormErrorMessage("name")}
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
                    feedback={true}
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
              <div className="field">
                <span className="p-float-label">
                  <Password
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    toggleMask={true}
                    feedback={false}
                    className={classNames({
                      "p-invalid": isFormFieldValid("confirmPassword"),
                    })}
                  />
                  <label
                    className={classNames({
                      "p-error": isFormFieldValid("confirmPassword"),
                    })}
                  >
                    Confirm Password*
                  </label>
                </span>
                {getFormErrorMessage("confirmPassword")}
              </div>
              {getFormErrorMessage("Successful Registered!")}
              <div className="form--buttons">
                <Button
                  onClick={() => handleClickRegisterUser()}
                  label="Register"
                  className="p-button-raised p-button-rounded"
                />
              </div>
              <div className="form--buttons">
                <Button
                  onClick={() => clearInputs()}
                  type={"reset"}
                  label="Cancel"
                  className="p-button-raised p-button-rounded"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
