import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default () => {
    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    )
}