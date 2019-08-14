import React, {Component} from 'react';
import ToApply from '../components/to-apply.component';
import AppliedTo from '../components/applied-to.component';
import Interview from '../components/interview.component';
import Offered from '../components/offered.component';
import Rejected from '../components/rejected.component';
import styled from 'styled-components';

const CardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr) );
`;

class HomePage extends Component{

  render(){
    return (
      <CardSection>
      <ToApply title = "To apply" />
      <AppliedTo title = "Applied To"/>
      <Interview title = "Interview"/>
      <Rejected title = "Rejeced"/>
      <Offered title = "Offered"/>
   </CardSection>
    );
  }
}

export default HomePage;