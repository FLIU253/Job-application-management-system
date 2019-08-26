import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {getAppliedTo, addAppliedTo} from '../../redux/actions/appliedTo';
import SubCard from './sub-card.component';
import PropTypes from 'prop-types';
import {useDrop} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import validator from 'validator';
import AddForm from '../add-form.component';
import {PacmanLoader} from 'react-spinners';

const Card = styled.div`
    background:rgba(222, 225, 227, 0.9);
    border-radius: 3px;
    margin: 1em 1em;
    color:#4C4E50;
    display: block;
    width: 300px;
`;

const CardWrapper = styled.div`
    margin: 10px;
`;

const AddCard = styled.div`
    display: block;
    margin-top: 0.75em;
    padding: 0.5em 0.75em;
    color: #797a7c;
    border-radius: 0 0 3px 3px;
    cursor: pointer;
    :hover{
        background:#ccbcbc;
        color: black;
    }
`;
const AppliedTo = ({title, getAppliedTo, appliedTo:{loading, appliedToList: {appliedTo}}, addAppliedTo}) => {

        const [{ canDrop, isOver }, drop] = useDrop({
            accept: ItemTypes.SubCard,
            drop: () => ({ name: 'AppliedTo' }),
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
            getAppliedTo();
        }, [getAppliedTo])

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
                alert("please enter a valid url")
            }else{
                const appliedDate = date; 
                addAppliedTo({companyName, jobTitle, applicationUrl, location, appliedDate});
                getAppliedTo();
                setNewCard(false);
            }
        }

        const isActive = canDrop && isOver
        let backgroundColor = '#DEE1E3';
        if(isActive){
            backgroundColor = '#d1a8a5';
        }
        
        return(
            <Card  ref = {drop} style = {{backgroundColor}}>
            <h3>{title}</h3>
            {loading ? <PacmanLoader color = {'#123abc'}/> : 
                 <div>
                 {appliedTo.length > 0 ? (
                     appliedTo.map(item => 
                     <SubCard key = {item._id} data = {item} uri = 'appliedTo'/>
                     )
                 ) : null}
                 </div>
             }
             
            {newCard ? (
                 <CardWrapper>
                     <AddForm submitForm = {e => onSubmit(e)} cancelForm = {e => onCancelClick(e)}
                     handleChange = {e => onChange(e)} companyName = {companyName} jobTitle = {jobTitle}
                     applicationUrl = {applicationUrl} location = {location} date = {date} dateText = 'applied date: '
                     />
             </CardWrapper>
             ) :  <AddCard onClick = {e => onAddNewCardClick(e)}>Add a new card ...</AddCard>}
           </Card>
        );
}

AppliedTo.propTypes = {
    getAppliedTo: PropTypes.func.isRequired,
    appliedTo: PropTypes.object.isRequired,
    addAppliedTo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    appliedTo: state.appliedTo
})

export default connect(mapStateToProps, {getAppliedTo, addAppliedTo})(AppliedTo);