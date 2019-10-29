import {combineReducers} from 'redux'
import {
    SELECT_SEARCH,
    INVALIDATE_SEARCH,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SET_ERROR,
    RECEIVE_MOVIE_INFO
} from './actions'

function selectedSearch(state = '', action) {
    switch (action.type) {
        case SELECT_SEARCH:
            return action.search
        default:
            return state
    }
}

function error(state = '', action) {
    switch (action.type) {
        case SET_ERROR:
            return action.error
        default:
            return state
    }
}

function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_SEARCH:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts
            })
        default:
            return state
    }
}

function postsBySearch(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SEARCH:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.search]: posts(state[action.search], action)
            })
        default:
            return state
    }
}

// TODO keep info about movies in localStorage or directly in this part of store
function movieInfo(state = {}, action) {
    switch (action.type) {
        case RECEIVE_MOVIE_INFO:
            return Object.assign({}, state, action.info)
        default:
            return state
    }

}

const rootReducer = combineReducers({
    postsBySearch,
    selectedSearch,
    error,
    movieInfo
})

export default rootReducer