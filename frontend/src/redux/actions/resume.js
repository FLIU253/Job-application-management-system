import axios from 'axios';
import {RESUME_ADDED, RESUME_ERROR, DELETE_RESUME, GET_RESUME} from '../actions/types';

export const addResume = (resume) => async dispatch => {
    try{
        const res = await axios.post('/api/resume', resume);
        console.log(res.data);
        dispatch({
            type: RESUME_ADDED,
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: RESUME_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

export const getResumeInJson = () => async dispatch => {
    try{
        const res = await axios.get('/api/resume/json');

        dispatch({
            type: GET_RESUME,
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: RESUME_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

export const getResumeInFile = () => async dispatch => {
    try{
        const res = await axios.get('/api/resume');

        dispatch({
            type: GET_RESUME,
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: RESUME_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

export const deleteResume = () => async dispatch => {
    try{
        const res = await axios.delete('/api/resume');

        dispatch({
            type: DELETE_RESUME,
            payload: res.data
        });

    }catch(err){
        dispatch({
            type: RESUME_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}