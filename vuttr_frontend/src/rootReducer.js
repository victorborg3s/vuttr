import { combineReducers } from 'redux';
import { AppReducer } from './app';
import { AuthReducer } from './app/auth';

export default combineReducers({
    AppReducer,
    AuthReducer,
});