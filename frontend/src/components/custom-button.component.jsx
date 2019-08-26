import React from 'react';
import {SignInButton} from '../styles/button.styles';

const CustomButton = ({children, ...otherProps}) => (
<SignInButton {...otherProps}>{children}</SignInButton>
);

export default CustomButton;