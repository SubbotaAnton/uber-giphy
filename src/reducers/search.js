import {
    SET_SEARCH,
} from '../actions/actions'


function search( state = { value : ''}, action ) {
    switch ( action.type ) {
        case SET_SEARCH:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}

export default search