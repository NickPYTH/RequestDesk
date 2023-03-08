import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_LOGIN } from "../store/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    setIsClient, setIsExecutor,
    setIsLoginLoading, setUserInfo,
} from "../store/actions";
import {host} from "../conf";

const fetchLogin = (phone, password) => {
    let formData = new FormData();
    formData.append("username", phone);
    formData.append("password", password);

    let requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };

    return fetch(
        `http://${host}:8000/api/accounts/login`,
        requestOptions
    );
};

function* loginWorker(info) {
    yield put(setIsLoginLoading(true));
    const data = yield call(fetchLogin, info.phone, info.password);
    console.log(data)
    if (data.status === 200) {
        console.log('here')
        const json = yield call(() => new Promise((res) => res(data.json())));
        if (json.user === "client") yield put(setIsClient(true));
        else if (json.user === "executor") yield put(setIsExecutor(true));
        yield put(
            setUserInfo({
                username: info.phone,
                password: info.password,
                email: json.email,
                phone: json.phone,
                name: json.name,
                surname: json.surname,
                secondName: json.secondName,
                equipments: json.equipments,
                objects: json.objects
            })
        );
        const storeData = async (value) => {
            try {
                await AsyncStorage.setItem("username", info.phone);
                await AsyncStorage.setItem("password", info.password);

                await AsyncStorage.setItem("name", json.name);
                await AsyncStorage.setItem("surname", json.surname);
                await AsyncStorage.setItem("secondName", json.secondName);
                await AsyncStorage.setItem("email", json.email);
            } catch (e) {
                // saving error
            }
        };
        storeData();
    }
    else{
        console.log('here')
        yield put(setIsLoginLoading(false));
        AsyncStorage.clear()
    }
    yield put(setIsLoginLoading(false));
}

export function* authWatcher() {
    yield takeEvery(FETCH_LOGIN, loginWorker);
}
