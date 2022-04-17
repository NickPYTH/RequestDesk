import {
    FETCH_CREATE_TASK,
    FETCH_GET_CLIENT_TASKS, FETCH_GET_IMAGE, FETCH_GET_TASK_INFO,
    FETCH_LOGIN, IS_TASKS_LOADING,
    LOGOUT, SET_CLIENT_TASK_LIST, SET_CREATE_TASK_LOADING, SET_IMAGE_IDS,
    SET_IS_CLIENT, SET_IS_CREATE_TASK_LOADING,
    SET_IS_EXECUTOR, SET_IS_LOADING_TASK_INFO,
    SET_IS_LOGIN,
    SET_IS_LOGIN_LOADING, SET_REDIRECT_AFTER_CREATE, SET_TASK_INFO, SET_USER_INFO
} from "./types";

export const setIsLoadingTaskInfo = (value) => ({
    type: SET_IS_LOADING_TASK_INFO,
    value
})

export const setIsLogin = (value) => ({
    type: SET_IS_LOGIN,
    value
})

export const fetchLogin = (phone, password) => ({
    type: FETCH_LOGIN,
    phone,
    password
})

export const setIsLoginLoading = (value) => ({
    type: SET_IS_LOGIN_LOADING,
    value
})

export const setIsClient = (value) => ({
    type: SET_IS_CLIENT,
    value
})

export const setIsExecutor = (value) => ({
    type: SET_IS_EXECUTOR,
    value
})

export const logout = () => ({
    type: LOGOUT
})

export const fetchGetClientTasks = (userInfo) => ({
    type: FETCH_GET_CLIENT_TASKS,
    userInfo
})

export const setUserInfo = (info) => ({
    type: SET_USER_INFO,
    info
})

export const isTasksLoading = (value) => ({
    type: IS_TASKS_LOADING,
    value
})

export const setClientTaskList = (list) => ({
    type: SET_CLIENT_TASK_LIST,
    list
})

export const fetchGetTaskInfo = (phone, email, taskId) => ({
    type: FETCH_GET_TASK_INFO,
    phone, email, taskId
})

export const setTaskInfo = (info) => ({
    type: SET_TASK_INFO,
    info
})

export const fetchGetImage = (image_ids) => ({
    type: FETCH_GET_IMAGE,
    image_ids
})

export const setImageIds = (id) => ({
    type: SET_IMAGE_IDS,
    id
})

export const fetchCreateTask = (title, description, phone, email, object, equipment, images) => ({
    type: FETCH_CREATE_TASK,
    title, description, phone, email, object, equipment, images
})

export const setCreateTaskLoading = (value) => ({
    type: SET_IS_CREATE_TASK_LOADING,
    value
})

export const setRedirectAfterCreate = (value) => ({
    type: SET_REDIRECT_AFTER_CREATE,
    value
})