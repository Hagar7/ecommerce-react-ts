import React, { ChangeEvent, useState } from 'react'
import style from "../styles/form.module.scss";
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { loginUser } from '../Interfaces/authInterface';
import Joi from "joi";
import { login } from '../Store/AuthSlice';


const Login: React.FC = () => {

const {loading} = useAppSelector((state)=>state.auth)
const dispatch = useAppDispatch()
const [errorMsg,setErrorMsg] = useState<string[]>([])
const [userData,setUserData] = useState<loginUser>({
  email:"",
  password: ""
})

const validationForm = ()=>{
  let schema = Joi.object({
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
  })
  return schema.validate(userData,{ abortEarly: false })
}


const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
let formData: any  = {...userData}
formData[e.target.name] = e.target.value
setUserData(formData)
}

const submitHandler = (e:React.FormEvent)=>{
e.preventDefault()
let formValidate = validationForm()
if(formValidate.error){
  setErrorMsg(formValidate.error.details.map((item)=>item.message))
}else{
  dispatch(login(userData))
}
}


const showMsg = (msg:string)=>{
  let newMsg  = errorMsg.filter((item)=>item.includes(msg))
  if(newMsg[0] !== undefined){
    return <div className="alert alert-danger p-1">{newMsg[0]}</div>;
  }else{
    return ""
  }

}


  return (
    <div className={`${style.form} w-75 m-auto py-4`}>
    <h2 className="h4 text-muted">Login Form</h2>
    <form className="py-4" onSubmit={submitHandler}>
     
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        className="form-control my-2"
        onChange={changeHandler}
      />
      {showMsg("email")}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="form-control my-2"
        onChange={changeHandler}
      />
      {showMsg("password")}
   
    
      <div className="d-flex justify-content-end">
        {loading?<button
          className={`${style.form__Btn} btn btn-primary`}
          type="submit"
        >
        <i className="fa-solid fa-spinner"></i>
        </button>
        :
        <button
          className={`${style.form__Btn} btn btn-primary`}
          type="submit"
        >
          Login
        </button>}
        
      </div>
    </form>
  </div>
  )
}

export default Login
