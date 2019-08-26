import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getToApply, addToApply} from '../../redux/actions/toApply';
import SubCard from './sub-card.component';
import {useDrop} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import validator from 'validator';
import AddForm from '../add-form.component';
import {PulseLoader} from 'react-spinners';
import {Card,CardWrapper, AddCard} from '../../styles/card.styles';

const ToApply = ({title, getToApply, addToApply,toApply:{loading, toApplyList: {toApply}}}) => {
    
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.SubCard,
        drop: () => ({ name: 'ToApply' }),
        collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        }),
    })

    const[newCard, setNewCard] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        applicationUrl: '',
        location: '',
        date: ''
    });

    const {companyName, jobTitle, applicationUrl, location, date} = formData;

    useEffect(() => {
        getToApply();
    }, [getToApply])

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
            const deadlineDate = date
            addToApply({companyName, jobTitle, applicationUrl, location, deadlineDate});
            getToApply();
        }
    }

    const isActive = canDrop && isOver
    let backgroundColor = '#DEE1E3';
    if(isActive){
        backgroundColor = '#d1a8a5';
    }
    return(
        <Card ref = {drop} style = {{backgroundColor}}>
       <h3>{title}</h3>
        {loading ? <PulseLoader color = {'#123abc'}/> : 
            <div>
            {toApply.length > 0 ? (
                toApply.map(item => 
                <SubCard key = {item._id} data = {item} uri = 'toApply'/>
                )
            ) : null}
            </div>
        }
        {newCard ? (
            <CardWrapper>
          <AddForm submitForm = {e => onSubmit(e)} cancelForm = {e => onCancelClick(e)}
                     handleChange = {e => onChange(e)} companyName = {companyName} jobTitle = {jobTitle}
                     applicationUrl = {applicationUrl} location = {location} date = {date} dateText = 'Apply deadline date: '
                />
            </CardWrapper>
            ) :  <AddCard onClick = {e => onAddNewCardClick(e)}>Add a new card ...</AddCard>}
          </Card>
    );

}
ToApply.propTypes = {
    getToApply: PropTypes.func.isRequired,
    toApply: PropTypes.object.isRequired,
    addToApply: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    toApply: state.toApply
})

export default connect(mapStateToProps, {getToApply, addToApply})(ToApply);