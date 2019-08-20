import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getToApply} from '../../redux/actions/toApply';
import SubCard from './sub-card.component';

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

const Cancel = styled.span`
    cursor: pointer;
`;

class ToApply extends Component{

    constructor(props){
        super(props);
        this.state = {
            addNewCard: false
        }
    }

    componentDidMount(){
        this.props.getToApply();
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

        const {title, toApply:{loading, toApplyList: {toApply}}} = this.props;
        return(
            <Card>
           <h3>{title}</h3>
            {loading ? <h1>LOADING</h1> : 
                <div>
                {toApply.length > 0 ? (
                    toApply.map(item => 
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
                <p>Deadline Date:</p> <input type="date" />
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

ToApply.propTypes = {
    getToApply: PropTypes.func.isRequired,
    toApply: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    toApply: state.toApply
})

export default connect(mapStateToProps, {getToApply})(ToApply);