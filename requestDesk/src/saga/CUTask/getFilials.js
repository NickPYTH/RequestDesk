import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_GET_FILIALS} from "../../store/types";
import {setClientTaskList, setFilials, setIsFilialsLoading} from "../../store/actions";
import {host} from "../../conf";

const request = (username, password) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    return fetch(`http://${host}:8000/api/accounts/get-client-filials`, requestOptions)
};

function* getFilialsWorker(props) {
    yield put(setIsFilialsLoading(true));
    const data = yield call(
        request,
        props.username,
        props.password
    );
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setFilials(json.filials));
    }
    yield put(setIsFilialsLoading(false));
}

export function* getFilialsWatcher() {
    yield takeEvery(FETCH_GET_FILIALS, getFilialsWorker);
}
