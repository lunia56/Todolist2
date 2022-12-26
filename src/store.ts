import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./redux/todolists-reducer";
import { tasksReducer} from "./redux/tasks-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
        todolist: todolistsReducer,
        task:tasksReducer
    }
)
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// Мы типизируем диспатч потому что в голом редаксе в 18 версии реакта тайпскрипт ругается когда мы создаем мидлвеар и передаем в диспатч санку. Нужна типизация
type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
//и далее по проекту уже используем типизированный AppDispatch
export const AppDispatch = ()=>useDispatch<AppDispatchType>()
// @ts-ignore
window.store = store