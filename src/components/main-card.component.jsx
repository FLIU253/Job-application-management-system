import React, {Component} from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background:rgba(222, 225, 227, 0.9);
    border-radius: 3px;
    margin: 1em 1em;
`;

class MainCard extends Component{

    render(){

        const {title} = this.props;

        return(
            <Card>
           <h3>{title}</h3>
          </Card>
        );
    }
}

export default MainCard;