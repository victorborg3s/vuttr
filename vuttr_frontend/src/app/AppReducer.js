import * as AppActions from "./AppActions";
import { ERoute } from "../routes";

const initialState = {
  currentPage: ERoute.HOME,
  fetchState: "todo",
  tools: [],
  alerts: [],
  authToken: "",
  sessionUser: {},
  isToolFormOpen: false,
};

export default function AppReducer(state = initialState, action) {
  //var newAlerts = [];
  switch (action.type) {
    case AppActions.TOOLS_ADD: {
      return {
        ...state,
        tools:[
          action.tool,
          ...state.tools,
        ]
      };
    }
    case AppActions.TOOLS_UNDO_ADD: {
      return {
        ...state
      };
    }
    case AppActions.TOOLS_UPDATE_ID: {
      let tool = state.tools.find(t => t.title === action.tool.title);
      tool.id = action.tool.id;
      return {
        ...state,
        isToolFormOpen: !state.isToolFormOpen,
      };
    }
    case AppActions.TOOLS_DELETE: {
      return {
        ...state
      };
    }
    case AppActions.TOOLS_UNDO_DELETE: {
      return {
        ...state
      };
    }
    case AppActions.TOOLS_TOGGLE_FORM: {
      return {
        ...state,
        isToolFormOpen: !state.isToolFormOpen,
      };
    }
    case AppActions.TOOLS_LOADING: {
      return {
        ...state,
        fetchState: "loading"
      };
    }
    case AppActions.TOOLS_LOAD: {
      return {
        ...state,
        fetchState: "loaded",
        tools: [...state.tools, ...action.tools]
      };
    }
    case AppActions.TOOLS_FILTER: {
      return {
        ...state
      };
    }
    case AppActions.APP_SIGN_OUT: {
      return {
        ...state
      };
    }
    case AppActions.APP_TOKEN_REGISTER: {
      return {
        ...state
      };
    }
    case AppActions.APP_ALERT_SHOW: {
      return {
        ...state
      };
    }
    case AppActions.APP_ALERT_DISMISS: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
