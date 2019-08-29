import {RESUME_ADDED, RESUME_ERROR, DELETE_RESUME, GET_RESUME} from '../actions/types';

const initialState = {
    resume: {},
    loading: true,
    errors: {},
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_RESUME:
        case RESUME_ADDED:
            return {
                ...state,
                resume: payload,
                loading: false
            }
        case RESUME_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        case DELETE_RESUME:
            return{
                ...state,
                resume: {},
                loading: true
            }
        default:
            return state;
    }
}