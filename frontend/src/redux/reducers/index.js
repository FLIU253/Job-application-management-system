import {combineReducers} from 'redux';
import auth from './auth';
import alert from './alert';
import toApply from './toApply';
import appliedTo from './appliedTo';
import interview from './interview';
import rejected from './rejected';
import offered from './offered';

export default combineReducers({
    auth,
    alert,
    toApply,
    appliedTo,
    interview,
    rejected,
    offered
});