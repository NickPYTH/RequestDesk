import {
    FETCH_GET_CLIENT_TASKS,
    FETCH_LOGIN, IS_TASKS_LOADING,
    LOGOUT, SET_CLIENT_TASK_LIST,
    SET_IS_CLIENT,
    SET_IS_EXECUTOR,
    SET_IS_LOGIN,
    SET_IS_LOGIN_LOADING, SET_USER_INFO
} from "./types";

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
