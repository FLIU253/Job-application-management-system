import axios from 'axios';
import {GET_APPLIED_TO, APPLIED_ERROR} from './types';


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