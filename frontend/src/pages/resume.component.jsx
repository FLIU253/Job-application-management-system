import React from 'react';
import {CenteredDiv} from '../styles/frontpage.styles';
import styled from 'styled-components';

const Upload = styled.input`
    color: white;
`;

const ResumePage = () => {

    const onChangeHandler=event=>{

        console.log(event.target.files[0])
    
    }

    return(
        <CenteredDiv style = {{color: '#fff'}}>
            <h1>Upload Resume</h1>
            <Upload type="file" name="file" id="file" onChange = {event => onChangeHandler(event)}/>
            <label htmlFor="file">Choose a file</label>
        </CenteredDiv>
    );
}

export default ResumePage;