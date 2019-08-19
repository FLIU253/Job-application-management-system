import React from 'react';
import styled from 'styled-components';
import FormInput from '../components/form-input.component';
import CustomButton from '../components/custom-button.component';

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
`;

const CreateAccLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  :hover{
    color: #fff;
  }
`;
const LoginPage = () => (
  <Login>
      <h1 style = {{color: '#fff'}}>JAMS</h1>
      <div>
      <FormInput type="email" required name="email" placeholder = "email"/>
      </div>
      <div> 
      <FormInput type="password" required name = "password" placeholder = "password"/>
      </div>
      <CustomButton>Login</CustomButton>
      <CreateAccLink href="/">Create new account</CreateAccLink>
  </Login>
);

export default LoginPage;