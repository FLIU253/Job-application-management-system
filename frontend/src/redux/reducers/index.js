import {combineReducers} from 'redux';
import auth from './auth';
import alert from './alert';
import toApply from './toApply';
import appliedTo from './appliedTo';

export default combineReducers({
    auth,
    alert,
    toApply,
    appliedTo
});