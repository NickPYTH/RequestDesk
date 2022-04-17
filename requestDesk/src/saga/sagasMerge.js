import { all } from "redux-saga/effects";
import {authWatcher} from "./auth";
import {getTasksWatcher} from "./getClientTasks";
import {getTaskWatcher} from "./getTask";
import {getImagesWatcher} from "./getImages";
import {createTaskWatcher} from "./createTask";
export function* rootWatcher() {
    yield all([authWatcher(),getTasksWatcher(),getTaskWatcher(), getImagesWatcher(),createTaskWatcher()]);
}