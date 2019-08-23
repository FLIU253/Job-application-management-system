import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOffered, addOffered} from '../../redux/actions/offered';
import SubCard from './sub-card.component';
import {useDrop} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import validator from 'validator';
import AddForm from '../add-form.component';

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

const Offered = ({title, getOffered, addOffered,offered: {loading, offeredList: {offered}} }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.SubCard,
        drop: () => ({ name: 'Offered' }),
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
        getOffered();
    }, [getOffered])

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
        if((!applicationUrl.includes('https://') && !applicationUrl.includes('http://') )|| !validator.isURL(applicationUrl))
        {
            alert("please enter a valid url");
        }else{
            setNewCard(false);
            const offerDeadlineDate = date;
            addOffered({companyName, jobTitle, applicationUrl, location, offerDeadlineDate});
            getOffered();
        }
    }

    const isActive = canDrop && isOver
    let backgroundColor = '#DEE1E3';
    if(isActive){
        backgroundColor = '#d1a8a5';
    }

    return(
        <Card ref= {drop} style = {{backgroundColor}}> 
       <h3>{title}</h3>
       {loading ? <h1>LOADING</h1> : 
            <div>
            {offered.length > 0 ? (
                offered.map(item => 
                <SubCard key = {item._id} data = {item} uri = 'offered'/>
                )
            ) : null}
            </div>
        }
       {newCard ? (
            <CardWrapper>
              <AddForm submitForm = {e => onSubmit(e)} cancelForm = {e => onCancelClick(e)}
                     handleChange = {e => onChange(e)} companyName = {companyName} jobTitle = {jobTitle}
                     applicationUrl = {applicationUrl} location = {location} date = {date} dateText = 'Offer deadline date: '
                />
        </CardWrapper>
        ) :  <AddCard onClick = {e => onAddNewCardClick(e)}>Add a new card ...</AddCard>}
      </Card>
    );

}

Offered.propTypes = {
    getOffered: PropTypes.func.isRequired,
    offered: PropTypes.object.isRequired,
    addOffered: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    offered: state.offered
});

export default connect(mapStateToProps, {getOffered, addOffered})(Offered);