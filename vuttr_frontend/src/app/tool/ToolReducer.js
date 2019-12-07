import * as ToolActions from "./ToolActions";

const initialState = {
  fetchState: "todo",
  tools: [],
  isToolFormOpen: false,
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case ToolActions.TOOL_ADD: {
      return {
        ...state,
        isToolFormOpen: !state.isToolFormOpen,
        tools:[
          action.tool,
          ...state.tools,
        ]
      };
    }
    case ToolActions.TOOL_UPDATE_ID: {
      let tool = state.tools.find(t => t.title === action.tool.title);
      tool.id = action.tool.id;
      return {
        ...state,
        isToolFormOpen: !state.isToolFormOpen,
      };
    }
    case ToolActions.TOOL_DELETE: {
      let newToolList = state.tools.filter((t) => t.id !== action.tool.id);
      return {
        ...state,
        tools: newToolList
      };
    }
    case ToolActions.TOOL_TOGGLE_FORM: {
      return {
        ...state,
        isToolFormOpen: !state.isToolFormOpen,
      };
    }
    case ToolActions.TOOL_LOADING: {
      return {
        ...state,
        fetchState: "loading"
      };
    }
    case ToolActions.TOOL_LOAD: {
      return {
        ...state,
        fetchState: "loaded",
        tools: [...state.tools, ...action.tools]
      };
    }
    case ToolActions.TOOL_FILTER: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
