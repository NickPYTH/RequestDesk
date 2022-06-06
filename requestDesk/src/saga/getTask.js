import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GET_TASK_INFO } from "../store/types";
import { setIsLoadingTaskInfo, setTaskInfo } from "../store/actions";

const fetchGetTask = (phone, email, taskId) => {
    let formData = new FormData();
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("id", taskId);

    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };

    return fetch(
        "http://176.57.217.201:8888/api/accounts/get-task",
        requestOptions
    );
};

function* getTaskWorker(info) {
    yield put(setTaskInfo(null));
    yield put(setIsLoadingTaskInfo(true));
    const data = yield call(fetchGetTask, info.phone, info.email, info.taskId);
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setTaskInfo(json));
    }
    yield put(setIsLoadingTaskInfo(false));
}

export function* getTaskWatcher() {
    yield takeEvery(FETCH_GET_TASK_INFO, getTaskWorker);
}
