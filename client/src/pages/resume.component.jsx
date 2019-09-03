import React, {useState, useEffect} from 'react';
import {CenteredDiv} from '../styles/frontpage.styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addResume, getResumeInFile, getResumeInJson, deleteResume} from '../redux/actions/resume';
import FileSaver from 'file-saver';
import {SignInButton} from '../styles/button.styles';
import Header from '../components/header.component';

const Upload = styled.input`
    color: white;
`;

const OnlineView = styled.a`
    color: white;
    font-weight: 500;
    font-size: 30px;
    :hover{
        color: yellow;
    }
`;



const ResumePage = ({addResume, getResumeInFile, currentResume, getResumeInJson, deleteResume}) => {

    const [resume, setResume] = useState({});
    
    useEffect(() => {
        getResumeInFile();
        getResumeInJson();
    }, [getResumeInFile, getResumeInJson])

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
    
    const onDeleteClick = () => {
        let id = currentResume.resumeInJson._id;
        deleteResume(id);
    }

    return(
      <div>
        <Header/>
        <CenteredDiv style = {{color: '#fff'}}>
         {Object.entries(currentResume.resume).length === 0 && currentResume.resume.constructor === Object ? (
                <div>
                 <h1>Upload Resume</h1>
                 <Upload type="file" name="file" id="file" onChange = {event => onChangeHandler(event)} accept="application/pdf, application/docx, application/doc" />
                 <br/>
                 <SignInButton onClick = {() => onClickhandler()}>Upload</SignInButton>
             </div>
         ) :
            <div  style = {{marginTop: '20px'}}>
             <OnlineView href={currentResume.resume}>View Online Here</OnlineView>
             <br/>
             <SignInButton onClick = {() => onDownloadClick()} style = {{marginRight: '5px'}}>Download Resume Here!</SignInButton>
             <SignInButton onClick = {() => onDeleteClick()} style = {{marginLeft: '5px'}}>DELETE</SignInButton>
             <br/>
             <embed src={currentResume.resume} style = {{height: '700px', width: '800px'}}></embed>
            </div>
            }
        </CenteredDiv>
      </div>
    );
}

ResumePage.propTypes = {
    addResume: PropTypes.func.isRequired,
    getResumeInFile: PropTypes.func.isRequired,
    getResumeInJson: PropTypes.func.isRequired,
    deleteResume: PropTypes.func.isRequired,
    currentResume: PropTypes.object
  };
  
const mapStateToProps = state => ({
    currentResume: state.resume
})

export default connect(mapStateToProps, {addResume, getResumeInFile, getResumeInJson, deleteResume})(ResumePage);