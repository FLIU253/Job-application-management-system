import React from 'react';
import styled from 'styled-components';

const InputSection = styled.input`
  border-radius: 3px;
  box-shadow: none;
  border: 0px none;
  width: 325px;
  padding: 1em 1em;
  font-size: 1.1em;
  margin: 0.5em 0;
`;

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div>
        <InputSection onChange = {handleChange} {...otherProps}/>
        {
            label ? <label>{label}</label> : null
        }
    </div>
)

export default FormInput;