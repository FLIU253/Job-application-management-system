import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRejected} from '../../redux/actions/rejected';
import SubCard from './sub-card.component';

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


class Rejected extends Component{

    constructor(props){
        super(props);
        this.state = {
            addNewCard: false
        }
    }
    
    componentDidMount(){
        this.props.getRejected();
    }

    onAddNewCardClick =(e) => {
        e.preventDefault();
        this.setState({addNewCard: true});
    }

    onCancelClick = (e) => {
        e.preventDefault();
        this.setState({addNewCard: false});
    }
    render(){
        const {title, rejected: {loading, rejectedList: {rejected}}} = this.props;
        
        return(
            <Card>
           <h3>{title}</h3>
        {loading ? <h1>LOADING</h1> : 
            <div>
            {rejected.length > 0 ? (
                rejected.map(item => 
                <SubCard key = {item._id} data = {item}/>
                )
            ) : null}
            </div>
        }
           {this.state.addNewCard ? (
                <CardWrapper>
                <p>Company Name:</p> <input type="text" required/>
                <p>Position Name:</p> <input type="text" required/>
                <p>Application Link:</p> <input type="text" />
                <p>Location:</p> <input type="text" />
                <br/>
                <button>Add</button>
                <span> or </span>
                <Cancel onClick = {this.onCancelClick}> Cancel </Cancel>
            </CardWrapper>
            ) :  <AddCard onClick = {this.onAddNewCardClick}>Add a new card ...</AddCard>}
          </Card>
        );
    }
}

Rejected.propTypes = {
    getRejected: PropTypes.func.isRequired,
    rejected: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    rejected: state.rejected
});


export default connect(mapStateToProps, {getRejected})(Rejected);