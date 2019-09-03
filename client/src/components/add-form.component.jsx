import React from 'react';
import styled from 'styled-components';
import {Cancel, Add} from '../styles/button.styles';
import {Input} from '../styles/input.styles';

const InputText = styled.p`
  font: bold;
  color: #0546ad;
`;

const AddForm = ({submitForm, cancelForm, handleChange, companyName, jobTitle, applicationUrl, location, date, rejected, dateText}) => {
  return(
    <form onSubmit = {submitForm}>
    <InputText>Company Name:</InputText> <Input type="text"  name =  "companyName"  value = {companyName} onChange = {handleChange}  required/>
    <InputText>Position Name:</InputText> <Input type="text" name =  "jobTitle" value = {jobTitle} onChange = {handleChange} required/>
    <InputText>Application Link:</InputText> <Input type="text" name =  "applicationUrl" value = {applicationUrl} onChange = {handleChange} />
    <InputText>Location:</InputText> <Input type="text"  name =  "location" value = {location} onChange = {handleChange}/>
    {
        !rejected ? (<div><InputText>{dateText}</InputText> <Input type="date" name =  "date" value = {date} onChange = {handleChange} /></div>) : null
    }
    <br/>
    <Add>Add</Add>
    <span> or </span>
    <Cancel onClick = { cancelForm}> Cancel </Cancel>
   </form>
  );
}

export default AddForm;