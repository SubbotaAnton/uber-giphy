import { combineReducers } from 'redux'
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE
} from './actions'

function itemsBySearch(
    state = {
        isFetching: false,
        items: []
    },
    action
) {
    switch ( action.type ) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.items
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                items: []
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    itemsBySearch
});

export default rootReducer