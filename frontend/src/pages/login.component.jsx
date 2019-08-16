import React from 'react';
import styled from 'styled-components';

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
`;
const InputSection = styled.input`
  border-radius: 3px;
  box-shadow: none;
  border: 0px none;
  width: 325px;
  padding: 1em 1em;
  font-size: 1.1em;
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
`;
const LoginPage = () => (
  <Login>
      <div style = {{margin: '0.5em 0'}}>
      <InputSection type="email" required/>
      </div>
      <div style = {{margin: '0.5em 0'}}> 
      <InputSection type="password" required/>
      </div>
      <SignInButton>Login</SignInButton>
      <a href="/">Create new account</a>
  </Login>
);

export default LoginPage;