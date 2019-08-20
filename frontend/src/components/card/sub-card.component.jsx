import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
const SubCard = ({data}) => {
    console.log(data);

    return(
        <Card>
            <CardText> <b>Company: </b>{data.companyName}</CardText>
            <CardText> <b>Job Title: </b>{data.jobTitle}</CardText>
            {data.location ? (  <CardText><b>Location: </b>{data.location}</CardText>) : null}
            {data.deadlineDate ? (
                <CardText><b>Date: </b>{data.deadlineDate.substring(0,10)}</CardText>
            ): null}
            {data.applicationUrl ? (<CardText><b>Application URL: </b>{data.applicationUrl}</CardText>) : null}
        </Card>
    );
}

SubCard.propTypes = {
    data: PropTypes.object.isRequired
}

export default SubCard;