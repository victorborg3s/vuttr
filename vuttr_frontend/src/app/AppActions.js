import { ToolApi } from './tool';
import { AuthActions } from './auth';
import { AlertType } from './commons';
import * as _ from 'lodash/core';

export const TOOLS_ADD = "TOOLS_ADD";
export const TOOLS_UNDO_ADD = "TOOLS_ADD";
export const TOOLS_DELETE = "TOOLS_DELETE";
export const TOOLS_UNDO_DELETE = "TOOLS_UNDO_DELETE";
export const TOOLS_LOADING = "TOOLS_LOADING";
export const TOOLS_LOAD = "TOOLS_LOAD";
export const TOOLS_FILTER = "TOOLS_FILTER";

export const APP_SIGN_OUT = "APP_SIGN_OUT";
export const APP_TOKEN_REGISTER = "APP_TOKEN_REGISTER";
export const APP_ALERT_SHOW = "APP_ALERT_SHOW";
export const APP_ALERT_DISMISS = "APP_ALERT_DISMISS";

export const addTool = (tool) => ({ type: TOOLS_ADD, tool })
export const undoAddTool = (tool) => ({ type: TOOLS_UNDO_ADD, tool })
export const removeTool = (tool) => ({ type: TOOLS_DELETE, tool })
export const undoRemoveTool = (tool) => ({ type: TOOLS_UNDO_DELETE, tool })
export const loadingTools = () => ({ type: TOOLS_LOADING })
export const loadTools = (tools, clean) => ({ type: TOOLS_LOAD, tools, clean })
export const filterTools = (query) => ({ type: TOOLS_FILTER, query })

export const signOut = () => ({ type: APP_SIGN_OUT })
export const tokenRegister = (token) => ({ type: APP_TOKEN_REGISTER, token })
export const alertShow = (messageId, alertType, message) => ({ type: APP_ALERT_SHOW, messageId, alertType, message })
export const alertDismiss = (messageId) => ({ type: APP_ALERT_DISMISS, messageId })

export const fetchTools = (query, skip, offset, clean = true) => {
    return (dispatch, getState) => {
        dispatch(loadingTools());
        ToolApi.list(
            query,
            skip, 
            offset, 
            (result) => {
                dispatch(loadTools(result, clean));
            }, 
            (xhr,status,error) => {
                dispatch(loadTools([], false));
                if (xhr.responseText) {
                    dispatch(alert(AlertType.ERROR, xhr.responseJSON.message));
                } else {
                    dispatch(alert(AlertType.ERROR, 'Erro de conexão com o servidor. Verifique sua conexão com a internet.'));
                }
            }, 
        );

    }
}

export const saveTool = (tool) => {
    return (dispatch, getState) => {
        // immediately adds the tool to the list
        dispatch(addTool(tool));
        if (!getState().AppReducer.authToken || getState().AppReducer.authToken === "") {
            dispatch(AuthActions.openLoginPage());
        }
        //dispatch(tokenRegister(token));
        // send request to back end to persist
        ToolApi.create(
            tool,
            getState().AppReducer.authToken, 
            (result,status,xhr) => {
                // if success, nothing to do
            }, 
            (xhr,status,error) => {
                // if error, then remove the added tool and show message error to user
                dispatch(undoAddTool(tool));
                if (xhr.responseText) {
                    dispatch(alert(AlertType.ERROR, xhr.responseJSON.message));
                } else {
                    dispatch(alert(AlertType.ERROR, 'Erro de conexão com o servidor. Verifique sua conexão com a internet.'));
                }
            }, 
        );

    }
}

export const deleteTool = (tool) => {
    return (dispatch, getState) => {
        // immediately removes the tool from the list
        dispatch(removeTool(tool));
        // send request to back end to persist
        ToolApi.create(
            tool,
            getState().AppReducer.authToken, 
            (result,status,xhr) => {
                // if success, nothing to do
            }, 
            (xhr,status,error) => {
                // if error, then undo deletion and show message error to user
                dispatch(undoRemoveTool(tool));
                if (xhr.responseText) {
                    dispatch(alert(AlertType.ERROR, xhr.responseJSON.message));
                } else {
                    dispatch(alert(AlertType.ERROR, 'Erro de conexão com o servidor. Verifique sua conexão com a internet.'));
                }
            }, 
        );

    }
}

export const alert = (alertType, message) => {
    return (dispatch) => {
        let messageId = _.uniqueId('message_');
        dispatch(alertShow(messageId, alertType, message));
        setTimeout(() => {
            dispatch(alertDismiss(messageId));
        }, 3500);
    }
}
