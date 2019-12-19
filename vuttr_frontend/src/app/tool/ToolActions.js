import { ToolApi } from "./";
import { AuthActions } from "../auth";
import { AppActions } from "../";
import { AlertType } from "../commons";
import { ModalDialogType } from "../commons/ModalDialog";
import { isAuthenticated, getUserToken } from "../../utils";

export const DATA_PENDING = "TOOLS_DATA_PENDING";
export const DATA_LOAD = "TOOLS_DATA_LOAD";
export const DATA_ERROR = "TOOLS_DATA_ERROR";
export const DATA_FILTER = "TOOLS_DATA_FILTER";
export const ADD = "TOOLS_ADD";
export const UPDATE_ID = "TOOLS_UPDATE_ID";
export const DELETE = "TOOLS_DELETE";
export const TOGGLE_FORM = "TOOLS_TOGGLE_FORM";

export const dataLoading = () => ({ type: DATA_PENDING });
export const dataError = () => ({ type: DATA_ERROR });
export const dataLoadResult = (paginatedResult, clean) => ({
  type: DATA_LOAD,
  paginatedResult,
  clean
});
export const addToList = tool => ({ type: ADD, tool });
export const removeFromList = tool => ({ type: DELETE, tool });
export const updateId = tool => ({ type: UPDATE_ID, tool });
export const effectiveToggleForm = () => ({ type: TOGGLE_FORM });
export const applyDataFilter = (searchOnlyTags, searchTerm) => ({
  type: DATA_FILTER,
  searchOnlyTags,
  searchTerm
});

export const applyFilter = (searchOnlyTags, searchTerm) => {
  return (dispatch, getState) => {
    dispatch(applyDataFilter(searchOnlyTags, searchTerm));
    if (getState().ToolReducer.filteredData.length < 10) {
      dispatch(fetch(
        getState().ToolReducer.dataPage,
        false
      ));
    }
  }
};

const requireLogin = dispatch => {
  dispatch(
    AppActions.dialogShow({
      dialogType: ModalDialogType.OK_CANCEL,
      message:
        "This operation requires a fully authenticated user. You will be redirected to a login page.",
      onOkClick: () => dispatch(AuthActions.openLoginPage())
    })
  );
};

export const toggleForm = () => {
  return (dispatch, getState) => {
    if (isAuthenticated(getState())) {
      dispatch(effectiveToggleForm());
    } else {
      requireLogin(dispatch);
    }
  };
};

export const fetch = (page, clean = true) => {
  return dispatch => {
    dispatch(dataLoading());
    ToolApi.list(
      page,
      result => {
        dispatch(dataLoadResult(result, clean));
      },
      (xhr, status, error) => {
        dispatch(dataError());
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

export const save = tool => {
  return (dispatch, getState) => {
    if (!isAuthenticated(getState())) {
      requireLogin(dispatch);
    } else {
      // immediately adds the tool to the list
      dispatch(addToList(tool));
      //dispatch(tokenRegister(token));
      // send request to back end to persist
      ToolApi.create(
        tool,
        getUserToken(getState()),
        (result, status, xhr) => {
          // if success, update id
          dispatch(updateId(result));
        },
        (xhr, status, error) => {
          // if error, then remove the added tool and show message error to user
          dispatch(removeFromList(tool));
          if (xhr.responseText) {
            AppActions.alert(
              AlertType.ERROR,
              "Connection error. Verify your internet connection."
            );
            dispatch(
              AppActions.alert(AlertType.ERROR, xhr.responseJSON.message)
            );
          } else {
            dispatch(
              AppActions.alert(
                AlertType.ERROR,
                "Connection error. Verify your internet connection."
              )
            );
          }
        }
      );
    }
  };
};

export const remove = tool => {
  return (dispatch, getState) => {
    if (!isAuthenticated(getState())) {
      requireLogin(dispatch);
    } else {
      // immediately removes the tool from the list
      dispatch(removeFromList(tool));
      // send request to back end to persist
      ToolApi.remove(
        tool,
        getState().AuthReducer.userToken,
        (result, status, xhr) => {
          // if success, nothing to do
        },
        (xhr, status, error) => {
          // if error, then undo deletion and show message error to user
          dispatch(addToList(tool));
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
