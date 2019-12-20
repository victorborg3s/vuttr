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
  isFormOpen: false,
  tool: {
    title: "",
    link: "",
    description: "",
    tags: ""
  },
  fieldsValidity: {
    title: "",
    link: "",
    description: "",
    tags: "",
    isOk: true
  }
};

const applyFilter = (data, onlyTags, term) => {
  const lowerTerm = term.toLowerCase();
  let filteredData = data.filter(tool => {
    if (onlyTags)
      return tool.tags.some(tag => tag.toLowerCase().indexOf(lowerTerm) > -1);
    else
      return (
        tool.tags.some(tag => tag.toLowerCase().indexOf(lowerTerm) > -1) ||
        tool.title.toLowerCase().indexOf(lowerTerm) > -1 ||
        tool.description.toLowerCase().indexOf(lowerTerm) > -1
      );
  });
  return filteredData;
};

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
        filteredData: applyFilter(
          newData,
          state.searchOnlyTags,
          state.searchTerm
        ),
        dataPage: newDataPage,
        dataHasMore:
          action.paginatedResult &&
          action.paginatedResult.content &&
          action.paginatedResult.content.length === action.paginatedResult.size
      };
    }
    case ToolActions.DATA_ERROR: {
      return {
        ...state
      };
    }
    case ToolActions.DATA_FILTER: {
      return {
        ...state,
        searchTerm: action.searchTerm,
        searchOnlyTags: action.searchOnlyTags,
        filteredData: applyFilter(
          state.data,
          action.searchOnlyTags,
          action.searchTerm
        )
      };
    }
    case ToolActions.ADD: {
      let newData = [action.tool, ...state.data];
      return {
        ...state,
        isFormOpen: !state.isFormOpen,
        data: newData,
        filteredData: applyFilter(
          newData,
          state.searchOnlyTags,
          state.searchTerm
        ),
      };
    }
    case ToolActions.UPDATE_ID: {
      let index = state.data.findIndex(t => t.title === action.tool.title);
      let tool = state.data[index];
      tool = { ...tool, id: action.tool.id };
      let newData = [...state.data];
      newData[index] = tool;
      return {
        ...state,
        data: newData,
        filteredData: applyFilter(
          newData,
          state.searchOnlyTags,
          state.searchTerm
        )
      };
    }
    case ToolActions.DELETE: {
      let newData = state.data.filter(t => t.id !== action.tool.id);
      return {
        ...state,
        data: newData,
        filteredData: applyFilter(
          newData,
          state.searchOnlyTags,
          state.searchTerm
        )
      };
    }
    case ToolActions.TOGGLE_FORM: {
      return {
        ...state,
        isFormOpen: !state.isFormOpen,
        fieldsValidity: {
          title: "",
          link: "",
          description: "",
          tags: "",
          isOk: true
        },
        tool: {
          title: "",
          link: "",
          description: "",
          tags: ""
        },
      };
    }
    case ToolActions.UPDATE_FORM_VALIDITY: {
      return {
        ...state,
        fieldsValidity: action.fieldsValidity
      };
    }
    case ToolActions.FORM_FIELD_CHANGE: {
      return {
        ...state,
        tool: {
          ...state.tool,
          [action.event.target.name]: action.event.target.value
        }
      };
    }
    default:
      return state;
  }
}
