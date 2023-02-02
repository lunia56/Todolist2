import {Dispatch} from 'redux';
import {authAPI, ResultCode} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: true}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitialized = (init: boolean) => ({type: 'APP/SET-INITIALIZED', init} as const)

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatus('succeeded'))
            dispatch(setIsInitialized(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setIsInitialized(true))
    }
}


export type setAppStatusType = ReturnType<typeof setAppStatus>
export type setAppErrorType = ReturnType<typeof setAppError>
export type setAppInitializedType = ReturnType<typeof setIsInitialized>

type ActionsType = setAppStatusType | setAppErrorType | setAppInitializedType