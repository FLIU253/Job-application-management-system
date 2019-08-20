import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {getAppliedTo} from '../../redux/actions/appliedTo';
import SubCard from './sub-card.component';
import PropTypes from 'prop-types';

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
class AppliedTo extends Component{

    constructor(props){
        super(props);
        this.state = {
            addNewCard: false
        }
    }

    componentDidMount(){
        this.props.getAppliedTo();
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

        const {title, appliedTo:{loading, appliedToList: {appliedTo}}} = this.props;

        console.log(appliedTo);

        return(
            <Card>
           <h3>{title}</h3>
           {loading ? <h1>LOADING</h1> : 
                <div>
                {appliedTo.length > 0 ? (
                    appliedTo.map(item => 
                    <SubCard key = {item._id} data = {item}/>
                    )
                ) : null}
                </div>
            }
            
           {this.state.addNewCard ? (
                <CardWrapper>
                Company Name: <input type="text" required/>
                Position Name: <input type="text" required/>
                Application Link: <input type="text" required/>
                <TextArea type = "text" required rows="5"></TextArea>
                <button>Add</button>
                <span> or </span>
                <Cancel onClick = {this.onCancelClick}> Cancel </Cancel>
            </CardWrapper>
            ) :  <AddCard onClick = {this.onAddNewCardClick}>Add a new card ...</AddCard>}
          </Card>
        );
    }
}

AppliedTo.propTypes = {
    getAppliedTo: PropTypes.func.isRequired,
    appliedTo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    appliedTo: state.appliedTo
})

export default connect(mapStateToProps, {getAppliedTo})(AppliedTo);