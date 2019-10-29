import { combineReducers } from 'redux'
import {
    LOADING_ITEMS,
    RECEIVE_POSTS,
    SET_ERROR
} from './actions'

function error( state = '', action ) {
    switch ( action.type ) {
        case SET_ERROR:
            return action.error
        default:
            return state
    }
}

function postsBySearch(
    state = {
        isFetching: false,
        items: []
    },
    action
) {
    switch ( action.type ) {
        case LOADING_ITEMS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postsBySearch,
    error
})

export default rootReducer