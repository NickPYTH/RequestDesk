import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_GET_IMAGE} from "../store/types";

const fetchGetImage = (id) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`http://176.57.217.201:9798/api/accounts/get-image-by-id?id=${id}`, requestOptions)
};

function* getImagesWorker(info) {
    const data = yield call(fetchGetImage, info.image_ids);
    yield call(() => new Promise((res) => res(data)));
}

export function* getImagesWatcher() {
    yield takeEvery(FETCH_GET_IMAGE, getImagesWorker);
}