import axios from 'axios';
import {GET_OFFERED, OFFERED_ERROR} from './types';


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