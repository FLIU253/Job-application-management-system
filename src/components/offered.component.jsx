import React, {Component} from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background:rgba(222, 225, 227, 0.9);
    border-radius: 3px;
    margin: 1em 1em;
    color:#4C4E50;
    display: block;
`;

const CardWrapper = styled.div`
    margin: 10px;
`;

const TextArea = styled.textarea`
    width: 100%;
    display: block;
    margin-bottom: .5em;
    border: 0px none;
    border-bottom: 1px solid #bdc3c7;
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

class Offered extends Component{

    constructor(){
        super();
        this.state = {
            addNewCard: false
        }
    }

    onAddNewCardClick =(e) => {
        e.preventDefault();
        this.setState({addNewCard: true});
    }

    render(){

        const {title} = this.props;

        return(
            <Card>
           <h3>{title}</h3>
            {this.state.addNewCard ? (
                <CardWrapper>
                Company Name: <input type="text" required/>
                Position Name: <input type="text" required/>
                Application Link: <input type="text" required/>
                <TextArea type = "text" required rows="5"></TextArea>
                <button>Add</button>
                <span> or </span>
                <span> Cancel </span>
            </CardWrapper>
            ) : null}
            <AddCard onClick = {this.onAddNewCardClick}>Add a new card ...</AddCard>
          </Card>
        );
    }
}

export default Offered;