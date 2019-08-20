import axios from 'axios';
import {GET_TO_APPLY, TO_APPLY_ERROR, ADD_TO_APPLY} from './types';
import {setAlert} from './alert';

//get all 'to apply'
export const getToApply = () => async dispatch => {
    try{
        const res = await axios.get('/api/users/toApply');

        dispatch({
            type: GET_TO_APPLY,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: TO_APPLY_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

//add a post
export const addToApply = ({companyName, jobTitle, applicationUrl, location, deadlineDate}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body= JSON.stringify({companyName, jobTitle, applicationUrl, location, deadlineDate});

    try{
        const res = await axios.put('/api/users/toApply', body, config);

        dispatch({
            type: ADD_TO_APPLY,
            payload: res.data
        });

        dispatch(setAlert('To Apply Added', 'success'));

    }catch(err){
        dispatch({
            type: TO_APPLY_ERROR,
            payload: {msg: err.response, status: err.response}
        });
    }
}