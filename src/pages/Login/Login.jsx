
import React from 'react';
import './Login.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationUser, getAuthenticateError, getAuthenticateStatus, selectLogin } from './AuthenticationSlice';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdLockPerson } from "react-icons/md";
import { MdOutlineMarkunread } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { PuffLoader } from 'react-spinners';

const Login = () => {
  const dispatch = useDispatch();
  const authentication = useSelector(selectLogin);
  const status = useSelector(getAuthenticateStatus);
  const error = useSelector(getAuthenticateError);
  const navigate = useNavigate();


  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const onSubmit = async (data) => {
    try {
      const response = await dispatch(authenticationUser(data));
      const token = response.payload.token;
      const user_id = response.payload.user["user_id"]
      console.log(token, user_id)


      if (token && user_id) {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id)

        navigate('/profile');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <>
      <div>
        {status === 'loading' &&
          (<div className="status-loader">
            <div className='status-loader-content'>
              <PuffLoader loading={true} size={150} />
              <p>Please wait .........</p>
            </div>
          </div>)
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-wrap">
            <div className="form-lholder">
              <div className="inputs-holder">
                <div className='input-holder' >
                  <input
                    placeholder="Email..."
                    {...register('email')}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                  <div className="react">          <MdOutlineMarkunread size="34px" color="rgba(9, 5, 132, 0.743)" />
                  </div>
                </div>
                <p>{errors.email?.message}</p>
                <div className='input-holder'>
                  <input
                    type="password"
                    placeholder="Password.."
                    {...register('password')}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                  <div className="react">            <MdLockPerson size="34px" color="rgba(9, 5, 132, 0.743)" />
                  </div>            </div>
                <p>{errors.password?.message}</p>
              </div>
              <div className='btn'>
                <button type="submit">
                  Login
                  </button>
              </div>
          <div>    <h4>Good to see you again</h4></div>
              <div className="double">
                <div>  <FaCheckDouble size="80px" color="rgba(9, 5, 132, 0.743)" /></div></div>
            </div>
          </div>
        </form>

      </div></>

  );

}

export default Login;
