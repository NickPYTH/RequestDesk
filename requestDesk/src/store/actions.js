import {FETCH_LOGIN, SET_IS_CLIENT, SET_IS_EXECUTOR, SET_IS_LOGIN, SET_IS_LOGIN_LOADING} from "./types";

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