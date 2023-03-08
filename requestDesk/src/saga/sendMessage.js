import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_CREATE_TASK, SEND_COMMENT} from "../store/types";
import {host} from "../conf";

const request = (
    taskId,
    message,
    toExecutor,
) => {
    const dateNow = new Date().toLocaleDateString();
    const timeNow = new Date().toLocaleTimeString().slice(0,-3);
    let formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("comment", message);
    formData.append("toExecutor", toExecutor);
    formData.append("time", timeNow+' '+dateNow);

    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };
    return fetch(
        `http://${host}:8000/api/accounts/send-comment`,
        requestOptions
    );
};

function* sendMessageWorker(info) {
    yield call(
        request,
        info.taskId,
        info.message,
        info.toExecutor,
    );
}

export function* sendMessageWatcher() {
    yield takeEvery(SEND_COMMENT, sendMessageWorker);
}
