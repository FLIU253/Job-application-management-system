import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../redux/actions/auth';

const MainHeader = styled.header`
    background: #745286;
    line-height: 2.7em;
    padding: 0 1.5em;
    color: #fff;
    position: relative;
`;

const Logout = styled.div`
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    padding: .3em .5em;
    margin-top: 10px;
    line-height: 1em;
    float: right;
    cursor: pointer; 
`;

const Header = ({logout}) => {

    return(
       <MainHeader>
           <span>JAMS</span>
           <Logout onClick = {logout}>Logout</Logout>
       </MainHeader>
    );
}

Header.propTypes = {
    logout: PropTypes.func.isRequired
}
export default connect(null, {logout})(Header);