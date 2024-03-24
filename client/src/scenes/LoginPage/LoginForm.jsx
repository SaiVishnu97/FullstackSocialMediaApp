import React from 'react';
import { useFormik } from 'formik';
import './Form.css'; // Importing the CSS file for styling
import { validateSchemaLogin } from './YupValidation.js';
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from 'state';

const initialValues = {
  email: '',
  password: '',
  navigate:null
};


const errorText=(formik,inputfield)=>{

    const errormsg=[]
    if(formik.touched[inputfield]&&formik.errors[inputfield])
    errormsg.push(<p style={{color:'red'}}>{formik.errors[inputfield]}</p>)
    return errormsg;
}
const Form = ({setPageLogin}) => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
    const onSubmit = async (values, actions) => {
      try {
        const formData = {
          email:values.email,
          password:values.password
        }
        
        
        console.log(formData);
        const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        actions.resetForm();
        dispatch(setLogin({user:response.data.user,token:response.data.token}));
        if(response)
          navigate('/home');
      } catch (error) {
        if (error.response) {
          const errorsFromServer = error.response.data;
          
          // Loop through the errors and set them in formik.errors
          Object.keys(errorsFromServer).forEach(field => {
            actions.setFieldError(field, errorsFromServer[field]);
          });
          console.log(errorsFromServer);
        } else {
          console.error('Error:', error);
          alert('Login failed. Please try again.');
        }
      }
    };
    const formik = useFormik({
      initialValues,
      validationSchema:validateSchemaLogin,
      onSubmit,
    });
    return (
      <div className="container-fluid vh-100 bg-light">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5">
                <p className="text-center h1 fw-bold">Login</p>
  
                <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                {formik.errors.errormessage&&<p style={{color:'red'}}>{formik.errors.errormessage} </p>}
                  <div className="mb-4">
                    <input className="form-control" id="email" type="email" value={formik.values.email} name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {errorText(formik,'email')}
                    <label className={formik.values.email ? "active" : ""} htmlFor="email">Your Email</label>
                  </div>
  
                  <div className="mb-4">
                    <input className="form-control" id="password" type="password" value={formik.values.password} name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {errorText(formik,'password')}
                    <label className={formik.values.password ? "active" : ""} htmlFor="password">Password</label>
                  </div>
                  <input type='hidden' name='navigate' value={navigate} />

                  <div className="d-flex justify-content-center mb-4">
                    <button type='submit' className="btn btn-primary">Login</button>
                  </div>
                  <small>Didn't have an account click here for </small>
                  <a style={{color:'blue',fontSize:'large', textDecoration:'underline'}} onClick={()=>setPageLogin(false)}>SignUp</a>
                </form>
          
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Form;
  