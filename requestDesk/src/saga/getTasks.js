import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GET_TASKS} from "../store/types";
import {isTasksLoading, setTaskList} from "../store/actions";

const fetchGetTasks = () => {

    let requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    return fetch(
        "http://176.57.217.201:8888/api/accounts/get-tasks",
        requestOptions
    );
};

function* getTasksWorker() {
    yield put(isTasksLoading(true));
    const data = yield call(fetchGetTasks);
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setTaskList(json.tasks));
    }
    yield put(isTasksLoading(false));
}

export function* getExeTasksWatcher() {
    yield takeEvery(FETCH_GET_TASKS, getTasksWorker);
}
