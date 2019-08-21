import React, {Component} from 'react';
import ToApply from '../components/card/to-apply.component';
import AppliedTo from '../components/card/applied-to.component';
import Interview from '../components/card/interview.component';
import Offered from '../components/card/offered.component';
import Rejected from '../components/card/rejected.component';
import styled from 'styled-components';
import Header from '../components/header.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-width: 400px;
  align-items: flex-start;
`;

class HomePage extends Component{

  render(){
    const {isAuthenticated} = this.props;
    return (
      <div>
      <Header/>
    {isAuthenticated  ? (
      <CardSection>
        <ToApply title = "To apply" />
        <AppliedTo title = "Applied To"/>
        <Interview title = "Interview"/>
        <Rejected title = "Rejected"/>
        <Offered title = "Offered"/>
        </CardSection>
    ) : (<h1>Loading</h1>)}
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HomePage);