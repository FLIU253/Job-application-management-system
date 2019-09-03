import axios from 'axios';
import {GET_OFFERED, OFFERED_ERROR, ADD_OFFERED, CLEAR_OFFERED} from './types';
import {setAlert} from './alert';

//get all 'offered'
export const getOffered = () => async dispatch => {
    try{
        const res = await axios.get('/api/users/offered');

        dispatch({
            type: GET_OFFERED,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: OFFERED_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

//add a post
export const addOffered = ({companyName, jobTitle, applicationUrl, location, offerDeadlineDate}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body= JSON.stringify({companyName, jobTitle, applicationUrl, location, offerDeadlineDate});

    try{
        const res = await axios.put('/api/users/offered', body, config);

        dispatch({
            type: ADD_OFFERED,
            payload: res.data
        });

        dispatch(setAlert('offer Added', 'success'));

    }catch(err){
        dispatch({
            type: OFFERED_ERROR,
            payload: {msg: err.response, status: err.response}
        });
    }
}

export const clearOffered = () => dispatch => {
    dispatch({type: CLEAR_OFFERED });
}