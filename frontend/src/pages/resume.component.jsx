import React, {useState, useEffect} from 'react';
import {CenteredDiv} from '../styles/frontpage.styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addResume, getResumeInFile} from '../redux/actions/resume';
import FileSaver from 'file-saver';

const Upload = styled.input`
    color: white;
`;

const ResumePage = ({addResume, getResumeInFile, currentResume}) => {

    const [resume, setResume] = useState({});

    
    useEffect(() => {
        getResumeInFile();
    }, [getResumeInFile])

    const onChangeHandler=event=>{
        setResume(event.target.files[0]);
    
    }

    const onClickhandler = () => {
        let formData = new FormData();
        formData.append('resume', resume);
        addResume(formData);
        console.log(formData);
    }
    const onDownloadClick = () => {
        FileSaver.saveAs(currentResume.resume, 'resume.pdf');
    }
    
    return(
        <CenteredDiv style = {{color: '#fff'}}>
            <h1>Upload Resume</h1>
            <Upload type="file" name="file" id="file" onChange = {event => onChangeHandler(event)}/>
            <label htmlFor="file">Choose a file</label>
            <button onClick = {() => onClickhandler()}>Upload</button>
            {!currentResume.loading ? (
               <div>
                <a href={currentResume.resume}>Url</a>
                <button onClick = {() => onDownloadClick()}>Download Resume Here!</button>
               </div>
            ) : null}
        </CenteredDiv>
    );
}

ResumePage.propTypes = {
    addResume: PropTypes.func.isRequired,
    getResumeInFile: PropTypes.func.isRequired,
    currentResume: PropTypes.object
  };
  
const mapStateToProps = state => ({
    currentResume: state.resume
})

export default connect(mapStateToProps, {addResume, getResumeInFile})(ResumePage);