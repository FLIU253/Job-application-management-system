import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOffered, addOffered} from '../../redux/actions/offered';
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


class Offered extends Component{

    constructor(props){
        super(props);
        this.state = {
            addNewCard: false,
            companyName: '',
            jobTitle: '',
            applicationUrl: '',
            location: '',
            offerDeadlineDate: ''
        }
    }
    
    componentDidMount(){
        this.props.getOffered();
    }

    onAddNewCardClick =(e) => {
        e.preventDefault();
        this.setState({addNewCard: true});
    }

    onCancelClick = (e) => {
        e.preventDefault();
        this.setState({addNewCard: false});
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = e => {
        const {companyName, jobTitle, applicationUrl, location, offerDeadlineDate} = this.state;
        e.preventDefault();
        this.setState({addNewCard: false});
        this.props.addOffered({companyName, jobTitle, applicationUrl, location, offerDeadlineDate});
        this.props.getOffered();
    }
    render(){

        const {title, offered: {loading, offeredList: {offered}}} = this.props;

        return(
            <Card>
           <h3>{title}</h3>
           {loading ? <h1>LOADING</h1> : 
                <div>
                {offered.length > 0 ? (
                    offered.map(item => 
                    <SubCard key = {item._id} data = {item} uri = 'offered'/>
                    )
                ) : null}
                </div>
            }
           {this.state.addNewCard ? (
                <CardWrapper>
                 <form onSubmit = {this.onSubmit}>
                <p>Company Name:</p> <input type="text"  name =  "companyName"  value = {this.state.companyName} onChange = {this.onChange} required/>
                <p>Position Name:</p> <input type="text" name =  "jobTitle" value = {this.state.jobTitle} onChange = {this.onChange} required/>
                <p>Application Link:</p> <input type="text" name =  "applicationUrl" value = {this.state.applicationUrl} onChange = {this.onChange} />
                <p>Location:</p> <input type="text"  name =  "location" value = {this.state.location} onChange = {this.onChange}/>
                <p>Deadline Date:</p> <input type="date" name =  "offerDeadlineDate" value = {this.state.offerDeadlineDate} onChange = {this.onChange} />
                <br/>
                <button>Add</button>
                <span> or </span>
                <Cancel onClick = {this.onCancelClick}> Cancel </Cancel>
               </form>
            </CardWrapper>
            ) :  <AddCard onClick = {this.onAddNewCardClick}>Add a new card ...</AddCard>}
          </Card>
        );
    }
}

Offered.propTypes = {
    getOffered: PropTypes.func.isRequired,
    offered: PropTypes.object.isRequired,
    addOffered: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    offered: state.offered
});

export default connect(mapStateToProps, {getOffered, addOffered})(Offered);