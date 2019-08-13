import React, {Component} from 'react';
import MainCard from '../components/main-card.component';
import styled from 'styled-components';

const CardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr) );
`;

class HomePage extends Component{

  render(){
    return (
      <CardSection>
      <MainCard title = "To apply"/>
      <MainCard title = "Applied to"/>
      <MainCard title = "Interview"/>
      <MainCard title = "Rejected"/>
      <MainCard title = "Offered"/>
   </CardSection>
    );
  }
}

export default HomePage;