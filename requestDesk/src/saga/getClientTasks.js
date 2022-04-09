import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_GET_CLIENT_TASKS, FETCH_LOGIN} from "../store/types";
import {isTasksLoading, setClientTaskList, setIsClient, setIsExecutor, setIsLoginLoading} from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";


const fetchGetTasks = (phone, email) => {
    let formData = new FormData();
    formData.append("phone", phone);
    formData.append("email", email);

    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    return fetch("http://176.57.217.201:9798/api/accounts/get-client-task", requestOptions)
};

function* getTasksWorker(info) {
    yield put(isTasksLoading(true))
    const data = yield call(fetchGetTasks, info.userInfo.phone, info.userInfo.email);
    if (data.status===200){
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield(put(setClientTaskList(json.tasks)))
    }
    yield put(isTasksLoading(false))
}

export function* getTasksWatcher() {
    yield takeEvery(FETCH_GET_CLIENT_TASKS, getTasksWorker);
}