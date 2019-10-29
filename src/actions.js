import fetch from 'isomorphic-fetch'

const API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';

export const LOADING_ITEMS = 'LOADING_ITEMS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const SET_ERROR = 'SET_ERROR';

export function setError( error ) {
    return {
        type: SET_ERROR,
        error
    }
}

export function clearError() {
    return {
        type: SET_ERROR,
        error: ''
    }
}

function loadingItems( ) {
    return {
        type: LOADING_ITEMS
    }
}

function receivePosts( search, movies ) {
    return {
        type: RECEIVE_POSTS,
        search,
        posts: movies
    }
}

export function fetchMovies( search ) {
    return dispatch => {
        dispatch(loadingItems());
        return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}`)
            .then(response => response.json())
            .then(json => {
                if (json.meta.msg === 'OK') {
                    dispatch(receivePosts(search, json.data))
                } else {
                    dispatch(setError('Error during loading'));
                    dispatch(receivePosts(search, []))
                }
            })
    }
}
