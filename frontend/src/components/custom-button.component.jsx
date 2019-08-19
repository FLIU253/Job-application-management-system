import React from 'react';
import styled from 'styled-components';

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

const CustomButton = ({children, ...otherProps}) => (
<SignInButton {...otherProps}>{children}</SignInButton>
);

export default CustomButton;