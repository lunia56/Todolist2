import {FilterValuesType, TaskStateType, TodoListType} from '../App';
import {v1} from 'uuid';
import {ADD_TODOLIST, AddTodolistAT, REMOVE_TODOLIST, RemoveTodolistAT} from './todolists-reducer';

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}
type ChangeTaskStatus = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ActionTaskType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitle
    | ChangeTaskStatus
    | RemoveTodolistAT
    | AddTodolistAT

const todoListId_1 = v1()
const todoListId_2 = v1()
const InitialState: TaskStateType = {
    [todoListId_1]: [
        {id: v1(), title: 'HTML', isDone: true}, // => t
        {id: v1(), title: 'CSS', isDone: true}, // => {...t, isDone}
        {id: v1(), title: 'JS/TS', isDone: false}, // => t
    ],
    [todoListId_2]: [
        {id: v1(), title: 'Milk', isDone: true}, // => t
        {id: v1(), title: 'chees', isDone: true}, // => {...t, isDone}
        {id: v1(), title: 'pancel', isDone: false}, // => t
    ]
}
export const tasksReducer = (tasks: TaskStateType = InitialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            debugger
            return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(task => task.id !== action.taskId)}
        case ADD_TASK:
            return {
                ...tasks,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...tasks[action.todolistId]]
            }
        case CHANGE_TASK_TITLE:
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    title: action.title
                })
            }
        case CHANGE_TASK_STATUS:
            return {
                ...tasks,
                [action.todolistId]: tasks[action.todolistId].map(el => el.id !== action.taskId ? el : {
                    ...el,
                    isDone: action.isDone
                })
            }
        case ADD_TODOLIST:
            return {...tasks, [action.todolistId]: []}
        case REMOVE_TODOLIST:
            const tasksCopy = {...tasks}
            delete tasksCopy[action.id]
        return  tasksCopy
        // return  {...tasks, delete tasks[action.id]} ??
        default:
            return tasks
    }
}
export const AddTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: ADD_TASK, title, todolistId}
}
export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {type: REMOVE_TASK, taskId, todolistId}
}
export const ChangeTaskTitleAC = (title: string, taskId: string, todolistId: string): ChangeTaskTitle => {
    return {type: CHANGE_TASK_TITLE, taskId, todolistId, title}
}
export const ChangeTaskStatusAC = (isDone: boolean, taskId: string, todolistId: string): ChangeTaskStatus => {
    return {type: CHANGE_TASK_STATUS, taskId, todolistId, isDone}
}
