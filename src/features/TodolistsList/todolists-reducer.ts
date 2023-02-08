import {ResultCode, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatus} from '../../app/app-reducer';
import {AxiosError} from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasksTC} from './tasks-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
           //  возвращаем значение стейта. Нельзя переприсваивать стейт так: state = | потому что убьется внутренняя логика immer js
           return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        clearTodolistDataAC(state, action: PayloadAction) {
            return []
        }
    }
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatus,
    clearTodolistDataAC
} = slice.actions

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: any) => {
        dispatch(setAppStatus({status: "loading"}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatus({status: "succeeded"}))
                return res.data
            }).then((todos) => {
            todos.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id))
            })

        })
            .catch((error: AxiosError<{ message: string }>) => {
                const err = error.response ? error.response.data.message : error.message
                handleServerNetworkError(err, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: "loading"}))
        dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(removeTodolistAC({id: todolistId}))
                    dispatch(setAppStatus({status: "succeeded"}))

                } else {
                    handleServerAppError(res.data, dispatch)
                }

            }).catch((error: AxiosError<{ message: string }>) => {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(err, dispatch)
            dispatch(changeTodolistEntityStatus({id: todolistId, status: 'idle'}))
        })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: "loading"}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setAppStatus({status: "succeeded"}))
                } else {
                    //типизация дженериковой функции для себя, что бы не забыть какую дату мы передаем
                    handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
                }
            }).catch((error: AxiosError<{ message: string }>) => {
            const err = error.response ? error.response.data.message : error.message
            handleServerNetworkError(err, dispatch)
        })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: "loading"}))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(changeTodolistTitleAC({id: id, title: title}))
                    dispatch(setAppStatus({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    }
}



export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
