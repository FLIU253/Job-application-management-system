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
import loadingImg from '../assets/loading.gif';

const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-width: 400px;
  align-items: flex-start;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
  color: white;
`;

class HomePage extends Component{

  render(){
    const {loading} = this.props;
    return (
      <div>
      <Header/>
    {!loading  ? (
      <CardSection>
        <ToApply title = "To apply" />
        <AppliedTo title = "Applied To"/>
        <Interview title = "Interview"/>
        <Rejected title = "Rejected"/>
        <Offered title = "Offered"/>
        </CardSection>
    ) : (<Loading>
      <img src = {loadingImg} alt = {" loading spinner"}/>
      <h1>Loading...</h1>
    </Loading>)}
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  loading: state.auth.loading
});

export default connect(mapStateToProps)(HomePage);