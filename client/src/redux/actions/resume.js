import axios from 'axios';
import {RESUME_ADDED, RESUME_ERROR, DELETE_RESUME, GET_RESUME, GET_RESUME_JSON} from '../actions/types';

export const addResume = (resume) => async dispatch => {
    try{
        const res = await axios.post('/api/resume', resume);
        console.log(res.data);
        dispatch({
            type: RESUME_ADDED,
            payload: res.data
    });
        dispatch(getResumeInFile());
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
            type: GET_RESUME_JSON,
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
        const res = await axios.get('/api/resume', {responseType: 'blob'});
        // console.log(res);
        let url = window.URL.createObjectURL(res.data);
        // console.log(url);
        dispatch({
            type: GET_RESUME,
            payload: url
        });

    }catch(err){
        dispatch({
            type: RESUME_ERROR,
            payload: {msg: err.response, status: err.response.status}
        })
    }
}

export const deleteResume = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/resume/${id}`);

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