import {GET_INTERVIEW, INTERVIEW_ERROR, ADD_INTERVIEW, CLEAR_INTERVIEW} from '../actions/types';


const initialState = {
    interviewList: [],
    loading: true,
    errors: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_INTERVIEW:
            return {
                ...state,
                interviewList: payload,
                loading: false
            }
        case ADD_INTERVIEW:
                return{
                    ...state,
                    interviewList: [payload, ...state.interviewList],
                    loading: false
                }
        case INTERVIEW_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        case CLEAR_INTERVIEW:
            return{
                ...state,
                loading: true,
                interviewList: []
            }
        default:
            return state;
    }
}