import React from 'react';
import { useFormik } from 'formik';
import './Form.css'; // Importing the CSS file for styling
import { validateSchemaRegister } from './YupValidation.js';
import axios from 'axios';

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmpassword: '',
  profileimage: null
};


const errorText=(formik,inputfield)=>{

    const errormsg=[]
    if(formik.touched[inputfield]&&formik.errors[inputfield])
    errormsg.push(<p style={{color:'red'}}>{formik.errors[inputfield]}</p>)
    return errormsg;
}

const Form = ({setPageLogin}) => {
  const onSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('firstname', values.firstname);
      formData.append('lastname', values.lastname);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('confirmpassword', values.confirmpassword);
      formData.append('picture', values.profileimage);
      
      console.log(formData);
      const response=await axios.post('http://localhost:3001/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      actions.resetForm();
  
      alert('Registration successful!');
      if(response)
        setPageLogin(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema:validateSchemaRegister,
    onSubmit,
  });
  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 col-xl-5">
          <div className="card shadow-2-strong">
            <div className="card-body p-5">
              <p className="text-center h1 fw-bold">Sign up</p>

              <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
              {formik.values.profileimage && (
                    <img
                      src={URL.createObjectURL(formik.values.profileimage)}
                      alt="Profile"
                      className="preview-image"
                    />
                  )}
                  <input
                    type="file"
                    id="profileimage"
                    name="profileimage"
                    accept="image/*"
                    className="form-control"
                    onChange={(event) => formik.setFieldValue("profileimage", event.currentTarget.files[0])}
                  />
                  <label htmlFor="profileimage">Profile Image</label>
                  
                </div>
              <div className="row mb-4">
                  <div className="col">
                    <input className="form-control" id="firstName" type="text" value={formik.values.firstname} name='firstname' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {errorText(formik,'firstname')}
                    <label className={formik.values.firstname ? "active" : ""} htmlFor="firstName">First Name</label>
                  </div>
                  <div className="col">
                    <input className="form-control" id="lastName" type="text" value={formik.values.lastname} name='lastname' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {errorText(formik,'lastname')}
                    <label className={formik.values.lastname ? "active" : ""} htmlFor="lastName">Last Name</label>
                  </div>
                </div>

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

                <div className="mb-4">
                  <input className="form-control" id="repeatPassword" type="password" value={formik.values.confirmpassword} name='confirmpassword' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                  {errorText(formik,'confirmpassword')}

                  <label className={formik.values.confirmpassword ? "active" : ""} htmlFor="repeatPassword">Repeat Password</label>
                </div>
               
                <div className="form-check d-flex justify-content-center mb-4">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    I agree all statements in <a href="#!">Terms of service</a>
                  </label>
                </div>

                <div className="d-flex justify-content-center mb-4">
                  <button type='submit' className="btn btn-primary">Register</button>
                </div>
                <small>Already have an account click here for <a style={{color:'blue',fontSize:'large',textDecoration:'underline'}} onClick={()=>setPageLogin(true)}>Login</a>
</small>

              </form>
        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
