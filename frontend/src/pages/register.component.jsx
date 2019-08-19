import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormInput from '../components/form-input.component';
import styled from 'styled-components';
import CustomButton from '../components/custom-button.component';
import {register} from '../redux/actions/auth';
import {setAlert} from '../redux/actions/alert';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

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

const RegisterPage = ({register, setAlert, isAuthenticated }) => {

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
        setAlert('passwords do not match', 'danger');
      }else{
        console.log(formData);
        register({name, email, password});
      }
    }

    //Redirect if logged in
    if(isAuthenticated){
       return <Redirect to ="/home"/>
    }

    return(
        <Register>
           <form onSubmit = {e => onSubmit(e)}>
           <h1 style = {{color: '#fff'}}>JAMS</h1>
            <FormInput type = "text"  placeholder = "name" name="name" value = {name} handleChange = {e => onChange(e)} required/>
            <FormInput type = "email" placeholder = "email" name="email" value = {email} handleChange = {e => onChange(e)} required/>
            <FormInput type = "password" placeholder = "password" name= "password" value = {password} handleChange = {e => onChange(e)} minLength = '6' required/>
            <FormInput type = "password" placeholder = "password"  name= "password2" value = {password2} handleChange = {e => onChange(e)}  minLength = '6' required/>
            <CustomButton>Register</CustomButton>
           </form>
           <Signin href="/">Sign In</Signin>
        </Register>
    );
}

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, setAlert})(RegisterPage);