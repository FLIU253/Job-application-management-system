import React , {useState}from 'react';
import styled from 'styled-components';
import FormInput from '../components/form-input.component';
import CustomButton from '../components/custom-button.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../redux/actions/auth';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
`;
const LoginPage = ({login, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }

  //Redirect if logged in
  if(isAuthenticated){
    return <Redirect to ="/home"/>
  }

  return(
    <Login>
    <form onSubmit = {e => onSubmit(e)}>
    <h1 style = {{color: '#fff'}}>JAMS</h1>
        <div>
        <FormInput type="email" required name="email" placeholder = "email" value = {email}  handleChange = {e => onChange(e)}/>
        </div>
        <div> 
        <FormInput type="password" required name = "password" placeholder = "password" value = {password}  handleChange = {e => onChange(e)}/>
        </div>
        <CustomButton>Login</CustomButton>
    </form>
      <Link to="/register" className = "link-to">Create new account</Link>
  </Login>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(LoginPage);