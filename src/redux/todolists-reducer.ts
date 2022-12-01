import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitle = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilter = ReturnType<typeof ChangeTodolistFilterAC>

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitle | ChangeTodolistFilter
export const todoListId_1 = v1()
export const todoListId_2 = v1()
export const todoListId_3 = v1()



const initialState:Array<TodoListType> = [
    {id: todoListId_1, title: 'What to learn', filter: 'all'},
    {id: todoListId_2, title: 'What to buy', filter: 'all'},
    {id: todoListId_3, title: 'What to do', filter: 'all'}
]
export const todolistsReducer = (todoLists: Array<TodoListType>=initialState, action: ActionType): Array<TodoListType> => {

    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.todolistId)
        case ADD_TODOLIST:
            return [ {id: action.todolistId, title: action.title, filter: 'all'},...todoLists]
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        default:
            return todoLists
    }
}
export const AddTodolistAC = (title: string) => {
    return {type: ADD_TODOLIST, title, todolistId: v1()} as const
}
export const RemoveTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, todolistId} as const
}
export const ChangeTodolistTitleAC = (title: string, id: string) => {
    return {type: CHANGE_TODOLIST_TITLE, id, title: title} as const
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
    return {type: CHANGE_TODOLIST_FILTER, id, filter} as const
}