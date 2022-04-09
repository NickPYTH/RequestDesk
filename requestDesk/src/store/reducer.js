import {SET_IS_CLIENT, SET_IS_EXECUTOR, SET_IS_LOGIN, SET_IS_LOGIN_LOADING} from "./types";

const INITIAL_STATE = {
    isLogin: false,
    isLoginLoading: false,
    isClient: false,
    isExecutor: false
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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