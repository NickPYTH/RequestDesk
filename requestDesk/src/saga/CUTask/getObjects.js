import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_GET_OBJECTS} from "../../store/types";
import {setIsObjectsLoading, setObjects} from "../../store/actions";
import {host} from "../../conf";

const request = (username, filial) => {
    let formData = new FormData();
    formData.append("filial", filial);
    formData.append("username", username);

    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    return fetch(`http://${host}:8000/api/accounts/get-object-by-filial`, requestOptions)
};

function* getObjectsWorker(props) {
    yield put(setIsObjectsLoading(true));
    const data = yield call(
        request,
        props.username,
        props.filial
    );
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setObjects(json.objects));
    }
    yield put(setIsObjectsLoading(false));
}

export function* getObjectsWatcher() {
    yield takeEvery(FETCH_GET_OBJECTS, getObjectsWorker);
}
