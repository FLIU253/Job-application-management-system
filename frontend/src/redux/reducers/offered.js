import {GET_OFFERED, OFFERED_ERROR, ADD_OFFERED} from '../actions/types';


const initialState = {
    offeredList: [],
    loading: true,
    errors: {}
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_OFFERED:
            return {
                ...state,
                offeredList: payload,
                loading: false
            }
        case ADD_OFFERED:
            return{
                ...state,
                offeredList: [payload, ...state.offeredList],
                loading: false
            }
        case OFFERED_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        default:
            return state;
    }
}