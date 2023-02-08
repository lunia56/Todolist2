import {Dispatch} from 'redux'
import {setAppStatus} from '../../app/app-reducer'
import {authAPI, AuthUserType, ResultCode} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {clearTodolistDataAC} from '../TodolistsList/todolists-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
// на async
export const loginTC = (data: AuthUserType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    // @ts-ignore
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatus({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {

        //@ts-ignore
        handleServerNetworkError(error, dispatch)
    }
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatus({status:'succeeded'}))
                dispatch(clearTodolistDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
