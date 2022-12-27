import {v1} from 'uuid';
import todolist from '../Todolist';
import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {FilterValuesType, TodoListType} from '../AppWithRedux';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>
export type SetTodolistAT = ReturnType<typeof SetTodolistAC>

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT|SetTodolistAT
export const todoListId_1 = v1()
export const todoListId_2 = v1()
export const todoListId_3 = v1()



const initialState:Array<TodoListType> = [
    // {id: todoListId_1, title: 'What to learn', filter: 'all'},
    // {id: todoListId_2, title: 'What to buy', filter: 'all'},
    // {id: todoListId_3, title: 'What to do', filter: 'all'}
]
export const todolistsReducer = (todoLists: Array<TodoListType>=initialState, action: ActionType): Array<TodoListType> => {

    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.todolistId)
        case ADD_TODOLIST:
            //Тут захардкожены свойства addedDate,order что бы не ругался тс
            return [ {id: action.todolistId, addedDate: v1(),order:1,title: action.title, filter: 'all'},...todoLists]

        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id !== action.id ? tl : {...tl, filter: action.filter})
        case 'SET_TODOS':
            return action.todolists.map(tl=>({...tl,filter:"all"}))
        default:
            return todoLists
    }
}
export const AddTodolistAC = (title: string,todolistId:string) => {
    return {type: ADD_TODOLIST, title,todolistId} as const
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


export const SetTodolistAC = (todolists:Array<TodolistType>) =>{
    return {type: "SET_TODOS",todolists} as const
}

export const getTodoTC = ()=>(dispatch:Dispatch)=>{
    todolistAPI.getTodolists().then((res)=>{
        dispatch(SetTodolistAC(res.data))
    })
}

export const RemoveTodoTC = (todolistId:string)=>(dispatch:Dispatch)=>{
    todolistAPI.deleteTodolist(todolistId).then((res)=>{
        dispatch(RemoveTodolistAC(todolistId))
    })
}
export const AddTodoTC = (todolistTitle:string)=>(dispatch:Dispatch)=>{
    todolistAPI.createTodolist(todolistTitle).then((res)=>{
        dispatch(AddTodolistAC(todolistTitle,res.data.data.item.id))
    })
}

export const UpdateTodoTitleTC = (todolistTitle:string,todolistId:string)=>(dispatch:Dispatch)=>{
    todolistAPI.updateTodolist(todolistId,todolistTitle).then((res)=>{
        dispatch(ChangeTodolistTitleAC(todolistTitle,todolistId))
    })
}
