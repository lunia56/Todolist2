import {Dispatch} from 'redux'
import {setAppErrorType, setAppStatus, setAppStatusType} from '../../app/app-reducer'
import {authAPI, AuthUserType, ResultCode} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {ClearDataActionType, clearTodolistDataAC} from '../TodolistsList/todolists-reducer';

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
// на async
export const loginTC = (data: AuthUserType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    // @ts-ignore
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {

        //@ts-ignore
        handleServerNetworkError(error, dispatch)
    }
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatus('succeeded'))
                dispatch(clearTodolistDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | setAppStatusType | setAppErrorType|ClearDataActionType
