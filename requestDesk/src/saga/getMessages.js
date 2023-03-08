import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_CREATE_TASK, GET_COMMENTS, SEND_COMMENT} from "../store/types";
import {setComments, setTaskInfo} from "../store/actions";
import {host} from "../conf";

const request = (
    taskId,
) => {
    let formData = new FormData();
    formData.append("taskId", taskId);

    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };
    return fetch(
        `http://${host}:8000/api/accounts/get-comments`,
        requestOptions
    );
};

function* getMessagesWorker(info) {
    const data = yield call(
        request,
        info.taskId,
    );
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setComments(json));
    }
}

export function* getMessagesWatcher() {
    yield takeEvery(GET_COMMENTS, getMessagesWorker);
}
