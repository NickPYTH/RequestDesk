import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_UPDATE_TASK} from "../store/types";
import { setCreateTaskLoading, setRedirectAfterCreate } from "../store/actions";

const request = (
    id, title, description, equipment, removed_photos_ids, images
) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("equipment_number", equipment.split(" ")[0]);
    images.map((image, id) => {
        let name = `name${id + Math.random()}`;
        formData.append(name, {
            name,
            type: "image/jpeg",
            uri: image.uri,
        });
    });
    formData.append("removed_photos_ids", removed_photos_ids.join(' '));
    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };
    return fetch(
        "http://192.168.1.112:8000/api/accounts/update-task",
        requestOptions
    );
};

function* updateTaskWorker(info) {
    yield put(setCreateTaskLoading(true));
    try{
        yield call(request, info.id, info.title, info.description, info.equipment, info.removed_photos_ids, info.images);
    }
    catch (e){}

    yield put(setCreateTaskLoading(false));
    yield put(setRedirectAfterCreate(true));
}

export function* updateTaskWatcher() {
    yield takeEvery(FETCH_UPDATE_TASK, updateTaskWorker);
}
