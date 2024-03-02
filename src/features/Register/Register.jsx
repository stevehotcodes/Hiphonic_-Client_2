import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import './Register.scss'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser, getRegisterUserError } from "./registerSlice";
import { ToasterContainer, ErrorToast, LoadingToast, SuccessToast } from "../../components/Toaster/Toaster";
import { MdPersonOutline } from "react-icons/md";
import { MdLockPerson } from "react-icons/md";
import { MdOutlineMarkunread } from "react-icons/md";
import { FaUserTag } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getRegisterUserError);

  const schema = yup.object().shape({
    username: yup.string().required("username is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
        "4 Chars, 1 CAPS, 1 Lowercase, 1 Num & 1 special Char"
      ),
    tagname: yup.string().required("Tagname is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    console.log(data)
    navigate("/");
  };

  return (
    <>
      <div className="register-holder">
        <ToasterContainer />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-wrap">
         
              <div className="form-holder">
                <div className="inputs-holder">
                  <div className="part-input">
                    <div> <input
                      placeholder="username..."
                      {...register("username")}

                    /></div>
                    <div className="react">                    <MdPersonOutline size="34px" color="rgba(9, 5, 132, 0.743)" />
                    </div>                  </div>
                  <p>{errors.username?.message}</p>
                  <div className="part-input">
                    <div>  <input
                      placeholder="Email..."
                      {...register("email")}
                    /></div>
                    <div className="react"> <MdOutlineMarkunread size="34px" color="rgba(9, 5, 132, 0.743)" /></div>
                  </div>
                  <p>{errors.email?.message}</p>

                  <div className="part-input">
                    <div>
                      <input
                        type="password"
                        placeholder="Password.."
                        {...register("password")}
                      />
                    </div>
                    <div className="react">                    <MdLockPerson size="34px" color="rgba(9, 5, 132, 0.743)" />
                    </div>                  </div>
                  <p>{errors.password?.message}</p>
                  <div className="part-input">

                    <div> <input
                      placeholder="Tagname..."
                      {...register("tagname")}
                    /></div>
                    <div className="react">                    <FaUserTag size="34px" color="rgba(9, 5, 132, 0.743)" />
                    </div>                  </div>
                  <p>{errors.tagname?.message}</p>
                </div>
                <div className="checkbox">
                  <input type="checkbox" />
                  Remember me?
                </div>

                <div className="btn">

                  <div> <button type="submit">Register
                  </button>
                  </div>
                  <div>
                    <NavLink to="/">
                      <button>Sign in</button>
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="side-text-form">
                <div className="text-wrap">
                  <span><h1> WELCOME</h1></span>

                  <h1> To </h1>
                  <h1>  HIPHONIC APP</h1>
                
                  <div className="double"> <FaCheckDouble size="80px" color="white"/></div>

                  
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
