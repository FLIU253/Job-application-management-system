import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getInterview, addInterview} from '../../redux/actions/interview';
import SubCard from './sub-card.component';
import {useDrop} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import validator from 'validator';
import AddForm from '../add-form.component';
import {HashLoader} from 'react-spinners';
import {Card,CardWrapper, AddCard} from '../../styles/card.styles';

const Interview = ({getInterview, title, addInterview, interview: {loading, interviewList: {interview}}}) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.SubCard,
        drop: () => ({ name: 'Interview' }),
        collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        }),
    })

    const [newCard, setNewCard] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        applicationUrl: '',
        location: '',
        date: ''
    });

    const {companyName, jobTitle, applicationUrl, location, date} = formData;

    useEffect(() => {
        getInterview();
    }, [getInterview])

    const onAddNewCardClick = e => {
        setNewCard(true);
    }
    const onCancelClick = e=> {
        setNewCard(false);
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
            setNewCard(false);
            const interviewDate = date;
            addInterview({companyName, jobTitle, applicationUrl, location, interviewDate});
            getInterview();
        }
    }

    const isActive = canDrop && isOver
    let backgroundColor = '#DEE1E3';
    if(isActive){
        backgroundColor = '#73f55f';
    }

    return(
        <Card ref = {drop} style = {{backgroundColor}}>
        <h3>{title}</h3>
        {loading ? <HashLoader color = {'#123abc'}/> : 
             <div>
             {interview.length > 0 ? (
                 interview.map(item => 
                 <SubCard key = {item._id} data = {item} uri = 'interview'/>
                 )
             ) : null}
             </div>
         }
        {newCard ? (
             <CardWrapper>
            <AddForm submitForm = {e => onSubmit(e)} cancelForm = {e => onCancelClick(e)}
                     handleChange = {e => onChange(e)} companyName = {companyName} jobTitle = {jobTitle}
                     applicationUrl = {applicationUrl} location = {location} date = {date} dateText = 'interview date: '
                />
         </CardWrapper>
         ) :  <AddCard onClick = {e => onAddNewCardClick(e)}>Add a new card ...</AddCard>}
       </Card>
    );

}
Interview.propTypes = {
    getInterview: PropTypes.func.isRequired,
    interview: PropTypes.object.isRequired,
    addInterview: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    interview: state.interview
});

export default connect(mapStateToProps, {getInterview, addInterview})(Interview);