import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_UPDATE_STATUS} from "../store/types";
import {fetchGetTasks, isUpdateStatusLoading, setCreateTaskLoading} from "../store/actions";
import {host} from "../conf";

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
        `http://${host}:8000/api/accounts/update-task-status`,
        requestOptions
    );
};

function* updateTaskStatusWorker(info) {
    yield info.setIsUpdateStatusLoading(true);
    yield call(request, info.status, info.taskId);
    yield put(fetchGetTasks())
    yield info.setIsUpdateStatusLoading(false);
}

export function* updateTaskStatusWatcher() {
    yield takeEvery(FETCH_UPDATE_STATUS, updateTaskStatusWorker);
}
