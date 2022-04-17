import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_CREATE_TASK} from "../store/types";
import {setCreateTaskLoading, setRedirectAfterCreate} from "../store/actions";

const fetchCreateTask = (title, description, phone, email, object, equipment, images) => {
    let formData = new FormData();
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("equipment", equipment.title);
    images.map((image, id)=>{
        formData.append('file', {
            name: `name${id+Math.random()}.jpg`,
            type: "image/jpeg",
            uri: image.uri,
        });
    })
    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    return fetch("http://176.57.217.201:9798/api/accounts/create-task", requestOptions)
};

function* createTaskWorker(info) {
    yield put(setCreateTaskLoading(true))
    yield call(fetchCreateTask, info.title, info.description, info.phone, info.email, info.object, info.equipment, info.images);
    yield put(setCreateTaskLoading(false))
    yield put(setRedirectAfterCreate(true))

}

export function* createTaskWatcher() {
    yield takeEvery(FETCH_CREATE_TASK, createTaskWorker);
}