import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOffered, addOffered} from '../../redux/actions/offered';
import SubCard from './sub-card.component';
import {useDrop} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import validator from 'validator';
import AddForm from '../add-form.component';
import {RingLoader} from 'react-spinners';
import {Card,CardWrapper, AddCard} from '../../styles/card.styles';

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
        if(((!applicationUrl.includes('https://') && !applicationUrl.includes('http://') )|| !validator.isURL(applicationUrl)) && applicationUrl !== '')
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
       {loading ? <RingLoader color = {'#123abc'}/> : 
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