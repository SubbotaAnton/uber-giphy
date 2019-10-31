import fetch from 'isomorphic-fetch'

import { API_KEY, LIMIT } from '../config'

export const SET_SEARCH = 'SET_SEARCH';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const UPDATE_DATA_REQUEST = 'UPDATE_DATA_REQUEST';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';
export const UPDATE_DATA_FAILURE = 'UPDATE_DATA_FAILURE';

function setSearch( value ) {
    return {
        type: SET_SEARCH,
        value
    }
}

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

function updateDataFailure() {
    return {
        type: UPDATE_DATA_FAILURE
    }
}

function updateDataSuccess( items, pagination ) {
    return {
        type: UPDATE_DATA_SUCCESS,
        items,
        pagination
    }
}

function loading( url, dispatch, request, success, failure ) {
    dispatch(request());
    return fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.meta.msg === 'OK') {
                dispatch(success(json.data, json.pagination))
            } else {
                dispatch(failure())
            }
        })
        .catch(() => {
            dispatch(failure());
        })

}

export function loadItems( search ) {
    return ( dispatch ) => {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=${LIMIT}&offset=0&q=${search}`;
        return loading(url, dispatch, fetchDataRequest, fetchDataSuccess, fetchDataFailure);
    }
}

export function updateItems() {
    return ( dispatch, getState ) => {
        const { items: { data: { pagination: { total_count = Number.POSITIVE_INFINITY}, offset } }, search: { value } } = getState();
        const toLimit = total_count - offset;
        const limit = LIMIT < toLimit ? LIMIT : toLimit;
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=${limit}&offset=${offset}&q=${value}`;
        return loading(url, dispatch, updateDataRequest, updateDataSuccess, updateDataFailure);
    }
}

export function updateSearch( value ) {
    return ( dispatch ) => {
        dispatch(setSearch(value));
    }
}
