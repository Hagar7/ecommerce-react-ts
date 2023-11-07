import { registerUser } from "../Interfaces/authInterface";
import style from "../styles/form.module.scss";
import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { register } from "../Store/AuthSlice";
import Joi from "joi";

const Register: React.FC = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [errormsg, setErrormsg] = useState<string[]>([]);
  const [formData, setformData] = useState<registerUser>({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const formValidation = () => {
    let schema = Joi.object({
      name: Joi.string().min(2).max(10).required().messages({
        "string.max":
          "name length must be less than or equal to 10 characters long",
      }),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .messages({
          "string.pattern.base":
            "password length must be at least 6 characters long",
        }),
      rePassword: Joi.string()
        .required()
        .min(4)
        .valid(Joi.ref("password"))
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .messages({
          "string.pattern.base":
            "password length must be at least 6 characters long",
          "any.only": "rePassword don't match the password",
        }),
      phone: Joi.string().required(),
    });
    return schema.validate(formData, { abortEarly: false });
  };
  const changeHnadler = (e: ChangeEvent<HTMLInputElement>) => {
    let userData: any = { ...formData };
    userData[e.target.name] = e.target.value;
    setformData(userData);
  };

  const sumbitHnadler = (e: React.FormEvent) => {
    e.preventDefault();
    let validateResponse = formValidation();
    if (validateResponse.error) {
      console.log(validateResponse);

      setErrormsg(validateResponse.error.details.map((item) => item.message));
    } else {
      dispatch(register(formData));
    }
  };

  const showError = (msg: string) => {
    let newMsg = errormsg.filter((err) => err.includes(msg));
    if (newMsg[0] !== undefined) {
      return <div className="alert alert-danger p-1">{newMsg[0]}</div>;
    } else {
      return "";
    }
  };

  return (
    <div className={`${style.form} w-75 m-auto py-4`}>
      <h2 className="h4 text-muted">Register Form</h2>
      <form className="py-4" onSubmit={sumbitHnadler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control my-2"
          onChange={changeHnadler}
        />
        {showError("name")}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control my-2"
          onChange={changeHnadler}
        />
        {showError("email")}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control my-2"
          onChange={changeHnadler}
        />
        {showError("password")}
        <label htmlFor="rePassword">RePassword</label>
        <input
          type="password"
          name="rePassword"
          id="rePassword"
          className="form-control my-2"
          onChange={changeHnadler}
        />
        {showError("rePassword")}
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="form-control my-2"
          onChange={changeHnadler}
        />
        {showError("phone")}
        <div className="d-flex justify-content-end">
          {loading ? (
            <button
              className={`${style.form__Btn} btn btn-primary`}
              type="submit"
            >
              <i className="fa-solid fa-spinner"></i>
            </button>
          ) : (
            <button
              className={`${style.form__Btn} btn btn-primary`}
              type="submit"
            >
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
