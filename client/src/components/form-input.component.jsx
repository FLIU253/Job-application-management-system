import React from 'react';
import {InputSection} from '../styles/input.styles';

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div>
        <InputSection onChange = {handleChange} {...otherProps}/>
        {
            label ? <label>{label}</label> : null
        }
    </div>
)

export default FormInput;