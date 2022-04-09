import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_LOGIN} from "../store/types";
import {setIsClient, setIsExecutor, setIsLoginLoading} from "../store/actions";


const fetchLogin = (phone, password) => {
    let formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    return fetch("http://176.57.217.201:9798/api/accounts/login", requestOptions)
};

function* loginWorker(info) {
    yield put(setIsLoginLoading(true))
    const data = yield call(fetchLogin, info.phone, info.password);
    if (data.status===200){
        const json = yield call(() => new Promise((res) => res(data.json())));
        if (json.user==="client")
            yield put(setIsClient(true))
        else if (json.user==="executor")
            yield put(setIsExecutor(true))
    }
    yield put(setIsLoginLoading(false))
}

export function* authWatcher() {
    yield takeEvery(FETCH_LOGIN, loginWorker);
}