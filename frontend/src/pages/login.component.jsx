import React from 'react';
import styled from 'styled-components';
import FormInput from '../components/form-input.component';

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
`;

const SignInButton = styled.button`
  transition: all 0.15s ease-out 0s;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  width: 250px;
  padding: 1em;
  font-size: 1.1em;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
  :hover{
    background: #fff;
    color: #89609E;
  }
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
      <div style = {{margin: '0.5em 0'}}>
      <FormInput type="email" required name="email"/>
      </div>
      <div style = {{margin: '0.5em 0'}}> 
      <FormInput type="password" required name = "password"/>
      </div>
      <SignInButton>Login</SignInButton>
      <CreateAccLink href="/">Create new account</CreateAccLink>
  </Login>
);

export default LoginPage;