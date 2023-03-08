import {
    FETCH_CREATE_TASK,
    FETCH_GET_CLIENT_TASKS,
    FETCH_GET_IMAGE,
    FETCH_GET_TASK_INFO,
    FETCH_LOGIN,
    SET_IS_TASKS_LOADING,
    LOGOUT,
    SET_CLIENT_TASK_LIST,
    SET_IMAGE_IDS,
    SET_IS_CLIENT,
    SET_IS_CREATE_TASK_LOADING,
    SET_IS_EXECUTOR,
    SET_IS_LOADING_TASK_INFO,
    SET_IS_LOGIN,
    SET_IS_LOGIN_LOADING,
    SET_REDIRECT_AFTER_CREATE,
    SET_TASK_INFO,
    SET_USER_INFO,
    FETCH_UPDATE_TASK,
    UPDATE_TASK_IMAGES,
    SET_TASK_LIST,
    FETCH_GET_TASKS,
    FETCH_UPDATE_STATUS,
    IS_UPDATE_STATUS_LOADING,
    SEND_COMMENT,
    GET_COMMENTS,
    SET_COMMENTS,
    FETCH_GET_FILIALS,
    SET_IS_FILIALS_LOADING,
    SET_FILIALS,
    FETCH_GET_OBJECTS,
    SET_IS_OBJECTS_LOADING,
    SET_OBJECTS,
    FETCH_GET_EQUIPMENTS,
    SET_IS_EQUIPMENTS_LOADING, SET_EQUIPMENTS, GET_ALL_FILIALS,
} from "./types";

export const setIsLoadingTaskInfo = (value) => ({
    type: SET_IS_LOADING_TASK_INFO,
    value,
});

export const setIsLogin = (value) => ({
    type: SET_IS_LOGIN,
    value,
});

export const fetchLogin = (phone, password) => ({
    type: FETCH_LOGIN,
    phone,
    password,
});

export const setIsLoginLoading = (value) => ({
    type: SET_IS_LOGIN_LOADING,
    value,
});

export const setIsClient = (value) => ({
    type: SET_IS_CLIENT,
    value,
});

export const setIsExecutor = (value) => ({
    type: SET_IS_EXECUTOR,
    value,
});

export const logout = () => ({
    type: LOGOUT,
});

export const fetchGetClientTasks = (userInfo) => ({
    type: FETCH_GET_CLIENT_TASKS,
    userInfo,
});

export const setUserInfo = (info) => ({
    type: SET_USER_INFO,
    info,
});

export const setIsTasksLoading = (value) => ({
    type: SET_IS_TASKS_LOADING,
    value,
});

export const setClientTaskList = (list) => ({
    type: SET_CLIENT_TASK_LIST,
    list,
});

export const fetchGetTaskInfo = (phone, email, taskId) => ({
    type: FETCH_GET_TASK_INFO,
    phone,
    email,
    taskId,
});

export const setTaskInfo = (info) => ({
    type: SET_TASK_INFO,
    info,
});

export const fetchGetImage = (image_ids) => ({
    type: FETCH_GET_IMAGE,
    image_ids,
});

export const setImageIds = (id) => ({
    type: SET_IMAGE_IDS,
    id,
});

export const fetchCreateTask = (props) => ({
    type: FETCH_CREATE_TASK,
    props
});

export const setCreateTaskLoading = (value) => ({
    type: SET_IS_CREATE_TASK_LOADING,
    value,
});

export const setRedirectAfterCreate = (value) => ({
    type: SET_REDIRECT_AFTER_CREATE,
    value,
});

export const updateTaskImages = (remove_id) => ({
    type: UPDATE_TASK_IMAGES,
    remove_id
})

export const fetchUpdateTask = (props) => ({
    type: FETCH_UPDATE_TASK,
    props
})

export const getAllFilials = () => ({
    type: GET_ALL_FILIALS
})

export const setTaskList = (tasks) => ({
    type: SET_TASK_LIST,
    tasks
})

export const fetchGetTasks = () => ({
    type: FETCH_GET_TASKS
})

export const fetchUpdateStatus = (status, taskId, setIsUpdateStatusLoading) => ({
    type: FETCH_UPDATE_STATUS,
    status, taskId, setIsUpdateStatusLoading
})

export const isUpdateStatusLoading = (val) => ({
    type: IS_UPDATE_STATUS_LOADING,
    val
})

export const sendComment = (taskId, message, toExecutor) => ({
    type: SEND_COMMENT,
    taskId, message, toExecutor
})

export const getComments = (taskId) => ({
    type: GET_COMMENTS,
    taskId
})

export const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments
})

export const fetchGetFilials = (username, password) => ({
    type: FETCH_GET_FILIALS,
    username, password
})

export const setIsFilialsLoading = (val) => ({
    type: SET_IS_FILIALS_LOADING,
    val
})

export const setFilials = (filials) => ({
    type: SET_FILIALS,
    filials
})

export const fetchGetObjects = (username, filial) => ({
    type: FETCH_GET_OBJECTS,
    username, filial
})

export const setIsObjectsLoading = (val) => ({
    type: SET_IS_OBJECTS_LOADING,
    val
})

export const setObjects = (objects) => ({
    type: SET_OBJECTS,
    objects
})

export const fetchGetEquipments = (username, filial, object) => ({
    type: FETCH_GET_EQUIPMENTS,
    username, filial, object
})

export const setIsEquipmentsLoading = (val) => ({
    type: SET_IS_EQUIPMENTS_LOADING,
    val
})

export const setEquipments = (equipments) => ({
    type: SET_EQUIPMENTS,
    equipments
})
