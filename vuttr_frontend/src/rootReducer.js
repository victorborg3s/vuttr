import { combineReducers } from 'redux';
import { AppReducer } from './app';
import { AuthReducer } from './app/auth';
import { ToolReducer } from './app/tool';

export default combineReducers({
    AppReducer,
    AuthReducer,
    ToolReducer
});