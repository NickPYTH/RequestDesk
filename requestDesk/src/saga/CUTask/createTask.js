import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_CREATE_TASK } from "../../store/types";
import { setCreateTaskLoading, setRedirectAfterCreate } from "../../store/actions";
import {host} from "../../conf";

const fetchCreateTask = (props) => {
    let formData = new FormData();
    formData.append("username", props.username);
    formData.append("password", props.password);
    formData.append("email", props.email);
    formData.append("filial", props.filial);
    formData.append("title", props.title);
    formData.append("description", props.description);
    formData.append("object", props.obj);
    formData.append("equipment", props.equipment);
    props.images.map((image, id) => {
        let name = `name${id + Math.random()}`;
        formData.append(name, {
            name,
            type: "image/jpeg",
            uri: image.uri,
        });
    });
    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };
    return fetch(
        `http://${host}:8000/api/accounts/create-task`,
        requestOptions
    );
};

function* createTaskWorker(info) {
    yield put(setCreateTaskLoading(true));
    const data = yield call(
        fetchCreateTask,
        info.props
    );
    const json = yield call(()  => new Promise(res=>res(data)))
    yield put(setCreateTaskLoading(false));
    yield put(setRedirectAfterCreate(true));
}

export function* createTaskWatcher() {
    yield takeEvery(FETCH_CREATE_TASK, createTaskWorker);
}
