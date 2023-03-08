import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GET_TASKS} from "../store/types";
import {setIsTasksLoading, setTaskList} from "../store/actions";
import {host} from "../conf";

const fetchGetTasks = () => {

    let requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    return fetch(
        `http://${host}:8000/api/accounts/get-tasks`,
        requestOptions
    );
};

function* getTasksWorker() {
    yield put(setIsTasksLoading(true));
    const data = yield call(fetchGetTasks);
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setTaskList(json.tasks));
    }
    yield put(setIsTasksLoading(false));
}

export function* getExeTasksWatcher() {
    yield takeEvery(FETCH_GET_TASKS, getTasksWorker);
}
