 import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {
    ADD_TODOLIST,
    AddTodolistAT,
    REMOVE_TODOLIST,
    RemoveTodolistAT,
    todoListId_1,
    todoListId_2,
    todoListId_3
} from './todolists-reducer';

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleAT = ReturnType<typeof changeTaskTitleAC>

export type ActionType = RemoveTaskAT | AddTaskAT | ChangeStatusAT | ChangeTitleAT | AddTodolistAT | RemoveTodolistAT
const initialState = {
    [todoListId_1]: [
        {id: v1(), title: 'HTML', isDone: true}, // => t
        {id: v1(), title: 'CSS', isDone: true}, // => {...t, isDone}
        {id: v1(), title: 'JS/TS', isDone: false}, // => t
    ],
    [todoListId_2]: [
        {id: v1(), title: 'Milk', isDone: true}, // => t
        {id: v1(), title: 'chees', isDone: true}, // => {...t, isDone}
        {id: v1(), title: 'pancel', isDone: false}, // => t
    ],
    [todoListId_3]: [
        {id: v1(), title: 'working', isDone: false}, // => t
        {id: v1(), title: 'learning', isDone: false}, // => {...t, isDone}
        {id: v1(), title: 'relaxation', isDone: true}, // => t
    ]
}
export const tasksReducer = (state: TaskStateType=initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.TaskId)}
        case ADD_TASK:
            return {
                ...state,
                [action.todolistId]:[{id:v1(),title:action.title,isDone:false},...state[action.todolistId]]
            }
        case CHANGE_TASK_STATUS:
        // {
        //     let todolistTasks = state[action.todolistId]
        //     let task = todolistTasks.find(t => t.id === action.taskId)
        //     if(task)task.isDone=action.isDone
        //     return ({...state})
        // }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case CHANGE_TASK_TITLE:
            return {
               ...state,
                [action.todolistId]:state[action.todolistId].map(el => el.id ===action.taskId? {...el,title:action.title}:el)
            }
        case REMOVE_TODOLIST:
            // 2 варианта удаления свойства у обьекта
            // let newState = {...state}
            // delete newState[action.todolistId]
            // return newState
        const {[action.todolistId]:[],...rest}={...state}
            return rest
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todolistId]: []
            }


        default:
            return state
    }
}
export const removeTaskAC = (TaskId: string, todolistId: string) => {
    return {type: REMOVE_TASK, TaskId, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: CHANGE_TASK_STATUS, isDone, taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: ADD_TASK, title, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: CHANGE_TASK_TITLE, title, taskId, todolistId} as const
}




