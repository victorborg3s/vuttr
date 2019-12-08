import { ToolApi } from "./";
import { AuthActions } from "../auth";
import { AppActions } from "../";
import { AlertType } from "../commons";
import { ModalDialogType } from "../commons/ModalDialog";

export const TOOL_ADD = "TOOLS_ADD";
export const TOOL_UPDATE_ID = "TOOLS_UPDATE_ID";
export const TOOL_DELETE = "TOOLS_DELETE";
export const TOOL_TOGGLE_FORM = "TOOLS_TOGGLE_FORM";
export const TOOL_LOADING = "TOOLS_LOADING";
export const TOOL_LOAD = "TOOLS_LOAD";
export const TOOL_FILTER = "TOOLS_FILTER";

export const addTool = tool => ({ type: TOOL_ADD, tool });
export const updateToolId = tool => ({ type: TOOL_UPDATE_ID, tool });
export const removeTool = tool => ({ type: TOOL_DELETE, tool });
export const effectiveToggleToolForm = () => ({ type: TOOL_TOGGLE_FORM });
export const loadingTools = () => ({ type: TOOL_LOADING });
export const loadTools = (tools, clean) => ({ type: TOOL_LOAD, tools, clean });
export const filterTools = query => ({ type: TOOL_FILTER, query });

const requireLogin = (dispatch) => {
  dispatch(
    AppActions.dialogShow({
      dialogType: ModalDialogType.OK_CANCEL,
      message:
        "This operation requires a fully authenticated user. You will be redirected to a login page.",
      onOkClick: () => dispatch(AuthActions.openLoginPage()),
    })
  );
}

export const toggleToolForm = () => {
  return (dispatch, getState) => {
    if (
      getState().AuthReducer.userToken &&
      getState().AuthReducer.userToken !== ""
    ) {
      dispatch(effectiveToggleToolForm());
    } else {
      requireLogin(dispatch);
    }
  };
};

export const fetchTools = (query, skip, offset, clean = true) => {
  return dispatch => {
    dispatch(loadingTools());
    ToolApi.list(
      query,
      skip,
      offset,
      result => {
        dispatch(loadTools(result, clean));
      },
      (xhr, status, error) => {
        dispatch(loadTools([], false));
        if (xhr.responseText) {
          dispatch(AppActions.alert(AlertType.ERROR, xhr.responseJSON.message));
        } else {
          dispatch(
            AppActions.alert(
              AlertType.ERROR,
              "Erro de conexão com o servidor. Verifique sua conexão com a internet."
            )
          );
        }
      }
    );
  };
};

export const saveTool = tool => {
  return (dispatch, getState) => {
    if (
      !getState().AuthReducer.userToken ||
      getState().AuthReducer.userToken === ""
    ) {
      requireLogin(dispatch);
    } else {
      // immediately adds the tool to the list
      dispatch(addTool(tool));
      //dispatch(tokenRegister(token));
      // send request to back end to persist
      ToolApi.create(
        tool,
        getState().AuthReducer.userToken,
        (result, status, xhr) => {
          // if success, update id
          dispatch(updateToolId(tool));
        },
        (xhr, status, error) => {
          // if error, then remove the added tool and show message error to user
          dispatch(removeTool(tool));
          if (xhr.responseText) {
            AppActions.alert(
              //AlertType.ERROR,
              "Erro de conexão com o servidor. Verifique sua conexão com a internet."
            );
            dispatch(
              AppActions.alert(AlertType.ERROR, xhr.responseJSON.message)
            );
          } else {
            dispatch(
              AppActions.alert(
                AlertType.ERROR,
                "Erro de conexão com o servidor. Verifique sua conexão com a internet."
              )
            );
          }
        }
      );
    }
  };
};

export const deleteTool = tool => {
  return (dispatch, getState) => {
    if (
      !getState().AuthReducer.userToken ||
      getState().AuthReducer.userToken === ""
    ) {
      requireLogin(dispatch);
    } else {
      // immediately removes the tool from the list
      dispatch(removeTool(tool));
      // send request to back end to persist
      ToolApi.remove(
        tool,
        getState().AuthReducer.userToken,
        (result, status, xhr) => {
          // if success, nothing to do
        },
        (xhr, status, error) => {
          // if error, then undo deletion and show message error to user
          dispatch(addTool(tool));
          if (xhr.responseText) {
            dispatch(
              AppActions.alert(AlertType.ERROR, xhr.responseJSON.message)
            );
          } else {
            dispatch(
              AppActions.alert(
                AlertType.ERROR,
                "Erro de conexão com o servidor. Verifique sua conexão com a internet."
              )
            );
          }
        }
      );
    }
  };
};
