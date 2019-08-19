import React, {useState} from 'react';
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

    const {name, email, password, password2} = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      if(password !== password2){
        console.log('passwords do not match')
      }else{
        console.log(formData)
      }
    }
    return(
        <Register>
           <form onSubmit = {e => onSubmit(e)}>
           <h1 style = {{color: '#fff'}}>JAMS</h1>
            <FormInput type = "text"  placeholder = "name" name="name" value = {name} handleChange = {e => onChange(e)} required/>
            <FormInput type = "email" placeholder = "email" name="email" value = {email} handleChange = {e => onChange(e)} required/>
            <FormInput type = "password" placeholder = "password" name= "password" value = {password} handleChange = {e => onChange(e)} required/>
            <FormInput type = "password" placeholder = "password"  name= "password2" value = {password2} handleChange = {e => onChange(e)} required/>
            <CustomButton>Register</CustomButton>
           </form>
           <Signin href="/">Sign In</Signin>
        </Register>
    );
}

export default RegisterPage;