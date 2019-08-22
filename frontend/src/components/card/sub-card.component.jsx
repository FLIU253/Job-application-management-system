import React , {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {deleteToApply, addToApply, getToApply} from '../../redux/actions/toApply';
import {useDrag} from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import { addRejected, getRejected } from '../../redux/actions/rejected';
import { addInterview, getInterview } from '../../redux/actions/interview';
import { addOffered, getOffered } from '../../redux/actions/offered';
import { addAppliedTo, getAppliedTo } from '../../redux/actions/appliedTo';

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
    getRejected, getAppliedTo, getInterview, getOffered, getToApply}) => {

    const [{isDragging}, drag] = useDrag({
        item: {data, type: ItemTypes.SubCard},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if(item && dropResult){
                console.log(dropResult.name);
                delete item.data['_id']
                const {companyName, jobTitle, applicationUrl, location} = item.data;
                
               switch(dropResult.name){
                   case 'Rejected':
                       if(uri === dropResult.name.toLowerCase()) break;
                        addRejected({companyName, jobTitle, applicationUrl, location});
                        getRejected();
                        break;
                    case 'Interview':
                        if(uri === dropResult.name.toLowerCase())break;
                        addInterview({companyName, jobTitle, applicationUrl, location});
                        getInterview();
                        break;
                    case 'Offered':
                        if(uri === dropResult.name.toLowerCase()) break;
                        addOffered({companyName, jobTitle, applicationUrl, location});
                        getOffered();
                        break;
                    case 'AppliedTo':
                    if(uri === dropResult.name.toLowerCase()) break;
                        addAppliedTo({companyName, jobTitle, applicationUrl, location});
                        getAppliedTo();
                        break;
                    case 'ToApply':
                      if(uri === dropResult.name.toLowerCase()) break;
                        addToApply({companyName, jobTitle, applicationUrl, location});
                        getToApply();
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

    const deleteItem = e => {
        e.preventDefault();
        deleteToApply(data._id, uri);
        setRefresh(!refresh);
        
    }

    const opacity = isDragging ? 0.1 : 1

    return(
        !refresh ? (
            <Card ref = {drag} style = {{opacity}}>
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
    addToApply: PropTypes.func

}

export default connect(null, {deleteToApply, addRejected, addInterview, addOffered, addToApply, addAppliedTo,
     getRejected, getAppliedTo, getInterview, getOffered, getToApply})(SubCard);