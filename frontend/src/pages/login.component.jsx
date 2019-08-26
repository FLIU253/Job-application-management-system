import React , {useState}from 'react';
import FormInput from '../components/form-input.component';
import CustomButton from '../components/custom-button.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../redux/actions/auth';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {CenteredDiv} from '../styles/frontpage.styles';
import Alert from '../components/alert.component';
import logoImg from '../assets/logo.jpg';

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
    <CenteredDiv>
    <form onSubmit = {e => onSubmit(e)}>
    <Alert/>
    <img src={logoImg} alt={"logo"}/>
        <div>
        <FormInput type="email" required name="email" placeholder = "email" value = {email}  handleChange = {e => onChange(e)}/>
        </div>
        <div> 
        <FormInput type="password" required name = "password" placeholder = "password" value = {password}  handleChange = {e => onChange(e)}/>
        </div>
        <CustomButton>login</CustomButton>
    </form>
      <Link to="/register" className = "link-to">Create new account</Link>
  </CenteredDiv>
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