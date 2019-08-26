import axios from 'axios';
import {GET_APPLIED_TO, APPLIED_ERROR, ADD_APPLIED_TO, CLEAR_APPLIED_TO} from './types';
import {setAlert} from './alert';

//get all 'to apply'
export const getAppliedTo = () => async dispatch => {
    try{
        const res = await axios.get('/api/users/appliedTo');
        console.log(res.data);
        
        dispatch({
            type: GET_APPLIED_TO,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: APPLIED_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

//add a post
export const addAppliedTo = ({companyName, jobTitle, applicationUrl, location, appliedDate}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body= JSON.stringify({companyName, jobTitle, applicationUrl, location, appliedDate});

    try{
        const res = await axios.put('/api/users/appliedTo', body, config);
        console.log(res.data);
        dispatch({
            type: ADD_APPLIED_TO,
            payload: res.data
        });

        dispatch(setAlert('applied to Added', 'success'));

    }catch(err){
        dispatch({
            type: APPLIED_ERROR,
            payload: {msg: err.response, status: err.response}
        });
    }
}
export const clearAppliedTo = () => dispatch => {
    dispatch({type: CLEAR_APPLIED_TO });
}