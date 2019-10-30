import fetch from 'isomorphic-fetch'

import { API_KEY, LIMIT } from './config'

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const UPDATE_DATA_REQUEST = 'UPDATE_DATA_REQUEST';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';

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

function fetchDataSuccess( items, pagination ) {
    return {
        type: FETCH_DATA_SUCCESS,
        items,
        pagination
    }
}

function updateDataRequest() {
    return {
        type: UPDATE_DATA_REQUEST
    }
}

function updateDataSuccess( items, pagination ) {
    return {
        type: UPDATE_DATA_SUCCESS,
        items,
        pagination
    }
}

export function loadItems( search ) {
    return dispatch => {
        dispatch(fetchDataRequest());
        return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=${LIMIT}&q=${search}`)
            .then(response => response.json())
            .then(json => {
                if (json.meta.msg === 'OK') {
                    dispatch(fetchDataSuccess(json.data, json.pagination))
                } else {
                    dispatch(fetchDataFailure())
                }
            })
            .catch(() => {
                dispatch(fetchDataFailure());
            })
    }
}

export function updateItems( search ) {
    return (dispatch, getState ) => {
        dispatch(updateDataRequest());
        const { items, pagination, offset } = getState().items.data;
        console.log(items.length, pagination);
        return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=${LIMIT}&offset=${offset}&q=${search}`)
            .then(response => response.json())
            .then(json => {
                if (json.meta.msg === 'OK') {
                    dispatch(updateDataSuccess(json.data, json.pagination))
                } else {
                    dispatch(fetchDataFailure())
                }
            })
            .catch(() => {
                dispatch(fetchDataFailure());
            })
    }
}
