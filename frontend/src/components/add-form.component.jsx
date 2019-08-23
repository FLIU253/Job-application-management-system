import React from 'react';
import styled from 'styled-components';


const Cancel = styled.button`
    cursor: pointer;
    background-image: linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f);  
    box-shadow: 0 5px 15px rgba(242, 97, 103, .4);
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    border: none;
    border-radius: 50px;
    width: 75px;
    height: 25px;
`;
const Input = styled.input`
  border-radius: 60px;
  box-shadow: none;
  border: 0px none;
  padding: 0.5em 0.5em;
  margin-bottom: 20px;

`;
const InputText = styled.p`
  font: bold;
  color: #0546ad;
`;

const Add = styled.button`
  text-align: center;
  background-image: linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376);
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  width: 75px;
  height: 25px;
`;

const AddForm = ({submitForm, cancelForm, handleChange, companyName, jobTitle, applicationUrl, location, date, rejected, dateText}) => {
  return(
    <form onSubmit = {submitForm}>
    <InputText>Company Name:</InputText> <Input type="text"  name =  "companyName"  value = {companyName} onChange = {handleChange} required/>
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