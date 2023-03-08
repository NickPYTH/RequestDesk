import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_GET_IMAGE } from "../store/types";
import {host} from "../conf";

const fetchGetImage = (id) => {
    let requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    return fetch(
        `http://${host}:8000/api/accounts/get-image-by-id?id=${id}`,
        requestOptions
    );
};

function* getImagesWorker(info) {
    const data = yield call(fetchGetImage, info.image_ids);
    yield call(() => new Promise((res) => res(data)));
}

export function* getImagesWatcher() {
    yield takeEvery(FETCH_GET_IMAGE, getImagesWorker);
}
