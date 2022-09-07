import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitle | ChangeTodolistFilter

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            return [...todoLists, {id: v1(), title: action.title, filter: 'all'}]
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        default:
            return todoLists
    }
}
export const RemoveTodolistAC = (id: string):RemoveTodolistAT =>{
    return {type: REMOVE_TODOLIST, id}
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {type: ADD_TODOLIST,title:title}
}
export const ChangeTodolistTitleAC = (title: string,id:string): ChangeTodolistTitle => {
    return {type: CHANGE_TODOLIST_TITLE,id,title: title}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType,id:string): ChangeTodolistFilter => {
    return {type: CHANGE_TODOLIST_FILTER,id ,filter: filter}
}