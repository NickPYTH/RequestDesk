import { all } from "redux-saga/effects";
import {authWatcher} from "./auth";
import {getTasksWatcher} from "./getClientTasks";
export function* rootWatcher() {
    yield all([authWatcher(),getTasksWatcher()]);
}