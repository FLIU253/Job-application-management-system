import React, {Component} from 'react';
import ToApply from '../components/card/to-apply.component';
import AppliedTo from '../components/card/applied-to.component';
import Interview from '../components/card/interview.component';
import Offered from '../components/card/offered.component';
import Rejected from '../components/card/rejected.component';
import styled from 'styled-components';
import Header from '../components/header.component';

const CardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr) );
`;

class HomePage extends Component{

  render(){
    return (
      <div>
      <Header/>
      <CardSection>
      <ToApply title = "To apply" />
      <AppliedTo title = "Applied To"/>
      <Interview title = "Interview"/>
      <Rejected title = "Rejected"/>
      <Offered title = "Offered"/>
      </CardSection>
      </div>
    );
  }
}

export default HomePage;