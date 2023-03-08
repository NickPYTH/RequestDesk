import {
    FETCH_GET_TASK_INFO,
    SET_IS_TASKS_LOADING,
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
    SET_USER_INFO,
    UPDATE_TASK_IMAGES,
    SET_TASK_LIST,
    IS_UPDATE_STATUS_LOADING,
    SET_COMMENTS,
    SET_IS_FILIALS_LOADING,
    SET_IS_OBJECTS_LOADING,
    SET_IS_EQUIPMENTS_LOADING,
    SET_FILIALS,
    SET_OBJECTS,
    SET_EQUIPMENTS,
} from "./types";

const INITIAL_STATE = {
    isLogin: false,
    isLoginLoading: false,
    isClient: false,
    isExecutor: false,
    userInfo: null,
    isTasksLoading: true,
    clientTasks: null,
    isTaskInfoLoading: false,
    taskInfo: null,
    imagesIds: null,
    isCreateTaskLoading: false,
    redirectAfterCreate: false,
    tasks: null,
    isUpdateStatusLoading: false,
    comments: [],

    isFilialsLoading: false,
    filials: null,
    isObjectsLoading: false,
    objects: null,
    isEquipmentsLoading: false,
    equipments: null
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_FILIALS_LOADING:
            return {
                ...state,
                isFilialsLoading: action.val
            }
        case SET_IS_OBJECTS_LOADING:
            return {
                ...state,
                isObjectsLoading: action.val
            }
        case SET_IS_EQUIPMENTS_LOADING:
            return {
                ...state,
                isEquipmentsLoading: action.val
            }
        case SET_FILIALS:
            return {
                ...state,
                filials: action.filials
            }
        case SET_OBJECTS:
            return {
                ...state,
                objects: action.objects
            }
        case SET_EQUIPMENTS:
            return {
                ...state,
                equipments: action.equipments
            }
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
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
        case SET_IS_TASKS_LOADING:
            return {
                ...state,
                isTasksLoading: action.value,
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
