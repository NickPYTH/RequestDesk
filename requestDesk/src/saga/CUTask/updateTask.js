import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_UPDATE_TASK} from "../../store/types";
import { setCreateTaskLoading, setRedirectAfterCreate } from "../../store/actions";
import {host} from "../../conf";

const request = (props) => {
    let formData = new FormData();
    formData.append("taskId", props.taskId);
    formData.append("username", props.username);
    formData.append("password", props.password);
    formData.append("email", props.email);
    formData.append("filial", props.filial);
    formData.append("title", props.title);
    formData.append("description", props.description);
    formData.append("object", props.obj);
    formData.append("equipment", props.equipment.split('|')[0]);
    let imageIds = [];
    props.images.map((image, id) => {
        console.log(image)
        if (!image.oldPhoto) {
            let name = `name${id + Math.random()}`;
            formData.append(name, {
                name,
                type: "image/jpeg",
                uri: image.uri,
            });
        }
        else {
            imageIds = imageIds.concat(image.imageId)
        }
    });
    formData.append("oldImages", imageIds.toString())
    formData.append("test", "imageIds")
    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };
    return fetch(
        `http://${host}:8000/api/accounts/update-task`,
        requestOptions
    );
};

function* updateTaskWorker(info) {
    yield put(setCreateTaskLoading(true));
    const data = yield call(
        request,
        info.props
    );
    const json = yield call(()  => new Promise(res=>res(data)))
    yield put(setCreateTaskLoading(false));
    yield put(setRedirectAfterCreate(true));
}

export function* updateTaskWatcher() {
    yield takeEvery(FETCH_UPDATE_TASK, updateTaskWorker);
}
