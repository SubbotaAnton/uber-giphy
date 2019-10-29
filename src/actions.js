import fetch from 'isomorphic-fetch'

const API_KEY = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    }
}

function fetchDataFailure() {
    return {
        type: FETCH_DATA_FAILURE
    }
}

function fetchDataSuccess( items ) {
    return {
        type: FETCH_DATA_SUCCESS,
        items
    }
}

export function fetchMovies( search ) {
    return dispatch => {
        dispatch(fetchDataRequest());
        return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}`)
            .then(response => response.json())
            .then(json => {
                if (json.meta.msg === 'OK') {
                    dispatch(fetchDataSuccess(json.data))
                } else {
                    dispatch(fetchDataFailure())
                }
            })
            .catch(() => {
                dispatch(fetchDataFailure());
            })
    }
}
