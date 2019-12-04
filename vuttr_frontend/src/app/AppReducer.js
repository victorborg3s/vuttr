import * as AppActions from './AppActions';
import { ERoute } from '../routes';

const initialState = {
    currentPage: ERoute.HOME,
    fetchState: "todo",
    tools: [],
    alerts: [],
    authToken: '',
    sessionUser: {}
}

export default function AppReducer(state = initialState, action) {
    var newAlerts = [];
    switch (action.type) {
        case AppActions.TOOLS_ADD: {
            return {
                ...state,
            };
        }
        case AppActions.TOOLS_UNDO_ADD: {
            return {
                ...state,
            };
        }
        case AppActions.TOOLS_DELETE: {
            return {
                ...state,
            };
        }
        case AppActions.TOOLS_UNDO_DELETE: {
            return {
                ...state,
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
            };
        }
        case AppActions.TOOLS_FILTER: {
            return {
                ...state,
            };
        }
        case AppActions.APP_SIGN_OUT: {
            return {
                ...state,
            };
        }
        case AppActions.APP_TOKEN_REGISTER: {
            return {
                ...state,
            };
        }
        case AppActions.APP_ALERT_SHOW: {
            return {
                ...state,
            };
        }
        case AppActions.APP_ALERT_DISMISS: {
            return {
                ...state,
            };
        }
        default:
            return state
    }
}