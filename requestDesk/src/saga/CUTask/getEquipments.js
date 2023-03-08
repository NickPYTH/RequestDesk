import { call, put, takeEvery } from "redux-saga/effects";
import {FETCH_GET_EQUIPMENTS} from "../../store/types";
import {setEquipments, setIsEquipmentsLoading} from "../../store/actions";
import {host} from "../../conf";

const request = (username, filial, object) => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("filial", filial);
    formData.append("object", object);
    let requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    return fetch(`http://${host}:8000/api/accounts/get-equipments-by-object`, requestOptions)
};

function* getEquipmentsWorker(props) {
    yield put(setIsEquipmentsLoading(true));
    const data = yield call(
        request,
        props.username,
        props.filial,
        props.object
    );
    if (data.status === 200) {
        const json = yield call(() => new Promise((res) => res(data.json())));
        yield put(setEquipments(json.equipments));
    }
    yield put(setIsEquipmentsLoading(false));
}

export function* getEquipmentsWatcher() {
    yield takeEvery(FETCH_GET_EQUIPMENTS, getEquipmentsWorker);
}
