import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_UPDATE_STATUS} from "../store/types";
import {isUpdateStatusLoading, setCreateTaskLoading} from "../store/actions";

const request = (
    status, taskId
) => {
    let formData = new FormData();
    formData.append("status", status);
    formData.append("id", taskId);
    let requestOptions = {
        method: "POST",
        redirect: "follow",
        body: formData,
    };
    return fetch(
        "http://192.168.1.112:8000/api/accounts/update-task-status",
        requestOptions
    );
};

function* updateTaskStatusWorker(info) {
    yield put(isUpdateStatusLoading(true));
    yield call(request, info.status, info.taskId);
    yield put(isUpdateStatusLoading(false));
}

export function* updateTaskStatusWatcher() {
    yield takeEvery(FETCH_UPDATE_STATUS, updateTaskStatusWorker);
}
