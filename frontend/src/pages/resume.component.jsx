import React, {useState} from 'react';
import {CenteredDiv} from '../styles/frontpage.styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addResume} from '../redux/actions/resume';

const Upload = styled.input`
    color: white;
`;

const ResumePage = ({addResume}) => {

    const [resume, setResume] = useState({});


    const onChangeHandler=event=>{
        setResume(event.target.files[0]);
    
    }

    const onClickhandler = () => {
        let formData = new FormData();
        formData.append('resume', resume);
        addResume(formData);
        console.log(formData);
    }
    
    return(
        <CenteredDiv style = {{color: '#fff'}}>
            <h1>Upload Resume</h1>
            <Upload type="file" name="file" id="file" onChange = {event => onChangeHandler(event)}/>
            <label htmlFor="file">Choose a file</label>
            <button onClick = {() => onClickhandler()}>Upload</button>
        </CenteredDiv>
    );
}

ResumePage.propTypes = {
    addResume: PropTypes.func.isRequired,
  };
  


export default connect(null, {addResume})(ResumePage);