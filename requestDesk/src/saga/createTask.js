import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_CREATE_TASK} from "../store/types";

const fetchCreateTask = (title, description, phone, email, object, equipment, images) => {
    let formData = new FormData();
    formData.append("phone", phone);
    formData.append("email", email);

    formData.append("title", title);
    formData.append("description", description);
    formData.append("object", 'equipment');
    images.map((image, id)=>{
        formData.append('file', {
            name: `name${id}.jpg`,
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
    const data = yield call(fetchCreateTask, info.title, info.description, info.phone, info.email, info.object, info.equipment, info.images);
    if (data.status===201){

    }

}

export function* createTaskWatcher() {
    yield takeEvery(FETCH_CREATE_TASK, createTaskWorker);
}