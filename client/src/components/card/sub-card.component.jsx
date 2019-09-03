import React , {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {deleteToApply, addToApply, getToApply, editItem} from '../../redux/actions/toApply';
import {useDrag} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import { addRejected, getRejected } from '../../redux/actions/rejected';
import { addInterview, getInterview } from '../../redux/actions/interview';
import { addOffered, getOffered } from '../../redux/actions/offered';
import { addAppliedTo, getAppliedTo } from '../../redux/actions/appliedTo';
import AddForm from '../add-form.component';
import validator from 'validator';


const Card = styled.div`
    background: #fff;
    padding: 0.5em;
    border-radius: 3px;
    border-bottom: 1px solid #bdc3c7;
    margin: 1em;
`;

const CardText = styled.p`
    margin: 0;
    font-weight: 500;
`;

const SubCard = ({data, uri, deleteToApply, addRejected, addInterview, addOffered, addToApply, addAppliedTo,
    getRejected, getAppliedTo, getInterview, getOffered, getToApply, editItem}) => {

    const [{isDragging}, drag] = useDrag({
        item: {data, type: ItemTypes.SubCard},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if(item && dropResult){
                console.log(dropResult);
                console.log(item);
                const {companyName, jobTitle, applicationUrl, location} = item.data;
                
               switch(dropResult.name){
                   case 'Rejected':
                       if(uri === dropResult.name.toLowerCase()) break;
                        addRejected({companyName, jobTitle, applicationUrl, location});
                        getRejected();
                       setTimeout(() => {
                        deleteToApply(data._id, uri);
                        setRefresh(!refresh);
                       }, 500)
                        break;
                    case 'Interview':
                        if(uri === dropResult.name.toLowerCase())break;
                        addInterview({companyName, jobTitle, applicationUrl, location});
                        getInterview();
                        setTimeout(() => {
                            deleteToApply(data._id, uri);
                            setRefresh(!refresh);
                           }, 500)
                        break;
                    case 'Offered':
                        if(uri === dropResult.name.toLowerCase()) break;
                        addOffered({companyName, jobTitle, applicationUrl, location});
                        getOffered();
                        setTimeout(() => {
                            deleteToApply(data._id, uri);
                            setRefresh(!refresh);
                           }, 500)
                        break;
                    case 'AppliedTo':
                        if(uri.toLowerCase() === dropResult.name.toLowerCase()) break;
                        addAppliedTo({companyName, jobTitle, applicationUrl, location});
                        getAppliedTo();
                        setTimeout(() => {
                            deleteToApply(data._id, uri);
                            setRefresh(!refresh);
                           }, 500)
                        break;
                    case 'ToApply':
                      if(uri.toLowerCase() === dropResult.name.toLowerCase()) break;
                        addToApply({companyName, jobTitle, applicationUrl, location});
                        getToApply();
                        setTimeout(() => {
                            deleteToApply(data._id, uri);
                            setRefresh(!refresh);
                           }, 500)
                        break;
                    default:
                        break;
               }

            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [refresh, setRefresh] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        applicationUrl: '',
        location: '',
        date: ''
    });
    const {companyName, jobTitle, applicationUrl, location, date} = formData;

    const deleteItem = e => {
        e.preventDefault();
        deleteToApply(data._id, uri);
        setRefresh(!refresh);
        
    }

    const onEditClicked = e => {
        e.preventDefault();
        setEdit(true);
    }
    
    const onCancelClick = e=> {
        setEdit(false);
    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        if(((!applicationUrl.includes('https://') && !applicationUrl.includes('http://') )|| !validator.isURL(applicationUrl)) && applicationUrl !== '')
        {
            alert("please enter a valid url");
        }else{
            setEdit(false);
            switch(uri){
                case 'toApply':
                    const deadlineDate = date;
                    editItem(data._id, uri, JSON.stringify({companyName, jobTitle, applicationUrl, location, deadlineDate}));
                    getToApply();
                    break;
                case 'appliedTo':
                    const appliedDate = date;
                    editItem(data._id, uri, JSON.stringify({companyName, jobTitle, applicationUrl, location, appliedDate}));
                    getAppliedTo();
                    break;
                case 'interview':
                    const interviewDate = date;
                    editItem(data._id, uri, JSON.stringify({companyName, jobTitle, applicationUrl, location, interviewDate}));
                    getInterview();
                    break;
                case 'offered':
                    const offerDeadlineDate = date;
                    editItem(data._id, uri, JSON.stringify({companyName, jobTitle, applicationUrl, location, offerDeadlineDate}));
                    getOffered();
                    break;
                case 'rejected':
                        editItem(data._id, uri, JSON.stringify({companyName, jobTitle, applicationUrl, location}));
                        getRejected();
                         break;
                default:
                    break;
            }
        }
    }

    const opacity = isDragging ? 0.1 : 1

    return(
        !refresh ? (
            !edit ? (
                <Card ref = {drag} style = {{opacity}}>
                <CardText> <b>Company: </b>{data.companyName}</CardText>
                <CardText> <b>Job Title: </b>{data.jobTitle}</CardText>
                {data.location ? (  <CardText><b>Location: </b>{data.location}</CardText>) : null}
                {data.deadlineDate ? (<CardText><b>Deadline Date: </b>{data.deadlineDate.substring(0,10)}</CardText> ): null}
                {data.appliedDate ? (<CardText><b>Applied Date: </b>{data.appliedDate.substring(0,10)}</CardText>) : null}
                {data.interviewDate ? (<CardText><b>Interview Date: </b>{data.interviewDate.substring(0,10)}</CardText>) : null}
                {data.offerDeadlineDate ? (<CardText><b>Offer Deadline Date: </b>{data.offerDeadlineDate.substring(0,10)}</CardText>) : null}
                {data.applicationUrl ? (<CardText><b>Application URL: </b><a href={data.applicationUrl} target="_blank" rel="noopener noreferrer">{data.applicationUrl} </a></CardText>) : null}
                <i className ="fas fa-edit" onClick = {e => onEditClicked(e)}></i>
                <i className ="fas fa-trash-alt" onClick ={e => deleteItem(e)} ></i>
            </Card>
            ) : (
                <Card style = {{backgroundColor : '#6dd44e'}}>
                    {uri.toLowerCase() === 'rejected'?(
                        <AddForm rejected = {true} cancelForm = {e => onCancelClick(e)}
                        handleChange = {e => onChange(e)}  companyName = {companyName} jobTitle = {jobTitle}
                        applicationUrl = {applicationUrl} location = {location} date = {date} submitForm = {e => onSubmit(e)}/>

                    ) : <AddForm rejected = {false} dateText = {uri + ' date'} cancelForm = {e => onCancelClick(e)}
                    handleChange = {e => onChange(e)} companyName = {companyName} jobTitle = {jobTitle}
                    applicationUrl = {applicationUrl} location = {location} date = {date} submitForm = {e => onSubmit(e)}/> }
                </Card >
            )
        ) : (null)
    );
}

SubCard.propTypes = {
    data: PropTypes.object.isRequired,
    uri: PropTypes.string,
    deleteToApply: PropTypes.func.isRequired,
    getRejected: PropTypes.func,
    getAppliedTo: PropTypes.func,
    getInterview: PropTypes.func,
    getOffered: PropTypes.func,
    getToApply: PropTypes.func,
    addRejected: PropTypes.func,
    addInterview: PropTypes.func,
    addOffered: PropTypes.func,
    addAppliedTo: PropTypes.func,
    addToApply: PropTypes.func,
    editItem: PropTypes.func
}

export default connect(null, {deleteToApply, addRejected, addInterview, addOffered, addToApply, addAppliedTo,
     getRejected, getAppliedTo, getInterview, getOffered, getToApply, editItem})(SubCard);