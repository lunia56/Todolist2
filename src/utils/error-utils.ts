import { setAppError, setAppErrorType, setAppStatus, setAppStatusType } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'

// generic function
//ошибка на стороне сервера
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}


//ошибка в случае если не отправлен запрос (проблемы с сетью)
export const handleServerNetworkError = (error: string , dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError(error))
    dispatch(setAppStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<setAppErrorType | setAppStatusType>