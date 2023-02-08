import {addTodolistAC, changeTodolistEntityStatus, removeTodolistAC, setTodolistsAC,} from './todolists-reducer'
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType, setAppStatus,} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TasksStateType = {}


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        changeTaskEntityStatus(state, action: PayloadAction<{
            taskId: string, todolistId: string, status: RequestStatusType
        }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index].entityStatus = action.payload.status
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })

        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC,(state,action)=>{
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })

    }
})

export const tasksReducer = slice.reducer
export const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTasksAC,
    changeTaskEntityStatus
} = slice.actions


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC({tasks, todolistId})
            dispatch(action)
            dispatch(setAppStatus({status: "succeeded"}))

        })
        .catch((error: AxiosError<{ message: string }>) => {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(err, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(changeTaskEntityStatus({taskId, todolistId, status: 'loading'}))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                const action = removeTaskAC({taskId, todolistId})
                dispatch(action)
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<{ message: string }>) => {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
                dispatch(changeTaskEntityStatus({taskId, todolistId, status: 'idle'}))
            }
        )
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                const task = res.data.data.item
                dispatch(addTaskAC({task}))
                dispatch(setAppStatus({status: 'succeeded'}))
                dispatch(changeTodolistEntityStatus({id: todolistId, status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<{ message: string }>) => {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(err, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatus({status: "loading"}))
        dispatch(changeTaskEntityStatus({taskId, todolistId, status: 'loading'}))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return

        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId, model: domainModel, todolistId})
                    dispatch(action)
                    dispatch(setAppStatus({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<{ message: string }>) => {
                const err = error.response ? error.response.data.message : error.message
                handleServerNetworkError(err, dispatch)
            })
            .finally(() => {
                dispatch(changeTaskEntityStatus({taskId, todolistId, status: 'idle'}))
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

