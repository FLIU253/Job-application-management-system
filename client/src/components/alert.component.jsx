import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AlertDiv} from '../styles/frontpage.styles';

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <AlertDiv key = {alert.id}>{alert.msg}</AlertDiv>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);