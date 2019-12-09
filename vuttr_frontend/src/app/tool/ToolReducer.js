import * as ToolActions from "./ToolActions";
import { DataStatus } from "../../utils";

const initialState = {
  data: [],
  dataPage: 0,
  dataHasMore: false,
  dataStatus: DataStatus.INITIAL_LOAD,
  filteredData: [],
  searchTerm: "",
  searchOnlyTags: false,
  isFormOpen: false
};

const applyFilter = (data, onlyTags, term) => {
  console.log("data", data);
  console.log("onlyTags", onlyTags);
  console.log("term", term);
  let filteredData = data.filter((tool) => {
    if (onlyTags) return tool.tags.some( (tag) => tag.indexOf(term) > -1)
    else return tool.tags.some( (tag) => tag.indexOf(term) > -1) || (tool.title.indexOf(term) > -1) || (tool.description.indexOf(term) > -1);
  });
  console.log("filteredData", filteredData);
  return filteredData;
}

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case ToolActions.DATA_PENDING: {
      return {
        ...state,
        dataStatus: DataStatus.PENDING
      };
    }
    case ToolActions.DATA_LOAD: {
      let newDataPage;
      let newData;
      if (action.clean) {
        newDataPage = 0;
        newData = [...action.paginatedResult.content];
      } else {
        newDataPage = state.dataPage + 1;
        newData = [...state.data, ...action.paginatedResult.content];
      }
      return {
        ...state,
        dataStatus: DataStatus.LOADED,
        data: newData,
        filteredData: applyFilter(newData, state.searchOnlyTags, state.searchTerm),
        dataPage: newDataPage,
        dataHasMore:
          action.paginatedResult &&
          action.paginatedResult.content &&
          action.paginatedResult.content.length === action.paginatedResult.size
      };
    }
    case ToolActions.DATA_ERROR: {
      return {
        ...state,
      };
    }
    case ToolActions.DATA_FILTER: {
      return {
        ...state,
        searchTerm: action.searchTerm,
        searchOnlyTags: action.searchOnlyTags,
        filteredData: applyFilter(state.data, action.searchOnlyTags, action.searchTerm)
      };
    }
    case ToolActions.ADD: {
      console.log("Erro: passei por aqui!");
      return {
        ...state,
        isFormOpen: !state.isFormOpen,
        data: [action.tool, ...state.data],
      };
    }
    case ToolActions.UPDATE_ID: {
      let tool = state.data.find(t => t.title === action.tool.title);
      tool.id = action.tool.id;
      return {
        ...state,
        isFormOpen: !state.isFormOpen
      };
    }
    case ToolActions.DELETE: {
      let newToolList = state.data.filter(t => t.id !== action.tool.id);
      return {
        ...state,
        data: newToolList
      };
    }
    case ToolActions.TOGGLE_FORM: {
      return {
        ...state,
        isFormOpen: !state.isFormOpen
      };
    }
    default:
      return state;
  }
}
