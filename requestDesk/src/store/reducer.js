import {
    IS_TASKS_LOADING,
    LOGOUT, SET_CLIENT_TASK_LIST,
    SET_IS_CLIENT,
    SET_IS_EXECUTOR,
    SET_IS_LOGIN,
    SET_IS_LOGIN_LOADING,
    SET_USER_INFO
} from "./types";

const INITIAL_STATE = {
    isLogin: false,
    isLoginLoading: false,
    isClient: false,
    isExecutor: false,
    userInfo: null,
    isTasksLoading: false,
    clientTasks: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CLIENT_TASK_LIST:
            return {
                ...state,
                clientTasks: action.list
            }
        case IS_TASKS_LOADING:
            return {
                ...state,
                isTasksLoading: action.value,
            }
        case LOGOUT:
            return {
                isLogin: false,
                isLoginLoading: false,
                isClient: false,
                isExecutor: false,
                userInfo: null,
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.info
            }
        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.value
            }
        case SET_IS_LOGIN_LOADING:
            return {
                ...state,
                isLoginLoading: action.value
            }
        case SET_IS_CLIENT:
            return {
                ...state,
                isClient: action.value
            }
        case SET_IS_EXECUTOR:
            return {
                ...state,
                isExecutor: action.value
            }
        default:
            return state;
    }
}