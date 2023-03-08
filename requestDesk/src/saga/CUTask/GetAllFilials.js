import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_GET_FILIALS, GET_ALL_FILIALS} from "../../store/types";
import {setClientTaskList, setFilials, setIsFilialsLoading, setObjects} from "../../store/actions";
import {host} from "../../conf";

const request = () => {

    let requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    return fetch(`http://${host}:8000/api/accounts/get-all-filials`, requestOptions)
};

function* worker() {
    yield put(setIsFilialsLoading(true));
    const data = yield call(request);
    console.log('-->', data)
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setFilials(json.filials));
        yield put(setObjects(json.objects))
    }
    yield put(setIsFilialsLoading(false));
}

export function* getAllFilialsWatcher() {
    yield takeEvery(GET_ALL_FILIALS, worker);
}
