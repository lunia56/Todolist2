import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./redux/todolists-reducer";
import {tasksReducer} from "./redux/tasks-reducer";

const rootReducer = combineReducers({
        todolist: todolistsReducer,
        task:tasksReducer
    }
)
export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store