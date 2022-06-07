import { all } from "redux-saga/effects";
import { authWatcher } from "./auth";
import { getTasksWatcher } from "./getClientTasks";
import { getTaskWatcher } from "./getTask";
import { getImagesWatcher } from "./getImages";
import { createTaskWatcher } from "./createTask";
import {updateTaskWatcher} from "./updateTask";
import {getExeTasksWatcher} from "./getTasks";
import {updateTaskStatusWatcher} from "./updateTaskStatus";
import {sendMessageWatcher} from "./sendMessage";
import {getMessagesWatcher} from "./getMessages";
export function* rootWatcher() {
    yield all([
        authWatcher(),
        getTasksWatcher(),
        getTaskWatcher(),
        getImagesWatcher(),
        createTaskWatcher(),
        updateTaskWatcher(),
        getExeTasksWatcher(),
        updateTaskStatusWatcher(),
        sendMessageWatcher(),
        getMessagesWatcher()
    ]);
}
