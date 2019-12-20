import { ToolApi } from "./";
import { AuthActions } from "../auth";
import { AppActions } from "../";
import { AlertType } from "../commons";
import { ModalDialogType } from "../commons/ModalDialog";
import { isAuthenticated, getUserToken } from "../../utils";
import * as _ from "lodash/core";

export const DATA_PENDING = "TOOLS_DATA_PENDING";
export const DATA_LOAD = "TOOLS_DATA_LOAD";
export const DATA_ERROR = "TOOLS_DATA_ERROR";
export const DATA_FILTER = "TOOLS_DATA_FILTER";
export const ADD = "TOOLS_ADD";
export const UPDATE_ID = "TOOLS_UPDATE_ID";
export const DELETE = "TOOLS_DELETE";
export const TOGGLE_FORM = "TOOLS_TOGGLE_FORM";
export const UPDATE_FORM_VALIDITY = "UPDATE_FORM_VALIDITY";
export const FORM_FIELD_CHANGE = "FORM_FIELD_CHANGE";

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
export const updateFormValidity = fieldsValidity => ({
  type: UPDATE_FORM_VALIDITY,
  fieldsValidity
});
export const inputChangeHandler = event =>  ({
  type: FORM_FIELD_CHANGE,
  event
});

export const applyFilter = (searchOnlyTags, searchTerm) => {
  return (dispatch, getState) => {
    dispatch(applyDataFilter(searchOnlyTags, searchTerm));
  };
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

const validate = tool => {
  let validity = {
    title: "",
    link: "",
    description: "",
    tags: "",
    isOk: true
  };

  if (tool.title === "") {
    validity.title += "this field is required; ";
    validity.isOk = false;
  }
  if (tool.link === "") {
    validity.link += "this field is required; ";
    validity.isOk = false;
  }
  if (tool.description === "") {
    validity.description += "this field is required; ";
    validity.isOk = false;
  }

  return validity;
};

export const save = () => {
  return (dispatch, getState) => {
    if (!isAuthenticated(getState())) {
      requireLogin(dispatch);
    } else {
      let tool = getState().ToolReducer.tool;
      const fieldsValidity = validate(tool);
      if (!fieldsValidity.isOk) {
        dispatch(updateFormValidity(fieldsValidity));
      } else {
        // immediately adds the tool to the list
        tool.tags = tool.tags.split(" ");
        let tempId = _.uniqueId("tool");
        dispatch(addToList({
          ...tool,
          id: tempId
        }));
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
