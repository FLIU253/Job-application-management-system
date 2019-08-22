import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRejected, addRejected} from '../../redux/actions/rejected';
import SubCard from './sub-card.component';
import {useDrop} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';

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

const Cancel = styled.span`
    cursor: pointer;
`;

const Rejected = ({title, getRejected, addRejected,rejected: {loading, rejectedList: {rejected}} }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.SubCard,
        drop: () => ({ name: 'Rejected' }),
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
        location: ''
    });
    const {companyName, jobTitle, applicationUrl, location} = formData;

    useEffect(() => {
        getRejected();
    }, [])

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
        setNewCard(false);
        addRejected({companyName, jobTitle, applicationUrl, location});
        getRejected();
    }

    const isActive = canDrop && isOver
    let backgroundColor = '#DEE1E3';
    if(isActive){
        backgroundColor = '#d1a8a5';
    }

    return(
        <Card ref = {drop} style = {{backgroundColor}}>
       <h3>{title}</h3>
    {loading ? <h1>LOADING</h1> : 
        <div>
        {rejected.length > 0 ? (
            rejected.map(item => 
            <SubCard key = {item._id} data = {item} uri = 'rejected'/>
            )
        ) : null}
        </div>
    }
       {newCard ? (
            <CardWrapper>
              <form onSubmit = {e => onSubmit(e)}>
            <p>Company Name:</p> <input type="text"  name =  "companyName"  value = {companyName} onChange = {e => onChange(e)} required/>
            <p>Position Name:</p> <input type="text" name =  "jobTitle" value = {jobTitle} onChange = {e => onChange(e)} required/>
            <p>Application Link:</p> <input type="text" name =  "applicationUrl" value = {applicationUrl} onChange = {e => onChange(e)} />
            <p>Location:</p> <input type="text"  name =  "location" value = {location} onChange = {e => onChange(e)}/>
            <br/>
            <button>Add</button>
            <span> or </span>
            <Cancel onClick = {e => onCancelClick(e)}> Cancel </Cancel>
           </form>
        </CardWrapper>
        ) :  <AddCard onClick = {e => onAddNewCardClick(e)}>Add a new card ...</AddCard>}
      </Card>
    );

}

Rejected.propTypes = {
    getRejected: PropTypes.func.isRequired,
    rejected: PropTypes.object.isRequired,
    addRejected: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    rejected: state.rejected
});


export default connect(mapStateToProps, {getRejected, addRejected})(Rejected);