import React from 'react';
import styled from 'styled-components';


const Cancel = styled.span`
    cursor: pointer;
`;

const AddForm = ({submitForm, cancelForm, handleChange, companyName, jobTitle, applicationUrl, location, date, rejected, dateText}) => {
  return(
    <form onSubmit = {submitForm}>
    <p>Company Name:</p> <input type="text"  name =  "companyName"  value = {companyName} onChange = {handleChange} required/>
    <p>Position Name:</p> <input type="text" name =  "jobTitle" value = {jobTitle} onChange = {handleChange} required/>
    <p>Application Link:</p> <input type="text" name =  "applicationUrl" value = {applicationUrl} onChange = {handleChange} />
    <p>Location:</p> <input type="text"  name =  "location" value = {location} onChange = {handleChange}/>
    {
        !rejected ? (<div><p>{dateText}</p> <input type="date" name =  "date" value = {date} onChange = {handleChange} /></div>) : null
    }
    <br/>
    <button>Add</button>
    <span> or </span>
    <Cancel onClick = { cancelForm}> Cancel </Cancel>
   </form>
  );
}

export default AddForm;