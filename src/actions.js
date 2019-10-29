import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const SELECT_SEARCH = 'SELECT_SEARCH'
export const INVALIDATE_SEARCH = 'INVALIDATE_SEARCH'

export const SET_ERROR = 'SET_ERROR'
export const RECEIVE_MOVIE_INFO = 'RECEIVE_MOVIE_INFO'

export function setError(error) {
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

export function selectSearch(search) {
  return {
    type: SELECT_SEARCH,
    search
  }
}

export function invalidateSearch(search) {
  return {
    type: INVALIDATE_SEARCH,
    search
  }
}

function requestPosts(search) {
  return {
    type: REQUEST_POSTS,
    search
  }
}

function receivePosts(search, movies) {
  return {
    type: RECEIVE_POSTS,
    search,
    posts: movies
  }
}

function receiveMovieInfo(info) {
  return {
    type: RECEIVE_MOVIE_INFO,
    info
  }
}

export function getInfoById(id) {
  return dispatch => {
    return fetch(`http://www.omdbapi.com/?apikey=347c1029&i=${id}`)
        .then(response => response.json())
        .then(json => {
          if (json.Error) {
            return;
          }
          dispatch(receiveMovieInfo(json))
        })
  }
}

function fetchMovies(search) {
  return dispatch => {
    dispatch(requestPosts(search))
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&q=${search}`)
      .then(response => response.json())
      .then(json => {
        if (json.Response === 'False') {
          dispatch(setError(json.Error))
          dispatch(receivePosts(search, []))
          return;
        }
        dispatch(receivePosts(search, json.data))
      })
  }
}

function shouldFetchMovies(state, search) {
  const posts = state.postsBySearch[search]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchMoviesIfNeeded(search) {
  return (dispatch, getState) => {
    if (shouldFetchMovies(getState(), search)) {
      return dispatch(fetchMovies(search))
    }
  }
}