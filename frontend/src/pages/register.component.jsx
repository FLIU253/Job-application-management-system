import React from 'react';
import FormInput from '../components/form-input.component';
import styled from 'styled-components';
import CustomButton from '../components/custom-button.component';

const Register = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
`;

const Signin = styled.a`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  :hover{
    color: #fff;
  }
`;

const RegisterPage = () => {

    return(
        <Register>
            <h1 style = {{color: '#fff'}}>JAMS</h1>
            <FormInput type = "text"  placeholder = "name" required/>
            <FormInput type = "email" placeholder = "email" required/>
            <FormInput type = "password" placeholder = "password" required/>
            <FormInput type = "password" placeholder = "password" required/>
            <CustomButton>Register</CustomButton>
            <Signin href="/">Sign In</Signin>
        </Register>
    );
}

export default RegisterPage;