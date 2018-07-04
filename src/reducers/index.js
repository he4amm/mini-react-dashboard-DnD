import { combineReducers } from 'redux'
import widgets from './widgets.reducers';

const rootReducer = combineReducers({
    widgets
})

export default rootReducer