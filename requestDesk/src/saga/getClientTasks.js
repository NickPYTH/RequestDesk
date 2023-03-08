import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GET_CLIENT_TASKS, FETCH_LOGIN } from "../store/types";
import {
    setIsTasksLoading,
    setClientTaskList,
    setIsClient,
    setIsExecutor,
    setIsLoginLoading,
} from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {host} from "../conf";

const fetchGetTasks = (username, password) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };

    return fetch(
        `http://${host}:8000/api/accounts/get-client-task`,
        requestOptions
    );
};

function* getTasksWorker(info) {
    yield put(setIsTasksLoading(true));
    const data = yield call(
        fetchGetTasks,
        info.userInfo.username,
        info.userInfo.password
    );
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setClientTaskList(json.tasks));
    }
    yield put(setIsTasksLoading(false));
}

export function* getTasksWatcher() {
    yield takeEvery(FETCH_GET_CLIENT_TASKS, getTasksWorker);
}
