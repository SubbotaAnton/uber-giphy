import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore( preloadedState ) {
    return createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware
            ))
    )
}