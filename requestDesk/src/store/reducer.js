import {
    FETCH_GET_TASK_INFO,
    IS_TASKS_LOADING,
    LOGOUT,
    SET_CLIENT_TASK_LIST,
    SET_IMAGE_IDS,
    SET_IS_CLIENT,
    SET_IS_CREATE_TASK_LOADING,
    SET_IS_EXECUTOR,
    SET_IS_LOADING_TASK_INFO,
    SET_IS_LOGIN,
    SET_IS_LOGIN_LOADING,
    SET_REDIRECT_AFTER_CREATE,
    SET_TASK_INFO,
    SET_USER_INFO, FETCH_UPDATE_TASK, UPDATE_TASK_IMAGES, SET_TASK_LIST, SET_IS_TASKS_LOADING, IS_UPDATE_STATUS_LOADING,
} from "./types";

const INITIAL_STATE = {
    isLogin: false,
    isLoginLoading: false,
    isClient: false,
    isExecutor: false,
    userInfo: null,
    isTasksLoading: false,
    clientTasks: null,
    isTaskInfoLoading: false,
    taskInfo: null,
    imagesIds: null,
    isCreateTaskLoading: false,
    redirectAfterCreate: false,

    tasks: null,
    isUpdateStatusLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_UPDATE_STATUS_LOADING:
            return {
                ...state,
                isUpdateStatusLoading: action.val
            }
        case UPDATE_TASK_IMAGES:
            let newIds = state.taskInfo.images_ids.filter(id=>id!==action.remove_id)
            return {
                ...state,
                taskInfo: {...state.taskInfo, images_ids: newIds}

            }
        case SET_REDIRECT_AFTER_CREATE:
            return {
                ...state,
                redirectAfterCreate: action.value,
            };
        case SET_IS_CREATE_TASK_LOADING:
            return {
                ...state,
                isCreateTaskLoading: action.value,
            };
        case SET_IMAGE_IDS:
            return {
                ...state,
                imagesIds: action.ids,
            };
        case SET_TASK_INFO:
            return {
                ...state,
                taskInfo: action.info,
            };
        case SET_IS_LOADING_TASK_INFO:
            return {
                ...state,
                isTaskInfoLoading: action.value,
            };
        case SET_CLIENT_TASK_LIST:
            return {
                ...state,
                clientTasks: action.list,
            };
        case SET_TASK_LIST:
            return {
                ...state,
                tasks: action.tasks,
            };
        case IS_TASKS_LOADING:
            return {
                ...state,
                isTasksLoading: action.val,
            };
        case LOGOUT:
            return {
                isLogin: false,
                isLoginLoading: false,
                isClient: false,
                isExecutor: false,
                userInfo: null,
            };
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.info,
            };
        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.value,
            };
        case SET_IS_LOGIN_LOADING:
            return {
                ...state,
                isLoginLoading: action.value,
            };
        case SET_IS_CLIENT:
            return {
                ...state,
                isClient: action.value,
            };
        case SET_IS_EXECUTOR:
            return {
                ...state,
                isExecutor: action.value,
            };
        default:
            return state;
    }
};
