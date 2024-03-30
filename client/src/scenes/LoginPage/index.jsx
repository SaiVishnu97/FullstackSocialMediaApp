import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm'
import './Form.css'
const LoginPage = () => {

  const [isLogin,setPageLogin]=React.useState(true)
  return (
    <div>
     {isLogin&&<LoginForm setPageLogin={setPageLogin}/>}
     {!isLogin&&<RegisterForm setPageLogin={setPageLogin}/>}
    </div>
  );
};

export default LoginPage;
