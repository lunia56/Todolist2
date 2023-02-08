import {Dispatch} from 'redux';
import {authAPI, ResultCode} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as null | string
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setIsInitialized(state,action:PayloadAction<{init:boolean}>){
            state.isInitialized=action.payload.init
        },
        setAppError(state,action:PayloadAction<{error: null | string}>){
            state.error=action.payload.error
        }
    }
})
export const appReducer = slice.reducer
export const {setAppStatus,setIsInitialized,setAppError} = slice.actions


export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatus({status:'succeeded'}))
            dispatch(setIsInitialized({init:true}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setIsInitialized({init:true}))
    }
}
