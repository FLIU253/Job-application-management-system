import React , {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {deleteToApply} from '../../redux/actions/toApply';
import {useDrag} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';

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

const SubCard = ({data, uri, deleteToApply}) => {

    const [{isDragging}, drag] = useDrag({
        item: {data, type: ItemTypes.SubCard},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if(item && dropResult){
                alert(`You dropped it`)
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [refresh, setRefresh] = useState(false);

    const deleteItem = e => {
        e.preventDefault();
        deleteToApply(data._id, uri);
        setRefresh(!refresh);
        
    }
    return(
        !refresh ? (
            <Card ref = {drag}>
            <CardText> <b>Company: </b>{data.companyName}</CardText>
            <CardText> <b>Job Title: </b>{data.jobTitle}</CardText>
            {data.location ? (  <CardText><b>Location: </b>{data.location}</CardText>) : null}
            {data.deadlineDate ? (<CardText><b>Deadline Date: </b>{data.deadlineDate.substring(0,10)}</CardText> ): null}
            {data.appliedDate ? (<CardText><b>Applied Date: </b>{data.appliedDate.substring(0,10)}</CardText>) : null}
            {data.interviewDate ? (<CardText><b>Interview Date: </b>{data.interviewDate.substring(0,10)}</CardText>) : null}
            {data.offerDeadlineDate ? (<CardText><b>Offer Deadline Date: </b>{data.offerDeadlineDate.substring(0,10)}</CardText>) : null}
            {data.applicationUrl ? (<CardText><b>Application URL: </b>{data.applicationUrl}</CardText>) : null}
            <i className ="fas fa-trash-alt" onClick ={e => deleteItem(e)} ></i>
        </Card>
        ) : null
    );
}

SubCard.propTypes = {
    data: PropTypes.object.isRequired,
    uri: PropTypes.string,
    deleteToApply: PropTypes.func.isRequired
}

export default connect(null, {deleteToApply})(SubCard);