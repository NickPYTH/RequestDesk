import { all } from "redux-saga/effects";
import { authWatcher } from "./auth";
import { getTasksWatcher } from "./getClientTasks";
import { getTaskWatcher } from "./getTask";
import { getImagesWatcher } from "./getImages";
import { createTaskWatcher } from "./CUTask/createTask";
import {updateTaskWatcher} from "./CUTask/updateTask";
import {getExeTasksWatcher} from "./getTasks";
import {updateTaskStatusWatcher} from "./updateTaskStatus";
import {sendMessageWatcher} from "./sendMessage";
import {getMessagesWatcher} from "./getMessages";
import {getFilialsWatcher} from "./CUTask/getFilials";
import {getObjectsWatcher} from "./CUTask/getObjects";
import {getEquipmentsWatcher} from "./CUTask/getEquipments";
import {getAllFilialsWatcher} from "./CUTask/GetAllFilials";
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
        getMessagesWatcher(),
        getFilialsWatcher(),
        getObjectsWatcher(),
        getEquipmentsWatcher(),
        getAllFilialsWatcher()
    ]);
}
